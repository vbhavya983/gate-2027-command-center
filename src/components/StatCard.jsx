export default function StatCard({
  icon,
  label,
  value,
  subtext,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-zinc-600">
        {subtext}
      </p>
    </div>
  );
}