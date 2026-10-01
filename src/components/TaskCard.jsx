import { useEffect, useRef, useState } from "react";
import { Paperclip, MoreHorizontal, Flag, Pencil, Trash2 } from "lucide-react";

export default function TaskCard({
  title,
  link,
  tags = [],
  priority = "medium",
  days,
  users = [],
  image,
  onEdit,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const priorityColors = {
    high: "text-red-500",
    medium: "text-orange-400",
    low: "text-yellow-400",
    green: "text-green-500",
  };

  return (
    <div className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="max-w-[240px] text-lg font-semibold leading-6 text-slate-700">
          {title}
        </h3>

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            aria-label={`Options for ${title}`}
          >
            <MoreHorizontal size={21} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit();
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete();
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {link && (
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Paperclip size={17} />
          <span>{link}</span>
        </div>
      )}

      {image && (
        <div className="mb-4 h-36 overflow-hidden rounded-lg">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded bg-slate-100 px-3 py-1 text-xs text-slate-500">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-600">
          <Flag size={16} className={priorityColors[priority]} fill="currentColor" />
          {days} days left
        </div>
      </div>

      {users.length > 0 && (
        <div className="mt-5 flex -space-x-2">
          {users.map((user, index) => (
            <img
              key={`${user}-${index}`}
              src={user}
              alt="User"
              className="h-9 w-9 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
