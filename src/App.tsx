import { MotionConfig } from "framer-motion";
import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Focus from "./components/Focus";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-700/10 blur-[140px]" />
        <div className="absolute -right-40 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-violet-700/10 blur-[140px]" />
      </div>

      <a
        href="#home"
        className="sr-only z-[60] rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Focus />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
