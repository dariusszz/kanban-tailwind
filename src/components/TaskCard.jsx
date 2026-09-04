import { Paperclip, MoreHorizontal, Flag } from "lucide-react";

export default function TaskCard({
  title,
  link,
  tags = [],
  priority = "medium",
  days,
  users = [],
  image,
}) {
  const priorityColors = {
    high: "text-red-500",
    medium: "text-orange-400",
    low: "text-yellow-400",
    green: "text-green-500",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="max-w-[240px] text-lg font-semibold leading-6 text-slate-700">
          {title}
        </h3>
        <button>
          <MoreHorizontal size={21} className="text-slate-500" />
        </button>
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
