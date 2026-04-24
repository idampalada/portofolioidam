"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

type Message = {
  id: string;
  sender: "user" | "admin";
  message: string;
  created_at: string;
};

const getTime = (date: string) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevMsgCount = useRef(0);

  // ── SESSION ──
  useEffect(() => {
    const storedSession = localStorage.getItem("chat_session");
    const storedName = localStorage.getItem("chat_name");
    const storedEmail = localStorage.getItem("chat_email");

    if (storedSession) {
      sessionId.current = storedSession;
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem("chat_session", newId);
      sessionId.current = newId;
    }

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // ── BUTTON PULSE LOOP ──
  useEffect(() => {
    if (!buttonRef.current || open) return;
    const ctx = gsap.context(() => {
      gsap.to(buttonRef.current, {
        boxShadow: "0 0 0 12px rgba(124,58,237,0)",
        duration: 1.4,
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 1.2,
        onRepeat: () => {
          gsap.set(buttonRef.current, {
            boxShadow: "0 0 0 0px rgba(124,58,237,0.6)",
          });
        },
      });
    });
    return () => ctx.revert();
  }, [open]);

  // ── BUTTON MAGNETIC HOVER ──
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    gsap.to(e.currentTarget, {
      x: dx,
      y: dy,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1,0.5)",
    });
  };

  // ── SCROLL LOGIC ──
  // Flag: apakah sudah pernah scroll ke bawah saat buka
  const hasScrolledOnOpen = useRef(false);

  // Reset flag saat chat ditutup
  useEffect(() => {
    if (!open) {
      hasScrolledOnOpen.current = false;
    }
  }, [open]);

  // Saat messages berubah:
  // - Jika belum pernah scroll sejak buka → scroll ke bawah sekali (initial)
  // - Jika sudah → hanya scroll kalau user memang lagi di dekat bawah
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !open) return;

    if (!hasScrolledOnOpen.current) {
      // Initial open: scroll ke bawah hanya kalau sudah ada messages
      // kalau messages masih kosong, tunggu sampai fetch selesai
      if (messages.length > 0) {
        el.scrollTop = el.scrollHeight;
        hasScrolledOnOpen.current = true;
      }
    } else {
      // Pesan baru: hanya scroll kalau user dekat bawah (< 80px)
      const isNearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 80;
      if (isNearBottom) el.scrollTop = el.scrollHeight;
    }
  }, [messages, typing, open]);

  // ── UNREAD BADGE when closed ──
  useEffect(() => {
    if (!open && messages.length > prevMsgCount.current) {
      setUnread((u) => u + (messages.length - prevMsgCount.current));
    }
    prevMsgCount.current = messages.length;
  }, [messages, open]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  // ── FETCH MESSAGES ──
  const fetchMessages = async () => {
    if (!sessionId.current) return;
    try {
      const res = await fetch(`/api/messages?session_id=${sessionId.current}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ── POLLING ──
  useEffect(() => {
    if (!open) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [open]);

  // ── SEND MESSAGE ──
  const sendMessage = async () => {
    if ((!name || !email) && messages.length === 0) {
      alert("Mohon isi nama dan email terlebih dahulu.");
      return;
    }
    if (!input.trim()) return;

    const messageText = input;
    setInput("");
    setTyping(true);

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId.current,
          name,
          email,
          message: messageText,
        }),
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => setTyping(false), 1500);
  };

  return (
    <>
      <style>{`
        @keyframes cwPulseRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .cw-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(124,58,237,0.4);
          animation: cwPulseRing 2s ease-out infinite;
          pointer-events: none;
        }
        .cw-pulse-ring-2 {
          animation-delay: 0.7s;
        }
        @keyframes cwDotBlink {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.4; transform: scale(0.6); }
        }
        .cw-typing-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          animation: cwDotBlink 1.2s ease-in-out infinite;
        }
        .cw-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .cw-typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* ── FLOATING BUTTON ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button
              ref={buttonRef}
              onClick={() => setOpen(true)}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              className="relative"
              style={{ borderRadius: 9999 }}
            >
              {/* pulse rings */}
              <span className="cw-pulse-ring" />
              <span className="cw-pulse-ring cw-pulse-ring-2" />

              <span className="relative bg-gradient-to-br from-violet-600 to-indigo-700 text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 z-10">
                <Sparkles size={18} />
                <span className="text-sm font-semibold">Ask Idam</span>

                {/* unread badge */}
                {unread > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                  >
                    {unread}
                  </motion.span>
                )}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CHAT WINDOW ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="lenis-prevent fixed bottom-6 right-6 w-[340px] h-[520px] z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "#0f172a",
              boxShadow:
                "0 0 0 1px rgba(124,58,237,0.2), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.12)",
            }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-violet-700 to-indigo-700 relative overflow-hidden">
              {/* header shimmer */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                  animation: "cwHeaderShimmer 4s ease infinite",
                }}
              />
              <style>{`
                @keyframes cwHeaderShimmer {
                  0%   { transform: translateX(-100%); }
                  40%  { transform: translateX(200%); }
                  100% { transform: translateX(200%); }
                }
              `}</style>

              <div className="flex items-center gap-2 z-10">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                >
                  <Bot size={18} className="text-white" />
                </motion.div>
                <span className="text-sm font-semibold text-white">
                  Idam AI
                </span>

                {/* online dot */}
                <span className="flex items-center gap-1 ml-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    style={{ animation: "cwDotBlink 2s ease infinite" }}
                  />
                  <span className="text-[10px] text-green-300 font-medium">
                    Online
                  </span>
                </span>
              </div>

              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ rotate: 90, scale: 1.15 }}
                transition={{ duration: 0.2 }}
                className="z-10"
              >
                <X size={18} className="text-white" />
              </motion.button>
            </div>

            {/* MESSAGE AREA */}
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 text-sm leading-relaxed"
                >
                  Halo! 👋 <br />
                  Saya <b className="text-purple-300">Idam AI</b>. Silakan tanya
                  tentang portfolio, project, atau skill saya.
                </motion.div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`text-sm px-3.5 py-2.5 rounded-2xl max-w-[80%] ${
                        msg.sender === "user"
                          ? "bg-indigo-600 text-white rounded-br-sm"
                          : "bg-gray-700 text-gray-100 rounded-bl-sm"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1">
                      {getTime(msg.created_at)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* TYPING INDICATOR */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-gray-700 w-fit"
                  >
                    <span className="cw-typing-dot" />
                    <span className="cw-typing-dot" />
                    <span className="cw-typing-dot" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* NAME EMAIL */}
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-2 space-y-2"
                >
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      localStorage.setItem("chat_name", e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white text-sm border border-transparent focus:border-violet-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      localStorage.setItem("chat_email", e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white text-sm border border-transparent focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* INPUT */}
            <div className="flex items-center gap-2 px-3 py-3 bg-[#111827] border-t border-white/5">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm border border-transparent focus:border-violet-500 focus:outline-none transition-colors"
              />

              <motion.button
                onClick={sendMessage}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                disabled={!input.trim()}
                className="p-2 rounded-lg bg-indigo-600 disabled:opacity-40 transition-opacity"
              >
                <Send size={16} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
