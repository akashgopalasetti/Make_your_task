import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-inner">

        <div className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            TaskApp
          </Link>
        </div>

        <div className="nav-links">

          <Link to="/">Home</Link>


          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <button
                onClick={logout}
                className="btn btn-ghost"
                style={{ padding: "6px 10px", border: "none", cursor: "pointer" }}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}
