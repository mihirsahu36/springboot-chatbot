import { useState } from "react";
import type { Conversation } from "../types/Conversation";

import {
  FiSearch,
  FiPlus,
  FiMessageSquare,
  FiTrash2,
  FiEdit2,
} from "react-icons/fi";

interface SidebarProps {
  conversations: Conversation[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onNewChat: () => void;
  onDelete: (id: number) => void;
  onRename: (id: number, currentTitle: string) => void;
}

export default function Sidebar({
  conversations,
  selectedId,
  onSelect,
  onNewChat,
  onDelete,
  onRename,
}: SidebarProps) {
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Spring AI</h2>
        <p>Your AI Assistant</p>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <FiPlus />
        <span>New Chat</span>
      </button>

      <div className="search-box">
        <FiSearch />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
        />
      </div>

      <div className="history">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={
              selectedId === conversation.id
                ? "conversation active"
                : "conversation"
            }
          >
            <div
              className="conversation-content"
              onClick={() => onSelect(conversation.id)}
            >
              <FiMessageSquare />

              <span>{conversation.title}</span>
            </div>

            <div className="conversation-actions">
              <button
                className="edit-btn"
                onClick={() => onRename(conversation.id, conversation.title)}
              >
                <FiEdit2 />
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(conversation.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
