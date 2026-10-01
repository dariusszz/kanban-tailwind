import { useState } from "react";
import { Search, Plus, ChevronLeft, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import KanbanBoard from "../components/KanbanBoard";

export default function Kanban() {
  const [searchTerm, setSearchTerm] = useState("");
  const [headerAddTaskOpen, setHeaderAddTaskOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => setSearchTerm("");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-white">
        <header className="flex flex-col gap-5 px-6 py-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600"
            >
              <ChevronLeft size={20} />
            </button>

            <h1 className="text-3xl font-semibold text-slate-700">Kanban</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-12 w-full items-center gap-3 rounded-lg bg-slate-100 px-4 sm:w-72">
              <Search size={20} className="shrink-0 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search tasks..."
                className="w-full bg-transparent outline-none placeholder:text-slate-400"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setHeaderAddTaskOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-cyan-700"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </header>

        <section className="px-6 pb-10 lg:px-10">
          {searchTerm.length > 0 && searchTerm.length < 3 && (
            <p className="mb-4 text-sm text-slate-400">
              Type at least 3 characters to search tasks.
            </p>
          )}

          {searchTerm.length >= 3 && (
            <p className="mb-4 text-sm text-slate-400">
              Searching for: <span className="font-medium text-slate-600">"{searchTerm}"</span>
            </p>
          )}

          <KanbanBoard
            searchTerm={searchTerm}
            openAddTask={headerAddTaskOpen}
            onCloseAddTask={() => setHeaderAddTaskOpen(false)}
          />
        </section>
      </main>
    </div>
  );
}
