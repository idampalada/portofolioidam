import Link from "next/link";

export default function ProjectDetailMapu() {
  return (
    <section className="min-h-screen px-6 py-32 max-w-[1280px] mx-auto text-white">
      {/* BREADCRUMB */}
      <div className="mb-10 flex items-center gap-4 text-sm text-gray-400">
        <Link
          href="/#portfolio"
          className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          ← Back
        </Link>

        <span>Projects</span>
        <span>›</span>
        <span className="text-white">Website Aplikasi Manajemen Aset</span>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#F3C6D3]">
            Website Aplikasi <br />
            Manajemen Aset
          </h1>

          <p className="text-gray-400 leading-relaxed mb-10">
            Mengembangkan sistem manajemen aset untuk pengelolaan kendaraan,
            ruangan, dan barang milik negara secara terpusat. Sistem ini
            dirancang untuk meningkatkan efisiensi pengelolaan aset dengan
            dukungan pencatatan digital, monitoring kondisi aset, serta
            integrasi perangkat IoT pada aset kendaraan untuk pelacakan dan
            pemantauan secara real-time.
          </p>

          {/* STATS */}
          <div className="flex gap-6 mb-10">
            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-bold">6</p>
              <p className="text-sm text-gray-400">Total Teknologi</p>
            </div>

            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-bold">9</p>
              <p className="text-sm text-gray-400">Fitur Utama</p>
            </div>
          </div>

          {/* ACTION */}
          <div className="flex gap-4 mb-16">
            <a
              href="#"
              className="
                px-6 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white font-medium
                hover:bg-white/10
                transition
              "
            >
              Live Demo
            </a>
          </div>

          {/* TECHNOLOGIES */}
          <div className="mb-16">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="text-purple-400">&lt;/&gt;</span>
              Technologies Used
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
                "IoT Integration",
              ].map((tech) => (
                <span
                  key={tech}
                  className="
                    px-4 py-2 rounded-full
                    bg-white/5 border border-white/10
                    text-sm text-gray-300
                    hover:border-purple-500/40
                    transition
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* KEY FEATURES */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              Key Features
            </h2>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>• Manajemen aset kendaraan, ruangan, dan barang</li>
              <li>• Integrasi perangkat IoT pada aset kendaraan</li>
              <li>• Monitoring kondisi dan status aset secara real-time</li>
              <li>• Pencatatan dan histori penggunaan aset</li>
              <li>• Sistem pelaporan dan rekapitulasi data aset</li>
              <li>• Dashboard admin dan user berbasis role</li>
              <li>• Notifikasi pemeliharaan dan masa pakai aset</li>
              <li>• Keamanan data dan kontrol akses pengguna</li>
              <li>• Desain responsif dan user-friendly</li>
            </ul>
          </div>
        </div>

        {/* RIGHT MEDIA */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black">
          <video
            src="/mapu.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
}
