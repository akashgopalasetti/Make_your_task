import React, { useState } from "react";
import API from "../api/api";

export default function TaskForm({ refresh }) {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    setForm({ title: "", description: "" });
    refresh();
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

        <button className="btn btn-primary" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}
