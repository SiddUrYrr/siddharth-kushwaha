import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { profile } from "../../data/profile";

interface SwarmStartScreenProps {
  /** Begin the Swarm Rebuild experience. */
  onStart: () => void;
  /** Reveal the normal portfolio without starting the animation. */
  onSkip: () => void;
}

/**
 * Full-screen start gate shown on first load. It is portalled to <body> so the
 * app root can be made `inert` behind it (a real modal), and it is removed
 * before the engine snapshots the page so it never ends up in the rebuild.
 */
export default function SwarmStartScreen({ onStart, onSkip }: SwarmStartScreenProps) {
  const reduceMotion = useReducedMotion();
  const startRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onSkip();
        return;
      }
      // Keep Tab inside the gate while it owns the screen.
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onSkip]
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const root = document.getElementById("root");
    document.body.style.overflow = "hidden";
    root?.setAttribute("inert", "");

    const focusTimer = window.setTimeout(() => startRef.current?.focus(), 60);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Don't fight the controller if the swarm is already taking over.
      if (!document.documentElement.hasAttribute("data-swarm-active")) {
        root?.removeAttribute("inert");
      }
    };
  }, [handleKeyDown]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="swarm-start-title"
      aria-describedby="swarm-start-desc"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-ink px-5 py-10"
    >
      {/* Blueprint grid, matching the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 46%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 46%, black 20%, transparent 80%)",
        }}
      />

      <motion.div
        ref={panelRef}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.65, 0.35, 1] }}
        className="relative w-full max-w-2xl text-center"
      >
        <p className="inline-flex items-center gap-2.5 border-2 border-line bg-raised/60 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-dim">
            Interactive Portfolio
          </span>
        </p>

        <p
          id="swarm-start-title"
          className="mt-7 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl"
        >
          Siddharth
          <span className="block text-accent-soft">Kushwaha</span>
        </p>

        <p className="mt-5 border-l-4 border-accent pl-4 text-left font-mono text-xs text-dim sm:mx-auto sm:max-w-lg sm:text-sm">
          {profile.roles}
        </p>

        <p id="swarm-start-desc" className="mx-auto mt-5 max-w-xl leading-relaxed text-dim sm:text-lg">
          A swarm of cursors will wipe this site to a blank canvas and rebuild
          every box, line and word — live, in front of you.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <button
            ref={startRef}
            type="button"
            onClick={onStart}
            className="group inline-flex items-center justify-center gap-3 border-2 border-ink bg-paper px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-hard transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-hard sm:px-9 sm:text-sm"
          >
            <span
              aria-hidden="true"
              className="text-base leading-none text-accent transition-transform duration-300 group-hover:rotate-90"
            >
              ✦
            </span>
            Start the Experience
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-dim underline decoration-line underline-offset-4 transition-colors hover:text-paper"
          >
            Skip to portfolio
          </button>
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-dim/70 sm:text-[11px]">
          Sound recommended · Press Esc to exit anytime
        </p>
      </motion.div>
    </div>,
    document.body
  );
}
