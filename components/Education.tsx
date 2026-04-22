"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineEntry {
  period: string;
  title: string;
  place: string;
  desc: string;
  tag: string;
  active?: boolean;
}

interface TimelineItemProps {
  item: TimelineEntry;
  index: number;
  isExperience: boolean;
  isMobile: boolean;
  columnIndex: number;
}

interface ColumnProps {
  title: string;
  emoji: string;
  data: TimelineEntry[];
  isExperience: boolean;
  isMobile: boolean;
  columnIndex: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const educationData: TimelineEntry[] = [
  {
    period: "2021 – 2025",
    title: "Bachelor of Informatics",
    place: "Universitas Al Azhar Indonesia",
    desc: "Web development, software engineering, and system design. Structured programming, problem-solving, and scalable applications.",
    tag: "S.Kom",
  },
  {
    period: "2017 – 2020",
    title: "Vocational Diploma",
    place: "SMK Bina Informatika",
    desc: "Computer networks, LAN configuration, troubleshooting, server fundamentals. Cisco tools, Debian servers, VirtualBox.",
    tag: "TKJ",
  },
  {
    period: "2014 – 2017",
    title: "Junior High School",
    place: "SMP Muhammadiyah 8 Jakarta",
    desc: "Strong foundation in general studies and early exposure to technology.",
    tag: "SMP",
  },
];

const experienceData: TimelineEntry[] = [
  {
    period: "Jan 2025 – Present",
    title: "Web Developer",
    place: "Ministry of Public Works",
    desc: "Web-based systems for internal government operations — system optimization, data management, and application performance.",
    tag: "FULL-TIME",
    active: true,
  },
  {
    period: "Aug – Dec 2023",
    title: "Product Development",
    place: "PT. Uswah Salam Alazhar",
    desc: "Requirement analysis, feature implementation, collaboration with cross-functional teams for user-focused digital products.",
    tag: "INTERNSHIP",
  },
  {
    period: "Sep – Dec 2023",
    title: "IT Infrastructure",
    place: "PT. Perusahaan Perdagangan Indonesia",
    desc: "Network monitoring, hardware troubleshooting, and system maintenance for reliable and secure business operations.",
    tag: "INTERNSHIP",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── TimelineItem ─────────────────────────────────────────────────────────────

function TimelineItem({
  item,
  index,
  isMobile,
  columnIndex,
}: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const accentColor = "#a78bfa";
  const placeColor = "#c4b5fd";
  const xFrom = columnIndex === 0 ? -40 : 40;

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    gsap.set(dotRef.current, { scale: 0, opacity: 0 });
    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(periodRef.current, { opacity: 0, y: -8 });
    gsap.set(cardRef.current, { opacity: 0, x: xFrom, y: 10 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: "top 15%",
        toggleActions: "play reverse play reverse",
      },
      delay: index * 0.12,
    });

    tl.to(dotRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(2.5)",
    });
    tl.to(
      lineRef.current,
      { scaleY: 1, duration: 0.5, ease: "power2.out" },
      "-=0.1",
    );
    tl.to(
      periodRef.current,
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      "-=0.3",
    );
    tl.to(
      cardRef.current,
      { opacity: 1, x: 0, y: 0, duration: 0.55, ease: "power3.out" },
      "-=0.2",
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, [index, xFrom]);

  return (
    <div ref={itemRef} style={{ display: "flex" }}>
      {/* Dot + line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: "24px",
          marginRight: "16px",
        }}
      >
        <div
          ref={dotRef}
          style={{
            width: item.active ? "13px" : "9px",
            height: item.active ? "13px" : "9px",
            borderRadius: "50%",
            background: accentColor,
            border: item.active
              ? "2px solid rgba(167,139,250,0.6)"
              : "1.5px solid rgba(167,139,250,0.35)",
            marginTop: "4px",
            flexShrink: 0,
            zIndex: 1,
            boxShadow: item.active ? "0 0 10px rgba(167,139,250,0.6)" : "none",
          }}
        />
        <div
          ref={lineRef}
          style={{
            width: "1.5px",
            flex: 1,
            background:
              "linear-gradient(to bottom, rgba(167,139,250,0.25), transparent)",
            marginTop: "5px",
            minHeight: "32px",
          }}
        />
      </div>

      {/* Period + card */}
      <div style={{ flex: 1, paddingBottom: "24px", minWidth: 0 }}>
        <div
          ref={periodRef}
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: "8px",
            lineHeight: 1,
          }}
        >
          {item.period}
        </div>

        <div
          ref={cardRef}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(167,139,250,0.35)",
            borderRadius: "14px",
            padding: isMobile ? "14px" : "20px 22px",
            transition: "border-color 0.3s, background 0.3s",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "rgba(167,139,250,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(255,255,255,0.03)";
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "rgba(167,139,250,0.35)";
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: accentColor,
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}33`,
              borderRadius: "4px",
              padding: "2px 7px",
              marginBottom: "9px",
            }}
          >
            {item.tag}
          </div>

          <h4
            style={{
              fontSize: isMobile ? "15px" : "16px",
              fontWeight: 700,
              color: "#f1f5f9",
              margin: "0 0 3px",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            {item.title}
          </h4>
          <p
            style={{
              fontSize: "12.5px",
              color: placeColor,
              margin: "0 0 9px",
              fontWeight: 500,
            }}
          >
            {item.place}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(148,163,184,0.82)",
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Column ───────────────────────────────────────────────────────────────────

function Column({
  title,
  emoji,
  data,
  isExperience,
  isMobile,
  columnIndex,
}: ColumnProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.set(headingRef.current, { opacity: 0, y: 20 });
    gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 88%",
        end: "top 20%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <div>
      <div
        ref={headingRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "28px",
          opacity: 0,
        }}
      >
        <span style={{ fontSize: "20px" }}>{emoji}</span>
        <h3
          style={{
            fontSize: isMobile ? "20px" : "22px",
            fontWeight: 800,
            color: "#f1f5f9",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>
      </div>
      <div>
        {data.map((item, i) => (
          <TimelineItem
            key={i}
            item={item}
            index={i}
            isExperience={isExperience}
            isMobile={isMobile}
            columnIndex={columnIndex}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Education() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        y: 28,
      });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          end: "top 15%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 0.9,
          ease: "expo.out",
        },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative scroll-mt-24 px-4 sm:px-6 pt-14 md:pt-24 pb-12 max-w-[1280px] mx-auto"
    >
      {/* HEADER */}
      <div className="mb-14 md:mb-24 text-center relative z-10">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-purple-400 mb-4"
          style={{ opacity: 0 }}
        >
          Education & Experience
        </h2>
        <p
          ref={eyebrowRef}
          className="flex items-center justify-center gap-3 text-gray-400"
          style={{ opacity: 0 }}
        >
          <span className="text-purple-400">✦</span>
          Academic background & professional experience
          <span className="text-purple-400">✦</span>
        </p>
      </div>

      {/* COLUMNS */}
      <div
        className="relative z-10"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? "48px" : "56px 64px",
        }}
      >
        <Column
          title="My Education"
          emoji="🎓"
          data={educationData}
          isExperience={false}
          isMobile={isMobile}
          columnIndex={0}
        />
        <Column
          title="My Experience"
          emoji="💼"
          data={experienceData}
          isExperience={true}
          isMobile={isMobile}
          columnIndex={1}
        />
      </div>
    </section>
  );
}
