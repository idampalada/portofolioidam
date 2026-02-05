import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#16082b] to-[#14062B]" />
        {/* subtle grid feel */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* glow */}
        <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pt-30 pb-10">
        {/* SECTION HEADER */}
        <div className="mb-16 text-center">
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
        <div className="grid grid-cols-12 gap-16 items-center">
          {/* LEFT TEXT */}
          <div className="col-span-12 lg:col-span-7">
            <p className="text-purple-400 text-lg mb-4">Hello, I'm</p>

            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Idam Palada
            </h3>

            <div className="space-y-5 text-gray-400 leading-relaxed text-base">
              <p>
                A graduate of Informatics Engineering at Al-Azhar Indonesia
                University, he is active in various campus organizations, with
                leadership and team management experience.
              </p>

              <p>
                He is currently focusing on Frontend and Backend Development,
                Product Development, IT Infrastructure, Data Science, and
                Machine Learning.
              </p>

              <p>
                He has experience developing e-commerce platforms, website-based
                asset management systems, and applications. He is able to work
                both independently and in a team, with a strong learning spirit
                to continuously grow in the technology field.
              </p>
            </div>

            {/* QUOTE */}
            <div className="mt-10 inline-block px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 italic">
              “Leveraging technology as a professional tool, not a replacement.”
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-[280px] lg:w-[320px] h-[280px] lg:h-[320px] rounded-full overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.35)]">
              <Image
                src="/idamkemejahitam.png" // ganti dengan foto kamu
                alt="Idam Palada"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
