export default function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-24 px-6 pt-14 md:pt-24 pb-12 max-w-[1280px] mx-auto"
    >
      {/* HEADER */}
      <div className="mb-14 md:mb-24 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          Education & Experience
        </h2>

        <p className="flex items-center justify-center gap-3 text-gray-400">
          <span className="text-purple-400">✦</span>
          Academic background & professional experience
          <span className="text-purple-400">✦</span>
        </p>
      </div>

      {/* GRID 2 COLUMN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-6xl mx-auto">
        {/* ================= LEFT — EDUCATION ================= */}
        <div>
          <h3 className="text-3xl font-semibold text-white mb-10">
            🎓 My Education
          </h3>

          <div className="space-y-8">
            {/* UNIVERSITY */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 font-semibold mb-3">2021 – 2025</p>

              <h4 className="text-xl font-semibold text-white mb-1">
                Bachelor of Informatics
              </h4>

              <p className="text-gray-300 mb-4">
                Universitas Al Azhar Indonesia
              </p>

              <p className="text-gray-400 leading-relaxed">
                Focused on web development, software engineering, and system
                design. Emphasized structured programming, problem-solving, and
                building scalable applications.
              </p>
            </div>

            {/* VOCATIONAL */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 font-semibold mb-3">2017 – 2020</p>

              <h4 className="text-xl font-semibold text-white mb-1">
                Vocational Diploma in Computer and Network Engineering
              </h4>

              <p className="text-gray-300 mb-4">SMK Bina Informatika</p>

              <p className="text-gray-400 leading-relaxed">
                Studied computer networks, LAN configuration, troubleshooting,
                and server fundamentals. Practiced using Cisco tools,
                Debian-based servers, and virtualization with VirtualBox.
              </p>
            </div>

            {/* JUNIOR HIGH */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 font-semibold mb-3">2014 – 2017</p>

              <h4 className="text-xl font-semibold text-white mb-1">
                Junior High School (SMP)
              </h4>

              <p className="text-gray-300 mb-4">SMP Muhammadiyah 8 Jakarta</p>

              <p className="text-gray-400 leading-relaxed">
                Completed junior secondary education with a strong foundation in
                general studies and early exposure to technology.
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT — EXPERIENCE ================= */}
        <div>
          <h3 className="text-3xl font-semibold text-white mb-10">
            💼 My Experience
          </h3>

          <div className="space-y-8">
            {/* PU */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 font-semibold mb-3">
                25 January 2025 – Present
              </p>

              <h4 className="text-xl font-semibold text-white mb-1">
                Web Developer
              </h4>

              <p className="text-gray-300 mb-4">Ministry of Public Works</p>

              <p className="text-gray-400 leading-relaxed">
                Developing and maintaining web-based systems to support internal
                operations, including system optimization, data management, and
                improving application performance for government services.
              </p>
            </div>

            {/* USWAH */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 font-semibold mb-3">
                August 2023 – December 2023
              </p>

              <h4 className="text-xl font-semibold text-white mb-1">
                Product Development
              </h4>

              <p className="text-gray-300 mb-4">PT. Uswah Salam Alazhar</p>

              <p className="text-gray-400 leading-relaxed">
                Involved in product development processes, including requirement
                analysis, feature implementation, and collaboration with teams
                to deliver functional and user-focused digital products.
              </p>
            </div>

            {/* PPI */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 font-semibold mb-3">
                September 2023 – December 2023
              </p>

              <h4 className="text-xl font-semibold text-white mb-1">
                IT Infrastructure
              </h4>

              <p className="text-gray-300 mb-4">
                PT. Perusahaan Perdagangan Indonesia
              </p>

              <p className="text-gray-400 leading-relaxed">
                Provided IT infrastructure support, including network
                monitoring, hardware troubleshooting, and system maintenance to
                ensure reliable and secure business operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
