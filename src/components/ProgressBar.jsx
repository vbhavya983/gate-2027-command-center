export default function ProgressBar({
  value,
  className = "",
}) {
  const safeValue = Math.min(
    100,
    Math.max(0, value || 0)
  );

  return (
    <div
      className={`h-2 overflow-hidden rounded-full bg-zinc-800 ${className}`}
    >
      <div
        className="h-full rounded-full bg-violet-500 transition-all duration-500"
        style={{
          width: `${safeValue}%`,
        }}
      />
    </div>
  );
}