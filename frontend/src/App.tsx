import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

import {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
  deleteConversation,
  renameConversation,
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

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

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

      setMessages(data);
      setSelectedConversation(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNewChat() {
    try {
      const conversation =
        await createConversation();

      await loadConversations();

      setSelectedConversation(
        conversation.id
      );

      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSend(
    prompt: string
  ) {
    if (!selectedConversation) {
      alert("Create a chat first");
      return;
    }

    try {
      setLoading(true);

      await sendMessage(
        selectedConversation,
        prompt
      );

      await loadMessages(
        selectedConversation
      );

      await loadConversations();
    } catch (error) {
      console.error(error);
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
      console.log("Deleting", id);

      await deleteConversation(id);

      console.log("Deleted successfully");

      await loadConversations();

      if (
        selectedConversation === id
      ) {
        setSelectedConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error(error);
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

      await loadConversations();
    } catch (error) {
      console.error(error);
    }
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

        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <ChatInput
          onSend={handleSend}
        />
      </div>
    </div>
  );
}

export default App;