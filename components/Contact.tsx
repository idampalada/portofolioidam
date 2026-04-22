"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const info1Ref = useRef<HTMLDivElement>(null);
  const info2Ref = useRef<HTMLDivElement>(null);
  const info3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── initial states ──
      gsap.set([titleRef.current, eyebrowRef.current], { opacity: 0, y: 28 });
      gsap.set(formCardRef.current, { opacity: 0, x: -50, rotateY: 6 });
      gsap.set([info1Ref.current, info2Ref.current, info3Ref.current], {
        opacity: 0,
        x: 40,
      });

      // ── header timeline ──
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          end: "bottom 0%",
          toggleActions: "play none play none",
          onEnter: () => headerTl.restart(),
          onEnterBack: () => headerTl.restart(),
        },
        defaults: { ease: "power3.out" },
      });

      headerTl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "expo.out",
      });
      headerTl.to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.4",
      );

      // ── form card ──
      const formTl = gsap.timeline({
        scrollTrigger: {
          trigger: formCardRef.current,
          start: "top 90%",
          end: "bottom 5%",
          toggleActions: "play none play none",
          onEnter: () => formTl.restart(),
          onEnterBack: () => formTl.restart(),
        },
      });
      formTl.to(formCardRef.current, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      // ── contact info items stagger ──
      const infoItems = [info1Ref.current, info2Ref.current, info3Ref.current];
      infoItems.forEach((el, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "bottom 5%",
            toggleActions: "play none play none",
            onEnter: () => tl.restart(),
            onEnterBack: () => tl.restart(),
          },
        });
        tl.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative scroll-mt-24 px-6 -mt-16 md:mt-0 pt-0 md:pt-4 pb-16 max-w-[1280px] mx-auto"
    >
      {/* HEADER */}
      <div className="mb-20 text-center">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-purple-400 mb-4"
          style={{ opacity: 0 }}
        >
          Contact
        </h2>
        <p
          ref={eyebrowRef}
          className="flex items-center justify-center gap-3 text-gray-400"
          style={{ opacity: 0 }}
        >
          <span className="text-purple-400">✦</span>
          Have a question? Send me a message, and I'll get back to you right
          away.
          <span className="text-purple-400">✦</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT — FORM */}
        <div
          ref={formCardRef}
          className="relative rounded-3xl p-10 bg-gradient-to-br from-[#1a0b2e] via-[#12081f] to-[#14062B] border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.25)]"
          style={{ opacity: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4">
            Let's work together!
          </h2>

          <p className="text-gray-400 mb-10 max-w-md">
            I design and code beautifully simple things, and I love what I do.
            Just simple like that!
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First name"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300"
              />
            </div>

            <textarea
              rows={5}
              placeholder="Message"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none transition-colors duration-300"
            />

            <button
              type="submit"
              className="w-full mt-4 py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold hover:from-purple-500 hover:to-purple-700 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT — CONTACT INFO */}
        <div className="space-y-10 pt-6">
          {/* PHONE */}
          <div
            ref={info1Ref}
            className="flex items-start gap-6"
            style={{ opacity: 0 }}
          >
            <div
              className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-400 text-xl
              transition-all duration-300 hover:bg-purple-600/40 hover:scale-110"
            >
              📞
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Phone</p>
              <p className="text-white text-lg font-semibold">0812 8780 9468</p>
            </div>
          </div>

          {/* EMAIL */}
          <div
            ref={info2Ref}
            className="flex items-start gap-6"
            style={{ opacity: 0 }}
          >
            <div
              className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-400 text-xl
              transition-all duration-300 hover:bg-purple-600/40 hover:scale-110"
            >
              ✉️
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-white text-lg font-semibold">
                idampalada08@gmail.com
              </p>
            </div>
          </div>

          {/* ADDRESS */}
          <div
            ref={info3Ref}
            className="flex items-start gap-6"
            style={{ opacity: 0 }}
          >
            <div
              className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-400 text-xl
              transition-all duration-300 hover:bg-purple-600/40 hover:scale-110"
            >
              📍
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Address</p>
              <p className="text-white text-lg font-semibold max-w-sm">
                Kebayoran Lama, Jakarta Selatan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
