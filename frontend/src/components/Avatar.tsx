interface Props {
  role: string;
}

export default function Avatar({
  role,
}: Props) {

  const isUser =
    role === "user";

  return (
    <div
      className={
        isUser
          ? "avatar user-avatar"
          : "avatar ai-avatar"
      }
    >
      {isUser ? "M" : "AI"}
    </div>
  );
}