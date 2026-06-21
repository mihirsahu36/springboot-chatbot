interface Props {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({
  darkMode,
  toggleTheme,
}: Props) {

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-700"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}