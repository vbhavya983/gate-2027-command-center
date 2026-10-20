import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Timer,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const items = [
  {
    name: "Home",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Planner",
    path: "/planner",
    icon: CalendarDays,
  },
  {
    name: "Subjects",
    path: "/subjects",
    icon: BookOpen,
  },
  {
    name: "Focus",
    path: "/focus",
    icon: Timer,
  },
  {
    name: "Stats",
    path: "/analytics",
    icon: BarChart3,
  },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 px-2 py-2 backdrop-blur-xl lg:hidden">

      <div className="mx-auto flex max-w-lg items-center justify-around">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex min-w-14 flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] transition ${
                  isActive
                    ? "text-violet-400"
                    : "text-zinc-500"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </div>

    </nav>
  );
}