import Image from "next/image";
import { Github, Linkedin, Instagram, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-24 overflow-hidden">
      {/* BACKGROUND GRADIENT - Sama seperti referensi */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#16082b] to-[#14062B]" />
        {/* Purple radial glow di tengah-kanan */}
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-600/15 rounded-full blur-[150px]" />
        {/* Purple glow tambahan di kiri bawah */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      {/* TRANSPARENT "HI" BACKGROUND TEXT - Lebih terlihat */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none overflow-hidden">
        <span
          className="text-[380px] font-bold tracking-tighter select-none leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.03)",
          }}
        >
          HI
        </span>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 w-full">
        <div className="grid grid-cols-12 gap-12 items-center min-h-[calc(100vh-96px)]">
          {/* LEFT CONTENT */}
          <div className="col-span-12 lg:col-span-6 z-10">
            <p className="text-purple-400 mb-4 text-sm font-medium tracking-wide">
              Hi, I'm
            </p>

            <h1 className="text-5xl lg:text-6xl leading-tight font-bold mb-3 text-white">
              Idam Palada
            </h1>

            <h2 className="text-4xl lg:text-5xl leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 mb-8">
              Fullstack Developer
            </h2>

            <p className="text-gray-400 max-w-[520px] text-base leading-relaxed mb-10">
              I build scalable, high-performance web applications with clean
              architecture and great user experience.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              {/* DOWNLOAD CV */}
              <button
                className="
    px-8 py-3.5 rounded-full
    border-2 border-[#9D80C8]/40
    text-[#9D80C8] text-sm font-semibold
    hover:bg-[#9D80C8]/10
    hover:border-[#9D80C8]/60
    transition-all duration-300
  "
              >
                Download CV
              </button>

              {/* SOCIAL MEDIA */}
              <div className="flex items-center gap-3">
                {[
                  { href: "https://github.com/username", icon: Github },
                  { href: "https://linkedin.com/in/username", icon: Linkedin },
                  { href: "https://instagram.com/username", icon: Instagram },
                  { href: "https://yourwebsite.com", icon: Globe },
                ].map(({ href, icon: Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    className="
        w-11 h-11 flex items-center justify-center
        rounded-full
        border border-[#9D80C8]/40
        text-[#9D80C8]
        hover:bg-[#9D80C8]/15
        hover:border-[#9D80C8]/60
        transition
      "
                  >
                    <Icon size={18} className="text-[#9D80C8]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          {/* RIGHT IMAGE */}
          <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end z-10">
            <div
              className="
      relative
      w-[340px] lg:w-[380px]
      h-[440px] lg:h-[480px]
      rounded-[40px]
      overflow-hidden
      border-2 border-[#9D80C8]/40
      shadow-[0_20px_100px_rgba(157,128,200,0.35)]
      transform
      rotate-[6deg]
      skew-y-[1deg]
      transition-transform duration-500
      hover:rotate-[2deg]
      hover:skew-y-0
    "
            >
              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent z-10" />

              <Image
                src="/idamkemejahitam.png"
                alt="Idam Palada"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-14 flex items-center gap-40 flex-wrap ml-[100px]">
          {/* EXPERIENCE */}
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-white">2</span>
            <div className="leading-tight">
              <p className="text-sm text-gray-400">Years of</p>
              <p className="text-sm text-gray-400">Experience</p>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-white">5</span>
            <div className="leading-tight">
              <p className="text-sm text-gray-400">Projects</p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
          </div>

          {/* WORK OFFICE */}
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-white">3</span>
            <div className="leading-tight">
              <p className="text-sm text-gray-400">Work</p>
              <p className="text-sm text-gray-400">Experience</p>
            </div>
          </div>

          {/* AGE */}
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-white">23</span>
            <div className="leading-tight">
              <p className="text-sm text-gray-400">Years</p>
              <p className="text-sm text-gray-400">Old</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
