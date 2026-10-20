import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckSquare,
  Clock3,
  FileQuestion,
  FlaskConical,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Target,
  Trophy,
} from "lucide-react";

const navigation = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/planner", label: "Study Planner", icon: CalendarDays },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/lectures", label: "Lectures", icon: GraduationCap },
  { to: "/pyqs", label: "PYQs", icon: FileQuestion },
  { to: "/revision", label: "Revision", icon: CheckSquare },
  { to: "/focus", label: "Focus Mode", icon: Clock3 },
  { to: "/mocks", label: "Mock Tests", icon: FlaskConical },
  { to: "/mistakes", label: "Mistake Book", icon: Target },
  { to: "/formulas", label: "Formula Vault", icon: Trophy },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-zinc-800 bg-zinc-950 lg:block">

      <div className="flex h-screen flex-col">

        {/* LOGO */}
        <div className="border-b border-zinc-800 px-5 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600">
              <GraduationCap size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                GATE 2027
              </p>

              <p className="truncate text-sm font-bold text-white">
                Command Center
              </p>
            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto px-3 py-5">

          <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-widest text-zinc-600">
            Preparation
          </p>

          <nav className="space-y-1">

            {navigation.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      isActive
                        ? "bg-violet-600/20 text-violet-300"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`
                  }
                >

                  <Icon
                    size={18}
                    className="shrink-0"
                  />

                  <span className="truncate">
                    {item.label}
                  </span>

                </NavLink>
              );

            })}

          </nav>

        </div>


        {/* TARGET */}

        <div className="border-t border-zinc-800 p-4">

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">

            <div className="flex items-center gap-2">

              <Trophy
                size={16}
                className="text-violet-400"
              />

              <p className="text-xs text-zinc-500">
                Target
              </p>

            </div>

            <p className="mt-2 text-lg font-bold">
              55+ Marks
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              GATE ECE 2027
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}