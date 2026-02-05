import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    desc: "Merancang dan mengembangkan platform e-commerce fashion berbasis web dengan fokus pada UX dan performa aplikasi.",
    media: "/sneakersflashh.mp4",
    type: "video",
  },
  {
    id: 2,
    desc: "Merancang dan mengembangkan website company profile untuk perusahaan logistik guna meningkatkan citra profesional.",
    media: "/kjmlogisticc.mp4",
    type: "video",
  },
  {
    id: 3,
    desc: "Merancang, mengembangkan, dan meluncurkan microsite redeem code untuk kebutuhan kampanye digital.",
    media: "/coaa.mp4",
    type: "video",
  },
  {
    id: 4,
    desc: "Merancang dan mendesain website company profile laboratorium PT Chemkit Multi Guna untuk menampilkan profil perusahaan dan produk laboratorium.",
    media: "/chemkit.mp4",
    type: "video",
  },
  {
    id: 5,
    desc: "Mengembangkan dan memelihara aplikasi shortlink dengan penerapan pemantauan keamanan sistem untuk memastikan kinerja optimal dan keandalan aplikasi.",
    media: "/shortlink.mp4",
    type: "video",
  },
  {
    id: 6,
    desc: "Mengembangkan sistem manajemen aset untuk pengelolaan kendaraan, ruangan, dan barang milik negara, termasuk integrasi perangkat IoT pada aset kendaraan.",
    media: "/mapu.mp4",
    type: "video",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative scroll-mt-24 px-6 pt-20 pb-32 max-w-[1280px] mx-auto"
    >
      {/* HEADER */}
      <div className="mb-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          Project Portfolio
        </h2>

        <p className="flex items-center justify-center gap-3 text-gray-400">
          <span className="text-purple-400">✦</span>
          Selected projects I’ve worked on
          <span className="text-purple-400">✦</span>
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="
              group relative overflow-hidden rounded-2xl
              bg-white/5 border border-white/10
              hover:border-purple-500/40
              transition-colors
            "
          >
            {/* MEDIA */}
            <div className="relative h-[420px] bg-black">
              {project.type === "image" ? (
                <Image
                  src={project.media}
                  alt="Project preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  src={project.media}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              )}
            </div>

            {/* HOVER OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-black/60 backdrop-blur-[2px]
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                flex flex-col items-center justify-center
                text-center px-6
              "
            >
              <p className="text-gray-200 text-sm leading-relaxed mb-6">
                {project.desc}
              </p>

              <div className="flex items-center gap-4">
                <button className="px-4 py-2 rounded-lg bg-white/90 text-black text-sm font-medium hover:bg-white transition">
                  View App
                </button>

                <Link
                  href={`/project/${project.id}`}
                  className="px-4 py-2 rounded-lg bg-black/40 text-white text-sm font-medium border border-white/20 hover:bg-black/60 transition"
                >
                  Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
