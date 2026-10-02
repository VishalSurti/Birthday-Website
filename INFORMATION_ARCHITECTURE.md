# Birthday Website V1 — Information Architecture

## Status

Day 3 Information Architecture is approved and locked for V1, reconciled to the locked [Product Specification](PRODUCT_SPEC.md).

This document defines screen hierarchy, navigation, first-time and returning-user flows, feature flows, back behaviour, persistence-related UX, system states, PWA/deep-link behaviour, and requirements for Day 4 low-fidelity wireframes.

The Product Specification remains authoritative for scope and behaviour. The approved [Design Direction](DESIGN_DIRECTION.md) governs the Modern Editorial Keepsake visual language. This document implements those requirements without amending either source.

---

## 1. Core Product Structure

The four permanent top-level destinations are:

1. **Home**
2. **For You**
3. **Open When**
4. **Our Story**

Birthday Reveal sits outside primary navigation. It is the deliberate first-use experience and is later available through **More → Replay Birthday Surprise**.

```text
App entry → Resolve local state
  ├─ Reveal incomplete → Personalised opening
  │                       → Open your birthday surprise
  │                       → Birthday Reveal → Home
  └─ Reveal complete → Home

Persistent bottom navigation:
Home ↔ For You ↔ Open When ↔ Our Story
```

Home is the primary discovery surface. For You is a distinct personal-message experience. Normal navigation remains shallow: **primary section → individual content item**.

## 2. Complete Screen Inventory

| Screen / Surface | Type | Bottom navigation | Purpose |
|---|---|---|---|
| App Entry / State Resolver | Transient system state | No | Resolve safe local state and entry flow |
| Personalised Opening | Full page | No | Deliberately start the first birthday experience |
| Birthday Reveal | Immersive full page | No | First viewing or optional replay |
| Home | Top-level full page | Yes | Greeting, hero, featured preview, section entries |
| For You | Top-level full page | Yes | Featured message, further discovery, complete collection |
| Complete Message Collection | Browsing state within For You | Yes | Access all messages with subtle seen/unseen treatment |
| Message Reader | Full-height overlay/sheet over For You | No | Deliberately reveal and read a message |
| Open When | Top-level full page | Yes | Browse all letters |
| Open When Letter | Nested full reading page | No | Open, read, and revisit one letter |
| Our Story | Top-level continuous page | Yes | Read the editorial narrative |
| Story Photo Viewer | Full-screen viewing surface | No | View a photo and swipe within its memory |
| More | Small secondary menu | Underlying browsing context | Replay and relevant installation action |
| PWA Install Suggestion / Help | Contextual UI | Underlying context | Optional installation assistance |
| Loading, empty, offline, and error states | Contextual system states | As appropriate to parent | Preserve content and support recovery |

Message history is represented by local seen state in the complete collection; it is not a separate history-only page or additional navigation level.

There are no Birthday, Messages, Gallery, Settings, Profile, Search, Notifications, Audio, or About destinations. There are no individual story-memory detail pages, generic menu page, birthday locked page, or letter locked page.

## 3. Final Primary Navigation Model

Use four clear, labelled persistent bottom-navigation destinations:

```text
Home    For You    Open When    Our Story
```

- **Home:** Personalised birthday greeting, one strong hero visual, current-session For You preview and entry, Open When entry, and Our Story entry.
- **For You:** Deliberate featured-message opening, further discovery, and complete message collection.
- **Open When:** Envelope-style collection with every letter accessible.
- **Our Story:** Continuous editorial narrative with contextual photo viewing.

The small More menu contains **Replay Birthday Surprise** and **Install/Add to Home Screen**, where relevant. It is secondary UI, not a fifth tab or general settings area.

## 4. Navigation Hierarchy

Top-level destinations show bottom navigation and need no in-app Back button between peers.

Focused content uses Back or Close and hides bottom navigation:

```text
For You → Message Reader → Close → originating For You state
Open When → Letter → Back → Open When
Our Story → Photo Viewer → Close → originating story position
```

The complete message collection remains a browsing state within For You. Opening it does not add a page between a primary section and an individual message. The user can return to the featured presentation within that same section.

Bottom navigation communicates browsing; Back/Close communicates focused content. Browser/back-navigation conventions must work naturally.

## 5. First-Time Birthday Flow

```text
Private link / browser / installed PWA
→ Resolve local state
→ Reveal incomplete
→ Personalised opening screen
→ User activates “Open your birthday surprise”
→ Birthday Reveal
→ Deliberately advance meaningful moments
→ Final personalised birthday message and earned celebration
→ Final scene successfully finishes
→ Persist Reveal completed
→ Smooth transition to Home
```

The app does not enforce the birthday date. There is no countdown, date gate, or pre-birthday holding screen; the creator controls link distribution.

The Reveal must not start automatically. It uses approximately 3–5 scenes, 1–3 selected photographs, and 45–90 seconds depending on interaction speed. Some transitions can be automatic, but meaningful moments advance through a large, intuitive interaction area with a subtle cue such as “tap to continue.”

The first successful viewing has no normal Skip button. Completion is recorded only after the final scene successfully finishes, not merely when the final message becomes visible. An interrupted first viewing starts again from the beginning on the next visit; no animation-step progress is persisted.

The visual culmination contains one brief restrained confetti effect with subtle hearts, as defined in the Design Direction. Reduced motion must provide an equivalent calm experience and the same completion behaviour.

## 6. Optional Audio Behaviour

Audio is excluded from Core V1. Only prerecorded personal voice messages may be added if the Product Specification Section 14 gate is satisfied and the enhancement is approved.

The gate is evaluated once after core feature completion and the first mobile polish/testing pass. It requires integrated writing and photography, working PWA and persistence, no critical/high-priority core defects, and sufficient schedule buffer. Failure of any condition removes audio without delaying release.

If approved:

- Target approximately 3 recordings, with an absolute maximum of 5.
- Attach recordings selectively to existing permitted messages, letters, or Reveal moments.
- Provide user-initiated play/pause, progress, and duration controls.
- Never autoplay audio or add background music.
- Do not require audio to progress or introduce setup, permission, or audio-only screens.
- Continue silently if playback fails.
- Do not permanently persist playback positions.
- Use compressed static assets, cacheable for offline use where practical; no media backend is introduced.

## 7. Returning-User Flow and Reveal Replay

### Normal launch

```text
Launch → Resolve persisted state → Reveal complete → Home
```

A normal launch returns to Home. Do not restore a previous session's tab, reader, letter, story scroll position, or Reveal. Explicit internal routes are considered separately in Section 25.

### Optional replay

```text
Home / top-level browsing → More → Replay Birthday Surprise
→ Birthday Reveal in replay mode
  ├─ Exit/skip → originating top-level destination
  └─ Finish → smooth transition to Home
```

Replay is deliberate and may be exited or skipped. Existing completion remains saved, including when a replay is interrupted. It must not reset the first-use gate or make the next launch replay automatically.

## 8. Home Architecture

Home is a curated vertical discovery experience with:

```text
Home
├─ Personalised birthday greeting
├─ One strong hero visual treatment
├─ Current-session For You preview → For You opening experience
├─ For You entry
├─ Open When entry → letter collection
├─ Our Story entry → continuous narrative
└─ Access to the small More menu
```

The preview can withhold the full message and never marks it seen. Home does not expose a duplicate complete message collection or letter collection. Exact composition and visual ordering belong to Day 4.

## 9. For You Message Flow

A new visit means a newly launched browser/PWA session after the previous active session has ended. Route changes, tab switches, returning to Home, and refreshing within the active session do not create a new visit.

At each new visit:

1. Randomly select the featured message from unseen messages when any remain.
2. Once all have been seen, select from the complete collection.
3. Avoid immediately repeating the previously featured message where possible.
4. Keep the featured selection stable throughout the session, including refreshes.

```text
Home preview / For You tab
→ Featured message presented closed
→ User deliberately opens it
→ Short polished reveal in full-height Message Reader
→ Message becomes seen when actually revealed
→ Persist seen-message ID
→ Close → For You
→ Discover another message OR browse complete collection
```

Further discovery deliberately opens another message without making ordinary navigation arbitrarily reselect the session's featured message. Messages have a required body and optional title, and the reader supports short, medium, and occasional longer writing.

There are no daily release rules, artificial unlocks, likes, reactions, favourites, sharing, downloading, copying controls, or progression mechanics.

## 10. Message Collection and History

All messages remain accessible, including unread messages. The complete collection is a browsing state within For You and provides access to previously read messages as well as new ones.

```text
For You → Browse complete collection (within For You)
→ Select any message → Message Reader
→ Actually reveal content → Persist seen state
→ Close → same collection position
```

Local seen-message IDs provide history through subtle read/unread presentation. History does not limit content availability. There is no separate history-only page, chronological reading log, or new requirement to persist discovery timestamps. Use the configured collection order; do not add search, filters, folders, favourites, or custom sorting.

If no messages have been seen, the collection still shows all configured messages as unread. Exhausting unseen messages never empties or locks the collection.

## 11. Open When Architecture

```text
Open When → Select any envelope
→ Short restrained envelope-opening transition
→ Dedicated letter reading page
→ Back → Open When collection
```

All letters are immediately accessible. First opening uses the full short transition; later openings use a faster/subtler version while keeping the same identity.

Letters contain required title/context and text, an optional relevant photograph, and optional voice only under the audio gate. Use natural scrolling for long writing and return to the collection to choose another letter. Do not add generic Previous/Next letter controls.

## 12. Open When Letter States

The only normal availability states are:

```text
Available — unopened
Available — opened
```

Persist the opened-letter ID when the reading state is successfully reached, not solely when the card is touched. The distinction is subtle; letters remain reopenable indefinitely.

Opened letters must not appear completed, crossed off, exhausted, or unavailable. There are no date, visit-count, or achievement unlock conditions and no numeric progress indicator.

## 13. Our Story Architecture

Our Story is one continuous editorial narrative:

```text
Short introduction
→ Curated memory chapters
→ Open-ended closing message
```

Memories are mostly chronological, with creator-directed adjustments for emotional pacing. Chapters vary in visual weight and remain part of one scrolling page.

Each memory has a short title and personal caption/story. An exact date or broad time label, 1–3 photographs, and a highlighted line are optional. Never fabricate dates. Supporting images stay within the per-memory photo limit.

Use natural scrolling, generous whitespace, and the approved editorial composition. The ending communicates continuation. No memory-detail pages, pagination, read tracking, completion percentages, or gamification are introduced.

## 14. Photo Interaction

Our Story includes the clean full-screen photo viewer described in Product Specification Section 10.6.

```text
Story photo → Tap → Full-screen viewer
→ Swipe between photos belonging to that memory, when multiple exist
→ Close / Back → same story position
```

Photos remain visible in the narrative; viewing is optional. The viewer does not browse unrelated memories or become an independent app-wide gallery. It has an obvious Close control, usable back behaviour, and keyboard-usable controls on desktop.

Other photographs remain in their existing Home, For You, letter, or Reveal context; this document adds no general gallery feature.

## 15. Back and Escape Behaviour

| Context | Back / Close behaviour |
|---|---|
| Top-level browsing | Use peer bottom navigation; no in-app Back requirement |
| Message Reader | Close to the originating featured, discovery, or collection state within For You |
| Open When Letter | Back to the letter collection, restoring approximate session position |
| Story Photo Viewer | Close to the originating story position |
| More / installation help | Dismiss to the originating surface |
| First Reveal | No normal Skip; leaving the site does not mark it complete |
| Reveal replay | Exit/skip returns to the originating top-level destination |
| Completed Reveal | Smooth transition to Home; browser Back must not replay it |

Browser Back should dismiss a focused surface or return to its logical parent naturally. Direct entry to a nested surface must still provide an in-app escape to its parent when no app browsing history exists. Do not trap users in the site to enforce first viewing.

## 16. Switching Top-Level Destinations

```text
Home ↔ For You ↔ Open When ↔ Our Story
```

Peer navigation does not require an in-app Back action. Preserve useful per-section scroll positions approximately during the active session where practical. Returning from a reader or viewer should preserve context. Do not restore those positions across separate launches.

Switching tabs or returning Home does not change the session's featured For You message.

## 17. Local Persistence UX

Storage is device/browser-local and versioned. Conceptual names below follow Product Specification Section 13; exact technology and schema remain implementation decisions.

| State | Lifetime / behaviour |
|---|---|
| `stateVersion` | Persistent; supports safe handling of incompatible data |
| `birthdayRevealCompleted` | Persistent; set only after the final scene finishes successfully |
| `seenForYouMessageIds` | Persistent; add only after actual message opening/reveal |
| `openedLetterIds` | Persistent; drives subtle opened/unopened presentation only |
| `installPromptDismissed` | Persistent; suppresses repeated proactive install suggestions |
| Featured For You selection | Session-only; stable across navigation and active-session refresh |
| Temporary navigation, overlays, and useful scroll positions | Session-only; no restoration on a new normal launch |
| Individual story-memory read/view state | Not tracked or persisted |
| Reveal animation step | Not persisted; interrupted first viewing restarts |
| Optional audio playback position | Not permanently persisted |
| User-selectable theme | Not a V1 feature; respect browser/system accessibility preferences |

Selection should avoid repeating the previous featured message where possible, as required by the Product Specification; this does not turn the active featured selection into a permanent resume destination.

Message history is derived from seen IDs, not a new independently persisted content system. No cloud synchronisation or account state is introduced.

## 18. Missing or Cleared Local State

Missing, unavailable, malformed, cleared, or incompatible storage uses safe defaults without breaking the app. The device may behave as first use and present the personalised opening again.

If writes fail, the current session remains usable; later visits may repeat first-use behaviour or lose seen/opened distinctions. Content must remain accessible. Different devices and browser storage contexts maintain independent state.

No accounts, fake password gates, recovery codes, backend profiles, or cloud recovery are added. Loss of local state is an accepted V1 limitation.

## 19. Loading and Offline States

Use a quiet branded canvas only while initial assets/state resolve. Loading is a transient state, not a destination. Local/static messages and letters generally need no separate loading page.

Reserve image space to minimise layout movement. Prioritise opening/Reveal assets and allow noncritical story imagery to load later without hiding writing.

After successful loading/caching, the core shell, written content, required assets, and relevant imagery should remain usable offline. If an initial visit or uncached resource cannot load offline, show a restrained explanation and retry action. Preserve any available content; do not imply an uncached first visit can work fully offline.

## 20. Empty States

- **No messages read yet:** The complete For You collection remains available with unread styling; no empty history page is needed.
- **All messages read:** Continue selection from the complete pool, avoiding the previous featured message where possible.
- **No configured messages or letters:** Treat as a content/configuration failure and offer restrained recovery; this is not a normal release state.
- **Empty Our Story:** Treat as a content/configuration failure.
- **Missing optional media:** Keep the writing and layout usable without implying content is locked.

Avoid elaborate empty-state illustrations. Content requirements remain 15 intended messages, 9 letters, approximately 12 memories within a 10–15 range, and approximately 15–25 selected unique photographs. Final content and removal of placeholders remain release requirements.

## 21. Locked States

V1 has no birthday/date locked state, no locked Open When letters, and no artificially locked unread messages. Do not design countdowns, unavailable-content cards, unlock conditions, or dead-end locked screens.

The incomplete first-use Reveal routes through the personalised opening and deliberate start action. It is an entry-flow requirement, not a date-based content lock.

## 22. Completed States

- **Birthday Reveal:** Incomplete → final scene successfully finishes → completed. Completion changes future normal launches to Home.
- **Replay:** Does not clear existing Reveal completion.
- **Open When:** Unopened → opened; letters remain available indefinitely.
- **For You:** Unseen → seen only after actual opening; seen messages remain accessible.
- **Our Story:** No completion/read state.

No completion percentages, relationship achievements, or consumed-content treatment are added.

## 23. Error Behaviour

Preserve meaningful content when enhancements fail.

| Failure | UX response |
|---|---|
| Photo fails | Keep caption/story readable with graceful media fallback |
| Optional audio fails | Continue silently; never block progress |
| Persistence write fails | Keep current session usable; tolerate lost persistence on later visits |
| Invalid letter reference | Return to Open When with restrained explanation |
| Invalid message reference | Return to For You with restrained explanation |
| Photo viewer resource fails | Offer Close and preserve the story beneath it |
| Unexpected app failure | Offer simple retry or return-to-Home recovery, respecting incomplete first-use entry |
| Installation API unavailable | Keep browser experience complete; offer manual help where relevant |

No raw stack traces, developer errors, or backend recovery machinery appear in the intended user flow.

## 24. PWA Installation and Browser Behaviour

The complete experience works in a supported mobile browser; installation is optional and unlocks no content.

A proactive install suggestion must not interrupt the opening screen, first Reveal, or immediate arrival at Home. It becomes eligible only after Reveal completion and entry into at least one primary content section, and may appear on a subsequent eligible Home view.

```text
First Reveal complete → Home → Visit a content section
→ Subsequent eligible Home view → Optional subtle install suggestion
```

Persist dismissal and do not repeatedly prompt. Keep **More → Install/Add to Home Screen** available where relevant, including after dismissal. Use native prompting when exposed and concise manual platform guidance otherwise.

Installed and browser experiences share the same IA. Normal start entry resolves state and opens the personalised opening or Home. Support standalone display, a custom icon, and a short personalised app name where supported; artwork and naming remain governed by design work.

Use basic cache version/update behaviour so later deployments do not leave stale assets indefinitely. No visible advanced update manager, complex offline synchronisation, or unnecessary device permissions are introduced.

## 25. Deep-Link Behaviour

Home, For You, Open When, individual letters, and Our Story may support meaningful internal routes. Exact route implementation is deferred. Message overlays and the complete-collection browsing state do not need separate public/shareable routes.

- **Reveal already complete:** A valid explicit internal route may open its destination. A normal launch without an explicit destination opens Home.
- **Reveal incomplete:** Enter through the personalised opening and deliberate Reveal start. Finish the Reveal and transition to Home as required by the Product Specification; the user can then navigate normally. Do not automatically replace this required Home arrival with a queued deep-link destination.
- **Invalid route:** Recover to the logical parent, or normal entry/Home when no valid parent exists.

A known unread message is not ineligible simply because it is unseen. Do not introduce access restrictions through routing. No sharing controls, authentication, or security claims are added; the private/unlisted URL remains controlled distribution, with noindex behaviour and no behavioural tracking.

## 26. Important Edge Cases

| Case | Required behaviour |
|---|---|
| Refresh or reopen during incomplete first Reveal | Return through deliberate entry and restart sequence; do not restore animation steps |
| Exit after the final scene completed | Persisted completion sends next normal launch to Home |
| Interrupted replay | Keep existing completion; next normal launch opens Home |
| Browser Back after Reveal | Do not automatically replay the completed Reveal |
| Refresh while reading an addressable letter | Reopen valid letter after state resolution; preserve opened status |
| Refresh within active For You session | Preserve featured selection; do not treat as a new visit |
| All For You messages seen | Select from complete pool; all remain accessible |
| Unseen message selected from collection | Allow opening and mark seen only once revealed |
| Invalid letter/message | Recover to its parent with restrained explanation |
| Cleared or incompatible storage | Safe first-use defaults; no account recovery |
| Storage write failure | Current session usable; later state may reset |
| Failed image/audio | Preserve writing and silent progress |
| Offline with cached content | Continue core experience |
| Offline before required resources cached | Explain unavailable content and offer retry |
| Long letter/story | Natural continuous scrolling; no pagination |
| Landscape, tablet, desktop | Remain usable and intentional; portrait phone is primary |
| Reduced motion | Calm fades/state changes; preserve all information and completion semantics |
| Keyboard use | Usable navigation and focused-content escape controls |

## 27. Final IA Decisions

| Decision | Approved V1 model |
|---|---|
| Primary navigation | Four tabs: Home / For You / Open When / Our Story |
| Normal landing after Reveal and returning launch | Home |
| First entry | Personalised opening with deliberate start |
| Birthday/date gate | None |
| Birthday Reveal | Outside primary navigation; later replay through More |
| Replay exit | Allowed; preserves completion |
| For You reader | Full-height overlay/sheet |
| Message collection/history | Complete collection within For You; seen state, no artificial locks |
| Open When reader | Dedicated nested reading page |
| Letter availability | All accessible; opened/unopened distinction |
| Our Story | One continuous narrative with open-ended closing |
| Photo viewer | Full-screen, scoped to one story memory |
| More | Small secondary menu for replay and relevant installation |
| Persistent state | Version, Reveal completion, seen message IDs, opened letter IDs, install dismissal |
| Featured message | Session-stable selection |
| Cross-launch scroll/overlay restoration | None |
| PWA | Optional installation, basic offline support, same browser/installed IA |
| Deep links | Respect deliberate first-use flow and required Home arrival |
| Audio | Excluded from Core V1; gated optional voice only |
| UX hierarchy | Primary section → individual content item |

## 28. Final Screen Map

```text
BIRTHDAY WEBSITE V1
├─ APP ENTRY / STATE RESOLVER
│  ├─ Incomplete → PERSONALISED OPENING
│  │                → deliberate start → BIRTHDAY REVEAL → HOME
│  └─ Complete → HOME (or valid explicit internal route)
└─ MAIN APP — persistent four-tab navigation
   ├─ HOME
   │  ├─ Greeting and hero
   │  ├─ Featured preview / For You entry
   │  ├─ Open When entry
   │  └─ Our Story entry
   ├─ FOR YOU
   │  ├─ Featured message / further discovery
   │  ├─ Complete collection browsing state, including seen messages
   │  └─ MESSAGE READER [overlay]
   ├─ OPEN WHEN
   │  ├─ All envelopes: unopened / opened
   │  └─ LETTER [dedicated reading page]
   ├─ OUR STORY
   │  ├─ Introduction, memory chapters, open-ended closing
   │  └─ PHOTO VIEWER [full-screen, one memory]
   └─ MORE [secondary menu, not a tab]
      ├─ Replay Birthday Surprise → BIRTHDAY REVEAL [exit allowed]
      └─ Install/Add to Home Screen [where relevant]
```

Loading, error, offline, and installation surfaces remain contextual. Optional approved voice controls attach to existing permitted content only.

## 29. Final First-Time Birthday Flow

```text
Launch → Resolve state → Reveal incomplete
→ Personalised opening → Open your birthday surprise
→ Emotional sequence with deliberate progression
→ Main birthday moment and single earned celebration
→ Final scene successfully finishes → Persist completion
→ Smooth transition to Home → Four-tab app
```

No automatic Reveal start, date eligibility check, onboarding, audio requirement, or installation interruption is added.

## 30. Final Returning-User Flow

```text
Normal launch → Resolve state → Reveal complete → Home
→ Home / For You / Open When / Our Story
```

Replay remains an explicit More action. Do not repeat onboarding, tutorials, the first Reveal, or dismissed installation suggestions. An explicit valid internal route after completion follows Section 25.

## 31. Day 4 Wireframe Rules

1. Design mobile portrait first, with usable landscape, tablet, and desktop layouts.
2. Use exactly four top-level destinations: Home, For You, Open When, Our Story.
3. Keep Home and For You distinct; Home previews the current-session message without marking it seen.
4. Include the personalised opening and deliberate “Open your birthday surprise” action.
5. Keep Reveal outside permanent navigation, with no date gate or first-view Skip button.
6. Show completion only after the final scene finishes; transition smoothly to Home.
7. Provide More → Replay Birthday Surprise with an exit/skip action for replay.
8. Show bottom navigation on top-level browsing screens; focused readers/viewer use Back/Close.
9. Keep the complete message collection within For You, with all messages accessible.
10. Support featured opening, discover-another, and complete-collection flows without changing the featured message on ordinary navigation.
11. Use a full-height For You reader and mark seen only after actual reveal.
12. Use dedicated Open When reading pages, all letters available, and subtler repeat opening.
13. Return letters to their collection; do not add Previous/Next letter controls or progress counts.
14. Keep Our Story continuous, mostly chronological, with an introduction and open-ended closing.
15. Include the contextual full-screen story photo viewer and swiping within one memory.
16. Keep story memories within the optional 1–3-photo limit; no separate memory-detail pages or app-wide gallery.
17. Give focused surfaces obvious escapes to their origin and natural browser/back behaviour.
18. Do not leave the completed Reveal behind Home in normal back history.
19. Preserve required completion, seen/opened, and installation-dismissal state locally; handle failures safely.
20. Preserve useful session context; do not restore old tabs, overlays, or scroll positions on a normal new launch.
21. Respect the full installation eligibility sequence and keep manual installation available through More where relevant.
22. Include quiet loading, legitimate empty states, offline recovery, and graceful media errors; no locked-content screens.
23. Keep optional audio outside Core V1 and never require sound, autoplay, or permissions for progress.
24. Make controls readable, sufficiently contrasted, touch-friendly, keyboard-usable, and semantically clear; provide useful image alternatives.
25. Respect reduced motion, with no rapid flashing or information available only through animation.
26. Follow the Modern Editorial Keepsake direction: content-led photography, warm neutrals, Newsreader/Geist roles, whitespace, restrained motion, and one earned Reveal celebration.
27. Do not introduce Settings, Profile, Search, social features, tracking, accounts, gamification, or additional primary sections.
28. Follow Product Specification content and release gates; no fabricated memories, dates, or personal writing.

## 32. Scope Boundary

This document defines information architecture and UX behaviour within the locked V1 requirements. It changes neither the Product Specification nor the Design Direction.

Day 4 creates low-fidelity wireframes from this architecture. High-fidelity styling, frontend implementation, persistence technology, route implementation, data schemas, icon artwork, and content authoring remain in their appropriate later work.

No new product feature, backend, account system, tracking, content restriction, or expanded content model is authorised. All Product Specification requirements and release gates continue to apply.
