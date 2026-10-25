import { useEffect, useRef, useState } from "react";
import { Paperclip, MoreHorizontal, Flag, Pencil, Trash2 } from "lucide-react";

const priorityInfo = {
  high: { label: "High", color: "text-red-600", badge: "bg-red-50 text-red-700 ring-red-200" },
  medium: { label: "Medium", color: "text-orange-500", badge: "bg-orange-50 text-orange-700 ring-orange-200" },
  low: { label: "Low", color: "text-yellow-600", badge: "bg-yellow-50 text-yellow-800 ring-yellow-200" },
};

export default function TaskCard({ title, link, tags = [], priority = "medium", days, users = [], image, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef(null);
  const normalizedPriority = priority === "green" ? "medium" : (priorityInfo[priority] ? priority : "medium");
  const priorityDetails = priorityInfo[normalizedPriority];

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <>
      <div className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="max-w-[240px] text-lg font-semibold leading-6 text-slate-700">{title}</h3>
          <div ref={menuRef} className="relative shrink-0">
            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-md p-1 text-slate-500 hover:bg-slate-100" aria-label={`Options for ${title}`}><MoreHorizontal size={21} /></button>
            {menuOpen && <div className="absolute right-0 top-9 z-20 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button type="button" onClick={() => { setMenuOpen(false); onEdit(); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"><Pencil size={15} />Edit</button>
              <button type="button" onClick={() => { setMenuOpen(false); setConfirmOpen(true); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"><Trash2 size={15} />Delete</button>
            </div>}
          </div>
        </div>

        {link && <div className="mb-4 flex items-center gap-2 text-sm text-slate-500"><Paperclip size={17} /><span className="break-all">{link}</span></div>}
        {image && <div className="mb-4 h-36 overflow-hidden rounded-lg"><img src={image} alt={title} className="h-full w-full object-cover" /></div>}

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded bg-slate-100 px-3 py-1 text-xs text-slate-500">{tag}</span>)}</div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${priorityDetails.badge}`}><Flag size={13} className={priorityDetails.color} fill="currentColor" />{priorityDetails.label}</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          {users.length > 0 ? <div className="flex -space-x-2">{users.map((user, index) => <img key={`${user}-${index}`} src={user} alt="User" className="h-9 w-9 rounded-full border-2 border-white object-cover" />)}</div> : <span />}
          <div className="whitespace-nowrap text-sm text-slate-500">{days} days left</div>
        </div>
      </div>

      {confirmOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmOpen(false); }}>
        <div role="dialog" aria-modal="true" aria-labelledby="delete-card-title" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-4 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600"><Trash2 size={20} /></span><h2 id="delete-card-title" className="text-lg font-semibold text-slate-800">Confirm deletion</h2></div>
          <p className="text-sm text-slate-600">Are you sure to delete the card?</p>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setConfirmOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">No</button>
            <button type="button" onClick={() => { setConfirmOpen(false); onDelete(); }} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">Yes</button>
          </div>
        </div>
      </div>}
    </>
  );
}
