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

  /* ================= MESSAGE DATA ================= */

const maleMessages = {
  playful: {
    title: "😏 Playful & Confident",
    text: "You pretend you’re unaffected… but I know that quiet smile gave you away. Even the strongest men deserve to feel chosen, admired, and wanted. So here’s your rose 🌹 — and don’t act like you don’t love it."
  },

  deep: {
    title: "❤️ Deep & Emotional",
    text: "Behind your strength is a heart that carries more than it ever shows. You protect, you endure, you stay steady — and today, I want you to know you deserve love that feels safe, soft, and unwavering. This rose 🌹 is for the man who means more than words can say."
  },

  appreciation: {
    title: "👑 Appreciation",
    text: "You may not always hear it, but your presence matters. Your strength comforts. Your loyalty reassures. Your quiet sacrifices do not go unnoticed. Today isn’t just about romance — it’s about honoring the man you are. And that deserves a rose 🌹."
  }
};

const femaleMessages = {
  romantic: {
    title: "💖 Romantic & Soft",
    text: "You make the world softer just by being in it. Your laughter feels like warmth on a cold day, and your heart holds more love than you realize. Loving you isn’t just a feeling — it’s a blessing I cherish every day. 🌸"
  },

  poetic: {
    title: "🌷 Poetic & Sweet",
    text: "If beauty had a sound, it would echo your name. If grace had a form, it would look like you. You are the kind of soul that turns ordinary moments into magic. Today, these flowers 🌷 are just a small reflection of the light you bring into this world."
  },

  playful: {
    title: "💕 Playful & Cute",
    text: "You act surprised… but deep down, you knew someone would adore you this much. The way you smile, the way you care, the way you exist — it’s impossible not to fall a little deeper every day. 💕"
  }
};


  const messages =
    gender === "male"
      ? maleMessages
      : gender === "female"
      ? femaleMessages
      : {};

  /* ================= HANDLE MESSAGE SELECT ================= */

  const handleSelect = (value) => {
    setSelectedKey(value);

    if (value === "custom") {
      setModalMsg("");
      setShowModal(true);
    } else if (messages[value]) {
      setModalMsg(messages[value].text);
      setShowModal(true);
    }
  };

  /* ================= GENERATE LINK ================= */

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

        {/* To Him / To Her */}
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

        {/* Message Style Dropdown */}
        {gender && (
          <>
            <label style={{ fontSize: "14px" }}>
              Choose Message Style:
            </label>

            <select
              className="rose-input"
              value={selectedKey}
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="">Select a style</option>

              {Object.entries(messages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.title}
                </option>
              ))}

              <option value="custom">✍️ Custom Message</option>
            </select>
          </>
        )}

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

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Your Message 💌</h3>

            <textarea
              rows="5"
              value={modalMsg}
              onChange={(e) => setModalMsg(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="rose-btn"
                onClick={() => setShowModal(false)}
              >
                Done 🌹
              </button>

              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  setSelectedKey("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* ================= FOOTER ================= */}
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
