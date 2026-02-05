export default function Footer() {
  return (
    <footer className="relative bg-[#0B0614]">
      {/* GARIS PUTIH TIPIS */}
      <div className="h-px w-full bg-white/10" />

      {/* CONTENT */}
      <div className="max-w-[1280px] mx-auto px-6 py-6 text-center">
        <p className="text-sm text-gray-400">
          © 2026{" "}
          <span className="text-purple-400 font-medium">IdamPalada™</span> All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
