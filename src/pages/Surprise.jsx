import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { decodeData } from "../utils/encode";

import pinkBg from "../assets/valent2.webp";
import redBg from "../assets/valent3.jpg";
import teddy from "../assets/happy-valentine.gif";

export default function Surprise() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { from, to, msg, gender } = decodeData(code);

  const [step, setStep] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [openEnvelope, setOpenEnvelope] = useState(false);

  const isMale = gender === "male";

  /* ================= Typing Effect (Male) ================= */
  useEffect(() => {
    if (openEnvelope && isMale) {
      setTypedText("");
      let index = 0;

      const interval = setInterval(() => {
        setTypedText((prev) => prev + msg.charAt(index));
        index++;
        if (index >= msg.length) clearInterval(interval);
      }, 35);

      return () => clearInterval(interval);
    }
  }, [openEnvelope, isMale, msg]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied 💕");
  };

  const closePage = () => navigate("/");

  return (
    <div
      className={isMale ? "red-container" : "pink-container"}
      style={{
        backgroundImage: `url(${isMale ? redBg : pinkBg})`,
      }}
    >
      {/* Floating Roses */}
      <div className="floating-roses">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
          
          </span>
        ))}
      </div>

      {/* ================= FEMALE FLOW ================= */}
      {!isMale && (
        <>
          {step === 1 && (
            <div className="cute-card animated">
              <img src={teddy} alt="teddy" className="teddy-img" />
              <h2>Hey {to} 💕</h2>
              <p>Something magical is waiting for you ✨</p>
              <button
                className="pink-btn"
                onClick={() => setStep(2)}
              >
                Reveal 💖
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="reveal-wrapper">
              <div className="reveal-card-pink paradise-card">
                <h2>Happy Valentine’s Day {to}! 💝</h2>

                <div className="message-box-pink glow-soft">
                  <p>“{msg}”</p>
                </div>

                <p className="signature">
                  — With love, <b>{from}</b> 🌸
                </p>
              </div>

              <div className="action-buttons">
                <button className="pink-btn" onClick={copyLink}>
                  Copy Link 🔗
                </button>
                <button className="pink-btn" onClick={closePage}>
                  Close ❌
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= MALE FLOW ================= */}
      {isMale && (
        <div className="red-wrapper">
          {!openEnvelope && (
            <div className="red-card envelope-card">
              <h2>{to}, this is for you ❤️</h2>

              <div
                className="envelope"
                onClick={() => setOpenEnvelope(true)}
              >
                <h1>💌</h1>
              </div>

              <p>Click the envelope to open it.</p>
            </div>
          )}

          {openEnvelope && (
            <>
              <div className="red-card paradise-card">
                <h2>Happy Valentine’s Day {to} ❤️</h2>

                <div className="message-box-red glow-red">
                  <p>“{typedText}”</p>
                </div>

                <p className="signature">
                  — With love, <b>{from}</b> 🌹
                </p>
              </div>

              <div className="action-buttons">
                <button className="red-btn" onClick={copyLink}>
                  Copy Link 🔗
                </button>
                <button className="red-btn" onClick={closePage}>
                  Close ❌
                </button>
              </div>
            </>
          )}
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
