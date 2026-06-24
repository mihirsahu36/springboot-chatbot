import { useEffect, useRef, useState } from "react";

import { FiSend, FiPaperclip } from "react-icons/fi";

interface Props {
  onSend: (prompt: string) => void;

  onUpload: (files: File[]) => void;
}

export default function ChatInput({ onSend, onUpload }: Props) {
  const [prompt, setPrompt] = useState("");

  const [dragActive, setDragActive] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!prompt.trim()) {
      return;
    }

    onSend(prompt);

    setPrompt("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();

      setDragActive(true);
    };

    const handleWindowDragLeave = (e: DragEvent) => {
      // Mouse left browser window
      if (e.clientX === 0 && e.clientY === 0) {
        setDragActive(false);
      }
    };

    const handleWindowDrop = (e: DragEvent) => {
      e.preventDefault();

      setDragActive(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        console.log("Dropped files:", e.dataTransfer.files);

        onUpload(Array.from(e.dataTransfer.files));
      }
    };

    window.addEventListener("dragover", handleWindowDragOver);

    window.addEventListener("dragleave", handleWindowDragLeave);

    window.addEventListener("drop", handleWindowDrop);

    return () => {
      window.removeEventListener("dragover", handleWindowDragOver);

      window.removeEventListener("dragleave", handleWindowDragLeave);

      window.removeEventListener("drop", handleWindowDrop);
    };
  }, [onUpload]);

  return (
    <>
      {dragActive && <div className="drag-overlay">📂 Drop files here</div>}

      <div className={`chat-input ${dragActive ? "drag-active" : ""}`}>

        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);

            if (textareaRef.current) {
              textareaRef.current.style.height = "auto";

              textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              handleSend();
            }
          }}
          placeholder="Message Spring AI..."
          rows={1}
          className="chat-textarea"
          ref={textareaRef}
        />

        <label className="upload-btn">
          <FiPaperclip />

          <input type="file" multiple hidden onChange={handleFileChange} />
        </label>

        <button onClick={handleSend}>
          <FiSend />
        </button>
      </div>
    </>
  );
}
