import Message from "./Message";
import type { Message as ChatMessage } from "../types/Message";
import { useEffect, useRef } from "react";
import TypingIndicator from "./TypingIndicator";

interface Props {
  messages: ChatMessage[];
  loading?: boolean;
}

export default function ChatWindow({
    messages,
    loading,
  }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="empty-state">
          Start a new conversation
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
            />
          ))}

          {loading && (
            <TypingIndicator />
          )}

          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}