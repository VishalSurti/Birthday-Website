# Birthday Website V1 — Codex Instructions

## Project

Birthday Website V1 is a private/unlisted, mobile-first, installable PWA and personal digital keepsake. Visual direction: **Modern Editorial Keepsake**.

Core areas: Home, For You, Open When, Our Story and Birthday Reveal. Exactly four primary destinations: Home / For You / Open When / Our Story. Birthday Reveal is outside primary navigation; More is a secondary menu.

## Authoritative-document precedence

1. `PRODUCT_SPEC.md` — product scope, behaviour, privacy, persistence, content requirements and release rules.
2. `INFORMATION_ARCHITECTURE.md` — navigation, screen hierarchy, routes/flows, back/escape behaviour and system-state UX.
3. `WIREFRAMES.md` — approved screen structure, mobile layout, content placement and interaction structure.
4. `HIGH_FIDELITY_DESIGN.md` — final visual system, typography, colours, spacing, components, motion, accessibility and responsive design.
5. `DESIGN_SYSTEM.md` — concise implementation reference and conceptual tokens; the detailed high-fidelity source wins.
6. `DESIGN_DIRECTION.md` — underlying visual principles; earlier approximate values yield to final high-fidelity values.
7. `CONTENT_SCHEMA.md` — conceptual private static-content shapes; cannot change product scope or behaviour.
8. `PROJECT_STATUS.md` — phase, completed work and remaining implementation decisions; cannot override requirements.

Days 1–5 are approved and locked even if an old status line still uses wording such as “candidate” or “proposed.” Do not silently amend locked behaviour. If a genuine conflict cannot be resolved through precedence, stop and report it before editing.

## Scope restrictions

Do not introduce without explicit approval:

- backend/database infrastructure;
- authentication/accounts or fake client-side password security;
- analytics/tracking or notifications;
- social features, comments/reactions/favourites, sharing features or chat;
- admin tooling or gamification;
- an independent gallery or independent audio section;
- user-selectable themes or new primary navigation destinations.

Voice/audio remains outside Core V1 unless explicitly approved under the Product Specification Section 14 gate. No background music or autoplay.

## Private content

**This repository is public. Never commit private birthday content.**

These directories are intentionally ignored:

- `/public/private-assets/`
- `/content/private/`

Respect every other `.gitignore` privacy pattern; never weaken `.gitignore`. Never commit or invent private photos, personal messages, Open When letter text, relationship memories, private audio, personal dates not provided, relationship facts, or secrets/environment variables. Use obvious development placeholders when private content is unavailable; none may remain in the release.

## Content authenticity

Do not invent memories, feelings, romantic claims, dates or relationship history. Never fabricate a date for layout consistency. The creator supplies personal meaning; missing optional fields may remain absent.

## Implementation behaviour

Before editing, inspect the current implementation and relevant locked documents. Prefer the smallest implementation satisfying the requirements. Reuse design tokens, primitives, existing components and utilities. Avoid unnecessary dependencies and duplicated styling systems.

Home is a discovery surface, distinct from For You. Its preview derives from the session's featured message and never marks it seen. For You retains Featured / All Messages states, deliberate opening and full access to every message. Prefer unseen messages for each new session; keep the featured selection stable through navigation and active-session refresh, and avoid immediate repeats where possible. Discover another remains deliberate.

All Open When letters are immediately accessible and indefinitely reopenable. Mark opened only after reaching the reader; return to the collection without Previous/Next or progress counters.

Our Story is continuous, with optional 1–3 photos per memory and a required full-screen photo viewer. Swiping stays within the originating memory; Close/Back restores story context. No independent gallery or memory read/completion tracking.

Installation remains optional. A proactive suggestion requires Reveal completion, entry into a primary content section, then a subsequent eligible Home view. Persist dismissal; retain relevant installation access through More. Basic offline support preserves cached content and handles uncached resources gracefully.

## Mobile/responsive

Design mobile portrait first. Support compact, normal and large phones, landscape, tablet and desktop. Respect safe areas, prevent horizontal page scrolling and ensure persistent navigation never hides content. Use the responsive matrix in `DESIGN_SYSTEM.md`, including 375px width.

## Accessibility

Require semantic structure, approximately 44px targets, readable text and sufficient contrast, appropriate alt text, keyboard usability, visible focus and reduced motion. No critical information may depend only on colour/motion; no rapid flashing.

## Privacy / metadata

Follow the private/unlisted URL model: no authentication, no tracking, appropriate noindex and controlled distribution. External metadata must be non-spoiler and exclude private photography/text. Neither an unlisted URL nor noindex is authentication.

## Persistence

Follow Product Spec Section 13 and IA Section 17. Conceptual device/browser-local persisted state:

- `stateVersion` — state version;
- `birthdayRevealCompleted` — Reveal completion;
- `seenForYouMessageIds` — IDs of actually opened/revealed messages;
- `openedLetterIds` — IDs of letters whose reader was successfully reached;
- `installPromptDismissed` — install suggestion dismissal.

Featured For You selection and useful navigation/scroll context are session-only. Missing, unavailable, malformed or incompatible storage uses safe defaults without breaking the current experience. Do not persist Reveal scene progress, track story completion, add history timestamps or add cloud sync.

## Birthday Reveal

First Reveal is deliberately started from the personalised opening. It has no normal Skip and completes only after the final scene successfully finishes. An interrupted first viewing restarts from deliberate entry on the next visit; do not trap browser navigation.

Normal returning visit after completion: **Home**. Do not restore an old tab/reader/viewer. Valid explicit internal routes after completion follow IA deep-link rules; incomplete first use still finishes at Home.

Replay: **More → Replay Birthday Surprise**. Replay may exit to its originating top-level destination and never clears completion. Finishing replay transitions to Home. Browser Back after completed Reveal must not replay it. Reduced motion preserves the same completion semantics.

## Git rules

Do not commit or push unless explicitly requested by the user.

Before completion, inspect the diff and run available relevant formatter/lint/typecheck/test/build commands. Do not install tools solely for documentation linting. Report failures honestly and do not stage unrelated files.

Completion reports must include files changed, work completed, checks run, remaining issues and genuine user decisions required.
