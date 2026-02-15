"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type TabType = "projects" | "services" | "tech";

const projects = [
  {
    id: 1,
    desc: "Merancang dan mengembangkan platform e-commerce fashion berbasis web dengan fokus pada UX dan performa aplikasi.",
    media: "/sneakersflashh.mp4",
    type: "video",
    link: "https://sneakersflash.com/",
  },
  {
    id: 2,
    desc: "Merancang dan mengembangkan website company profile untuk perusahaan logistik guna meningkatkan citra profesional.",
    media: "/kjmlogisticc.mp4",
    type: "video",
    link: "https://kjmlogistic.com/",
  },
  {
    id: 3,
    desc: "Merancang, mengembangkan, dan meluncurkan microsite redeem code untuk kebutuhan kampanye digital.",
    media: "/coaa.mp4",
    type: "video",
  },
  {
    id: 4,
    desc: "Merancang dan mendesain website company profile laboratorium PT Chemkit Multi Guna.",
    media: "/chemkit.mp4",
    type: "video",
    link: "https://chemkitmultiguna.com/",
  },
  {
    id: 5,
    desc: "Mengembangkan dan memelihara aplikasi shortlink dengan monitoring keamanan sistem.",
    media: "/shortlink.mp4",
    type: "video",
  },
  {
    id: 6,
    desc: "Mengembangkan sistem manajemen aset termasuk integrasi perangkat IoT.",
    media: "/mapu.mp4",
    type: "video",
  },
];

const techStack = [
  { id: 1, src: "/html.svg", name: "HTML" },
  { id: 2, src: "/css.svg", name: "CSS" },
  { id: 3, src: "/javascript.svg", name: "JavaScript" },
  { id: 4, src: "/reactjs.svg", name: "React JS" },
  { id: 5, src: "/nodejs.svg", name: "Node JS" },
  { id: 6, src: "/tailwind.svg", name: "Tailwind CSS" },
  { id: 7, src: "/vercel.svg", name: "Vercel" },
  { id: 8, src: "/php.svg", name: "PHP" },
  { id: 9, src: "/codeigniter.svg", name: "Code Igniter" },
  { id: 10, src: "/laravel.svg", name: "Laravel" },
  { id: 11, src: "/postgre.svg", name: "Postgresql" },
  { id: 12, src: "/typescript.svg", name: "Typescript" },
];

export default function Portfolio() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("projects");

  return (
    <section
      id="portfolio"
      className="relative scroll-mt-24 px-6 pt-20 pb-32 max-w-[1280px] mx-auto"
    >
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          Project Portfolio
        </h2>

        <p className="flex items-center justify-center gap-3 text-gray-400 mb-8">
          <span className="text-purple-400">✦</span>
          Selected projects I’ve worked on
          <span className="text-purple-400">✦</span>
        </p>

        {/* TAB MENU */}
        <div className="flex justify-center">
          <div className="flex gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
            {[
              { key: "projects", label: "Projects" },
              { key: "services", label: "Services" },
              { key: "tech", label: "Tech Stack" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabType)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    activeTab === tab.key
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => {
            const isActive = activeId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => setActiveId(isActive ? null : project.id)}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-colors cursor-pointer"
              >
                <div className="relative h-[420px] bg-black">
                  <video
                    src={project.media}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                </div>

                <div
                  className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-6 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 ${
                    isActive ? "opacity-100" : "opacity-0 md:opacity-0"
                  }`}
                >
                  <p className="text-gray-200 text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    {project.link && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, "_blank");
                        }}
                        className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
                      >
                        View App
                      </button>
                    )}

                    <Link
                      href={`/project/${project.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-lg bg-black/40 text-white text-sm font-medium border border-white/20 hover:bg-black/60 transition"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "services" && (
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Website Development (Company Profile, Landing Page, E-Commerce)",
              "Fullstack Web Application",
              "UI/UX Design (Figma)",
              "SEO Optimization",
              "Website Maintenance & Deployment",
              "REST API Development & Integration",
              "Database Design & Management",
              "Authentication & Authorization System",
              "Admin Dashboard & CMS Development",
              "Performance Optimization & Debugging",
              "Responsive & Mobile-First Development",
              "Third-Party API Integration",
              "Version Control & Team Collaboration (Git)",
              "Hosting Setup (VPS, Cloud, cPanel)",
              "Website Security & Performance Monitoring",
            ].map((service, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Number badge */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Animated line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-purple-400 w-0 group-hover:w-full transition-all duration-500" />

                <p className="text-gray-300 group-hover:text-white transition leading-relaxed">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === "tech" && (
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 justify-items-center">
          {techStack.map((tech) => (
            <div
              key={tech.id}
              className="
          group w-36 h-36
          bg-white/5 border border-white/10
          rounded-2xl
          flex flex-col items-center justify-center
          gap-3
          hover:border-purple-500/40
          hover:shadow-lg hover:shadow-purple-500/20
          transition-all duration-300
        "
            >
              <Image
                src={tech.src}
                alt={tech.name}
                width={55}
                height={55}
                className="opacity-80 group-hover:opacity-100 transition duration-300"
              />

              <p className="text-sm text-gray-400 group-hover:text-white transition duration-300">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
