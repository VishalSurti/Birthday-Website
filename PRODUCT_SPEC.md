# Birthday Website — V1 Product Specification
**Status:** Candidate for V1 Lock
**Project:** Birthday Website
**Target birthday:** 26 October 2026
**Product-spec lock date:** 29 September 2026
**Primary experience:** Private, mobile-first birthday web app / PWA
**Primary user:** Gift recipient

---

# 1. Product Vision
Birthday Website is a private, highly personal digital birthday gift designed specifically for the recipient.

It must feel like a bespoke, polished digital experience rather than a conventional website, generic birthday template, photo gallery, or collection of disconnected pages.

The experience combines personal messages, situational letters, shared memories and a one-time Birthday Reveal inside a cohesive mobile-first application.

The emotional content is the product. Technology, animation and visual effects exist to improve its presentation rather than distract from it.

---

# 2. V1 Product Principles
Birthday V1 must be:

- deeply personal;
- visually impressive;
- emotionally intentional;
- mobile-first;
- straightforward to understand without onboarding;
- polished enough to feel like a purpose-built application;
- fast and responsive;
- private by design;
- realistic to deliver before 26 October 2026.
Visual quality should come primarily from:

- strong art direction;
- excellent typography;
- thoughtful photography;
- spacing and composition;
- premium but restrained motion;
- emotional pacing;
- strong transitions;
- attention to small interaction details.
Additional functionality must not be added merely to make the application appear more substantial.

---

# 3. Core Birthday V1 Scope
Birthday V1 contains five core experience areas:

1. Home
2. For You
3. Open When
4. Our Story
5. Birthday Reveal
It additionally includes:

- mobile-first responsive UI;
- PWA/installable functionality;
- basic offline capability;
- local persistence;
- subtle animations and transitions;
- photo support.
Voice messages are optional and governed by the explicit scope gate in Section 14.

---

# 4. Explicitly Out of Scope
Birthday V1 will not include:

- push notifications;
- AI-generated relationship messages;
- authentication or accounts;
- native iOS or Android applications;
- unnecessary backend infrastructure;
- database infrastructure;
- chat or messaging;
- admin dashboard;
- behavioural analytics or tracking;
- social-media functionality;
- comments;
- reactions;
- favourites;
- sharing controls;
- downloadable messages;
- user-customisable visual themes;
- background music;
- a dedicated photo-gallery feature;
- a dedicated audio section;
- artificial achievements or gamification;
- complex offline synchronisation.
No excluded capability should be introduced during implementation without an explicit amendment to this specification.

---

# 5. Privacy Model
The application will use a private/unlisted URL.

It must:

- not be intentionally publicly promoted;
- use appropriate `noindex` behaviour to discourage search-engine indexing;
- contain no built-in behavioural tracking;
- contain no authentication system.
This is privacy through controlled distribution rather than security through authentication.

Anyone possessing the URL may technically be able to access the application.

No fake client-side password mechanism will be presented as meaningful security.

---

# 6. First-Opening User Experience

## 6.1 First visit
The first successful visit follows this journey:

**Private link**
→ personalised opening screen
→ user deliberately activates **Open your birthday surprise**
→ Birthday Reveal
→ final birthday moment
→ smooth transition
→ Home.

The Birthday Reveal must not begin automatically before the recipient deliberately starts it.

There is no onboarding/tutorial flow.

The interface must be sufficiently understandable without instructional screens.

## 6.2 Date behaviour
The application itself will not enforce the birthday date.

There will be:

- no countdown;
- no date lock;
- no pre-birthday holding experience.
The creator controls when the link is shared.

## 6.3 Subsequent visits
Once the first Birthday Reveal is successfully completed:

**New visit**
→ Home directly.

The Reveal remains available through:

**More → Replay Birthday Surprise**

A replay is optional and may be exited.

## 6.4 Definition of a new visit
For the purpose of the For You feature, a **new visit** means a newly launched browser/PWA session after the previous active session has ended.

The following do not constitute a new visit:

- navigating between sections;
- returning to Home;
- ordinary route changes;
- refreshing/reloading within the existing session.

---

# 7. Navigation & Information Architecture

## 7.1 Primary navigation
The application uses a hybrid navigation model:

- Home acts as the primary discovery surface;
- the core application also provides subtle persistent bottom navigation.
Primary destinations are:

- Home
- For You
- Open When
- Our Story
Birthday Reveal is not a normal primary-navigation destination.

## 7.2 Hierarchy
Content hierarchy must remain shallow.

Maximum normal depth:

**Primary section → individual content item**

The application must avoid unnecessary categories, folders or nested menus.

Browser/back-navigation conventions should continue to work naturally.

## 7.3 Home
Home contains:

- personalised birthday greeting;
- one strong hero visual treatment;
- For You preview;
- For You entry;
- Open When entry;
- Our Story entry.
The exact hero treatment is determined during UI/UX design and may use photography or another bespoke visual composition.

Home must remain emotionally focused rather than becoming a dashboard.

## 7.4 For You preview on Home
Home previews the current session's featured For You message.

The preview must:

- entice the recipient into the feature;
- not necessarily expose the entire message;
- lead into the For You opening experience;
- not count the message as "seen" merely because the preview appeared.

## 7.5 More menu
A small secondary **More** menu is allowed.

It may contain only genuinely useful secondary actions.

Core V1 actions are:

- Replay Birthday Surprise
- Install/Add to Home Screen, where relevant
It must not become a general settings area.

There is no dedicated About page.

## 7.6 Visual continuity
All sections use one coherent design system.

Shared qualities include:

- typography;
- colour language;
- spacing;
- controls;
- navigation;
- motion principles;
- visual texture.
Individual experiences may have distinct motifs:

- For You — intimate personal notes/cards;
- Open When — envelopes/letters;
- Our Story — editorial scrapbook/photo-journal treatment;
- Birthday Reveal — cinematic presentation.
They must still feel like one application.

---

# 8. For You

## 8.1 Purpose
For You provides personal thoughts and messages that give repeat visits fresh emotional content.

For You messages should generally be shorter and more spontaneous than Open When letters.

## 8.2 Featured message selection
Each new visit receives one featured For You message.

Selection behaviour:

1. Prefer messages that have never actually been opened.
2. Randomly select from the unseen pool.
3. After every message has been seen, select from the complete collection.
4. Avoid immediately repeating the previously featured message where possible.
Refreshing or navigating during the same session must not arbitrarily select a different featured message.

## 8.3 Opening behaviour
Entering For You presents the featured message as something deliberately opened rather than immediately exposing all text.

The interaction should use a short, polished reveal.

A message becomes **seen** only once the recipient actually opens/reveals it.

## 8.4 Further discovery
After reading the featured message, the recipient may:

- discover another message; or
- browse the complete message collection.
All messages remain accessible.

Unread messages may receive a subtle visual treatment but must never be artificially locked.

## 8.5 Message structure
Each For You message contains:

- required message body;
- optional short title.
Message lengths intentionally vary:

- short;
- medium;
- occasional longer/deeper message.

## 8.6 Excluded For You behaviour
There are no:

- favourites;
- reactions;
- likes;
- sharing;
- downloading;
- copying controls;
- artificial progression mechanics.

---

# 9. Open When

## 9.1 Purpose
Open When provides longer personal letters intended for distinct emotional situations.

Every letter must address a meaningfully different circumstance.

## 9.2 Collection presentation
The section displays an envelope-style collection.

All letters are immediately accessible.

There are no date, visit-count or achievement-based unlock conditions.

## 9.3 Opening interaction
First opening:

**Envelope selection**
→ short envelope-opening animation
→ dedicated reading view.

Subsequent openings retain the same identity but use a faster/subtler version of the animation.

## 9.4 Opened state
Previously opened letters are subtly visually distinguished from unopened letters.

Opened letters must never appear:

- completed;
- crossed off;
- exhausted;
- unavailable.
They can be reopened indefinitely.

There is no numeric progress indicator such as "5 of 9 opened."

## 9.5 Letter content
Each letter supports:

- required title/context;
- required letter text;
- optional relevant photo;
- optional voice recording only if the optional audio feature is later approved.
Not every letter should contain a photo.

## 9.6 Reading/navigation
Letters use dedicated reading views suitable for longer text.

After finishing a letter, the recipient returns to the envelope collection to deliberately choose another.

There are no generic Previous/Next binge-navigation controls.

---

# 10. Our Story

## 10.1 Purpose
Our Story is a curated emotional journey through meaningful shared memories.

It is not a generic photo gallery.

## 10.2 Presentation
The experience uses an **editorial timeline with scrapbook-inspired variation**.

The broad structure progresses through the relationship while individual memories may use different compositions.

Possible treatments include:

- single strong photograph;
- two- or three-photo composition;
- text-led memory;
- highlighted personal line;
- varying editorial layouts.
The section must remain visually cohesive despite layout variation.

## 10.3 Ordering
Memories are mostly chronological.

The creator may adjust exact ordering where emotional pacing is more important than strict date order.

## 10.4 Memory model
Each memory supports:

**Required**

- short title;
- personal caption/story.
**Optional**

- exact date or broad time label;
- 1–3 photos;
- highlighted quote/line.
Exact dates are not required.

Dates must never be fabricated merely for visual consistency.

## 10.5 Writing length
Most memories use short-to-medium personal stories.

Length may vary according to the significance of the memory.

The experience should not consist entirely of either one-line captions or long diary entries.

## 10.6 Navigation
Our Story is one continuous scrolling narrative rather than a collection of separate pages.

Individual photos may be tapped to open a clean full-screen viewer.

Where a memory contains multiple photos, the viewer may swipe between that memory's photos.

There is no application-wide independent photo gallery.

## 10.7 Story structure
Our Story includes:

- short opening introduction;
- curated memories;
- open-ended closing message.
The ending should communicate continuation rather than finality.

The story should feel like **"so far"**, not **"this is the completed story."**

## 10.8 Tracking and interactions
The app does not track read/unread state for individual memories.

There are no:

- comments;
- favourites;
- reactions;
- completion statistics.
Background music is not part of Birthday V1.

---

# 11. Birthday Reveal

## 11.1 Purpose
Birthday Reveal is the highest-impact first-use emotional moment.

It should feel cinematic and personal without becoming a technically elaborate mini-game.

## 11.2 Structure
Use a hybrid cinematic/interactive sequence.

Some visual transitions occur automatically, while the recipient deliberately advances meaningful moments.

Expected length:

approximately **45–90 seconds**, depending on interaction speed.

Expected structure:

approximately **3–5 scenes**.

## 11.3 Content
Birthday Reveal uses:

- personalised opening/reveal copy;
- approximately 1–3 selected photos;
- emotional progression;
- final personalised birthday message;
- strongest visual moment at the end;
- subtle celebratory effect at the final reveal.
No dedicated video is required.

## 11.4 Interaction
Progression uses a large, intuitive interaction area with a subtle cue such as "tap to continue."

The sequence must avoid visually heavy conventional navigation buttons where possible.

## 11.5 Gift metaphor
A subtle gift/opening metaphor may be incorporated.

The experience should not revolve around a literal animated gift box or another gimmick if that reduces visual sophistication.

## 11.6 Skip behaviour
First successful viewing:

- no normal Skip button;
- recipient experiences the short sequence once.
Later replay:

- may be exited/skipped.

## 11.7 Completion state
The Reveal is marked completed only after the final scene successfully finishes.

If the recipient closes the site partway through their first Reveal, the Reveal begins again on the next visit.

Exact reveal-scene progress is not persisted.

## 11.8 Audio
Birthday Reveal contains no background music in Core V1.

Optional prerecorded voice content may be considered only if Section 14's gate is satisfied.

## 11.9 Final transition
The final scene transitions smoothly into Home rather than using an abrupt page change.

The final scene may use restrained:

- particles;
- light effects;
- confetti-like elements;
- similar celebratory visual details.
Effects must remain subtle and premium.

---

# 12. PWA Behaviour

## 12.1 Browser-first requirement
The complete application must function directly in a supported mobile browser.

Installing the PWA is always optional.

No content or functionality may require installation.

## 12.2 Installation promotion
Installation must never interrupt:

- opening screen;
- initial Birthday Reveal;
- immediate arrival at Home.
A one-time subtle install suggestion becomes eligible only after:

1. the Birthday Reveal is complete; and
2. the recipient has entered at least one primary content section.
It may then appear on a subsequent eligible Home view.

If dismissed, the proactive suggestion is not repeatedly shown.

Install functionality remains available through the More menu.

Where the platform exposes a native installation prompt, use it appropriately.

Where it does not—such as platforms requiring manual home-screen installation—the UI may provide concise platform-appropriate guidance.

## 12.3 Installed behaviour
Installed PWA behaviour is the same application experience.

Where supported it should:

- launch standalone;
- use a custom app icon;
- use a short personalised app name;
- preserve appropriate local state.
There is no separate installed-app product.

## 12.4 Icon and name
The icon should use a custom visual symbol consistent with the final design identity.

The exact icon artwork and app name are determined during UI/UX/branding work.

The name must be short enough to display cleanly beneath a mobile home-screen icon.

## 12.5 Offline behaviour
After successful loading/caching, the core application should remain useable offline.

Cache appropriately optimised:

- application shell;
- styles/scripts;
- written content;
- required core assets;
- relevant imagery.
This is simple offline capability, not an offline-first synchronisation system.

## 12.6 Updating
Use a basic cache-version/update strategy so later deployments do not leave the recipient indefinitely stuck on stale application assets.

No visible sophisticated update-management interface is required.

## 12.7 Device permissions
Birthday V1 requests no unnecessary device permissions.

Specifically no requirement exists for:

- push notifications;
- contacts;
- camera;
- microphone;
- location;
- photo-library access.

---

# 13. Local Persistence
Persistence is device/browser-local only.

There is no cloud synchronisation or account-based state.

## 13.1 Persistent state
Core persistent state consists approximately of:

```
stateVersion
birthdayRevealCompleted
seenForYouMessageIds
openedLetterIds
installPromptDismissed
```
Equivalent naming may be used in implementation.

## 13.2 Session-only state
Session state includes:

- currently featured For You message;
- temporary navigation/UI state;
- useful current-session scroll positions.

## 13.3 For You persistence
Seen-message IDs persist locally.

A message is added to the seen set only after it has actually been opened.

The current featured message itself is session-scoped.

## 13.4 Open When persistence
Opened-letter IDs persist locally and drive only the subtle opened/unopened presentation.

## 13.5 Our Story persistence
Individual memory-view state is not persisted.

## 13.6 Scroll position
Useful scroll position may be retained while navigating within the same active session.

Permanent scroll restoration across separate visits is not required.

## 13.7 Audio state
If optional voice audio is later included, playback positions are not permanently stored.

## 13.8 Theme preferences
There are no user-selectable design themes.

System/browser accessibility preferences such as reduced motion should still be respected.

## 13.9 Missing or cleared storage
If local storage is unavailable, cleared, malformed or incompatible:

- the application must not break;
- safe defaults should be used;
- the device may behave as though it is a first visit.

## 13.10 Cross-device behaviour
Different devices/browsers maintain independent local state.

No cross-device synchronisation is required.

---

# 14. Optional Voice Messages

## 14.1 Status
Voice/audio is **not part of Core V1**.

It is an optional enhancement evaluated only after the core application reaches the required completion milestone.

## 14.2 Permitted audio
Only prerecorded personal voice messages are in scope.

Background music remains excluded.

## 14.3 Placement
Voice recordings may be attached selectively to existing content such as:

- selected Open When letters;
- potentially a particularly important For You message;
- potentially a Birthday Reveal moment.
There is no dedicated audio section.

## 14.4 Quantity
Target if approved:

**approximately 3 recordings**

Absolute Birthday V1 maximum:

**5 recordings**

Not every applicable piece of content should contain audio.

## 14.5 Playback
All playback is user-initiated.

Audio must never autoplay.

Use a small custom-styled player providing only necessary controls such as:

- play/pause;
- progress;
- duration.

## 14.6 Storage
Audio files are compressed static application assets.

No dedicated media backend is introduced.

Approved recordings should be cacheable for offline use where practical.

## 14.7 Inclusion gate
Voice messages may enter Birthday V1 only after all of the following are true:

1. all Core V1 experiences are feature-complete;
2. required written content and photography are integrated;
3. primary mobile UI has completed its first major polish pass;
4. PWA and persistence behaviour works;
5. no critical/high-priority core defects remain;
6. sufficient schedule buffer remains to record, edit, compress, integrate and retest audio without reducing the quality of Core V1.
If any condition fails, voice messages are removed from Birthday V1 without delaying release.

## 14.8 Evaluation timing
The audio gate is evaluated once after:

**Core V1 feature-complete + first mobile polish/testing pass.**

It should not be repeatedly reconsidered during ordinary development.

---

# 15. Content Requirements

## 15.1 For You
Target:

**15 personalised messages**

Suggested variety:

- approximately 5 short;
- approximately 7 medium;
- approximately 3 deeper/longer messages.
This is guidance rather than a rigid writing quota.

## 15.2 Open When
Target:

**9 letters**

Letters must cover meaningfully different emotional situations.

Potential categories include:

- missing the creator;
- having a sad/bad day;
- feeling stressed or overwhelmed;
- doubting herself;
- needing encouragement;
- being annoyed with the creator;
- being unable to sleep / needing comfort;
- something wonderful happening;
- needing reassurance about how much the creator cares.
Final titles and exact scenarios may be refined during content creation.

## 15.3 Our Story
Target:

**approximately 12 memories**

Acceptable final range:

**10–15**

Quality and emotional significance take priority over hitting exactly 12.

Do not create filler memories merely to reach a numeric target.

## 15.4 Photography
Target:

**approximately 15–25 carefully selected unique photographs across the application.**

Photographs may be deliberately reused where justified—for example a particularly meaningful image used in both Reveal and Our Story—but excessive repetition should be avoided.

## 15.5 Birthday Reveal
Requires:

- 3–5 scenes;
- 1–3 selected photographs;
- personalised opening/reveal copy;
- final personalised birthday message;
- final celebratory visual treatment.

## 15.6 Home
Home requires one strong hero visual treatment.

Its exact form remains a UI/UX design decision.

## 15.7 Video
No video asset is required for Birthday V1.

---

# 16. Content Authenticity
Personal writing must sound like the creator.

Preferred approach:

**natural personal voice, lightly edited for clarity and presentation.**

Humour, nicknames, conversational phrasing and personal quirks may remain where authentic.

AI may assist with:

- proofreading;
- structure;
- wording refinement;
- formatting;
- clarity.
AI must not independently invent:

- relationship memories;
- events;
- feelings;
- romantic claims;
- personal history.
The creator remains the source of personal meaning.

---

# 17. Content Architecture
Application content should live in centralised structured project content/data rather than being duplicated throughout UI components.

Conceptually:

```
content/
  for-you
  open-when
  memories
  birthday-reveal
```
The precise implementation format—TypeScript, JSON, Markdown or another suitable structured format—is an architecture decision for implementation.

Development placeholders are allowed.

All placeholders must be clearly identifiable and must be removed before release.

---

# 18. Mobile, Responsive & Browser Requirements

## 18.1 Primary target
Primary experience:

**modern smartphone, portrait orientation, touch input.**

## 18.2 Responsive support
The application must also respond appropriately on:

- tablets;
- modern desktop/laptop browsers;
- reasonable landscape layouts.
Desktop should look intentional rather than merely stretching a mobile layout.

Mobile remains the design priority.

## 18.3 Browser target
Support recent mainstream versions of:

- Safari/iOS;
- Chrome/Android;
- modern desktop Chromium browsers;
- modern desktop Safari.
Extensive legacy-browser compatibility is not a V1 objective.

---

# 19. Accessibility Baseline
Birthday V1 should follow practical accessibility fundamentals, including:

- readable text sizes;
- sufficient visual contrast;
- touch-friendly interaction targets;
- semantic document structure;
- appropriate image alternative text where useful;
- keyboard-usable navigation on desktop;
- respect for `prefers-reduced-motion`;
- no critical information available only through animation;
- no rapid flashing visual effects.
Formal accessibility certification is not a Birthday V1 deliverable.

---

# 20. Motion & Interaction Principles
The motion philosophy is:

**purposeful premium motion.**

Motion should reinforce:

- emotional moments;
- hierarchy;
- spatial continuity;
- content opening;
- scene transitions;
- tactile feedback.
Appropriate examples include:

- Birthday Reveal scene transitions;
- envelope opening;
- For You message reveal;
- photograph entrances;
- subtle card interactions;
- smooth transitions between major surfaces.
Animations must not:

- delay ordinary navigation unnecessarily;
- exist only as spectacle;
- feel chaotic;
- cause significant performance problems.
Reduced-motion preferences must be respected.

---

# 21. Performance
Birthday V1 should be performant on an ordinary modern smartphone.

Implementation should:

- resize photographs appropriately;
- compress media;
- use modern image formats where practical;
- lazy-load non-critical story imagery;
- prioritise assets required for first opening/Birthday Reveal;
- avoid unnecessarily heavy libraries;
- keep interactions responsive;
- provide graceful loading states where unavoidable.
No arbitrary Lighthouse score is mandated by the product specification.

Actual user experience takes priority.

---

# 22. Privacy, Analytics & External Services
The application contains:

- no advertising;
- no behavioural analytics;
- no deliberate user-interaction tracking;
- no unnecessary tracking cookies.
The creator should not receive reports showing which private letters the recipient opened or how often she visited.

Infrastructure-level logs produced automatically by the hosting provider are outside the application's behavioural feature scope.

External/social links should not be added unless a specific piece of approved content genuinely requires one.

---

# 23. Error Handling & Resilience
Technical problems must not unnecessarily destroy the emotional experience.

Where practical:

- failed optional media should not block written content;
- missing local state should fall back safely;
- malformed stored state should not crash the app;
- unavailable installation functionality should not affect the website;
- unsupported optional features should degrade gracefully.
Raw developer errors or stack traces must never form part of the intended user interface.

---

# 24. Release Content Gate
Birthday V1 is not considered release-ready merely because its software features work.

Before final birthday release:

- all 15 intended For You messages must be final, unless an explicit scope adjustment is approved;
- all 9 Open When letters must be final;
- final Our Story memories must be integrated;
- final photographs must replace temporary media;
- Birthday Reveal copy must be final;
- no development placeholders may remain;
- no known broken images or required assets may remain;
- names, dates and spelling must be manually checked;
- all primary journeys must be tested on the primary mobile target;
- the creator must personally complete one final end-to-end review from the recipient's perspective.
Content quality is part of release quality.

---

# 25. Core V1 Release Criteria
Core Birthday V1 is complete when:

- the first-opening flow works;
- Birthday Reveal works and persists completion correctly;
- Home and navigation are polished;
- For You selection/discovery behaves correctly;
- Open When behaves correctly;
- Our Story is complete and visually polished;
- final required content is integrated;
- local persistence is reliable and fails safely;
- PWA functionality works without being required;
- basic offline behaviour works;
- responsive mobile experience is polished;
- important accessibility behaviour is present;
- no critical/high-priority bugs remain;
- no out-of-scope infrastructure has been introduced unnecessarily.
Optional voice recordings are not required to satisfy Core V1 completion.

---

# 26. UI/UX Research Boundary
Once this specification is locked, UI/UX research may decide:

- visual direction;
- colour palette;
- typography;
- app icon design;
- PWA/app name;
- Home hero treatment;
- exact card/envelope visual language;
- scrapbook visual treatment;
- motion style;
- illustration/decorative language;
- detailed responsive layout.
UI/UX research must not silently change the product behaviour or expand V1 functionality.

Design proposals must conform to this specification.

---

# 27. Implementation Boundary
This specification authorises product/design planning.

It does **not** by itself authorise uncontrolled feature expansion.

Implementation should build the approved behaviour and should not independently add:

- accounts;
- backend systems;
- tracking;
- notifications;
- social features;
- gamification;
- additional primary sections;
- new content systems.
Any material product-scope change requires explicit approval and an update to this specification.

---

# 28. Scope-Protection Rule
The application should become more impressive primarily by improving:

- execution;
- visual design;
- writing;
- photography;
- motion;
- responsiveness;
- polish.
It should **not** become more impressive by continuously adding features.

If schedule pressure develops, optional enhancements are removed before Core V1 quality is reduced.

---

# 29. Authoritative Status
Once approved, this document becomes the authoritative **Birthday Website V1 Product Specification**.

Work, Codex and future project conversations should treat it as the primary product-behaviour reference.

Where an implementation or design idea conflicts with this specification:

**the specification wins unless the specification is explicitly amended.**
--- END LOCKED PRODUCT SPEC ---
