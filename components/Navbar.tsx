"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const MENU = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-[9999] w-full">
      <div className="w-full bg-gradient-to-r from-[#14062B] via-[#1a0f2e] to-[#14062B]">
        {/* DESKTOP NAVBAR */}
        <nav className="h-20 px-6 md:px-12 hidden md:grid grid-cols-3 items-center">
          {/* LEFT — NAMA */}
          <div className="flex items-center gap-3">
            <Image
              src="/logoidam.svg"
              alt="Logo Idam"
              width={32}
              height={32}
              className="object-contain"
            />

            <span className="text-sm font-semibold text-white">
              Idam Palada
            </span>
          </div>

          {/* CENTER — MENU */}
          <ul className="flex justify-center items-center gap-10 list-none text-sm text-gray-200">
            {MENU.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="
                    relative
                    transition-colors
                    hover:text-white
                    after:absolute after:left-0 after:-bottom-2
                    after:h-[2px] after:w-0 after:bg-purple-500
                    after:transition-all after:duration-300
                    hover:after:w-full
                  "
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT — HIRE ME */}
          <div className="flex justify-end">
            <Link
              href="#contact"
              className="
                relative inline-flex items-center justify-center
                px-8 py-3 rounded-full
                text-sm font-medium text-white
                overflow-hidden group
              "
            >
              {/* GRADIENT NORMAL */}
              <span
                className="
                  absolute inset-0
                  bg-gradient-to-r from-purple-600 to-fuchsia-600
                  transition-opacity duration-300
                  group-hover:opacity-0
                "
              />

              {/* GRADIENT HOVER */}
              <span
                className="
                  absolute inset-0
                  bg-gradient-to-r from-fuchsia-500 to-purple-700
                  opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
              />

              <span className="relative z-10">Hire me!</span>
            </Link>
          </div>
        </nav>

        {/* MOBILE NAVBAR */}
        <nav className="h-16 px-6 flex md:hidden items-center justify-between relative z-[10000]">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <Image
              src="/logoidam.svg"
              alt="Logo Idam"
              width={28}
              height={28}
              className="object-contain"
            />

            <span className="text-sm font-semibold text-white">
              Idam Palada
            </span>
          </div>

          {/* HAMBURGER BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[10001] w-10 h-10 flex flex-col items-center justify-center gap-1.5 touch-manipulation active:scale-95 transition-transform"
            aria-label="Toggle menu"
            type="button"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`
          fixed inset-0 md:hidden z-[9998]
          bg-gradient-to-b from-[#14062B] via-[#1a0f2e] to-[#C27AFF]/20
          transition-all duration-500 ease-in-out
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      >
        <div className="relative h-full flex flex-col pt-20 px-8">
          {/* NAMA DI MENU */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#C27AFF] to-fuchsia-400 bg-clip-text text-transparent">
              Idam Palada
            </h2>
          </div>

          {/* MENU ITEMS */}
          <nav className="flex-1">
            <ul className="space-y-6">
              {MENU.map((item, index) => (
                <li
                  key={item.label}
                  className={`
                    transform transition-all duration-500
                    ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                    }
                  `}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      block text-xl font-medium
                      transition-colors duration-300
                      ${
                        item.label === "Home"
                          ? "text-[#C27AFF]"
                          : "text-white hover:text-[#C27AFF]"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* BOTTOM SECTION */}
          <div
            className={`
              pb-8 space-y-6
              transform transition-all duration-500 delay-300
              ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            `}
          >
            {/* DESCRIPTION */}
            <p className="text-sm text-gray-400 leading-relaxed">
              deploying intuitive, fast, and future-ready web applications,
              while also possessing strong expertise in UI/UX Design, Photo &
              Video Editing, and Graphic Design.
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <Link
                href="#portfolio"
                onClick={() => setIsOpen(false)}
                className="
                  flex-1 px-6 py-3 rounded-lg
                  bg-[#C27AFF]/10 border border-[#C27AFF]
                  text-white text-sm font-medium text-center
                  hover:bg-[#C27AFF]/20
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                Projects
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="
                  flex-1 px-6 py-3 rounded-lg
                  bg-[#C27AFF]/10 border border-[#C27AFF]
                  text-white text-sm font-medium text-center
                  hover:bg-[#C27AFF]/20
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                Contact
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10 rounded-full
                  bg-[#C27AFF]/10 border border-[#C27AFF]/30
                  flex items-center justify-center
                  text-white hover:bg-[#C27AFF]/20
                  transition-all duration-300
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10 rounded-full
                  bg-[#C27AFF]/10 border border-[#C27AFF]/30
                  flex items-center justify-center
                  text-white hover:bg-[#C27AFF]/20
                  transition-all duration-300
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10 rounded-full
                  bg-[#C27AFF]/10 border border-[#C27AFF]/30
                  flex items-center justify-center
                  text-white hover:bg-[#C27AFF]/20
                  transition-all duration-300
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
