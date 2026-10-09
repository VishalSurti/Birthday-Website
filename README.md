# Birthday Website V1

Frontend foundation: React, Vite, strict TypeScript, React Router and plain CSS. Approved product/design documents at the repository root remain authoritative; start with `AGENTS.md`.

## Local development

Use Node 22.23.3 (`.nvmrc`) and npm 10. With nvm installed:

```sh
nvm install
nvm use
npm ci
npm run dev
```

No environment variables are needed. Run `npm run check` for typecheck, lint, tests, formatting and tracked-path privacy checks. Run `npm run build` for production output and `npm run preview` to inspect it locally. `npm run test:watch` and `npm run format` support development. Formatting deliberately excludes the approved root Markdown documents and all private content.

## Foundation boundaries

For You at `/for-you` provides Featured, All Messages and a focused reader using public development fixtures. Routes `/`, `/open-when`, `/open-when/:letterId` and `/our-story` remain placeholders. Unknown paths offer recovery to Home. Browser-history routing requires a future static host to fall back to `index.html` for application routes; Vite handles this locally. The shared Day 8 shell provides four-destination bottom navigation on top-level routes. Focused letter and unknown routes use a separate layout without primary navigation. The For You reader uses same-route history state and a native modal dialog; Close, Escape and Back return to its browsing state. There is no public Reveal route, first-use state or PWA implementation yet.

CSS foundations live in `src/styles/`; route declarations in `src/app/`. Newsreader and Geist use locally bundled normal Latin variable fonts with `font-display: swap` and approved fallbacks. Extend language subsets only when real content requires them.

## Content and privacy

Read `content/README.md`, `CONTENT_SCHEMA.md` and `public/app-assets/README.md` before adding content/assets. For You loads only the clearly labelled public development fixtures in `content/sample/for-you.json`. Never commit private content. `npm run privacy:check` checks tracked paths, not the meaning of arbitrary file contents. Noindex and an unlisted URL are not authentication.

## For You state

The feature-scoped store exposes the session featured message without marking it seen, ready for later Home integration. `birthday.for-you.v1` in localStorage stores version 1, deduplicated seen IDs and the last featured ID solely for repeat avoidance. `birthday.for-you.session.v1` in sessionStorage holds version 1 and the active featured ID across route changes and reloads. Session lifetime follows browser sessionStorage behavior, including browser session restoration.

Seen state is recorded after readable content renders. Invalid or removed IDs are ignored; malformed/incompatible/unavailable storage falls back safely, with in-memory functionality when writes fail. No letter, Reveal or installation state is stored. Private content integration and broader application persistence remain later work.
