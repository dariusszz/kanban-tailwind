# Ongo Kanban UI

React + Vite + Tailwind CSS + JSON Server.

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
