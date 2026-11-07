# Swarm Rebuild engine (vendored)

`swarm-engine.js` is the unmodified Swarm Rebuild engine from
[`DhvanilPatel/swarm-cursors`](https://github.com/DhvanilPatel/swarm-cursors)
(`swarm-rebuild/swarm.js`), vendored so the portfolio can run it natively in the
browser without a Chrome extension.

- Source repo: https://github.com/DhvanilPatel/swarm-cursors
- Source file: `swarm-rebuild/swarm.js`
- Vendored from commit: `3d49e0ac96172eb6af7ae8229b2152121bed2092`
- Size: ~149 KB, zero dependencies, one IIFE.

## What it does

It snapshots the live page DOM into a blueprint (boxes, text, media, borders,
repeated components, ruler guides), blanks the page with a shadow-DOM overlay,
and lets a swarm of animated multiplayer cursors rebuild it: crosshair-drawn
rects, typed text, pen-tool lines, ruler snapping and alt-drag duplicates.

The engine was originally written as a Chrome extension content script. It
happens to run unchanged as a normal page script:

- The only extension call (`chrome.runtime.sendMessage`) is guarded by
  `typeof chrome !== "undefined" && chrome.runtime`, so it is skipped in a page.
- The optional click-time screenshot used for canvas/video/iframe crops
  (`window.__swarmShot`) simply stays `undefined`. The portfolio has no such
  elements, so the engine uses its built-in placeholders/clones instead.

## Public surface

Loading the script immediately starts the experience and exposes:

```js
window.__swarmRebuild = { toggle(), start(), stop(reveal), app, debug }
```

`app.view.root` is the open shadow root holding the HUD (Tour, speed, sound,
Go live, Replay, Exit) and the animation layers.

## Loading

It is served statically from `/swarm/swarm-engine.js` and injected on demand by
`src/swarm/SwarmController.ts`, so it never affects first paint or the initial
bundle.

## Credit & license

The motion design — cursor set, flocking physics, build choreography, rulers —
belongs to [Joel Califa](https://joelcalifa.com)'s
[Swarm](https://github.com/califa/swarm-site). Swarm Rebuild, by
[Dhvanil Patel](https://github.com/DhvanilPatel), adapts it for arbitrary pages.
The upstream README states there is no license yet and asks that the code not be
reused without checking with Joel Califa. This vendored copy is included on the
basis of the permission the site owner states they obtained; keep that in mind
before redistributing.
