/**
 * SwarmController — native bridge to the vendored Swarm Rebuild engine.
 *
 * The engine (public/swarm/swarm-engine.js) is an untyped, dependency-free
 * script that snapshots the live portfolio, blanks it with a shadow-DOM
 * overlay, and rebuilds it with a swarm of animated cursors. It exposes
 * `window.__swarmRebuild = { start, stop, toggle, app }` and manages its own
 * HUD (Tour, speed, sound, Go live, Replay, Exit).
 *
 * This controller:
 *  - lazy-loads the engine on demand (never on first paint),
 *  - marks the page so the trigger is hidden before the snapshot is taken,
 *  - makes the covered page inert for screen readers while active,
 *  - adds the two controls the engine lacks (Skip, Pause/Resume),
 *  - tracks the engine's lifecycle so the React trigger can react,
 *  - cleans everything up if the engine fails or is exited.
 */

import type { SwarmEngineApp } from "./types";

export type SwarmPhase = "idle" | "loading" | "active" | "error";

export interface SwarmState {
  phase: SwarmPhase;
  error?: string;
}

const ENGINE_URL = `${import.meta.env.BASE_URL}swarm/swarm-engine.js`;
const HOST_TAG = "swarm-rebuild";

let enginePromise: Promise<void> | null = null;

function getRootEl(): HTMLElement | null {
  return document.getElementById("root");
}

/** Inject the engine script once and resolve when its global is available. */
function loadEngine(): Promise<void> {
  if (window.__swarmRebuild) return Promise.resolve();
  if (enginePromise) return enginePromise;

  enginePromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = ENGINE_URL;
    script.async = true;
    script.dataset.swarmEngine = "true";

    let settled = false;
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      enginePromise = null;
      reject(new Error("The Swarm engine took too long to load."));
    }, 12000);

    const done = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      if (window.__swarmRebuild) resolve();
      else {
        enginePromise = null;
        reject(new Error("The Swarm engine loaded but did not initialize."));
      }
    };

    script.addEventListener("load", done);
    script.addEventListener("error", () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      enginePromise = null;
      reject(new Error("The Swarm engine failed to load."));
    });

    document.head.appendChild(script);
  });

  return enginePromise;
}

class SwarmController {
  private state: SwarmState = { phase: "idle" };
  private listeners = new Set<() => void>();
  private wrappedApp: SwarmEngineApp | null = null;
  private observer: MutationObserver | null = null;
  private pollId: number | null = null;

  /** Simulation time multiplier — >1 fast-forwards (Skip), 1 is normal. */
  private boost = 1;
  private paused = false;
  /** When set, each run starts sped up to keep the motion brief. */
  private reducedMotion = false;

  // -------------------------------------------------------------- reactivity

  getState = (): SwarmState => this.state;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private setState(next: SwarmState) {
    if (next.phase === this.state.phase && next.error === this.state.error) return;
    this.state = next;
    for (const l of this.listeners) l();
  }

  // ------------------------------------------------------------------ public

  /** Start the experience (lazily fetching the engine the first time). */
  async start(reducedMotion = false): Promise<void> {
    if (this.state.phase === "active" || this.state.phase === "loading") return;

    this.reducedMotion = reducedMotion;
    this.paused = false;
    this.setState({ phase: "loading" });
    this.markPage(true);

    try {
      await loadEngine();
      const global = window.__swarmRebuild;
      if (!global) throw new Error("Swarm engine unavailable.");
      // Script auto-starts on first load; explicit start covers re-entry.
      if (!global.app) global.start();
      this.attachToCurrentApp();

      this.watch();
      this.setState({ phase: "active" });
    } catch (err) {
      this.markPage(false);
      this.unwatch();
      this.setState({
        phase: "error",
        error: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  /** Exit the experience. `reveal` fades back to the real page. */
  stop(reveal = true): void {
    const global = window.__swarmRebuild;
    if (!global) {
      this.finish();
      return;
    }
    global.stop(reveal);
  }

  /** Rebuild again from the beginning (uses the engine's own restart). */
  replay(): void {
    const app = window.__swarmRebuild?.app;
    const button = app?.view.root.querySelector<HTMLButtonElement>('[data-a="replay"]');
    if (button) {
      button.click();
      // restart() swaps in a fresh App synchronously; re-wire its new overlay.
      this.attachToCurrentApp();
      this.syncPauseButton();
      return;
    }
    window.__swarmRebuild?.start();
  }

  /** Fast-forward the build to its finished state (real engine, sped up). */
  skip(): void {
    const app = window.__swarmRebuild?.app;
    if (!app) return;
    // Unlock every gated task, then accelerate the simulation clock.
    app.engine.frontier = 1e9;
    this.boost = 20;
    this.paused = false;
    this.syncPauseButton();
  }

  togglePause(): void {
    this.paused = !this.paused;
    this.syncPauseButton();
  }

  setMuted(muted: boolean): void {
    const app = window.__swarmRebuild?.app;
    if (!app?.sfx) return;
    app.sfx.setOn(!muted);
    app.renderSoundBtn?.();
  }

  isMuted(): boolean {
    const sfx = window.__swarmRebuild?.app?.sfx;
    return sfx ? !sfx.on : false;
  }

  isPaused(): boolean {
    return this.paused;
  }

  // ----------------------------------------------------------------- internal

  private markPage(active: boolean): void {
    const root = document.documentElement;
    const appRoot = getRootEl();
    if (active) {
      root.setAttribute("data-swarm-active", "");
      appRoot?.setAttribute("inert", "");
    } else {
      root.removeAttribute("data-swarm-active");
      appRoot?.removeAttribute("inert");
    }
  }

  /** `P` pauses/resumes, mirroring the engine's `M` (mute) and `Esc` (exit). */
  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "p" && event.key !== "P") return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    event.preventDefault();
    this.togglePause();
  };

  private watch(): void {
    window.addEventListener("keydown", this.onKeyDown, true);
    if (!this.observer) {
      this.observer = new MutationObserver(() => {
        const host = document.querySelector(HOST_TAG);
        if (host) this.attachToCurrentApp();
        else this.finish();
      });
      this.observer.observe(document.documentElement, { childList: true });
    }
    if (this.pollId == null) {
      // Cheap safety net: the engine swaps its App instance on replay.
      this.pollId = window.setInterval(() => {
        const host = document.querySelector(HOST_TAG);
        if (host) this.attachToCurrentApp();
        else this.finish();
      }, 400);
    }
  }

  private unwatch(): void {
    window.removeEventListener("keydown", this.onKeyDown, true);
    this.observer?.disconnect();
    this.observer = null;
    if (this.pollId != null) {
      window.clearInterval(this.pollId);
      this.pollId = null;
    }
  }

  /** Everything is gone — hand control back to the page. */
  private finish(): void {
    this.unwatch();
    this.markPage(false);
    this.wrappedApp = null;
    this.paused = false;
    this.boost = 1;
    this.setState({ phase: "idle" });
  }

  private attachToCurrentApp(): void {
    const app = window.__swarmRebuild?.app;
    if (!app || app === this.wrappedApp) return;
    this.wrappedApp = app;
    // A fresh App means a fresh build — reset speed, but honour reduced motion.
    this.boost = this.reducedMotion ? 4 : 1;
    this.paused = false;
    this.installStepWrapper(app);
    this.injectHudControls(app);
    this.wrapCompletion(app);
  }

  /**
   * The engine reports `Rebuilt by N agents in Xs`, where X is simulated time.
   * After a fast-forward that number is huge, so trim it down to the honest,
   * useful part.
   */
  private wrapCompletion(app: SwarmEngineApp): void {
    const original = app.onComplete?.bind(app);
    if (!original) return;
    app.onComplete = () => {
      original();
      if (this.boost > 1) {
        const status = app.view.root.querySelector(".status");
        if (status?.textContent) {
          status.textContent = status.textContent.replace(/ in [\d.,]+s$/, "");
        }
      }
    };
  }

  /**
   * Wrap the engine's per-frame `step` so we can (a) accelerate the simulated
   * clock for Skip and (b) freeze it for Pause — without touching engine code.
   * The engine clamps a single step to 0.05s, so a fast-forward is many 0.05s
   * steps in one frame rather than one large step.
   */
  private installStepWrapper(app: SwarmEngineApp): void {
    const engine = app.engine;
    const original = engine.step.bind(engine);
    engine.step = (dt: number) => {
      if (this.paused) return;
      if (this.boost > 1) {
        for (let i = 0; i < this.boost; i++) original(0.05);
      } else {
        original(dt);
      }
    };
  }

  private injectHudControls(app: SwarmEngineApp): void {
    const root = app.view.root;
    const hud = app.view.hud;
    if (!root || !hud) return;

    // The engine's HUD is a single non-wrapping row; on phones it would overflow
    // (and `contain: strict` clips it). Let it wrap and shrink so every control
    // stays on screen. Scoped to .hud, so nothing else is affected.
    if (!root.querySelector("style[data-swarm-style]")) {
      const style = document.createElement("style");
      style.setAttribute("data-swarm-style", "1");
      style.textContent = `
        .hud{max-width:min(680px,calc(100vw - 16px));flex-wrap:wrap;justify-content:center;row-gap:6px}
        .hud .bar{flex:1 1 48px;min-width:48px}
        @media (max-width:640px){
          .hud{gap:6px;padding:8px;bottom:12px}
          .hud button{padding:6px 8px}
          .hud .dots{padding-left:2px}
        }
      `;
      root.appendChild(style);
    }

    if (hud.querySelector("[data-swarm-ctl]")) return;

    const make = (action: string, label: string, title: string) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.a = action; // unknown to the engine, so it ignores it
      button.dataset.swarmCtl = "1";
      button.textContent = label;
      button.title = title;
      return button;
    };

    const pause = make("pause", "Pause", "Pause the swarm (P)");
    const skip = make("skip", "Skip", "Skip to the finished page");

    pause.addEventListener("click", () => this.togglePause());
    skip.addEventListener("click", () => this.skip());

    const close = hud.querySelector('[data-a="close"]');
    hud.insertBefore(skip, close);
    hud.insertBefore(pause, skip);
  }

  private syncPauseButton(): void {
    const button = window.__swarmRebuild?.app?.view.root.querySelector<HTMLButtonElement>(
      '[data-swarm-ctl][data-a="pause"]'
    );
    if (button) button.textContent = this.paused ? "Resume" : "Pause";
  }
}

export const swarmController = new SwarmController();
