import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">

      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Mobile title */}
        <div className="lg:hidden">
          <p className="text-xs text-zinc-500">
            GATE 2027
          </p>

          <h2 className="font-semibold">
            Command Center
          </h2>
        </div>

        {/* Search */}
        <div className="hidden max-w-md flex-1 lg:block">

          <div className="relative">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search topics, PYQs, lectures..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500/50"
            />

          </div>

        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          <button className="rounded-xl border border-zinc-800 p-2.5 text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
            <Bell size={18} />
          </button>

          <div className="hidden h-9 w-px bg-zinc-800 sm:block" />

          <div className="hidden sm:block">

            <p className="text-xs text-zinc-500">
              Target
            </p>

            <p className="text-sm font-semibold">
              55+ marks
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}