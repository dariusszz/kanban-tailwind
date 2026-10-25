import Menu from "./Menu";
import Labels from "./Labels";

export default function Sidebar({ collapsed, selectedPage, onNavigate, selectedPriority, onSelectPriority }) {
  return (
    <aside className={`flex min-h-screen shrink-0 flex-col border-r border-slate-200 bg-white py-7 transition-all duration-200 ${collapsed ? "w-[76px]" : "w-[290px]"}`}>
      <Menu collapsed={collapsed} selectedPage={selectedPage} onNavigate={onNavigate} />
      {selectedPage === "Kanban" && <Labels collapsed={collapsed} selectedPriority={selectedPriority} onSelectPriority={onSelectPriority} />}
    </aside>
  );
}
