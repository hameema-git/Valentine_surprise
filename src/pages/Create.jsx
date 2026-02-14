import React, { useState } from "react";
import { encodeData } from "../utils/encode";

export default function Create() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [gender, setGender] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!from || !to || !gender || !modalMsg) {
      alert("Please complete all fields 💌");
      return;
    }

    const code = encodeData({
      from,
      to,
      msg: modalMsg,
      gender,
    });

    const url = `${window.location.origin}/s/${code}`;
    setLink(url);
    setCopied(false);
  };

  return (
    <div className="rose-container">
      <div className="rose-content">
        <div className="rose-card">
          <h2 className="brand">Create Your Moment 🌹</h2>

          <input
            className="rose-input"
            placeholder="Your Name"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <input
            className="rose-input"
            placeholder="Receiver Name"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <select
            className="rose-input"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setSelectedKey("");
              setModalMsg("");
            }}
          >
            <option value="">Send this to...</option>
            <option value="female">To Her 💖</option>
            <option value="male">To Him ❤️</option>
          </select>

          <button className="rose-btn" onClick={generate}>
            Generate Link ✨
          </button>

          {link && (
            <>
              <input className="rose-input" value={link} readOnly />

              <button
                className="rose-btn"
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  setCopied(true);
                }}
              >
                {copied ? "Copied 🌹" : "Copy Link"}
              </button>
            </>
          )}
        </div>
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

