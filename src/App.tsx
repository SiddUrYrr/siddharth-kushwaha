import { MotionConfig } from "framer-motion";
import About from "./components/About";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Focus from "./components/Focus";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import SwarmExperience from "./components/Swarm/SwarmExperience";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#home"
        className="sr-only z-[60] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:border-2 focus:border-paper focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider focus:text-paper"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Focus />
        <Contact />
      </main>

      <Footer />
      <SwarmExperience />
    </MotionConfig>
  );
}
