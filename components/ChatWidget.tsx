"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "user" | "admin";
  message: string;
  created_at: string;
};

const getTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef<string>("");

  // ✅ Generate / load session
  useEffect(() => {
    const stored = localStorage.getItem("chat_session");
    if (stored) {
      sessionId.current = stored;
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem("chat_session", newId);
      sessionId.current = newId;
    }
  }, []);

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Fetch messages from DB
  const fetchMessages = async () => {
    if (!sessionId.current) return;

    const res = await fetch(`/api/messages?session_id=${sessionId.current}`);
    const data = await res.json();
    setMessages(data);
  };

  // ✅ Polling every 2 seconds when open
  useEffect(() => {
    if (open) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 2000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!name || !email) {
      alert("Mohon isi nama dan email terlebih dahulu.");
      return;
    }

    if (!input.trim()) return;

    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId.current,
        name,
        email,
        message: input,
      }),
    });

    setInput("");
    fetchMessages();
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50"
          >
            <span className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2">
              <Sparkles size={18} />
              <span className="text-sm font-semibold">Ask Idam</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 w-[340px] h-[520px] z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-[#0f172a]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-violet-700 to-indigo-700">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-white" />
                <span className="text-sm font-semibold text-white">
                  Idam AI
                </span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-gray-400 text-sm">
                  Halo! 👋 Silakan kirim pesan.
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`text-sm px-3.5 py-2.5 rounded-2xl max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700 text-gray-100"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1">
                    {getTime(msg.created_at)}
                  </span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Name + Email (first time only) */}
            {messages.length === 0 && (
              <div className="px-4 pb-2 space-y-2">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white text-sm"
                />
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 bg-[#111827]">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm"
              />
              <button
                onClick={sendMessage}
                className="p-2 rounded-lg bg-indigo-600"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
