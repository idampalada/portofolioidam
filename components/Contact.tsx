export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 px-6 -mt-16 md:mt-0
 pt-0 md:pt-4 pb-16 max-w-[1280px] mx-auto"
    >
      {/* HEADER */}
      <div className="mb-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          Contact
        </h2>
        <p className="flex items-center justify-center gap-3 text-gray-400">
          <span className="text-purple-400">✦</span>
          Have a question? Send me a message, and I'll get back to you right
          away.
          <span className="text-purple-400">✦</span>
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ================= LEFT — FORM ================= */}
        <div className="relative rounded-3xl p-10 bg-gradient-to-br from-[#1a0b2e] via-[#12081f] to-[#14062B] border border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.25)]">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4">
            Let’s work together!
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
                className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />

              <input
                type="text"
                placeholder="Last name"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />

              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <textarea
              rows={5}
              placeholder="Message"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            />

            <button
              type="submit"
              className="
                w-full mt-4 py-4 rounded-full
                bg-gradient-to-r from-purple-600 to-purple-800
                text-white font-semibold
                hover:from-purple-500 hover:to-purple-700
                transition-all
              "
            >
              Send Message
            </button>
          </form>
        </div>

        {/* ================= RIGHT — CONTACT INFO ================= */}
        <div className="space-y-10 pt-6">
          {/* PHONE */}
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-400 text-xl">
              📞
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">Phone</p>
              <p className="text-white text-lg font-semibold">0812 8780 9468</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-400 text-xl">
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
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-400 text-xl">
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
