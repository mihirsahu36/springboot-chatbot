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

  function handleLogout() {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.reload();
  }
  
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

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

        <div className="avatar user-avatar">
          {localStorage.getItem("username")
            ?.charAt(0)
            .toUpperCase()}
        </div>
      </div>
    </div>
  );
}