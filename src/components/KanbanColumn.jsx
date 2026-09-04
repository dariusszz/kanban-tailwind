import { Plus, MoreHorizontal } from "lucide-react";
import TaskCard from "./TaskCard";

export default function KanbanColumn({ title, tasks, showAddTask = false }) {
  return (
    <div className="min-h-[540px] rounded-2xl bg-slate-100/80 p-4">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
          <span className="text-slate-400">{tasks.length}</span>
        </div>

        <div className="flex gap-3">
          <button><Plus size={20} className="text-slate-500" /></button>
          <button><MoreHorizontal size={21} className="text-slate-500" /></button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>

      {showAddTask && (
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-4 font-semibold text-slate-600 transition hover:bg-slate-50">
          <Plus size={19} />
          Add task
        </button>
      )}
    </div>
  );
}
