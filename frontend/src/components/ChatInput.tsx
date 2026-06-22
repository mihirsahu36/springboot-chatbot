import { useState } from "react";

import {
  FiSend,
  FiPaperclip,
} from "react-icons/fi";

interface Props {
  onSend: (
    prompt: string
  ) => void;

  onUpload: (
    file: File
  ) => void;
}

export default function ChatInput({
  onSend,
  onUpload,
}: Props) {

  const [prompt, setPrompt] =
    useState("");

  const handleSend = () => {

    if (!prompt.trim()) {
      return;
    }

    onSend(prompt);

    setPrompt("");
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (
      e.target.files &&
      e.target.files.length > 0
    ) {
      onUpload(
        e.target.files[0]
      );
    }
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

      <label className="upload-btn">
        <FiPaperclip />

        <input
          type="file"
          hidden
          onChange={
            handleFileChange
          }
        />
      </label>

      <button
        onClick={handleSend}
      >
        <FiSend />
      </button>

    </div>
  );
}