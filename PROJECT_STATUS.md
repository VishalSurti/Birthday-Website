# Birthday Website — Project Status

**Current phase:** Day 8 — App Shell & Navigation complete
**Next phase:** Day 9 — For You

## Completed / Locked

- Day 1 — Product Spec & Scope
- Day 2 — UI/UX Research & Visual Direction
- Day 3 — Information Architecture
- Day 4 — Low-Fidelity Mobile Wireframes
- Day 5 — High-Fidelity Mobile Design
- Day 6 — Design System / repository preparation
- Day 7 — Frontend Project Foundation
- Day 8 — App Shell & Navigation

## Foundation Decisions

- React, Vite and strict TypeScript at the repository root; npm with committed lockfile, Node 22.23.3 / npm 10.
- React Router browser-history routing with an outlet layout, placeholder routes and unknown-route recovery.
- Plain CSS / CSS custom properties for approved tokens, reset, global styling, content widths and safe areas.
- Self-hosted Fontsource Newsreader and Geist normal Latin variable fonts, visible fallback text and `font-display: swap`.
- ESLint, Prettier and a minimal Vitest / React Testing Library / jsdom foundation; tracked-path privacy safeguard.
- Full health checks, production build and Chrome checks across all eight reference viewports passed. All routes remain placeholders.

## Day 8 Shell Decisions

- Shared AppShell and PageHeader; four persistent bottom-navigation destinations with local decorative SVG icons and permanently visible labels.
- React Router NavLink supplies current-page state; Ink/weight and a Plum indicator distinguish the active route.
- Top-level routes share the navigation shell; focused letter and fallback routes exclude it and provide parent/Home recovery.
- Shared safe-area and bottom-clearance rules; natural document scrolling; Home/reader/Story width tokens and centred navigation contents on wider screens.
- Keyboard focus stays on persistent navigation during peer route changes; a skip link moves focus to content without changing history.
- Ten tests, all required health checks and production build pass. Chrome checks passed at all eight reference viewports, including keyboard/history, long-content clearance, reduced motion and simulated safe areas. Safari/iOS and physical-device testing remain unverified.

## Next

1. Implement Day 9 — For You from the locked documents.
2. Continue later feature implementation in its scheduled phase.

## Genuine Implementation Decisions Remaining

- exact local-storage/session-state implementation
- PWA/service-worker tooling and cache strategy
- final PWA name and icon artwork
- final Open Graph preview artwork
- final private content and photography integration

Core V1 voice/audio remains excluded unless the Product Specification's later inclusion gate is explicitly approved.

No known product, navigation, wireframe or high-fidelity design conflict currently blocks implementation.
