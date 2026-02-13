import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/valent.jpg";

export default function Home() {
  return (
    <div
      className="rose-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="rose-card">
        <h1 className="brand">HeartScript 💖</h1>

        <p className="tagline">
          Create a beautiful surprise message and share it with someone
          special. A small link. A big smile. 🌹
        </p>

        <Link to="/create">
          <button className="rose-btn">
            Create Your Surprise ✨
          </button>
        </Link>
      </div>

      <footer className="rose-footer">
        Developed by <strong>Code Leaf</strong> |{" "}
        <a
          href="https://codeleaf.co.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          codeleaf.co.in
        </a>
      </footer>
    </div>
  );
}
