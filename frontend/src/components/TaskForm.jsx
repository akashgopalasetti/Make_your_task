import React, { useState } from "react";
import API from "../api/api";

export default function TaskForm({ refresh }) {
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/tasks", form);
      setForm({ title: "", description: "" });
      if (refresh) refresh();
    } catch (err) {
      console.error("Create task error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Create Task</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          className="input"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
