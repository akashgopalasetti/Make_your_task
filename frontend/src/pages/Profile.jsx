import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    password: "",
    profilePic: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        password: "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      setMessage("Profile updated successfully!");
      setForm({ ...form, password: "" });
    } catch (err) {
      setMessage("Failed to update.");
    }
  };

  return (
    <div className="card">
      <h2>Your Profile</h2>

      <div style={{ marginTop: "18px", display: "flex", gap: "20px" }}>
        <div>
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {form.profilePic ? (
              <img
                src={form.profilePic}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span>No image</span>
            )}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <label>Change Password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter new password (optional)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label>Profile Picture URL</label>
            <input
              className="input"
              placeholder="https://example.com/pic.jpg"
              value={form.profilePic}
              onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
            />

            <button className="btn btn-primary" style={{ marginTop: "10px" }}>
              Save Changes
            </button>
          </form>

          {message && <p style={{ color: "green", marginTop: "12px" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
