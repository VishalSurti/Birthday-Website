# Birthday Website — Project Status

**Current phase:** Day 9 — For You complete
**Next phase:** Day 10 — Open When

## Completed / Locked

- Day 1 — Product Spec & Scope
- Day 2 — UI/UX Research & Visual Direction
- Day 3 — Information Architecture
- Day 4 — Low-Fidelity Mobile Wireframes
- Day 5 — High-Fidelity Mobile Design
- Day 6 — Design System / repository preparation
- Day 7 — Frontend Project Foundation
- Day 8 — App Shell & Navigation
- Day 9 — For You

## Foundation Decisions

- React, Vite and strict TypeScript at the repository root; npm with committed lockfile, Node 22.23.3 / npm 10.
- React Router browser-history routing with an outlet layout, placeholder routes and unknown-route recovery.
- Plain CSS / CSS custom properties for approved tokens, reset, global styling, content widths and safe areas.
- Self-hosted Fontsource Newsreader and Geist normal Latin variable fonts, visible fallback text and `font-display: swap`.
- ESLint, Prettier and a minimal Vitest / React Testing Library / jsdom foundation; tracked-path privacy safeguard.
- Full health checks, production build and Chrome checks across all eight reference viewports passed. At Day 7 completion, all routes were placeholders.

## Day 8 Shell Decisions

- Shared AppShell and PageHeader; four persistent bottom-navigation destinations with local decorative SVG icons and permanently visible labels.
- React Router NavLink supplies current-page state; Ink/weight and a Plum indicator distinguish the active route.
- Top-level routes share the navigation shell; focused letter and fallback routes exclude it and provide parent/Home recovery.
- Shared safe-area and bottom-clearance rules; natural document scrolling; Home/reader/Story width tokens and centred navigation contents on wider screens.
- Keyboard focus stays on persistent navigation during peer route changes; a skip link moves focus to content without changing history.
- Ten tests, all required health checks and production build pass. Chrome checks passed at all eight reference viewports, including keyboard/history, long-content clearance, reduced motion and simulated safe areas. Safari/iOS and physical-device testing remain unverified.

## Day 9 For You Decisions

- Featured and All Messages are browsing states within `/for-you`; the complete collection retains authored order and includes seen and unseen messages.
- Deliberate opening reaches a full-height Paper reader before recording seen state. Read again retains the original session featured identity; Discover another first presents a closed candidate requiring its own activation.
- Pure injectable-random selection prefers unseen messages, falls back to the full collection and avoids immediate eligible repeats. Discovery excludes the last displayed candidate when alternatives exist.
- A small feature-scoped store uses versioned localStorage for seen IDs and the last featured ID, and sessionStorage for the active featured ID across route changes/reloads. Malformed, incompatible or unavailable storage uses safe defaults and in-memory operation. Removed IDs are ignored.
- Native modal dialog contains focus, hides primary navigation, supports Close/Escape and uses same-route history state for browser Back. Focus and collection scroll are restored; long writing scrolls naturally within the reader.
- Six unmistakable public development fixtures exercise short, untitled and long content. Private integration remains deferred; no later feature or unrelated persistence was added.
- 35 tests, required project checks and production build pass. Chrome verification passed all eight reference viewports, reader/discovery/collection flows, session reload, keyboard focus, reduced motion and simulated safe areas. Safari/iOS and physical-device QA remain unverified.

## Next

1. Implement Day 10 — Open When from the locked documents.
2. Continue later feature implementation in its scheduled phase.

## Genuine Implementation Decisions Remaining

- broader application persistence for later features; For You storage is implemented, while letter, Reveal and installation state remain deferred
- PWA/service-worker tooling and cache strategy
- final PWA name and icon artwork
- final Open Graph preview artwork
- final private content and photography integration

Core V1 voice/audio remains excluded unless the Product Specification's later inclusion gate is explicitly approved.

No known product, navigation, wireframe or high-fidelity design conflict currently blocks implementation.
