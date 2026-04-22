"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const bio1Ref = useRef<HTMLParagraphElement>(null);
  const bio2Ref = useRef<HTMLParagraphElement>(null);
  const bio3Ref = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── set initial hidden states ──
      gsap.set(eyebrowRef.current, { opacity: 0, y: 16 });
      gsap.set(titleRef.current, {
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        y: 32,
      });
      gsap.set(imageWrapperRef.current, {
        opacity: 0,
        scale: 0.88,
        rotateZ: -4,
      });
      gsap.set(greetingRef.current, { opacity: 0, x: -20 });
      gsap.set(nameRef.current, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
      gsap.set([bio1Ref.current, bio2Ref.current, bio3Ref.current], {
        opacity: 0,
        x: -24,
      });
      gsap.set(quoteRef.current, { opacity: 0, y: 20, scale: 0.97 });

      // ── REPEATING scroll trigger ──
      // start saat top section menyentuh 90% viewport (sangat awal)
      // end dibuat sangat jauh ke bawah supaya tidak reverse saat navigasi langsung
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%", // trigger sangat awal saat section mulai masuk
          end: "bottom 0%", // end hanya saat section benar-benar habis
          toggleActions: "play none play none", // play saat enter, tidak reverse
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0);
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 0.95,
          ease: "expo.out",
        },
        0.15,
      );
      tl.to(
        imageWrapperRef.current,
        { opacity: 1, scale: 1, rotateZ: 0, duration: 1.1, ease: "expo.out" },
        0.3,
      );
      tl.to(greetingRef.current, { opacity: 1, x: 0, duration: 0.55 }, 0.55);
      tl.to(
        nameRef.current,
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "expo.out",
        },
        0.72,
      );
      tl.to(
        [bio1Ref.current, bio2Ref.current, bio3Ref.current],
        {
          opacity: 1,
          x: 0,
          stagger: 0.16,
          duration: 0.6,
        },
        0.95,
      );
      tl.to(
        quoteRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.6)" },
        1.4,
      );

      // ── floating loop on image ──
      gsap.to(imageWrapperRef.current, {
        y: -10,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });

      // ── glow parallax scrub ──
      gsap.to(glowRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes aboutSpinCW  { to { transform: rotate(360deg);  } }
        @keyframes aboutSpinCCW { to { transform: rotate(-360deg); } }
        @keyframes aboutPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.55); }
          50%     { box-shadow: 0 0 0 8px rgba(167,139,250,0);   }
        }
        @keyframes aboutShine { to { transform: translateX(120%); } }
        .about-img-wrap:hover .about-shine { animation: aboutShine 0.85s ease forwards; }
        .about-img-wrap:hover .about-img   { transform: scale(1.05); }
        .about-quote:hover {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(167,139,250,0.35) !important;
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative scroll-mt-24 overflow-hidden"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#16082b] to-[#14062B]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div
            ref={glowRef}
            className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-purple-600/10 rounded-full blur-[140px]"
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 pt-16 md:pt-28 pb-16">
          {/* HEADER */}
          <div className="mb-14 text-center">
            <h2
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold text-purple-400 mb-4"
              style={{ opacity: 0 }}
            >
              About Me
            </h2>
            <p
              ref={eyebrowRef}
              className="flex items-center justify-center gap-3 text-gray-400"
              style={{ opacity: 0 }}
            >
              <span className="text-purple-400">✦</span>
              Transforming ideas into digital experiences
              <span className="text-purple-400">✦</span>
            </p>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col items-center gap-14 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            {/* IMAGE */}
            <div className="w-full flex justify-center lg:col-span-5 lg:justify-end lg:order-2">
              <div
                ref={imageWrapperRef}
                className="about-img-wrap relative"
                style={{
                  opacity: 0,
                  width: "clamp(220px,28vw,320px)",
                  height: "clamp(220px,28vw,320px)",
                }}
              >
                {/* Rotating rings */}
                <div
                  className="absolute rounded-full border border-dashed border-purple-400/20 pointer-events-none"
                  style={{
                    inset: -18,
                    animation: "aboutSpinCW 22s linear infinite",
                  }}
                >
                  <div
                    className="absolute w-2 h-2 rounded-full bg-purple-400 top-[-4px] left-1/2 -translate-x-1/2"
                    style={{ animation: "aboutPulse 2.2s ease infinite" }}
                  />
                </div>
                <div
                  className="absolute rounded-full border border-purple-400/10 pointer-events-none"
                  style={{
                    inset: -9,
                    animation: "aboutSpinCCW 14s linear infinite",
                  }}
                />

                {/* Avatar */}
                <div
                  className="relative overflow-hidden rounded-full"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "0 0 80px rgba(168,85,247,0.35)",
                  }}
                >
                  <Image
                    src="/idambatik.png"
                    alt="Idam Palada"
                    fill
                    className="about-img object-cover object-[50%_20%] transition-transform duration-500"
                  />
                  <div
                    className="about-shine absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)",
                      transform: "translateX(-120%)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="w-full max-w-[560px] text-center lg:max-w-none lg:col-span-7 lg:text-left lg:order-1">
              <p
                ref={greetingRef}
                className="text-purple-400 text-lg mb-3"
                style={{ opacity: 0 }}
              >
                Hello, I'm
              </p>

              <h3
                ref={nameRef}
                className="text-4xl lg:text-5xl font-bold text-white mb-8"
                style={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              >
                Idam Palada
              </h3>

              <div className="space-y-5 text-gray-400 leading-relaxed text-base">
                <p ref={bio1Ref} style={{ opacity: 0 }}>
                  A graduate of Informatics Engineering at Al-Azhar Indonesia
                  University, active in various campus organizations with
                  leadership and team management experience.
                </p>
                <p ref={bio2Ref} style={{ opacity: 0 }}>
                  Currently focusing on Frontend and Backend Development,
                  Product Development, IT Infrastructure, Data Science, and
                  Machine Learning.
                </p>
                <p ref={bio3Ref} style={{ opacity: 0 }}>
                  Experienced in developing e-commerce platforms, website-based
                  asset management systems, and applications. Able to work
                  independently or in a team with a strong learning mindset.
                </p>
              </div>

              <div
                ref={quoteRef}
                className="about-quote mt-10 mx-auto lg:mx-0 inline-block px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 italic cursor-default transition-all duration-300"
                style={{ opacity: 0 }}
              >
                "Learning fast. Building faster."
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
