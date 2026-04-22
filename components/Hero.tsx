"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Github, Linkedin, Instagram, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const texts = ["Fullstack Developer", "Backend Engineer", "UI/UX Design"];
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const hiTextRef = useRef<HTMLSpanElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  /* ── TYPING EFFECT ── */
  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 1500;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        if (displayedText === currentText)
          setTimeout(() => setIsDeleting(true), pauseTime);
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setTextIndex((p) => (p + 1) % texts.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  /* ── COUNTER ── */
  const animateCounters = () => {
    document
      .querySelectorAll<HTMLElement>(".hero-stat-number")
      .forEach((el) => {
        const raw = el.dataset.target ?? "0";
        const isPercent = raw.includes("%");
        const target = parseInt(raw);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (isPercent ? "%" : "+");
          },
        });
      });
  };

  /* ── GSAP ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── above-fold entrance (no scrollTrigger) ──
      gsap.set([greetingRef.current, descRef.current], { opacity: 0, y: 24 });
      gsap.set(nameRef.current, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
      gsap.set(typingRef.current, { opacity: 0, y: 16 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(imageCardRef.current, { opacity: 0, x: 60, rotateY: 15 });
      gsap.set(hiTextRef.current, { opacity: 0, scale: 1.3 });
      gsap.set(".hero-social-icon", { opacity: 0, scale: 0.5, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(
        hiTextRef.current,
        { opacity: 1, scale: 1, duration: 1.4, ease: "expo.out" },
        0,
      );
      tl.to(
        [glow1Ref.current, glow2Ref.current],
        { opacity: 1, duration: 2 },
        0.1,
      );
      tl.to(greetingRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.4);
      tl.to(
        nameRef.current,
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "expo.out",
        },
        0.7,
      );
      tl.to(typingRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.0);
      tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.2);
      tl.to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
        1.4,
      );
      tl.to(
        imageCardRef.current,
        { opacity: 1, x: 0, rotateY: 0, duration: 1.1, ease: "expo.out" },
        0.6,
      );
      tl.to(
        ".hero-social-icon",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.45,
          ease: "back.out(2)",
        },
        1.55,
      );

      // ── bottom section: REPEATING scroll trigger ──
      gsap.set([bottomTextRef.current, statsRef.current, clientsRef.current], {
        opacity: 0,
        y: 20,
      });

      gsap.to(bottomTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottomTextRef.current,
          start: "top 88%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 88%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
          onEnter: animateCounters,
          onEnterBack: animateCounters,
        },
      });

      gsap.to(clientsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: {
          trigger: clientsRef.current,
          start: "top 88%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      // ── floating image loop ──
      gsap.to(imageCardRef.current, {
        y: -10,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });

      // ── glow parallax scrub ──
      gsap.to(glow1Ref.current, {
        y: -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(glow2Ref.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── MAGNETIC HOVER ── */
  const handleImgMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.to(imageCardRef.current, {
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.05,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.05,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleImgMouseLeave = () => {
    gsap.to(imageCardRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1,0.5)",
    });
  };

  return (
    <>
      <style>{`.hero-social-icon{opacity:0}.hero-cv-btn:hover{background:rgba(157,128,200,0.12)!important}`}</style>

      <section
        id="hero"
        ref={sectionRef}
        className="relative md:min-h-screen overflow-hidden"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#16082b] to-[#14062B]" />
          <div
            ref={glow1Ref}
            className="hidden md:block absolute top-1/2 right-[20%] -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-600/15 rounded-full blur-[150px]"
            style={{ opacity: 0 }}
          />
          <div
            ref={glow2Ref}
            className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"
            style={{ opacity: 0 }}
          />
        </div>

        {/* "HI" BG TEXT */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none overflow-hidden">
          <span
            ref={hiTextRef}
            className="text-[200px] md:text-[280px] lg:text-[380px] font-bold tracking-tighter select-none leading-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.03)",
              opacity: 0,
            }}
          >
            HI
          </span>
        </div>

        {/* CONTENT */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-64px)] pt-8 md:pt-0">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-6 z-10 text-center lg:text-left">
              <p
                ref={greetingRef}
                className="text-purple-400 mb-3 md:mb-4 text-sm font-medium tracking-wide"
                style={{ opacity: 0 }}
              >
                Hi, I'm
              </p>

              <h1
                ref={nameRef}
                className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-2 md:mb-3 text-white"
                style={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              >
                Idam Palada
              </h1>

              <h2
                ref={typingRef}
                className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 mb-6 md:mb-8"
                style={{ opacity: 0 }}
              >
                {displayedText}
                <span className="md:animate-pulse text-purple-300">|</span>
              </h2>

              <p
                ref={descRef}
                className="text-gray-400 max-w-[520px] mx-auto lg:mx-0 text-sm md:text-base leading-relaxed mb-8 md:mb-10 px-4 md:px-0"
                style={{ opacity: 0 }}
              >
                I build scalable, high-performance web applications with clean
                architecture and great user experience.
              </p>

              <div
                ref={ctaRef}
                className="flex items-center justify-center lg:justify-start gap-4 md:gap-6 flex-wrap"
                style={{ opacity: 0 }}
              >
                <button className="hero-cv-btn px-6 md:px-8 py-3 md:py-3.5 rounded-full border-2 border-[#9D80C8]/40 text-[#9D80C8] text-sm font-semibold hover:border-[#9D80C8]/60 transition-all duration-300">
                  Download CV
                </button>
                <div className="flex items-center gap-2 md:gap-3">
                  {[
                    { href: "https://github.com/idampalada", icon: Github },
                    {
                      href: "https://linkedin.com/in/idam-palada",
                      icon: Linkedin,
                    },
                    {
                      href: "https://instagram.com/idam.palada",
                      icon: Instagram,
                    },
                    { href: "https://wa.me/6281287809468", icon: Phone },
                  ].map(({ href, icon: Icon }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-icon w-10 md:w-11 h-10 md:h-11 flex items-center justify-center rounded-full border border-[#9D80C8]/40 text-[#9D80C8] hover:bg-[#9D80C8]/15 hover:border-[#9D80C8]/60 transition"
                    >
                      <Icon size={18} className="text-[#9D80C8]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0">
              <div
                ref={imageCardRef}
                className="relative w-[280px] md:w-[340px] lg:w-[380px] h-[360px] md:h-[440px] lg:h-[480px] rounded-[30px] md:rounded-[40px] overflow-hidden border-2 border-[#9D80C8]/40 shadow-lg md:shadow-[0_20px_100px_rgba(157,128,200,0.35)] md:rotate-[6deg] md:skew-y-[1deg] transition-[rotate,skew] duration-500 hover:rotate-[2deg] hover:skew-y-0 cursor-pointer"
                style={{ opacity: 0 }}
                onMouseMove={handleImgMouseMove}
                onMouseLeave={handleImgMouseLeave}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent z-10" />
                <Image
                  src="/idampurple.jpg"
                  alt="Idam Palada"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* BOTTOM INFO */}
          <div className="mt-6 md:mt-2 max-w-[1100px] mx-auto pb-4 md:pb-0">
            <p
              ref={bottomTextRef}
              className="mt-8 md:mt-12 mb-8 md:mb-10 text-center lg:text-left lg:ml-0 text-gray-300 text-sm md:text-base px-4 md:px-0"
              style={{ opacity: 0 }}
            >
              I help businesses or individuals build reliable web solutions.
              Here are some of our recent projects.
            </p>

            <div
              ref={statsRef}
              className="flex items-center justify-center lg:justify-between flex-wrap gap-8 md:gap-12 px-4 md:px-0"
              style={{ opacity: 0 }}
            >
              {[
                { target: "2+", label1: "Years of", label2: "Experience" },
                {
                  target: "99%",
                  label1: "Client Satisfaction",
                  label2: "Rate",
                },
                { target: "5+", label1: "Project", label2: "Complete" },
              ].map(({ target, label1, label2 }) => (
                <div key={label1} className="flex items-center gap-3 md:gap-4">
                  <span
                    className="hero-stat-number text-4xl md:text-5xl font-bold text-white"
                    data-target={target}
                  >
                    {target}
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs md:text-sm text-gray-400">{label1}</p>
                    <p className="text-xs md:text-sm text-gray-400">{label2}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={clientsRef}
              className="mt-6 md:mt-8 text-center lg:text-left px-4 md:px-0"
              style={{ opacity: 0 }}
            >
              <p className="mt-4 md:mt-6 lg:ml-0 text-xs md:text-sm text-gray-400">
                <span className="text-gray-300 font-medium">
                  Our happy clients:
                </span>{" "}
                Sneakersflash, COA, KJM, PUPR, dll
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
