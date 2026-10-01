const API_URL = "http://localhost:3001/tasks";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export function getTasks() {
  return request(API_URL);
}

export function createTask(task) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export function updateTask(id, task) {
  return request(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Delete failed with status ${response.status}`);
  }

  return true;
}
