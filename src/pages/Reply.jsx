import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { decodeData, encodeData } from "../utils/encode";

export default function Reply() {
  const { code } = useParams();
  const data = decodeData(code);

  const [replyLink, setReplyLink] = useState("");
  const [copied, setCopied] = useState(false);

  const reply = (msg) => {
    const newCode = encodeData({
      from: data.to,
      to: data.from,
      msg
    });

    const url = `${window.location.origin}/s/${newCode}`;
    setReplyLink(url);
    setCopied(false);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(replyLink);
    setCopied(true);
  };

  return (
    <div className="card">
      <h3>Reply to {data.from} 🧸</h3>

      <button onClick={() => reply("This made me smile 😊")}>
        This made me smile
      </button>

      <button onClick={() => reply("Thank you for thinking of me 💛")}>
        Thank you for thinking of me
      </button>

      <button onClick={() => reply("Sending a hug back 🫶")}>
        Sending a hug back
      </button>

      {replyLink && (
        <>
          <input value={replyLink} readOnly />
          <button onClick={copyLink}>
            {copied ? "Copied 💛" : "Copy Reply Link"}
          </button>
        </>
      )}
    </div>
  );
}
