import Avatar from "./Avatar";

import type { Message } from "../types/Message";
import { motion } from "framer-motion";
import { useState } from "react";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";

import {
  FiCopy,
  FiThumbsUp,
  FiThumbsDown
} from "react-icons/fi";

import {
  AiFillLike,
  AiFillDislike
} from "react-icons/ai";

interface Props {
  message: Message;
}

export default function Message({
  message,
}: Props) {

  const isUser =
    message.role === "user";
  
  const [copied, setCopied] =
    useState(false);

  const [liked, setLiked] =
    useState(false);

  const [disliked, setDisliked] =
    useState(false);

  const copyMessage = async () => {
    await navigator.clipboard
      .writeText(
        message.content
      );

    setCopied(true);

    toast.success(
      "Copied to clipboard"
    );

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);

    toast.success(
      "Marked as helpful"
    );
  };

  const handleDislike = () => {
    setDisliked(true);
    setLiked(false);

    toast.success(
      "Feedback received"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={
        isUser
          ? "message-row user-row"
          : "message-row ai-row"
      }
    >
      {!isUser && <Avatar role="assistant" />}

      <div
        className={
          isUser
            ? "message user"
            : "message assistant"
        }
      >
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code({
                inline,
                className,
                children,
              }) {
                const match =
                  /language-(\w+)/.exec(
                    className || ""
                  );

                return !inline &&
                  match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "12px",
                      overflowX: "auto",
                    }}
                  >
                    {String(children).replace(
                      /\n$/,
                      ""
                    )}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-700 px-1 py-0.5 rounded">
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {!isUser && (
          <div className="message-actions">
            <button
              className="action-btn"
              onClick={copyMessage}
            >
              {copied ? "✓" : <FiCopy />}
            </button>

            <button
              className={
                liked
                  ? "action-btn active"
                  : "action-btn"
              }
              onClick={handleLike}
            >
              {liked
                ? <AiFillLike />
                : <FiThumbsUp />}
            </button>

            <button
              className={
                disliked
                  ? "action-btn active"
                  : "action-btn"
              }
              onClick={handleDislike}
            >
              {disliked
                ? <AiFillDislike />
                : <FiThumbsDown />}
            </button>
          </div>
        )}
      </div>

      {isUser && <Avatar role="user" />}
    </motion.div>
  );
}