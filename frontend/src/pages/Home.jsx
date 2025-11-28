import React from "react";

export default function Home() {
  return (
    <main className="home-hero">
      <div className="home-container">
        <section className="hero-card">
          <div className="hero-left">
            <h1 className="hero-title">Welcome to Task App</h1>
            <p className="hero-sub">
              A simple, focused place to create tasks, track progress and ship work faster.
              Clean UI, secure auth, and a lightweight API — built for learning and shipping.
            </p>

            <ul className="hero-features" aria-hidden>
              <li>✔ Create & update tasks </li>
              <li>✔ Secure authentication with JWT & hashed passwords</li>
              <li>✔ Responsive UI that works on phone and desktop</li>
            </ul>
          </div>

          <div className="hero-right" aria-hidden>
            <svg viewBox="0 0 220 220" className="hero-illustration" xmlns="http://www.w3.org/2000/svg" role="img">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="200" height="200" rx="20" fill="url(#g1)" opacity="0.12" />
              <g transform="translate(30,36)">
                <rect width="140" height="18" rx="6" fill="#fff" opacity="0.95" />
                <rect y="36" width="90" height="12" rx="6" fill="#fff" opacity="0.8" />
                <rect y="60" width="120" height="12" rx="6" fill="#fff" opacity="0.8" />
                <rect y="90" width="110" height="12" rx="6" fill="#fff" opacity="0.6" />
                <circle cx="112" cy="9" r="8" fill="#fff" opacity="0.95" />
                <rect x="0" y="120" width="140" height="36" rx="8" fill="#fff" opacity="0.95" />
                <text x="12" y="145" fontSize="12" fill="#111">New Task</text>
              </g>
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
}
