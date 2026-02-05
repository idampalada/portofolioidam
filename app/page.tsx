import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[#0B0614] text-white pt-20">
        <Hero />
        <About />
        <Education />
        <Portfolio />
        <Contact />
      </main>
    </>
  );
}
