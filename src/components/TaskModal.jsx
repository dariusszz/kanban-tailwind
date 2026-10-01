import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  title: "",
  link: "",
  tags: [],
  priority: "medium",
  days: "",
  image: "",
  status: "todo",
};

const tagOptions = ["Update", "Web", "New Feature", "iOS", "UI/UX", "App"];

export default function TaskModal({
  open,
  onClose,
  onSave,
  initialTask = null,
  defaultStatus = "todo",
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const editing = Boolean(initialTask);

  useEffect(() => {
    if (!open) return;

    if (initialTask) {
      setForm({
        title: initialTask.title ?? "",
        link: initialTask.link ?? "",
        tags: initialTask.tags ?? [],
        priority: initialTask.priority ?? "medium",
        days: String(initialTask.days ?? ""),
        image: initialTask.image ?? "",
        status: initialTask.status ?? defaultStatus,
      });
    } else {
      setForm({ ...emptyForm, status: defaultStatus });
    }

    setErrors({});
  }, [open, initialTask, defaultStatus]);

  if (!open) return null;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const toggleTag = (tag) => {
    setForm((current) => ({
      ...current,
      tags: current.tags.includes(tag)
        ? current.tags.filter((item) => item !== tag)
        : [...current.tags, tag],
    }));
    setErrors((current) => ({ ...current, tags: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.link.trim()) nextErrors.link = "Link is required.";
    if (form.tags.length === 0) nextErrors.tags = "Select at least one tag.";

    const days = Number(form.days);
    if (!form.days.trim()) {
      nextErrors.days = "Days left is required.";
    } else if (!Number.isInteger(days) || days < 0) {
      nextErrors.days = "Enter a whole number of 0 or more.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSave({
      ...form,
      title: form.title.trim(),
      link: form.link.trim(),
      days: Number(form.days),
      image: form.image.trim(),
    });
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-700">
              {editing ? "Edit task" : "Add task"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {editing ? "Update the existing card." : "Fill in the details for the new card."}
            </p>
          </div>

          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Title *</label>
            <input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              className={inputClass}
              placeholder="e.g. Website builder development"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Link *</label>
            <input
              value={form.link}
              onChange={(event) => updateField("link", event.target.value)}
              className={inputClass}
              placeholder="Document link / Design link"
            />
            {errors.link && <p className="mt-1 text-sm text-red-500">{errors.link}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Tags *</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {tagOptions.map((tag) => (
                <label
                  key={tag}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={form.tags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                    className="h-4 w-4 accent-cyan-600"
                  />
                  {tag}
                </label>
              ))}
            </div>
            {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Priority *</label>
              <select
                value={form.priority}
                onChange={(event) => updateField("priority", event.target.value)}
                className={inputClass}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="green">On priority</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Days left *</label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.days}
                onChange={(event) => updateField("days", event.target.value)}
                className={inputClass}
                placeholder="5"
              />
              {errors.days && <p className="mt-1 text-sm text-red-500">{errors.days}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Status *</label>
              <select
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
                className={inputClass}
              >
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="review">In Review</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Image URL <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              value={form.image}
              onChange={(event) => updateField("image", event.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-cyan-600 px-6 py-2.5 font-semibold text-white hover:bg-cyan-700"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
