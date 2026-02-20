"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const remove = setTimeout(() => {
      setLoading(false);
    }, 2600);

    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, []);

  return (
    <>
      {/* ================= WELCOME SCREEN ================= */}
      {loading && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#14062B] overflow-hidden transition-all duration-1000 ${
            fadeOut ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}
        >
          {/* BACKGROUND GLOW */}
          <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />

          {/* CONTENT */}
          <div
            className={`relative text-center transition-all duration-1000 ${
              fadeOut ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wide">
              Idam Palada
            </h1>

            <p className="text-purple-400 mt-4 text-lg tracking-[0.3em]">
              FULLSTACK DEVELOPER
            </p>

            <div className="mt-8 w-20 h-[2px] bg-purple-500 mx-auto animate-pulse" />
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      {!loading && (
        <>
          <Navbar />
          <main className="bg-[#14062B] text-white pt-20">
            <Hero />
            <About />
            <Education />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
          <ChatWidget /> {/* Tambahkan ini */}
        </>
      )}
    </>
  );
}
