"use client";

import Link from "next/link";

const MENU = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="w-full bg-gradient-to-r from-[#0b0614] via-[#1a0f2e] to-[#0b0614]">
        {/* FULL WIDTH GRID */}
        <nav className="h-20 px-12 grid grid-cols-3 items-center">
          {/* LEFT — NAMA */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-purple-400">Ϟ</span>
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
      </div>
    </header>
  );
}
