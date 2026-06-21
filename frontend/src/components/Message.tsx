import Avatar from "./Avatar";

import type { Message } from "../types/Message";
import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  FiCopy,
  FiThumbsUp,
  FiThumbsDown
} from "react-icons/fi";

interface Props {
  message: Message;
}

export default function Message({
  message,
}: Props) {

  const isUser =
    message.role === "user";

  const copyMessage = async () => {
    await navigator.clipboard.writeText(
      message.content
    );

    console.log("Copied");
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
              onClick={copyMessage}
              className="action-btn"
            >
              <FiCopy />
            </button>

            <button
              className="action-btn"
            >
              <FiThumbsUp />
            </button>

            <button
              className="action-btn"
            >
              <FiThumbsDown />
            </button>
          </div>
        )}
      </div>

      {isUser && <Avatar role="user" />}
    </motion.div>
  );
}