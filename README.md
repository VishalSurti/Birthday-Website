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

For You at `/for-you` provides Featured, All Messages and a focused reader using public development fixtures. Open When at `/open-when` provides a letter collection; `/open-when/:letterId` is its dedicated reader. Our Story at `/our-story` is a continuous narrative with a same-memory photo viewer. Home at `/` remains a placeholder with a development-only hero media slot. Unknown paths offer recovery to Home. Browser-history routing requires the static host to fall back to `index.html` for application routes; `vercel.json` supplies the Vercel rewrite, and Vite handles it locally. The shared Day 8 shell provides four-destination bottom navigation on top-level routes. Letter readers and unknown routes use focused layouts without primary navigation. The For You reader uses same-route history state and a native modal dialog; Close, Escape and Back return to its browsing state. The Day 12 entry gate resolves Reveal completion before exposing any normal route. The production build includes the PWA layer described below.

CSS foundations live in `src/styles/`; route declarations in `src/app/`. Newsreader and Geist use locally bundled normal Latin variable fonts with `font-display: swap` and approved fallbacks. Extend language subsets only when real content requires them.

## Content and privacy

Read `content/README.md`, `CONTENT_SCHEMA.md` and `public/app-assets/README.md` before adding content/assets. For You, Open When and Our Story load only clearly labelled public fixtures under `content/sample/`. Story imagery uses local artificial SVG development assets. Never commit private content. `npm run privacy:check` checks tracked paths, not the meaning of arbitrary file contents. Noindex and an unlisted URL are not authentication.

## For You state

The feature-scoped store exposes the session featured message without marking it seen, ready for later Home integration. `birthday.for-you.v1` in localStorage stores version 1, deduplicated seen IDs and the last featured ID solely for repeat avoidance. `birthday.for-you.session.v1` in sessionStorage holds version 1 and the active featured ID across route changes and reloads. Session lifetime follows browser sessionStorage behavior, including browser session restoration.

Seen state is recorded after readable content renders. Invalid or removed IDs are ignored; malformed/incompatible/unavailable storage falls back safely, with in-memory functionality when writes fail. For You stores no letter, Reveal or installation state. Private content integration remains later work.

## Open When state

The independent feature store writes only `{ version: 1, openedLetterIds }` to `birthday.open-when.v1` in localStorage. A valid committed reader records opening, including direct entry; collection display/selection never does. Removed IDs and malformed/incompatible values are ignored. Storage failures preserve reading and in-memory state.

The collection uses single-column cards at every width, constrained by the existing reader measure. First opening uses 320ms motion; repeat opening uses 220ms; reduced motion navigates directly. Routing uses a cancellable timer rather than animation events. A temporary in-memory return context restores the selected card and collection scroll position. Known collection-originated readers use browser Back; direct entry safely links to the parent. Optional letter photographs use shared image handling; one public development image exercises this path.

## Our Story and photo viewer

`content/sample/our-story.json` supplies 12 placeholder chapters, optional metadata/highlights and zero to three local images per memory. Six geometric SVGs under `public/app-assets/story-placeholders/` are development-only; replace the content references with private writing/photography before release. No rendering-component filenames need to change. Images reserve space, load progressively and fail without hiding writing.

The native full-screen dialog receives only its originating memory. Buttons, keyboard arrows and thresholded touch swipes stop at that memory's first/last photo; a single image has no navigation controls. One same-route history entry supports Close/Escape/browser Back, with image focus and Story position restored. Photo changes use component state, without adding history entries.

Our Story adds no persistent read/view/completion state and never accesses localStorage or sessionStorage. Viewer and return context exist only in transient component/DOM/history state. There are no individual memory or gallery routes.

## Birthday Reveal and entry

Incomplete visits, including explicit internal URLs, show the deliberate opening before the four-scene Reveal. Successful first completion always lands at the existing Home placeholder. Returning root visits open Home; completed explicit internal routes remain usable.

`birthday.reveal.v1` stores only version 1 and `birthdayRevealCompleted`. The final scene entrance completes before its single 1500ms celebration; only the celebration's successful finish records completion and enables Continue. Timers are cancelled on unmount and do not depend on CSS animation events. Reduced motion uses the same completion interval with calm accents. There is no persisted scene or replay progress; failed writes preserve completion in memory for the current runtime.

More on the four top-level pages exposes Replay Birthday Surprise and installation where relevant. The internal `/birthday-reveal` route requires an ephemeral authorization created by More; direct typing/reload cannot resume replay. Exit returns to the originating top-level history entry, finish goes to Home, and replay never clears completion. Installation is optional and independent of replay.

`content/sample/birthday-reveal.json` and two artificial SVGs in `public/app-assets/reveal-placeholders/` are development-only. Replace opening/Reveal copy and asset references with authentic content from ignored private paths before release. Invalid sequences cannot complete; optional image failure preserves text and deliberate progression.

## Shared images

`src/components/media/` contains one `ImageReference` validator and one `MediaImage` component. References use `{ src, alt, width?, height? }`; supply actual positive width/height metadata for stable layout. The wrapper reserves the intrinsic ratio, or a feature-selected fallback, through loading and failure. Alt text passes through unchanged; empty decorative alt stays silent. Feature layouts choose cover/contain and keep their own spacing/radii.

Lower Story images and optional letter photos use native lazy loading. Opening/Home critical images are eager/high priority; the active Reveal/viewer image is eager without high priority. There is no media store, preload system, image service or responsive-variant pipeline. Home has only its development 4:3 hero slot, not the full Home experience.

Public artificial placeholders remain under `/public/app-assets/`. Real photos belong in ignored `/public/private-assets/` and authored private references in `/content/private/`; never commit them. Choose final photo sizes/compression and browser-supported formats during private integration, with contextual alt text based on actual photographs. Audio/video remain outside Core V1.

## PWA build and installation

`npm run build` uses `vite-plugin-pwa` to generate the manifest, registration script and service worker. Run `npm run pwa:check` after building, then `npm run preview` for production/offline verification in a separate browser profile. Normal Vite development does not register a service worker. Deployment requires HTTPS (localhost is supported for testing) and the host must serve `index.html` for uncached application deep links; no hosting provider is assumed.

The public-safe name **Birthday Website** / **Birthday** and geometric Canvas/Plum icons are provisional. PNGs at 192/512px, an Apple 180px icon and a replaceable SVG source live under `public/app-assets/icons/`. Final name/icon artwork remain release decisions; existing noindex and non-spoiler external metadata are preserved.

The install event is captured early into memory and its default promotion suppressed. The completed normal app must actually follow **Home → For You/Open When/Our Story → Home** before a restrained suggestion can appear, at most once per runtime. A valid nested letter reader can count after Home; intercepted pre-Reveal links and replay cannot qualify. Nothing appears during opening, first Reveal or immediate first Home. Capturing an event never calls its native prompt: only an explicit Install action does.

**Not now** (or native dismissal) writes only `{ version: 1, installPromptDismissed: true }` to `birthday.install.v1` through the shared safe-storage helper. Failures retain dismissal in memory; a future runtime may reset. More retains Install/Add to Home Screen after proactive dismissal. Without a native event, the explicit action opens concise browser/iOS guidance in the existing sheet design. Standalone detection and `appinstalled` hide install surfaces, retaining Replay. No eligibility/visit/shown/installed state is persisted; the four earlier persistence records are unchanged.

## Offline cache boundaries

One generated revisioned precache covers the SPA shell, hashed JS/CSS, bundled writing, both local fonts, public placeholder images, manifest/registration and public icons. Changed assets generate new revisions; the worker automatically activates/claims clients and cleans obsolete precache entries. Existing running writing/Reveal is not forcibly reloaded; a subsequent document load uses the updated shell. There is no update UI or sync infrastructure.

Precaching uses public-only patterns plus an explicit `**/private-assets/**` exclusion. **Future private filenames must never be added to the public precache manifest**, including through broad `includeAssets` options. Private assets are also excluded from SPA navigation fallback. One bounded `birthday-private-images` cache (60 entries, StaleWhileRevalidate) handles only requested same-origin image resources under `/private-assets/`; it does not prefetch/list private media or cache arbitrary GETs, cross-origin resources or audio. Cache Storage is device-local and is not uploaded or exposed in UI. An unlisted URL/noindex remains controlled distribution, not authentication.

Offline operation requires a successful previous online load/cache installation. After that, normal routes and bundled writing/public imagery work offline; actually viewed private images may remain available. Missing uncached imagery uses `MediaImage` failure handling and keeps writing/viewer escape usable. A first-ever uncached offline visit cannot load the application. Real Safari/iOS and Android installation plus production-host deployment still require release verification.

## Deployment preparation

Vercel is the selected static host for the first deployment. Import the existing GitHub repository with the **Vite** framework preset, repository-root directory, `npm ci` install command, `npm run build` build command and `dist` output directory. Use Node **22.x**, consistent with the existing package engine range. No environment variables, backend, provider SDK or runtime functions are required. Keep `main` as the production branch; connected Git pushes provide subsequent deployments.

The root `vercel.json` uses Vercel's documented SPA rewrite to `/index.html` so direct application URLs and refreshes reach React Router. Existing public build assets remain part of the static output. Source maps are not emitted. Keep the existing noindex/non-spoiler metadata and use the production domain that is reachable without visitor sign-in, consistent with the locked unlisted-URL model.

Before any deployment, run `npm ci`, `npm run check`, `npm run build` and `npm run pwa:check`. Inspect `dist/` as well as Git: Vite copies `public/`, including any locally ignored assets, into the build. The initial deployment must contain only the public development fixtures; do not upload a local build containing private assets or credentials. Prefer the connected GitHub build for this initial public-safe version.

Repository preparation does not prove deployment success. After hosting-account/GitHub authorization, verify the actual HTTPS production URL, valid/unknown direct routes and refreshes, first-use/returning flows, PWA registration, install timing, cached offline operation and updates. Real Safari/iOS, Android-browser and physical-device verification remains pending. Day 19 is not complete until live verification is recorded in `PROJECT_STATUS.md`.
