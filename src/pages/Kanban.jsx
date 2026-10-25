import { useState } from "react";
import { Search, Plus, ChevronLeft, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import KanbanBoard from "../components/KanbanBoard";

export default function Kanban() {
  const [searchTerm, setSearchTerm] = useState("");
  const [headerAddTaskOpen, setHeaderAddTaskOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Kanban");
  const [selectedPriority, setSelectedPriority] = useState(null);

  const handleNavigate = (page) => {
    setSelectedPage(page);
    setHeaderAddTaskOpen(false);
    setSearchTerm("");
    setSelectedPriority(null);
  };

  const clearSearch = () => setSearchTerm("");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        collapsed={sidebarCollapsed}
        selectedPage={selectedPage}
        onNavigate={handleNavigate}
        selectedPriority={selectedPriority}
        onSelectPriority={setSelectedPriority}
      />

      <main className="min-w-0 flex-1 bg-white transition-all duration-200">
        <header className="flex flex-col gap-5 px-6 py-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setSidebarCollapsed((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition hover:bg-slate-300"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft size={20} className={`transition-transform duration-200 ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
            <h1 className="text-3xl font-semibold text-slate-700">{selectedPage}</h1>
          </div>

          {selectedPage === "Kanban" && <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-12 w-full items-center gap-3 rounded-lg bg-slate-100 px-4 sm:w-72">
              <Search size={20} className="shrink-0 text-slate-400" />
              <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search tasks..." className="w-full bg-transparent outline-none placeholder:text-slate-400" />
              {searchTerm && <button type="button" onClick={clearSearch} className="shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600" aria-label="Clear search"><X size={16} /></button>}
            </div>
            <button type="button" onClick={() => setHeaderAddTaskOpen(true)} className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-cyan-700"><Plus size={20} />Add Task</button>
          </div>}
        </header>

        {selectedPage === "Kanban" ? <section className="px-6 pb-10 lg:px-10">
          {searchTerm.trim().length > 0 && searchTerm.trim().length < 3 && <p className="mb-4 text-sm text-slate-400">Type at least 3 characters to search tasks.</p>}
          {searchTerm.trim().length >= 3 && <p className="mb-4 text-sm text-slate-400">Searching for: <span className="font-medium text-slate-600">"{searchTerm}"</span></p>}
          {selectedPriority && <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">Filtering by <span className="rounded-full bg-cyan-50 px-3 py-1 font-semibold capitalize text-cyan-800">{selectedPriority}</span><button type="button" onClick={() => setSelectedPriority(null)} className="font-medium text-cyan-700 underline">Clear filter</button></div>}
          <KanbanBoard searchTerm={searchTerm} selectedPriority={selectedPriority} openAddTask={headerAddTaskOpen} onCloseAddTask={() => setHeaderAddTaskOpen(false)} />
        </section> : <section className="flex min-h-[65vh] items-center justify-center px-6 pb-10 lg:px-10">
          <div className="max-w-lg text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-3xl text-cyan-700">✦</div><h2 className="text-2xl font-semibold text-slate-700">Feature not implemented yet</h2><p className="mt-2 text-slate-500">The {selectedPage} page is not available yet. Choose Kanban from the menu to return to your board.</p><button type="button" onClick={() => handleNavigate("Kanban")} className="mt-6 rounded-lg bg-cyan-600 px-5 py-2.5 font-semibold text-white hover:bg-cyan-700">Back to Kanban</button></div>
        </section>}
      </main>
    </div>
  );
}
