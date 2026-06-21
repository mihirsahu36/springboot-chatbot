import ThemeToggle from "./ThemeToggle";
import { FiMessageSquare } from "react-icons/fi";

interface HeaderProps {
  title: string;
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({
  title,
  darkMode,
  toggleTheme,
}: HeaderProps) {
  return (
    <div className="header">
      <div className="header-left">
        <FiMessageSquare />
        <h2>{title}</h2>
      </div>

      <div className="header-actions">
        <ThemeToggle
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <div className="avatar user-avatar">
          M
        </div>
      </div>
    </div>
  );
}