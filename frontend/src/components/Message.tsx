import type { ChatMessage } from "../types/Chat";

interface Props {
  message: ChatMessage;
}

function Message({ message }: Props) {
  const isUser = message.sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          backgroundColor: isUser ? "#2563eb" : "#334155",
          color: "white",
          padding: "12px 16px",
          borderRadius: "12px",
          maxWidth: "70%",
          wordBreak: "break-word",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}

export default Message;