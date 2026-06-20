import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";
import type { ChatMessage } from "./types/Chat";
import { sendPrompt } from "./services/chatApi";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (prompt: string) => {
    const userMessage: ChatMessage = {
      text: prompt,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await sendPrompt(prompt);

      const botMessage: ChatMessage = {
        text: response,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Error contacting backend.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-card">
        <div className="chat-header">
          <h1>AI Chatbot</h1>
        </div>

        <div className="chat-body">
          <ChatWindow messages={messages} />

          {loading && (
            <div className="loading">
              Thinking...
            </div>
          )}
        </div>

        <div className="chat-footer">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default App;