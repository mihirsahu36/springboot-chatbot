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
} from "./services/conversationApi";

import type { Conversation } from "./types/Conversation";
import type { Message } from "./types/Messages";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.getItem("theme") !==
      "light"
  );

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [selectedConversation, setSelectedConversation] =
    useState<number | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);
  
  const [files, setFiles] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [provider, setProvider] =
    useState(
      localStorage.getItem("provider")
      || "openai"
    );

    const [authenticated,
    setAuthenticated] =
    useState(
      !!localStorage.getItem(
        "token"
      )
    );

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (token) {
      loadConversations();
    }

  }, []);

  useEffect(() => {
    document.body.className =
      darkMode
        ? ""
        : "light-mode";

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(
      "provider",
      provider
    );

  }, [provider]);

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

  async function loadMessages(
    id: number
  ) {
    try {

      const data =
        await getMessages(id);

      const uploadedFiles =
        await getFiles(id);

      setMessages(data);

      setFiles(
        uploadedFiles
      );

      setSelectedConversation(
        id
      );

    } catch (error) {
      console.error(error);
    }
  }

  function handleNewChat() {
    setSelectedConversation(
      null
    );

    setMessages([]);

    setFiles([]);
  }

  async function handleSend(
  prompt: string
) {
  try {
    setLoading(true);

    let conversationId =
      selectedConversation;

    // Automatically create a chat
    if (!conversationId) {

      const conversation =
        await createConversation();

      conversationId =
        conversation.id;

      setSelectedConversation(
        conversation.id
      );

      await loadConversations();
    }

    await sendMessage(
        conversationId!,
        prompt,
        provider
      );

      await loadMessages(
        conversationId!
      );

      await loadConversations();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to send message"
      );

    } finally {

      setLoading(false);
    }
  }
  async function handleDeleteConversation(
    id: number
  ) {
    const confirmed =
      window.confirm(
        "Delete this conversation?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteConversation(id);

      toast.success(
        "Conversation deleted"
      );

      await loadConversations();

      if (
        selectedConversation === id
      ) {
        setSelectedConversation(
          null
        );
        setMessages([]);
        setFiles([]);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete conversation"
      );
    }
  }

  async function handleRenameConversation(
    id: number,
    currentTitle: string
  ) {
    const newTitle = window.prompt(
      "Enter new title",
      currentTitle
    );

    if (
      !newTitle ||
      !newTitle.trim()
    ) {
      return;
    }

    try {
      await renameConversation(
        id,
        newTitle
      );

      toast.success(
        "Conversation renamed"
      );

      await loadConversations();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpload(
  file: File
  ) {

    console.log(
      "selectedConversation =",
      selectedConversation
    );

    console.log(
      "uploaded file =",
      file
    );

    let conversationId =
      selectedConversation;

    if (!conversationId) {

      const conversation =
        await createConversation();

      conversationId =
        conversation.id;

      setSelectedConversation(
        conversation.id
      );

      await loadConversations();
    }

    try {

      await uploadFile(
        conversationId!,
        file
      );

      const uploadedFiles =
        await getFiles(
          conversationId!
        );

      setFiles(
        uploadedFiles
      );

      toast.success(
        "File uploaded"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Upload failed"
      );
    }
  }

  async function handleDeleteFile(
    fileId: number
  ) {

    try {

      await deleteFile(
        fileId
      );

      if (
        selectedConversation
      ) {

        const uploadedFiles =
          await getFiles(
            selectedConversation
          );

        setFiles(
          uploadedFiles
        );
      }

      toast.success(
        "File removed"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to remove file"
      );
    }
  }

  if (!authenticated) {
    return (
      <LoginPage
        onLogin={() =>
          setAuthenticated(true)
        }
      />
    );
  }

  return (
    <div
      className={
        darkMode
          ? "app dark-theme"
          : "app light-theme"
      }
    >
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
              ? conversations.find(
                  c =>
                    c.id ===
                    selectedConversation
                )?.title ??
                "Conversation"
              : "Spring AI Chatbot"
          }
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <div className="uploaded-files">
          {files.map(file => (

            <div
              key={file.id}
              className="file-chip"
            >

              <span>
                📄 {file.fileName}
              </span>

              <button
                className="file-delete-btn"
                onClick={() =>
                  handleDeleteFile(
                    file.id
                  )
                }
              >
                ✕
              </button>

            </div>
          ))}

        </div>

        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <div className="chat-footer">
        <select
          className="provider-select"
          value={provider}
          onChange={(e) =>
            setProvider(
              e.target.value
            )
          }
        >

          <option value="openai">
            OpenAI
          </option>

          <option value="gemini">
            Gemini
          </option>

        </select>

        <ChatInput
          onSend={handleSend}
          onUpload={handleUpload}
        />

      </div>
      </div>
    </div>
  );
}

export default App;