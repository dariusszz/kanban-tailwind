# Ongo Kanban UI

React + Vite + Tailwind CSS + JSON Server.

## Features

- Collapsible Projects menu
- Collapsible Labels section
- Add / Edit / Delete tasks
- Task data stored in `src/data/tasks.json`
- Real CRUD requests through JSON Server
- Search starts after 3 characters and filters cards by title
- Search is case-insensitive
- Add Task modal with validation
- Priority and status enums
- Tag checkboxes
- Responsive Tailwind layout

## Run

Install dependencies:

```bash
npm install
```

### Option 1 — one command

```bash
npm start
```

This starts both:
- Vite: `http://localhost:5173`
- JSON Server: `http://localhost:3001`

### Option 2 — two terminals

Terminal 1:

```bash
npm run server
```

Terminal 2:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Data

The tasks are stored in:

```text
src/data/tasks.json
```

The frontend uses JSON Server to:
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

Because JSON Server watches the JSON file, Add/Edit/Delete changes are written back to the JSON file.
