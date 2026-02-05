import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

const projects = {
  "1": {
    title: "Website Company Profile - Khazman Jaya Mandiri",
    description:
      "Merancang dan mengembangkan website company profile untuk perusahaan di bidang logistik yang berfungsi sebagai media informasi resmi perusahaan. Website ini menampilkan profil perusahaan, layanan logistik, visi dan misi, serta informasi pendukung lainnya dengan tampilan modern dan profesional.",
    video: "/kjmlogisticc.mp4",
    techCount: 4,
    featureCount: 9,
  },
  "2": {
    title: "Company Profile Logistic",
    description:
      "Merancang dan mengembangkan website company profile untuk perusahaan logistik guna meningkatkan citra profesional dan memperkuat kehadiran digital. Website ini menampilkan informasi layanan, profil perusahaan, serta struktur konten yang jelas dengan fokus pada performa, keterbacaan, dan pengalaman pengguna.",
    video: "/kjmlogistic.mp4",
    techCount: 4,
    featureCount: 7,
  },
} as const;

export default function ProjectDetail({ params }: PageProps) {
  // fallback aman → default ke project 1
  const project = projects[params.id as keyof typeof projects] || projects["1"];

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
        <span className="text-white">{project.title}</span>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#F3C6D3]">
            {project.title}
          </h1>

          <p className="text-gray-400 leading-relaxed mb-10">
            {project.description}
          </p>

          {/* STATS */}
          <div className="flex gap-6 mb-10">
            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-bold">{project.techCount}</p>
              <p className="text-sm text-gray-400">Total Teknologi</p>
            </div>

            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-bold">{project.featureCount}</p>
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
          <div>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="text-purple-400">&lt;/&gt;</span>
              Technologies Used
            </h2>

            <div className="flex flex-wrap gap-3">
              {["Next.js", "React", "TypeScript", "Tailwind CSS"].map(
                (tech) => (
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
                ),
              )}
            </div>
          </div>
        </div>

        {/* RIGHT MEDIA */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black">
          <video
            src={project.video}
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
