import { motion } from "framer-motion";
import { FiCopy, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

interface Props {
  role: string;
  content: string;
}

export default function MessageBubble({
  role,
  content,
}: Props) {

  const isUser = role === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`flex mb-6 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
        max-w-[70%]
        rounded-2xl
        px-5
        py-4
        shadow-lg
        ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-slate-800 text-white"
        }
      `}
      >
        {content}

        {!isUser && (
          <div className="flex gap-3 mt-3 text-gray-400">
            <FiCopy />
            <FiThumbsUp />
            <FiThumbsDown />
          </div>
        )}
      </div>
    </motion.div>
  );
}