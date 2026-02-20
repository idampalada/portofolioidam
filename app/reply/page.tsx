"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  session_id: string;
  name: string;
  email: string;
  sender: string;
  message: string;
  created_at: string;
};

type Session = {
  session_id: string;
  name: string;
};

export default function ReplyPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState("");

  // 🔥 Fetch Sessions
  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("session_id, name, sender, created_at")
      .eq("sender", "user") // ✅ hanya ambil dari user
      .not("session_id", "is", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      const uniqueMap = new Map<string, Session>();

      data.forEach((item) => {
        if (!item.session_id) return;

        if (!uniqueMap.has(item.session_id)) {
          uniqueMap.set(item.session_id, {
            session_id: item.session_id,
            name: item.name || "Unknown User",
          });
        }
      });

      setSessions(Array.from(uniqueMap.values()));
    }
  };

  // 🔥 Fetch Messages
  const fetchMessages = async (sessionId: string) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (data) setMessages(data);
  };

  // 🔥 Auto load sessions every 3s
  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Auto load messages every 2s
  useEffect(() => {
    if (!selectedSession) return;

    fetchMessages(selectedSession);

    const interval = setInterval(() => {
      fetchMessages(selectedSession);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedSession]);

  const sendReply = async () => {
    if (!replyText.trim() || !selectedSession) return;

    await supabase.from("messages").insert([
      {
        session_id: selectedSession,
        name: "Idam",
        sender: "admin",
        message: replyText,
      },
    ]);

    setReplyText("");
    fetchMessages(selectedSession);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-700 p-4">
        <h2 className="font-bold mb-4">Chats</h2>

        {sessions.map((session) => (
          <div
            key={session.session_id}
            onClick={() => setSelectedSession(session.session_id)}
            className={`cursor-pointer p-3 rounded mb-2 transition ${
              selectedSession === session.session_id
                ? "bg-indigo-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <div className="font-semibold">{session.name}</div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-md p-3 rounded-lg ${
                msg.sender === "admin" ? "bg-indigo-600 ml-auto" : "bg-gray-700"
              }`}
            >
              <div className="text-sm">{msg.message}</div>
              <div className="text-xs opacity-60 mt-1">
                {new Date(msg.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {selectedSession && (
          <div className="p-4 border-t border-gray-700 flex gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type reply..."
              className="flex-1 bg-gray-800 px-3 py-2 rounded"
            />
            <button
              onClick={sendReply}
              className="bg-indigo-600 px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
