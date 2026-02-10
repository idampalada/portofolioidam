import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#16082b] to-[#14062B]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 pt-28 pb-16">
        {/* HEADER */}
        <div className="mb-14 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
            About Me
          </h2>
          <p className="flex items-center justify-center gap-3 text-gray-400">
            <span className="text-purple-400">✦</span>
            Transforming ideas into digital experiences
            <span className="text-purple-400">✦</span>
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col items-center gap-14 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* IMAGE */}
          <div className="w-full flex justify-center lg:col-span-5 lg:justify-end lg:order-2">
            <div className="relative w-[220px] sm:w-[260px] lg:w-[320px] h-[220px] sm:h-[260px] lg:h-[320px] rounded-full overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.35)]">
              <Image
                src="/idambatik.png"
                alt="Idam Palada"
                fill
                className="object-cover object-[50%_20%]"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="w-full max-w-[560px] text-center lg:max-w-none lg:col-span-7 lg:text-left lg:order-1">
            <p className="text-purple-400 text-lg mb-3">Hello, I'm</p>

            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Idam Palada
            </h3>

            <div className="space-y-5 text-gray-400 leading-relaxed text-base">
              <p>
                A graduate of Informatics Engineering at Al-Azhar Indonesia
                University, active in various campus organizations with
                leadership and team management experience.
              </p>

              <p>
                Currently focusing on Frontend and Backend Development, Product
                Development, IT Infrastructure, Data Science, and Machine
                Learning.
              </p>

              <p>
                Experienced in developing e-commerce platforms, website-based
                asset management systems, and applications. Able to work
                independently or in a team with a strong learning mindset.
              </p>
            </div>

            {/* QUOTE */}
            <div className="mt-10 mx-auto lg:mx-0 inline-block px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 italic">
              “Leveraging technology as a professional tool, not a replacement.”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
