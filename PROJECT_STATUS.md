# Birthday Website — Project Status

**Current phase:** Day 17 — Animations & Motion Polish complete
**Next phase:** Day 18 — Accessibility & Performance

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
- Day 10 — Open When
- Day 11 — Our Story
- Day 12 — Birthday Reveal
- Day 13 — Media Support
- Day 14 — Mobile Responsiveness
- Day 15 — Local Persistence
- Day 16 — PWA Setup
- Day 17 — Animations & Motion Polish

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

## Day 10 Open When Decisions

- Nine unmistakable public placeholder letters; validation retains authored order and the first valid ID, ignoring malformed items. Optional images remain deferred until private content integration.
- Single-column collection with constrained desktop width, abstract seam motif and textual Unopened / Opened before states; all letters remain accessible and reopenable.
- First opening uses the 320ms transitional token; repeat opening uses the lighter 220ms standard token. Reduced motion navigates directly; routing uses a cancellable timer and never depends on animation events.
- Dedicated `/open-when/:letterId` Paper reader remains outside the navigation shell, with safe-area gutters, long natural page scrolling and no Previous/Next controls.
- Independent versioned localStorage persists only opened-letter IDs after a valid reader commits, including direct entry. Duplicate/stale IDs are ignored; malformed/incompatible/unavailable storage falls back safely to in-memory operation.
- Collection-originated Back uses known history context; direct-entry and invalid-reader recovery safely lead to Open When. Temporary in-memory context restores the selected card's focus and approximate collection scroll position.
- 54 tests, all required checks and production build pass. Chrome verification passed all eight reference viewports, first/repeat opening, lower-card return context, direct/invalid routes, keyboard focus, reduced motion, simulated safe areas and storage denial. Safari/iOS and physical-device QA remain unverified.
- For You runtime behavior is unchanged; one existing regression test now waits for its post-render seen-state effect. No dependencies, private content or later feature work were added.

## Day 11 Our Story Decisions

- Continuous `/our-story` narrative with introduction, 12 authored-order public placeholder chapters and open-ended closing; optional time labels/highlights are omitted when absent.
- Varied text-only, single-image, paired-image and three-image compositions, with generous chapter spacing and constrained narrative width. Compact phones stack two-image memories; three-image memories retain a larger primary image above a supporting pair.
- Six locally authored geometric SVGs are development-only. Root-relative content references and reserved image sizing support later private replacements; shared image-failure handling preserves writing and viewer escape/navigation.
- Native full-screen Deep Ink dialog contains each photo without cropping and receives only its originating memory. Previous/Next, keyboard arrows and thresholded touch swipe stop at that memory's first/last photo. Single-image viewers have no photo navigation or pagination dots.
- Same-route history supports Close/Escape/browser Back; photo changes use component state without extra history entries. Native modality isolates the background and hides navigation; originating focus and scroll position are restored.
- No Story storage utility, localStorage/sessionStorage calls, read/view/completion state, memory routes or gallery route. Viewer/history context is transient only; Reveal/install persistence remains deferred.
- 84 tests, all required checks and production build pass. Chrome verified all eight reference viewports, real emulated touch swipes, both photo boundaries, selected-image entry, focus/scroll restoration, reduced motion, simulated safe areas and failed images. Instrumented Story flows made zero browser-storage calls.
- Browser regressions passed for Home, For You reader/seen persistence, Open When reader/opened persistence, navigation and unknown-route recovery. For You and Open When runtime code/tests were unchanged. Safari/iOS and physical-device QA remain unverified.

## Day 12 Birthday Reveal Decisions

- One entry gate wraps existing routes. Incomplete root, internal and unknown routes show the deliberate opening without normal content/navigation; first completion always arrives at Home. Completed explicit internal routes remain valid.
- Four validated public placeholder scenes and two artificial local SVGs use the Canvas opening and full-screen Deep Ink Reveal. Meaningful progression is deliberate, keyboard usable and protected against repeated activation during transitions.
- `birthday.reveal.v1` stores only `{ version: 1, birthdayRevealCompleted: true }`. Completion is written after the final entrance and its single 1500ms celebration finish, never when the final scene merely appears. Reduced motion preserves that finish point with static accents and short fades. No scene/replay progress is stored; interruption restarts through the opening.
- Storage failure keeps current-runtime completion usable; a fresh launch safely defaults to incomplete. Content validation requires a coherent sequence with one final scene at the end; failed optional images preserve writing and progression.
- Shared PageHeader More opens a native Paper bottom sheet containing only Replay Birthday Surprise. Escape, outside click and browser Back dismiss it; focus returns to More. Installation remains deferred.
- Replay requires an in-memory authorization from More; direct entry/reload of `/birthday-reveal` cannot resume replay. It starts at Scene 1 without the opening, offers Exit to the existing originating top-level history entry, never clears completion, and finishes at Home. Consumed replay history cannot restart the sequence.
- Home remains its placeholder. For You, Open When and Our Story runtime implementations are unchanged; Our Story still has no persistent read/view/completion state. No PWA, audio, dependencies or Day 13 work were added.
- 125 tests, all required checks and the production build pass. Chrome verified all eight reference viewports, first-use/deep-link gating, final timing, interruption, replay/history, keyboard/focus, reduced motion, simulated safe areas, image failure and prior-feature regressions. Safari/iOS and physical-device QA remain unverified.

## Day 13 Media Support Decisions

- One shared `ImageReference` type/validator accepts local static URLs, including future ignored private assets, preserves authored alt text (including decorative empty alt), and ignores invalid optional dimensions. Story, Reveal and letters share this validation.
- One `MediaImage` primitive owns native image rendering, intrinsic dimensions, reserved actual/fallback aspect ratio, silent Soft Surface loading and restrained failure handling. Feature CSS retains layout, radius and spacing; callers choose cover/contain. The obsolete StoryImage/RevealImage wrappers and duplicate fallback/validation code were removed.
- Story retains authored 0–3-image compositions, lazy lower imagery and its contained, eager current-image viewer. Same-memory swipe/keyboard scope, focus/scroll restoration and zero Story persistence remain unchanged.
- Opening and development Home hero are eager/high priority; active Reveal media and the current viewer image are eager without high priority. Other Story imagery and optional letter photography are lazy. No image preloads, srcset pipeline, media store or new dependencies.
- One optional photograph is exercised in the nine-letter sample collection. One new 272-byte geometric SVG is shared with the narrow 4:3 Home hero slot; Home otherwise remains its explicit placeholder. Reveal consumes known development-image dimensions without changing completion timing or state.
- 153 tests, all seven required health checks and the production build pass. Chrome media checks passed all eight reference sizes, including image failures, viewer controls, Reveal regressions and simulated safe areas. Network inspection found 13 of 14 Story images lazy and only three initially requested at 375px; the opening made one High-priority image request. Safari/iOS and physical-device testing remain unverified.
- Public/private separation remains intact. Real photo selection, dimensions, contextual alt text and compression remain private-content integration work; no audio/video, PWA caching or Day 14 general responsive changes were added.

## Day 14 Responsive Decisions

- At normal text size, the full baseline passed all nine viewport sizes, including the additional 320 × 568 stress test. Existing content widths, safe areas, media compositions, readers, viewer and More sheet were retained.
- At 200% root text size, compact-phone navigation labels overlapped and For You controls broke words. Navigation labels now wrap with aligned icons; shell clearance reserves two label lines, and the existing For You control row wraps naturally.
- Enlarged Reveal writing was clipped by its fixed viewport height. Reveal now keeps a full-viewport minimum and grows naturally when needed; the existing landscape rule reserves text-scaled space above the cue. Completion timing, replay and storage behavior are unchanged.
- Four CSS files changed; existing tokens and the existing landscape query were reused. No new breakpoints, dependencies, JavaScript viewport branches, duplicated markup or later-phase features were added.
- Final Chrome 155 checks passed 320 × 568, 360 × 800, 375 × 667, 390 × 844, 412 × 915, 430 × 932, 844 × 390, 768 × 1024 and 1440 × 900. Checks covered horizontal overflow, controls, navigation clearance, media states, Story compositions, dialogs, opening/Reveal, simulated safe areas and enlarged text. Keyboard/history, emulated touch, reduced motion and media-failure regressions passed; Story still made zero persistent-storage calls.
- All seven required project commands passed, including all 153 tests and the production build. Safari/iOS, Android browser and physical-device testing remain unverified.

## Day 15 Persistence Decisions

- One small `src/lib/persistence.ts` boundary replaces duplicated safe browser access, JSON parsing, version checks and write handling. Dependency-injected feature stores retain their domain validation, runtime snapshots, actions and subscriptions; no global state store or migration layer was added.
- All four existing keys and version-1 payloads remain unchanged: local `birthday.for-you.v1` (`version`, `seenIds`, `lastFeaturedId`), local `birthday.open-when.v1` (`version`, `openedLetterIds`), local `birthday.reveal.v1` (`version`, `birthdayRevealCompleted`), and session-only `birthday.for-you.session.v1` (`version`, `featuredId`). Existing valid records work without migration.
- For You still saves initial session identity and previous-featured non-repeat support without marking seen; only actual reader reveal marks seen. Active featured identity remains stable through navigation/reload and session-only. Known-ID validation and deduplication remain feature-owned; stale IDs are ignored and excluded from subsequent writes.
- Open When still marks opened only after valid reader arrival. Reveal still completes only after the final entrance and celebration interval; interruption restarts through deliberate opening, and replay remains idempotent. Story still has no persistent state; navigation, viewer, replay and scroll context remain transient.
- Missing, malformed, non-object or incompatible records use safe defaults. Denied storage access, failed reads and failed writes remain silent; successful interactions retain in-memory state, while fresh instances may reset. Clearing storage between instances safely restores first-use defaults, and malformed records remain isolated by feature.
- Install-dismissal persistence is intentionally deferred to Day 16 because no installation experience consumes it yet. No unused field, PWA behavior, dependency, backend, cloud sync, content snapshot or tracking state was added.
- All 153 existing tests remain, with 27 new boundary/resilience/compatibility tests: 180 tests pass. All seven required project commands and the production build pass. Isolated Chrome verified actual payload fields, normal/cleared state, session stability/non-repeat, reader timing, Reveal interruption/completion, injected access/write denial, zero Story storage calls and layout/flow regressions at 375 × 667 and 1440 × 900. Safari/iOS, Android browser and physical-device verification remain outstanding.

## Day 16 PWA Decisions

- `vite-plugin-pwa` 2.0.0 is the only new direct dependency (development), with verified Vite 8 / Node 22 compatibility. Its generated worker handles revisioned assets, automatic activation/client claiming and obsolete-precache cleanup; normal development does not register a worker. No custom worker, update UI, push, sync, backend or analytics was added.
- The public-safe provisional manifest uses **Birthday Website** / **Birthday**, `Made especially for you.`, `/` start/scope, standalone display and Canvas theme/background. Replaceable geometric Canvas/Plum icons provide 192/512px PNGs, a mask-safe 512px composition, Apple 180px PNG and SVG source. Final name/artwork remain release decisions; external non-spoiler metadata and noindex are preserved.
- One generated precache uses four public-only patterns for the HTML shell, registration, hashed JS/CSS/fonts and public app imagery/icons, plus the manifest. Bundled writing remains in JS. Explicit `**/private-assets/**` exclusion and disabled duplicate automatic icon inclusion prevent private filename enumeration. One bounded same-origin `/private-assets/` image-only StaleWhileRevalidate cache retains at most 60 actually requested images; no arbitrary GET, cross-origin, API or audio caching. Asset paths are excluded from the cached SPA navigation fallback.
- Install capability is captured early into memory and default promotion prevented, independently of UI eligibility. The controller mounts only inside the completed normal app and survives replay. Proactive eligibility requires actual **Home → content section → Home**, including a valid nested letter reader after Home; intercepted links, More and replay do not qualify. A suggestion appears at most once per runtime and does not steal focus.
- Explicit Not now or native dismissal writes only `{ version: 1, installPromptDismissed: true }` to `birthday.install.v1` via the Day 15 helper. Failures respect dismissal in memory. Existing four storage keys/formats/timing remain unchanged; eligibility, shown state, deferred events, installed state and visit history are not persisted. Story interactions still make zero application-storage calls.
- More retains Replay and installation after proactive dismissal. Native prompting is deliberate and consumes its deferred event once; unavailable prompting opens concise browser/iOS guidance. A shared native Paper sheet avoids nested dialogs and restores focus. Standalone/iOS standalone and `appinstalled` suppress install surfaces while retaining Replay, including when guidance was open. Home otherwise remains its development placeholder; existing feature motion/timing is unchanged.
- Production Chrome verified manifest/icons, active controlling worker and zero reported installability errors. Cached offline first-use Reveal, returning Home, direct content/reader routes, writing/fonts/public media, private-image runtime caching and uncached-image recovery passed. An ignored artificial private-path image was excluded from precache while present; cross-origin image requests were not cached. A real asset revision update activated and removed the old cache revision without forcibly reloading the running app; the temporary change/image were removed and the final build retested. Fresh uncached offline navigation correctly cannot load the app.
- All 180 existing tests remain, with 31 new focused tests (211 total passing); one old More assertion now expects the approved Install row. All seven required commands and `pwa:check` pass. Install UI passed 320 × 568, 375 × 667, 844 × 390, 768 × 1024 and 1440 × 900 checks, keyboard/focus and simulated safe areas. Native outcomes/standalone/iOS guidance were simulated; real Safari/iOS and Android installation and production-host SPA fallback still require release verification. No software issue blocks Day 17.

## Day 17 Motion Decisions

- Existing motion was inventoried before production edits and checked in isolated Chrome at 375 × 667, 844 × 390 and 1440 × 900 with normal and reduced motion. Most motion already matched the locked design: navigation, For You press/reader, Open When first/repeat opening, normal Story viewer and the Reveal remain unchanged.
- The shared More/installation Paper sheet previously appeared without a transition. Its entrance now uses the existing 220ms standard/ease-out tokens, opacity 0.6 → 1 and an 8px settle, with a matching opacity-only backdrop fade. Native focus, Close, Escape and browser Back remain immediate; no reverse-exit lifecycle was added.
- Browser comparison resolved the reduced-motion Story viewer in favor of the detailed design's 150ms opacity-only entrance. The sheet/backdrop use the same calm 150ms fade with no translation. One shared opacity keyframe serves these surfaces; narrowly scoped duration overrides deliberately take precedence over the global reduced-motion reset.
- Primary peer routes remain immediate; no Story chapter/scroll animation, photo-navigation crossfade, additional press effects, install-card animation or Reveal image zoom was justified. Writing, loading and failure surfaces stay quiet. Keyframes increased from 10 to 12; none were removed. No animation dependency, JavaScript motion timer/frame loop, new token system or `will-change` was added; new animated properties are only opacity/transform.
- Reveal timing stays 500ms entry / 400ms scene / 1500ms celebration / 700ms Home, with 180ms reduced transitions and static reduced celebration accents. Completion still occurs only after the final entrance and full celebration interval. Replay and all persistence schemas are unchanged.
- All 214 existing tests pass, along with standalone health commands, the full project check, production build and PWA check (20 unique public precache entries). No cosmetic CSS unit tests were added; existing semantic coverage was retained and actual browser checks exercised the changed surfaces. Production checks passed all six viewport/preference combinations, including mid-animation Escape/Close/Back, focus, keyboard, emulated touch swipes, peer/viewer scroll restoration, zero Story storage calls, installation-help/dismissal, first Reveal and completed replay/Back. Manual installation help was deliberately exercised through a test-browser fallback; physical Safari/iOS, Android and device verification remain pending.
- The pre-Day-17 engineering fixes remain intact: primary-section scroll restoration, explicit For You opening-control focus and sequential multi-instance persisted-ID merging. PWA caching/privacy, content and feature scope were not changed. No issue blocks Day 18.

## Next

1. Continue with Day 18 — Accessibility & Performance from the locked documents.
2. Continue later feature implementation in its scheduled phase.

## Genuine Implementation Decisions Remaining

- final PWA name and icon artwork
- real Safari/iOS and Android installation verification
- production-host deployment and SPA history-fallback verification
- final Open Graph preview artwork
- final private content and photography integration

Core V1 voice/audio remains excluded unless the Product Specification's later inclusion gate is explicitly approved.

No known product, navigation, wireframe or high-fidelity design conflict currently blocks implementation.
