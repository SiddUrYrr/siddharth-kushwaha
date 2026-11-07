import { motion, useReducedMotion } from "framer-motion";
import { swarmController } from "../../swarm/SwarmController";
import { cn } from "../../lib/utils";

interface SwarmTriggerProps {
  /** True while the engine script is being fetched. */
  busy?: boolean;
}

/**
 * The floating entry point to the Swarm Rebuild experience. It matches the
 * portfolio's hard-edged, mono-typographic language and hides itself the moment
 * the experience starts (see the `data-swarm-active` rule in index.css) so the
 * engine never captures it in the snapshot.
 */
export default function SwarmTrigger({ busy = false }: SwarmTriggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      className={cn(
        "swarm-trigger group fixed bottom-5 right-5 z-40 inline-flex max-w-[calc(100vw-2.5rem)]",
        "items-center gap-2.5 border-2 border-line bg-surface px-4 py-3",
        "font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-hard-sm",
        "transition-colors duration-200 hover:border-accent-bright hover:text-accent-soft hover:shadow-hard",
        "focus-visible:border-accent-bright sm:bottom-7 sm:right-7 sm:text-xs",
        busy && "pointer-events-none opacity-80"
      )}
      aria-label="Watch Swarm Rebuild"
      title="Watch a swarm of cursors rebuild this portfolio"
      disabled={busy}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.5, ease: [0.21, 0.65, 0.35, 1] }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      onClick={() => swarmController.start(Boolean(reduceMotion))}
    >
      <span
        aria-hidden="true"
        className="text-sm leading-none text-accent-soft transition-transform duration-300 group-hover:rotate-90"
      >
        ✦
      </span>
      {busy ? "Preparing…" : "Watch Swarm Rebuild"}
    </motion.button>
  );
}
