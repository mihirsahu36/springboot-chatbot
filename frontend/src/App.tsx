import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import toast from "react-hot-toast";
import LoginPage from "./pages/LoginPage";

import {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
  deleteConversation,
  renameConversation,
  uploadFile,
  getFiles,
  deleteFile,
  streamMessage,
} from "./services/conversationApi";

import type { Conversation } from "./types/Conversation";
import type { Message } from "./types/Messages";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light",
  );

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [files, setFiles] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [provider, setProvider] = useState(
    localStorage.getItem("provider") || "openai",
  );

  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadConversations();
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "" : "light-mode";

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("provider", provider);
  }, [provider]);

  useEffect(() => {
    const preventDefaults = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("dragenter", preventDefaults);

    window.addEventListener("dragover", preventDefaults);

    window.addEventListener("drop", preventDefaults);

    return () => {
      window.removeEventListener("dragenter", preventDefaults);

      window.removeEventListener("dragover", preventDefaults);

      window.removeEventListener("drop", preventDefaults);
    };
  }, []);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  async function loadConversations() {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadMessages(id: number) {
    try {
      const data = await getMessages(id);

      const uploadedFiles = await getFiles(id);

      setMessages(data);

      setFiles(uploadedFiles);

      setSelectedConversation(id);
    } catch (error) {
      console.error(error);
    }
  }

  function handleNewChat() {
    setSelectedConversation(null);

    setMessages([]);

    setFiles([]);
  }

  async function handleSend(prompt: string) {
    try {
      setLoading(true);

      let conversationId = selectedConversation;

      if (!conversationId) {
        const conversation = await createConversation();

        conversationId = conversation.id;

        setSelectedConversation(conversation.id);

        await loadConversations();
      }

      // Add user message immediately
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "user",
          content: prompt,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Add empty assistant message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "",
          timestamp: new Date().toISOString(),
        },
      ]);

      let fullResponse = "";

      await streamMessage(
        conversationId!,
        prompt,
        provider,

        (chunk) => {
          fullResponse += chunk;

          setMessages((prev) => {
            const updated = [...prev];

            updated[updated.length - 1] = {
              ...updated[updated.length - 1],

              content: fullResponse,
            };

            return updated;
          });
        },
      );

      await loadConversations();
    } catch (error) {
      console.error(error);

      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteConversation(id: number) {
    const confirmed = window.confirm("Delete this conversation?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteConversation(id);

      toast.success("Conversation deleted");

      await loadConversations();

      if (selectedConversation === id) {
        setSelectedConversation(null);
        setMessages([]);
        setFiles([]);
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete conversation");
    }
  }

  async function handleRenameConversation(id: number, currentTitle: string) {
    const newTitle = window.prompt("Enter new title", currentTitle);

    if (!newTitle || !newTitle.trim()) {
      return;
    }

    try {
      await renameConversation(id, newTitle);

      toast.success("Conversation renamed");

      await loadConversations();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpload(uploadedFiles: File[]) {
    console.log("selectedConversation =", selectedConversation);

    console.log("uploadedFiles =", uploadedFiles);

    console.log("Token:", localStorage.getItem("token"));

    let conversationId = selectedConversation;

    if (!conversationId) {
      const conversation = await createConversation();

      conversationId = conversation.id;

      setSelectedConversation(conversation.id);

      await loadConversations();
    }

    try {
      let uploadedCount = 0;

      for (const file of uploadedFiles) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} exceeds 10MB`);

          continue;
        }

        await uploadFile(conversationId!, file);

        uploadedCount++;
      }

      const latestFiles = await getFiles(conversationId!);

      console.log("Files from backend:", latestFiles);

      setFiles(latestFiles);

      if (uploadedCount > 0) {
        toast.success(`${uploadedCount} file(s) uploaded`);
      }
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    }
  }

  async function handleDeleteFile(fileId: number) {
    try {
      await deleteFile(fileId);

      if (selectedConversation) {
        const uploadedFiles = await getFiles(selectedConversation);

        setFiles(uploadedFiles);
      }

      toast.success("File removed");
    } catch (error) {
      console.error(error);

      toast.error("Failed to remove file");
    }
  }

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className={darkMode ? "app dark-theme" : "app light-theme"}>
      <Sidebar
        conversations={conversations}
        selectedId={selectedConversation}
        onSelect={loadMessages}
        onNewChat={handleNewChat}
        onDelete={handleDeleteConversation}
        onRename={handleRenameConversation}
      />

      <div className="main-content">
        <Header
          title={
            selectedConversation
              ? (conversations.find((c) => c.id === selectedConversation)
                  ?.title ?? "Conversation")
              : "Spring AI Chatbot"
          }
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <div className="uploaded-files">
          {files.map((file) => (
            <div key={file.id} className="file-chip">
              <span>📄 {file.fileName}</span>

              <button
                className="file-delete-btn"
                onClick={() => handleDeleteFile(file.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <ChatWindow messages={messages} loading={loading} />

        <div className="chat-footer">
          <select
            className="provider-select"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="openai">OpenAI</option>

            <option value="gemini">Gemini</option>
          </select>

          <ChatInput onSend={handleSend} onUpload={handleUpload} />
        </div>
      </div>
    </div>
  );
}

export default App;
