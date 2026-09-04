import KanbanColumn from "./KanbanColumn";

const users = [
  "https://i.pravatar.cc/100?img=11",
  "https://i.pravatar.cc/100?img=32",
  "https://i.pravatar.cc/100?img=47",
];

const todoTasks = [
  {
    id: 1,
    title: "Nesla web development",
    link: "Document link",
    tags: ["Update", "Web"],
    priority: "medium",
    days: 2,
    users: [users[0], users[1], users[2]],
  },
  {
    id: 2,
    title: "Database AI app",
    link: "Document link",
    tags: ["New Feature", "iOS"],
    priority: "green",
    days: 5,
    users: [users[1], users[2]],
  },
];

const progressTasks = [
  {
    id: 3,
    title: "Create iconset for the entire platform",
    tags: ["UI/UX", "App"],
    priority: "high",
    days: 2,
    users: [users[0], users[1], users[2]],
  },
  {
    id: 4,
    title: "Media channel branding",
    tags: ["New Feature", "iOS"],
    priority: "medium",
    days: 2,
    users: [users[1], users[2]],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Website builder development",
    link: "Design link",
    tags: ["New Feature", "iOS"],
    priority: "green",
    days: 6,
    users: [users[0], users[1], users[2]],
  },
];

const reviewTasks = [
  {
    id: 6,
    title: "Dashboard for architecture application",
    tags: ["UI/UX", "App"],
    priority: "low",
    days: 2,
    users: [users[0], users[1], users[2]],
  },
  {
    id: 7,
    title: "Website builder development",
    link: "Design link",
    tags: ["New Feature", "iOS"],
    priority: "high",
    days: 6,
    users: [users[1], users[2]],
  },
  {
    id: 8,
    title: "Website builder development",
    link: "Design link",
    tags: ["New Feature", "iOS"],
    priority: "low",
    days: 1,
    users: [users[0], users[1]],
  },
];

export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <KanbanColumn title="To Do" tasks={todoTasks} showAddTask />
      <KanbanColumn title="In Progress" tasks={progressTasks} />
      <KanbanColumn title="In Review" tasks={reviewTasks} />
    </div>
  );
}
