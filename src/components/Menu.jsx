import { useState } from "react";
import {
  House, FolderKanban, LayoutGrid, CalendarDays, Users, FileText,
  Settings, HelpCircle, LogOut, ChevronDown,
} from "lucide-react";

const menuItems = [
  { icon: House, label: "Dashboard" },
  { icon: FolderKanban, label: "Projects", dropdown: true },
  { icon: LayoutGrid, label: "Kanban" },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Users, label: "Clients" },
  { icon: FileText, label: "Reports" },
  { icon: Users, label: "Users" },
  { icon: Settings, label: "Settings" },
];

export default function Menu({ selectedPage, onNavigate, collapsed = false }) {
  const [projectsOpen, setProjectsOpen] = useState(false);

  const navButtonClass = (active) => `flex w-full items-center ${collapsed ? "justify-center px-2" : "gap-4 px-4"} rounded-md py-3 text-left transition ${active ? "bg-cyan-100 text-slate-800" : "text-slate-600 hover:bg-slate-100"}`;

  return (
    <div className={`flex flex-1 flex-col ${collapsed ? "px-2" : "px-5"}`}>
      <div className={`mb-5 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400" />
        {!collapsed && <h1 className="text-3xl font-semibold tracking-wide text-slate-700">Ongo</h1>}
      </div>

      <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} border-b border-slate-200 pb-5`}>
        <img src="https://i.pravatar.cc/100?img=12" alt="Profile" title="Jack Jones" className="h-11 w-11 shrink-0 rounded-full object-cover" />
        {!collapsed && <div className="min-w-0"><h2 className="font-semibold text-slate-700">Jack Jones</h2><p className="text-sm text-slate-400">User account</p></div>}
      </div>

      <nav className="mt-5 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          if (item.dropdown) {
            return (
              <div key={item.label}>
                <button type="button" title={collapsed ? item.label : undefined} onClick={() => collapsed ? onNavigate("Projects") : setProjectsOpen((value) => !value)} className={navButtonClass(selectedPage === "Projects")} aria-expanded={projectsOpen}>
                  <Icon size={19} />
                  {!collapsed && <><span className="flex-1 font-medium">{item.label}</span><ChevronDown size={18} className={`transition-transform duration-200 ${projectsOpen ? "rotate-180" : ""}`} /></>}
                </button>
                {!collapsed && projectsOpen && <div className="ml-12 mt-1 space-y-1">{["Web platform", "Mobile app", "AI platform"].map((project) => <button key={project} type="button" onClick={() => onNavigate(project)} className={`block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 ${selectedPage === project ? "font-semibold text-cyan-700" : "text-slate-500 hover:text-slate-700"}`}>{project}</button>)}</div>}
              </div>
            );
          }
          return <button key={item.label} type="button" title={collapsed ? item.label : undefined} onClick={() => onNavigate(item.label)} className={navButtonClass(selectedPage === item.label)}><Icon size={19} />{!collapsed && <span className="flex-1 font-medium">{item.label}</span>}</button>;
        })}
      </nav>

      <div className="mt-auto space-y-2 pb-3 pt-6">
        <button type="button" title={collapsed ? "Help center" : undefined} onClick={() => onNavigate("Help center")} className={navButtonClass(selectedPage === "Help center")}><HelpCircle size={20} />{!collapsed && <span>Help center</span>}</button>
        <button type="button" title={collapsed ? "Log out" : undefined} onClick={() => onNavigate("Log out")} className={navButtonClass(selectedPage === "Log out")}><LogOut size={20} />{!collapsed && <span>Log out</span>}</button>
      </div>
    </div>
  );
}
