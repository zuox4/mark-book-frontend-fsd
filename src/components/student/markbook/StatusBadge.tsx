// Компонент бейджа статуса
export interface StatusBadgeProps {
  status: "зачет" | "незачет";
  text: string;
  size?: "sm" | "md";
}

function StatusBadge({ status, text, size = "md" }: StatusBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`font-codec-bold rounded-full ${sizeClasses[size]} ${
        status === "зачет"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {text}
    </span>
  );
}
export default StatusBadge;
