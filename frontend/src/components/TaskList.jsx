import React from "react";
import API from "../api/api";

export default function TaskList({ tasks = [], refresh }) {
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      if (refresh) refresh();
    } catch (err) {
      console.error("Delete task error:", err);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "done" ? "pending" : "done";
      await API.put(`/tasks/${task._id}`, { status: newStatus });
      if (refresh) refresh();
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  };

  if (!tasks || tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div>
      {tasks.map((t) => (
        <div key={t._id} className="task-item">
          <div>
            <div className="task-title">{t.title}</div>
            <div className="task-desc">{t.description}</div>
            <div className="task-meta">{new Date(t.createdAt).toLocaleString()}</div>
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
