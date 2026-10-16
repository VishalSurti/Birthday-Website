# Birthday Website — Project Status

**Current phase:** Day 13 — Media Support complete
**Next phase:** Day 14 — Mobile Responsiveness

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

## Next

1. Implement Day 14 — Mobile Responsiveness from the locked documents.
2. Continue later feature implementation in its scheduled phase.

## Genuine Implementation Decisions Remaining

- installation dismissal persistence remains deferred; For You, Open When and Reveal completion storage are implemented; Our Story intentionally has no persistent memory-view state
- PWA/service-worker tooling and cache strategy
- final PWA name and icon artwork
- final Open Graph preview artwork
- final private content and photography integration

Core V1 voice/audio remains excluded unless the Product Specification's later inclusion gate is explicitly approved.

No known product, navigation, wireframe or high-fidelity design conflict currently blocks implementation.
