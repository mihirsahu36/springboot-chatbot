import { useState } from "react";
import { FiSend } from "react-icons/fi";

interface Props {
  onSend: (prompt: string) => void;
}

export default function ChatInput({
  onSend,
}: Props) {
  const [prompt, setPrompt] =
    useState("");

  const handleSend = () => {
    if (!prompt.trim()) return;

    onSend(prompt);

    setPrompt("");
  };

  return (
    <div className="chat-input">
      <input
        value={prompt}
        onChange={(e) =>
          setPrompt(
            e.target.value
          )
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Message Spring AI..."
      />

      <button
        onClick={handleSend}
      >
        <FiSend />
      </button>
    </div>
  );
}