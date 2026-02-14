"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetail({ params }: PageProps) {
  const slides = [
    { type: "video", src: "/sneakersflashh.mp4" },
    { type: "image", src: "/sneakersflash/halamanawall.png" },
    { type: "image", src: "/sneakersflash/halamanproduk.png" },
    { type: "image", src: "/sneakersflash/produk.png" },
    { type: "image", src: "/sneakersflash/calculateongkir.png" },
    { type: "image", src: "/sneakersflash/cart.png" },
    { type: "image", src: "/sneakersflash/payment.png" },
    { type: "image", src: "/sneakersflash/livetracking.png" },
    { type: "image", src: "/sneakersflash/points.png" },
    { type: "image", src: "/sneakersflash/productadmin.png" },
    { type: "image", src: "/sneakersflash/order.png" },
    { type: "image", src: "/sneakersflash/bannerr.png" },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const nextSlide = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + slides.length) % slides.length);
  };

  // 🔥 KEYBOARD CONTROL
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") {
        nextSlide();
      }

      if (e.key === "ArrowLeft") {
        prevSlide();
      }

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="min-h-screen px-6 py-32 max-w-[1280px] mx-auto text-white">
      {/* BREADCRUMB */}
      <div className="mb-10 flex items-center gap-4 text-sm text-gray-400">
        <Link
          href="/#portfolio"
          className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          ← Back
        </Link>

        <span>Projects</span>
        <span>›</span>
        <span className="text-white">Website E-Commerce – Sneakers Flash</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT CONTENT (TIDAK DIUBAH) */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#F3C6D3]">
            Website E-Commerce <br />
            Sneakers Flash
          </h1>

          <p className="text-gray-400 leading-relaxed mb-10">
            Merancang dan mengembangkan platform e-commerce fashion berbasis web
            untuk penjualan produk sneakers secara end-to-end. Sistem dirancang
            untuk mendukung proses bisnis mulai dari manajemen produk,
            perhitungan ongkos kirim otomatis, integrasi payment gateway, hingga
            pelacakan pesanan dan pengelolaan stok secara realtime lintas
            platform.
          </p>

          <div className="flex gap-6 mb-10">
            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-bold">4</p>
              <p className="text-sm text-gray-400">Total Teknologi</p>
            </div>

            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-bold">10</p>
              <p className="text-sm text-gray-400">Fitur Utama</p>
            </div>
          </div>

          <div className="flex gap-4 mb-16">
            <a
              href="#"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition"
            >
              Live Demo
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="text-purple-400">&lt;/&gt;</span>
              Technologies Used
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Laravel",
                "PHP",
                "PostCSS",
                "JavaScript (Vanilla)",
                "Vite",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-purple-500/40 transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-10">
          <div
            onClick={() => setSelectedIndex(0)}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-black cursor-pointer group"
          >
            <video
              src="/sneakersflashh.mp4"
              className="w-full h-full object-cover group-hover:opacity-80 transition"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm">Click to Preview</span>
            </div>
          </div>

          {/* KEY FEATURES (TETAP) */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="text-yellow-400">★</span>
              Key Features
            </h2>

            <ul className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="text-pink-400 mt-1">•</span>
                Report & Analytics for monitoring sales performance
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 mt-1">•</span>
                Voucher, Promo Management, and campaign system
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 mt-1">•</span>
                Payment Gateway Integration
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 mt-1">•</span>
                Shipping & Courier Integration (automatic shipping cost
                calculation, order tracking, pickup requests, and label
                generation)
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 mt-1">•</span>
                Multi-Platform Stock Management synchronized in real-time with
                marketplaces such as Tokopedia, Shopee, and TikTok Shop
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white bg-white/10 px-4 py-2 rounded-lg"
          >
            Close
          </button>

          <button
            onClick={prevSlide}
            className="absolute left-6 text-4xl text-white"
          >
            ‹
          </button>

          {slides[selectedIndex].type === "video" ? (
            <video
              src={slides[selectedIndex].src}
              controls
              autoPlay
              className="max-h-[85vh] rounded-2xl"
            />
          ) : (
            <Image
              src={slides[selectedIndex].src}
              alt="Preview"
              width={1200}
              height={800}
              className="max-h-[85vh] object-contain rounded-2xl"
            />
          )}

          <button
            onClick={nextSlide}
            className="absolute right-6 text-4xl text-white"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
