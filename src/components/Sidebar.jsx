import Menu from "./Menu";
import Labels from "./Labels";

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-[290px] flex-col border-r border-slate-200 bg-white py-7">
      <Menu />
      <Labels />
    </aside>
  );
}
