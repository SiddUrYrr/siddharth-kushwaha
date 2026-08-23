import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile, socials } from "../data/profile";
import { cn } from "../lib/utils";
import Button from "./ui/Button";
import { SocialIcon } from "./ui/icons";

const TERMINAL_LINES = [
  "> python developer",
  "> building ideas...",
  "> AI + Code + Security",
];

const PARTICLES = [
  { left: "12%", top: "22%", size: 3, delay: "0s" },
  { left: "22%", top: "68%", size: 2, delay: "1.2s" },
  { left: "38%", top: "14%", size: 2, delay: "0.6s" },
  { left: "55%", top: "74%", size: 3, delay: "2s" },
  { left: "64%", top: "18%", size: 2, delay: "0.9s" },
  { left: "78%", top: "58%", size: 3, delay: "1.6s" },
  { left: "86%", top: "30%", size: 2, delay: "0.3s" },
  { left: "45%", top: "86%", size: 2, delay: "2.4s" },
];

function useTypewriter(phrases: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? "" : phrases[0]);

  useEffect(() => {
    if (!enabled) return;
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const current = phrases[phrase];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 2000);
          return;
        }
        timer = window.setTimeout(tick, 65);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = window.setTimeout(tick, 450);
          return;
        }
        timer = window.setTimeout(tick, 32);
      }
    };

    timer = window.setTimeout(tick, 700);
    return () => window.clearTimeout(timer);
  }, [phrases, enabled]);

  return text;
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const typed = useTypewriter(TERMINAL_LINES, !reduceMotion);
  const sectionRef = useRef<HTMLElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "radial-gradient(ellipse 85% 62% at 50% 38%, black 25%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 62% at 50% 38%, black 25%, transparent 78%)",
        }}
      />

      {/* Gradient orbs */}
      <div
        aria-hidden="true"
        className="animate-float-slow absolute -top-32 left-[8%] h-80 w-80 rounded-full bg-indigo-600/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[5%] top-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]"
        style={{ animationDelay: "1.8s", animationName: "float", animationDuration: "9s", animationIterationCount: "infinite", animationTimingFunction: "ease-in-out" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[8%] left-1/3 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]"
      />

      {/* Particles */}
      <div aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={cn("animate-float-slow absolute rounded-full bg-indigo-300/60")}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(540px circle at var(--mx, 50%) var(--my, 35%), rgba(129,140,248,0.09), transparent 65%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.21, 0.65, 0.35, 1] }}
        className="relative mx-auto w-full max-w-6xl px-5 text-center sm:px-8"
      >
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-300">
            Hello, I&apos;m
          </span>
        </div>

        <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Siddharth
          <span className="gradient-text block sm:inline"> Kushwaha</span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl font-mono text-sm text-indigo-300/90 sm:text-base">
          {profile.roles}
        </p>

        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-zinc-400 sm:text-lg">
          {profile.heroDescription}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#projects" variant="primary">
            View My Projects
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button href="#contact" variant="outline">
            Let&apos;s Connect
          </Button>
        </div>

        <div className="mt-9 flex items-center justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} profile`}
              title={social.label}
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:text-white hover:shadow-glow"
            >
              <SocialIcon icon={social.icon} className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass mx-auto mt-14 max-w-md rounded-2xl text-left shadow-card"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 font-mono text-xs text-zinc-500">
              siddharth@dev ~ %
            </span>
            <Sparkles size={13} className="ml-auto text-indigo-300/70" aria-hidden="true" />
          </div>
          <div className="min-h-[3.4rem] px-4 py-4 font-mono text-sm text-emerald-300/90">
            <span>{typed}</span>
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-emerald-300/90" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-zinc-500 transition-colors hover:text-indigo-300 md:block"
      >
        <ChevronDown size={26} className="animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
