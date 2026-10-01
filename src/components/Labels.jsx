import { useState } from "react";
import { ChevronUp } from "lucide-react";

const labels = [
  { name: "High priority", count: 3, color: "bg-red-400" },
  { name: "Medium priority", count: 4, color: "bg-orange-400" },
  { name: "Low priority", count: 2, color: "bg-yellow-300" },
  { name: "On priority", count: 1, color: "bg-green-400" },
];

export default function Labels() {
  const [open, setOpen] = useState(true);

  return (
    <div className="mx-5 border-t border-slate-200 pt-6">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mb-5 flex w-full items-center justify-between"
        aria-expanded={open}
      >
        <h2 className="text-xl font-semibold text-slate-700">Labels</h2>
        <ChevronUp
          size={18}
          className={`text-slate-500 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
        />
      </button>

      {open && (
        <div className="space-y-5">
          {labels.map((label) => (
            <div key={label.name} className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`h-3 w-3 ${label.color}`} />
                <span className="text-slate-600">{label.name}</span>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500">
                {label.count}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 border-t border-slate-200" />
    </div>
  );
}
