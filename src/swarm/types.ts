/**
 * Structural types for the vendored Swarm Rebuild engine
 * (see public/swarm/README.md). Only the members the portfolio touches are
 * typed; the engine itself is untyped, dependency-free JavaScript.
 */

export interface SwarmEngineSound {
  on: boolean;
  blocked: boolean;
  setOn: (on: boolean) => void;
  resume: () => void;
}

export interface SwarmEngineView {
  root: ShadowRoot;
  host: HTMLElement;
  hud: HTMLElement;
  [key: string]: unknown;
}

export interface SwarmEngineCore {
  /** Advances the simulation by `dt` seconds. Wrapped by SwarmController. */
  step: (dt: number) => void;
  /** Unlock frontier: tasks below this Y never wait for a scroll. */
  frontier: number;
  cursors: unknown[];
  started: boolean;
  ready: boolean;
  [key: string]: unknown;
}

export interface SwarmEngineApp {
  view: SwarmEngineView;
  engine: SwarmEngineCore;
  sfx?: SwarmEngineSound;
  renderSoundBtn?: () => void;
  /** Called once by the engine when every layer has been rebuilt. */
  onComplete?: () => void;
  [key: string]: unknown;
}

export interface SwarmGlobal {
  toggle: () => void;
  start: () => void;
  stop: (reveal?: boolean) => void;
  readonly app: SwarmEngineApp | null;
}

declare global {
  interface Window {
    /** Present once the vendored engine script has executed. */
    __swarmRebuild?: SwarmGlobal;
    /** Optional extension screenshot hook; unused in the page integration. */
    __swarmShot?: string | null;
    /** Set by SwarmController while a wrapped engine instance is installed. */
    __swarmWrapped?: boolean;
  }
}
