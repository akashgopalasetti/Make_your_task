import React from "react";
import API from "../api/api";

export default function TaskList({ tasks, refresh }) {
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    refresh();
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "done" ? "pending" : "done";
    await API.put(`/tasks/${task._id}`, { status: newStatus });
    refresh();
  };

  return (
    <div>
      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((t) => (
        <div key={t._id} className="task-item">
          <div>
            <div className="task-title">{t.title}</div>
            <div className="task-desc">{t.description}</div>
            <div className="task-meta">
              {new Date(t.createdAt).toLocaleString()}
            </div>
          </div>

          <div>
            <button className="btn btn-secondary" onClick={() => toggleStatus(t)}>
              {t.status}
            </button>

            <button
              className="btn btn-danger"
              style={{ marginLeft: "10px" }}
              onClick={() => deleteTask(t._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
