import { useState } from "react";
import {
  House,
  FolderKanban,
  LayoutGrid,
  CalendarDays,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";

const menuItems = [
  { icon: House, label: "Dashboard" },
  { icon: FolderKanban, label: "Projects", dropdown: true },
  { icon: LayoutGrid, label: "Kanban", active: true },
  { icon: CalendarDays, label: "Calender" },
  { icon: Users, label: "Clients" },
  { icon: FileText, label: "Reports" },
  { icon: Users, label: "Users" },
  { icon: Settings, label: "Settings" },
];

export default function Menu() {
  const [projectsOpen, setProjectsOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col px-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400" />
        <h1 className="text-3xl font-semibold tracking-wide text-slate-700">Ongo</h1>
      </div>

      <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Profile"
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-slate-700">Jack Jones</h2>
          <p className="text-sm text-slate-400">User account</p>
        </div>
      </div>

      <nav className="mt-5 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.label === "Projects") {
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => setProjectsOpen((value) => !value)}
                  className="flex w-full items-center gap-4 rounded-md px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
                  aria-expanded={projectsOpen}
                >
                  <Icon size={19} />
                  <span className="flex-1 font-medium">{item.label}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${projectsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {projectsOpen && (
                  <div className="ml-12 mt-1 space-y-1">
                    {["Web platform", "Mobile app", "AI platform"].map((project) => (
                      <button
                        key={project}
                        type="button"
                        className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      >
                        {project}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-4 rounded-md px-4 py-3 text-left transition ${
                item.active
                  ? "bg-cyan-100 text-slate-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={19} />
              <span className="flex-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 pb-3">
        <button type="button" className="flex w-full items-center gap-4 px-4 py-3 text-slate-600">
          <HelpCircle size={20} />
          <span>Help center</span>
        </button>
        <button type="button" className="flex w-full items-center gap-4 px-4 py-3 text-slate-600">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
