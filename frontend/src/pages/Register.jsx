// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) return "Please enter a valid email";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleChange = (e) => {
    setError("");
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const clientErr = validate();
    if (clientErr) {
      setError(clientErr);
      return;
    }

    setLoading(true);
    try {
      // debug: show which baseURL is used
      console.log("API baseURL:", API.defaults.baseURL || import.meta.env.VITE_API_URL);

      const res = await API.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      // If backend returns token/user, you can optionally store or rely on cookie
      console.log("Register response:", res.data);

      // navigate to dashboard after successful register
      navigate("/dashboard");
    } catch (err) {
      // Normalize server error message
      const serverMsg =
        err?.response?.data?.message ||
        (err?.response?.data && JSON.stringify(err.response.data)) ||
        err?.normalizedMessage ||
        err?.message ||
        "Registration failed";
      setError(serverMsg);
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 520, margin: "24px auto" }}>
      <h2 className="h2">Register</h2>

      {error && (
        <div style={{ color: "var(--danger)", marginTop: 10 }}>
          {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: 14 }}>
        <label>Name</label>
        <input
          name="name"
          className="input"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label style={{ marginTop: 8 }}>Email</label>
        <input
          name="email"
          className="input"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label style={{ marginTop: 8 }}>Password</label>
        <input
          name="password"
          className="input"
          type="password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={handleChange}
          required
        />

        <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Registering…" : "Register"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/login")}
            style={{ marginLeft: 8 }}
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
}
