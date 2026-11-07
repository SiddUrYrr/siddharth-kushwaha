import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { swarmController } from "../../swarm/SwarmController";
import SwarmStartScreen from "./SwarmStartScreen";
import SwarmTrigger from "./SwarmTrigger";
import { useSwarmState } from "./useSwarmState";

type Gate = "shown" | "starting" | "skipped";

/**
 * Owns the Swarm Rebuild experience at the page level: the full-screen start
 * gate, the floating replay trigger, and a graceful, dismissible error if the
 * engine can't start. The experience itself runs in the engine's own
 * shadow-DOM overlay, so it never touches the portfolio's React tree.
 *
 * The gate is dismissed *before* the engine boots, so the start screen is never
 * part of the snapshot the swarm rebuilds.
 */
export default function SwarmExperience() {
  const { phase, error } = useSwarmState();
  const reduceMotion = useReducedMotion();
  const [showError, setShowError] = useState(false);
  const [gate, setGate] = useState<Gate>("shown");
  const startRequested = useRef(false);

  // Run the engine only once the gate has unmounted (so the start screen is
  // excluded from the captured DOM).
  useEffect(() => {
    if (gate !== "starting" || startRequested.current) return;
    startRequested.current = true;
    swarmController.start(Boolean(reduceMotion));
  }, [gate, reduceMotion]);

  const handleStart = useCallback(() => setGate("starting"), []);
  const handleSkip = useCallback(() => setGate("skipped"), []);

  useEffect(() => {
    if (phase !== "error") {
      setShowError(false);
      return;
    }
    setShowError(true);
    const timer = window.setTimeout(() => setShowError(false), 9000);
    return () => window.clearTimeout(timer);
  }, [phase, error]);

  return (
    <>
      {gate === "shown" && <SwarmStartScreen onStart={handleStart} onSkip={handleSkip} />}

      {phase !== "active" && <SwarmTrigger busy={phase === "loading"} />}

      <AnimatePresence>
        {showError && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.21, 0.65, 0.35, 1] }}
            className="fixed bottom-20 right-5 z-40 flex max-w-[min(22rem,calc(100vw-2.5rem))] items-start gap-3 border-2 border-red-500/70 bg-surface p-4 shadow-hard-sm sm:bottom-24 sm:right-7"
          >
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
                Swarm unavailable
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-dim">
                {error ?? "The experience couldn't start. The rest of the site works as usual."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowError(false)}
              aria-label="Dismiss message"
              className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center text-dim transition-colors hover:text-paper"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
