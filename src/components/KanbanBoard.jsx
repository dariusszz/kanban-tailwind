import { useEffect, useMemo, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import TaskModal from "./TaskModal";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";

const columns = [
  { key: "todo", title: "To Do" },
  { key: "progress", title: "In Progress" },
  { key: "review", title: "In Review" },
];

const fallbackUsers = [
  "https://i.pravatar.cc/100?img=11",
  "https://i.pravatar.cc/100?img=32",
];

export default function KanbanBoard({
  searchTerm,
  openAddTask,
  onCloseAddTask,
}) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState("todo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTasks() {
      try {
        setLoading(true);
        const data = await getTasks();
        if (active) setTasks(data);
      } catch (err) {
        if (active) {
          setError("Could not load tasks. Make sure JSON Server is running.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTasks();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (openAddTask) {
      setEditingTask(null);
      setDefaultStatus("todo");
      setModalOpen(true);
    }
  }, [openAddTask]);

  const filteredTasks = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (normalized.length < 3) return tasks;

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalized)
    );
  }, [tasks, searchTerm]);

  const openCreateModal = (status = "todo") => {
    setEditingTask(null);
    setDefaultStatus(status);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setDefaultStatus(task.status);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
    onCloseAddTask?.();
  };

  const handleSaveTask = async (form) => {
    try {
      setError("");

      if (editingTask) {
        const updated = await updateTask(editingTask.id, form);

        setTasks((current) =>
          current.map((task) => (task.id === editingTask.id ? updated : task))
        );
      } else {
        const newTask = await createTask({
          ...form,
          users: fallbackUsers,
        });

        setTasks((current) => [...current, newTask]);
      }

      closeModal();
    } catch (err) {
      setError("Could not save the task. Make sure JSON Server is running.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (err) {
      setError("Could not delete the task. Make sure JSON Server is running.");
    }
  };

  const visibleColumns = columns.map((column) => ({
    ...column,
    tasks: filteredTasks.filter((task) => task.status === column.key),
  }));

  return (
    <>
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl bg-slate-100 p-8 text-center text-slate-500">
          Loading tasks...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {visibleColumns.map((column) => (
            <KanbanColumn
              key={column.key}
              title={column.title}
              tasks={column.tasks}
              onAddTask={() => openCreateModal(column.key)}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}

      <TaskModal
        open={modalOpen}
        onClose={closeModal}
        onSave={handleSaveTask}
        initialTask={editingTask}
        defaultStatus={editingTask?.status ?? defaultStatus}
      />
    </>
  );
}
