import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, TerminalSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, socials } from "../data/profile";
import Button from "./ui/Button";
import { SocialIcon } from "./ui/icons";

const TERMINAL_LINES = [
  "> python developer",
  "> building ideas...",
  "> AI + Code + Security",
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

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* Blueprint grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 85% 62% at 50% 38%, black 25%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 62% at 50% 38%, black 25%, transparent 78%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.35fr_1fr]">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.21, 0.65, 0.35, 1] }}
        >
          <p className="inline-flex items-center gap-2.5 border-2 border-line bg-raised/60 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-dim">
              Open to opportunities
            </span>
          </p>

          <h1 className="mt-7 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl xl:text-7xl">
            Siddharth
            <span className="block text-accent-soft">Kushwaha</span>
          </h1>

          <p className="mt-6 border-l-4 border-accent pl-4 font-mono text-sm text-dim sm:text-base">
            {profile.roles}
          </p>

          <p className="mt-5 max-w-xl leading-relaxed text-dim sm:text-lg">
            {profile.heroDescription}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#projects" variant="primary">
              View My Projects
              <ArrowRight size={15} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="outline">
              Let&apos;s Connect
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} profile`}
                title={social.label}
                className="flex h-11 w-11 items-center justify-center border-2 border-line text-dim transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-bright hover:text-accent-soft hover:shadow-hard-sm"
              >
                <SocialIcon icon={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
          className="panel mx-auto w-full max-w-md shadow-hard-lg transition-transform duration-300 hover:rotate-0 lg:-rotate-1"
        >
          <div className="flex items-center gap-2 border-b-2 border-line px-4 py-3">
            <span className="h-2.5 w-2.5 bg-red-400/80" />
            <span className="h-2.5 w-2.5 bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 bg-green-400/80" />
            <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-slate-500">
              <TerminalSquare size={13} aria-hidden="true" />
              siddharth@dev ~ %
            </span>
          </div>
          <div className="min-h-[3.6rem] px-4 py-4 font-mono text-sm leading-relaxed text-emerald-300">
            <span>{typed}</span>
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-emerald-300"
            />
          </div>
          <div className="flex items-center justify-between border-t-2 border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
            <span>Uttar Pradesh, IN</span>
            <span className="text-accent-soft">v2.0</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-10 items-center justify-center border-2 border-line text-dim transition-colors hover:border-accent-bright hover:text-accent-soft">
          <ArrowDown size={18} className="animate-bounce" aria-hidden="true" />
        </span>
      </motion.a>
    </section>
  );
}
