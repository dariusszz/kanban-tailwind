import { useState } from "react";
import { ChevronUp, Flag } from "lucide-react";

const labels = [
  { name: "High", value: "high", color: "bg-red-500", text: "text-red-600" },
  { name: "Medium", value: "medium", color: "bg-orange-400", text: "text-orange-600" },
  { name: "Low", value: "low", color: "bg-yellow-400", text: "text-yellow-700" },
];

export default function Labels({ selectedPriority, onSelectPriority, collapsed = false }) {
  const [open, setOpen] = useState(true);

  return (
    <div className={`${collapsed ? "mx-2" : "mx-5"} border-t border-slate-200 ${collapsed ? "pt-4" : "pt-6"}`}>
      {!collapsed && (
        <button type="button" onClick={() => setOpen((value) => !value)} className="mb-5 flex w-full items-center justify-between" aria-expanded={open}>
          <h2 className="text-xl font-semibold text-slate-700">Labels</h2>
          <ChevronUp size={18} className={`text-slate-500 transition-transform duration-200 ${open ? "" : "rotate-180"}`} />
        </button>
      )}

      {(open || collapsed) && (
        <div className={collapsed ? "space-y-3" : "space-y-3"}>
          {labels.map((label) => {
            const selected = selectedPriority === label.value;
            return (
              <button
                key={label.value}
                type="button"
                title={`${label.name} priority`}
                aria-pressed={selected}
                onClick={() => onSelectPriority?.(selected ? null : label.value)}
                className={`flex w-full items-center ${collapsed ? "justify-center px-1" : "justify-between px-2"} rounded-lg py-2 text-left transition ${selected ? "bg-cyan-50 ring-1 ring-cyan-200" : "hover:bg-slate-50"}`}
              >
                <span className={`flex min-w-0 items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                  <span className={`h-3 w-3 shrink-0 rounded-sm ${label.color}`} />
                  {!collapsed && <span className={`truncate text-sm ${selected ? "font-semibold text-cyan-800" : "text-slate-600"}`}>{label.name} priority</span>}
                </span>
                {!collapsed && (
                  <span className={`rounded-full px-2 py-1 text-xs ${selected ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-500"}`}>
                    {selected ? "Selected" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
      {!collapsed && <div className="mt-6 border-t border-slate-200" />}
    </div>
  );
}
