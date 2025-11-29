import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    await register(form.name, form.email, form.password);
    nav("/dashboard");
  } catch (err) {
    // show server response clearly
    const serverMsg = err?.response?.data?.message || err?.response?.data || err.message || JSON.stringify(err);
    setError(serverMsg);
    console.error("Register error ->", err);
  }
};


  return (
    <div className="card">
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
