import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      {/* FIXED NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <main className="bg-[#0B0614] text-white pt-20">
        {/* HERO */}
        <Hero />

        <section
          id="about"
          className="relative scroll-mt-24 min-h-screen px-6 py-32 max-w-[1280px] mx-auto"
        >
          {/* HEADER */}
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
          <p className="text-gray-400 max-w-3xl mx-auto text-center leading-relaxed">
            I’m a fullstack developer focused on building scalable,
            high-performance web applications with clean architecture and great
            user experience.
          </p>
        </section>
        <section
          id="portfolio"
          className="relative scroll-mt-24 min-h-screen px-6 py-32 max-w-[1280px] mx-auto"
        >
          {/* HEADER */}
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
              Portfolio
            </h2>

            <p className="flex items-center justify-center gap-3 text-gray-400">
              <span className="text-purple-400">✦</span>
              Selected projects I’ve worked on
              <span className="text-purple-400">✦</span>
            </p>
          </div>

          {/* PROJECT GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="
          h-56 rounded-2xl
          bg-white/5
          border border-white/10
          hover:border-purple-500/40
          hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]
          transition-all duration-300
        "
              />
            ))}
          </div>
        </section>
        <section
          id="contact"
          className="relative scroll-mt-24 min-h-screen px-6 py-32 max-w-[1280px] mx-auto"
        >
          {/* HEADER */}
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
              Contact
            </h2>

            <p className="flex items-center justify-center gap-3 text-gray-400">
              <span className="text-purple-400">✦</span>
              Let’s build something great together
              <span className="text-purple-400">✦</span>
            </p>
          </div>

          {/* CONTENT */}
          <div className="max-w-xl mx-auto text-center">
            <p className="text-gray-400 mb-10">
              Have a project in mind or want to collaborate?
            </p>

            <button
              className="
        px-10 py-3.5 rounded-full
        bg-purple-600 text-white
        font-semibold
        hover:bg-purple-500
        transition-all duration-300
        shadow-lg shadow-purple-600/30
        hover:shadow-purple-500/40
      "
            >
              Get in Touch
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
