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

Routes `/`, `/for-you`, `/open-when`, `/open-when/:letterId` and `/our-story` are placeholders. Unknown paths offer recovery to Home. Browser-history routing requires a future static host to fall back to `index.html` for application routes; Vite handles this locally. The shared Day 8 shell provides four-destination bottom navigation on top-level routes. Focused letter and unknown routes use a separate layout without primary navigation. Day 9 is For You; all feature pages remain placeholders. There is no public Reveal route, first-use state, persistence or PWA implementation yet.

CSS foundations live in `src/styles/`; route declarations in `src/app/`. Newsreader and Geist use locally bundled normal Latin variable fonts with `font-display: swap` and approved fallbacks. Extend language subsets only when real content requires them.

## Content and privacy

Read `content/README.md`, `CONTENT_SCHEMA.md` and `public/app-assets/README.md` before adding content/assets. The sole sample message is a public development fixture, not loaded into the UI. Never commit private content. `npm run privacy:check` checks tracked paths, not the meaning of arbitrary file contents. Noindex and an unlisted URL are not authentication.
