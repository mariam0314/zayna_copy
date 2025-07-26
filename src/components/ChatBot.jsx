// === FILE: ChatBotWidget.jsx ===
import React, { useState } from "react";
import axios from "axios";

const ChatBotWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: input });
      const botMessage = { text: res.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { text: "Oops! Something went wrong.", sender: "bot" }]);
    }
  };

  return (
    <>
      {showChat && (
        <div className="fixed bottom-20 right-5 w-72 h-96 bg-black text-white rounded-2xl shadow-lg flex flex-col overflow-hidden z-[9999]">
          <div className="p-3 bg-gray-900 text-center font-bold">Guest Panel</div>
          <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user" ? "bg-gray-700 self-end" : "bg-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-700">
            <input
              type="text"
              value={input}
              placeholder="Type here..."
              className="flex-1 p-2 bg-gray-900 text-white outline-none"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="bg-gray-700 text-white px-4">
              Send
            </button>
          </div>
        </div>
      )}

      <button
        className="fixed bottom-5 right-5 bg-black text-white rounded-full w-12 h-12 text-2xl flex items-center justify-center z-[9999] shadow-lg"
        onClick={() => setShowChat(!showChat)}
      >
        💬
      </button>
    </>
  );
};

export default ChatBotWidget;

