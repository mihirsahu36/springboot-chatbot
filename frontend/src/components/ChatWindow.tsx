import Message from "./Message";
import type { ChatMessage } from "../types/Chat";

interface Props {
  messages: ChatMessage[];
}

function ChatWindow({ messages }: Props) {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
        />
      ))}
    </div>
  );
}

export default ChatWindow;