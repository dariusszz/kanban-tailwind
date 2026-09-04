import { Search, Plus, ChevronLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import KanbanBoard from "../components/KanbanBoard";

export default function Kanban() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-white">
        <header className="flex flex-col gap-5 px-6 py-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-6">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-3xl font-semibold text-slate-700">Kanban</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-12 w-full items-center gap-3 rounded-lg bg-slate-100 px-4 sm:w-60">
              <Search size={20} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent outline-none placeholder:text-slate-400"
              />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-cyan-700">
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </header>

        <section className="px-6 pb-10 lg:px-10">
          <KanbanBoard />
        </section>
      </main>
    </div>
  );
}
