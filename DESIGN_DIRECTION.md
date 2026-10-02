# Birthday Website V1 — Design Direction

## Status

Day 2 visual direction is approved and locked for V1.

The selected direction is:

**Modern Editorial Keepsake**

The product should feel like a private, photo-led digital keepsake that combines the emotional warmth and typography of an editorial journal with the precision, navigation, and interaction quality of a premium contemporary mobile app.

The romance should come primarily from the personal photographs, memories, and written content rather than decorative Valentine's Day UI.

This design direction should guide later UX, UI, and frontend implementation decisions. It should not change the locked V1 product scope.

[PRODUCT_SPEC.md](PRODUCT_SPEC.md) remains authoritative for product behaviour, content limits, and navigation requirements. Day 3 may refine information architecture only within those existing requirements.

---

## 1. Core Design Principles

1. Personal content is always the hero.
2. Photography provides most of the visual colour and emotional character.
3. Whitespace is an intentional part of the design.
4. Modernity should come from precision, layout, typography, navigation, and interaction quality — not trendy visual effects.
5. Romance should come from the content rather than generic romantic iconography.
6. Use cards only when the content conceptually benefits from being a card.
7. Important memories may receive substantially more visual space than supporting memories.
8. Motion should be restrained and purposeful.
9. Special effects must feel earned.
10. The Birthday Reveal may temporarily become more cinematic and celebratory than the rest of the product.
11. The primary design target is mobile.
12. Every major screen should feel polished at phone width before desktop treatment is considered.

---

## 2. Overall Art Direction

The design should sit between:

- an editorial photo journal;
- a premium digital keepsake;
- a polished modern mobile application.

The interface should frame personal content rather than compete with it.

The overall experience should feel:

- personal;
- intimate;
- thoughtful;
- premium;
- modern;
- emotionally warm;
- visually memorable;
- calm;
- deliberate;
- highly polished.

Avoid making the experience feel like:

- a generic romantic website;
- a Valentine's Day template;
- a scrapbook template;
- a greeting card;
- a SaaS dashboard;
- a generic photo gallery.

The approximate visual balance is:

**70% editorial keepsake / 30% premium modern app**

---

## 3. Typography Direction

Use a two-voice typography system.

### Emotional / Editorial Voice

Preferred working typeface:

**Newsreader**

Use primarily for:

- major emotional statements;
- selected page titles;
- Open When letter content;
- significant quotes;
- important birthday/reveal text;
- meaningful story headings where appropriate.

Newsreader should not be used for every heading.

### Product / Interface Voice

Preferred working typeface:

**Geist Sans**

Use primarily for:

- navigation;
- controls;
- buttons;
- labels;
- dates;
- captions;
- metadata;
- UI text;
- supporting body text where a modern interface voice is preferable.

### Typography Principle

Newsreader carries emotion.

Geist carries interface.

Avoid script fonts for general UI or body copy.

If handwriting is used in the future, prefer a genuine personal handwritten element such as a scanned note or signature rather than making large portions of the product use a handwriting font.

---

## 4. Colour Direction

The colour system should be warm, restrained, and primarily neutral.

Working colour family:

- Warm Canvas — approximately `#F7F3EC`
- Soft Paper — approximately `#FFFDF9`
- Ink — approximately `#1D1C1A`
- Warm Grey — approximately `#746F68`
- Muted Plum — approximately `#765766`
- Sage — approximately `#788273`
- Amber / Clay — approximately `#B9825A`
- Deep Ink — approximately `#171719`

These hexadecimal values are directional rather than final implementation tokens.

The hierarchy matters more than the exact values.

General colour usage:

1. Warm ivory / canvas and ink dominate.
2. Plum is the primary emotional accent.
3. Sage and amber/clay are secondary and used sparingly.
4. Personal photographs supply most of the actual colour.
5. Pure black and sterile pure white should generally be avoided where warmer alternatives work.
6. The product should not use pink/red as its dominant romantic colour system.

---

## 5. Surface and Card Language

Use contemporary surfaces without turning every piece of content into a floating rounded card.

Preferred characteristics:

- moderate rounded corners;
- minimal or no shadows;
- tonal surface separation;
- subtle borders only where useful;
- generous internal spacing;
- restrained translucency;
- clean geometry;
- photographs allowed to escape or break the card system.

Avoid:

- excessive glassmorphism;
- oversized floating pills everywhere;
- large shadows;
- identical rounded rectangles for every content type;
- UI that resembles a dashboard.

Cards should represent meaningful content objects rather than being the default container for all layout.

---

## 6. Photography System

Photography is a primary part of the design language.

Use four principal photo compositions:

### Hero Image

For important emotional moments.

May be near full-width or, where appropriate, close to full-screen.

### Single Memory

One primary photograph with restrained supporting information such as a short caption or date.

### Memory Pair

Two photographs that belong to the same memory or moment.

### Film Strip

Approximately 2–4 supporting photographs where no single image needs to dominate.

This is a visual composition reference, not an increase to content limits. For an individual Our Story memory, the Product Specification’s limit of 1–3 photos applies.

### Photography Rule

**Layout importance should reflect emotional importance.**

Important photographs may receive substantially more space.

Supporting images may be grouped more compactly.

Avoid creating unnecessary gallery variants.

Do not default to:

- masonry galleries everywhere;
- fake Polaroid stacks;
- excessive collages;
- circular image crops;
- the same rounded-corner treatment on every photograph.

Occasional edge-to-edge or near-full-bleed photography is encouraged where it creates appropriate emotional emphasis.

---

## 7. Home / For You Visual Direction

The Home / For You experience should feel curated rather than populated.

Preferred rhythm:

**personal opening → emotional focal point → curated content → quieter supporting moments**

The first screen should likely include a strong emotional focal point such as:

- a meaningful photograph;
- a short personal line;
- a small contextual greeting or detail.

Avoid a conventional dashboard made from many equal-priority cards.

Exact modules, order, navigation relationships, and information architecture are intentionally NOT defined here. Those decisions belong to Day 3.

---

## 8. Open When Visual and Interaction Direction

Open When should feel like opening a meaningful personal object without becoming overly skeuomorphic.

### Closed State

Use an understated premium digital-object treatment.

Potential structure:

- small `OPEN WHEN` label;
- meaningful title;
- restrained visual detail suggesting a sealed or unopened state.

Avoid literal ornate envelopes as the dominant visual language.

### Opening Interaction

Preferred transition:

**touch / slight compression → restrained opening or expansion → title transitions into reading position → letter content appears**

The effect should feel tactile but minimal.

Avoid:

- flying envelopes;
- paper-tearing simulations;
- exaggerated wax seal animation;
- excessive decorative effects.

### Reading State

Once opened, most decorative UI should disappear.

Prioritise:

- readable typography;
- generous margins;
- comfortable line height;
- calm vertical spacing;
- the written message itself.

The envelope/opening metaphor is the interaction.

The words are the experience.

---

## 9. Our Story Visual Direction

Do NOT use a conventional corporate vertical timeline.

Instead, treat the story as a sequence of editorial chapters.

A chapter may include:

- small chapter number or marker;
- title;
- date/context;
- one primary photograph;
- short written memory;
- supporting photo pair or film strip where appropriate;
- generous whitespace before the next chapter.

Different memories are allowed to have different visual weight.

Important memories can be visually substantial.

Small memories can remain concise.

The page should feel like a curated story rather than a database of chronological events.

Exact information architecture belongs to Day 3.

---

## 10. Mobile Navigation Direction

The app should use a small number of clear, labelled primary destinations.

Navigation should be:

- mobile-first;
- thumb-friendly;
- stable;
- quiet;
- modern;
- immediately understandable.

A restrained bottom-navigation treatment is currently preferred visually.

Avoid an exaggerated floating glass navigation pill.

Do not lock the exact tab names or destination structure in this document.

Day 3 Information Architecture will refine navigation details within the primary destinations and hybrid navigation model already defined in Product Specification Section 7. This document does not reopen those locked requirements.

---

## 11. Motion System

Use three levels of motion.

### Level 1 — Functional

For:

- button/tap feedback;
- selected navigation state;
- minor state changes.

These animations should be subtle and quick.

### Level 2 — Transitional

For:

- card-to-detail transitions;
- Open When opening;
- photo reveals;
- transitions that explain where content came from.

These should remain smooth and restrained.

### Level 3 — Emotional

Reserved for meaningful moments such as:

- Birthday Reveal;
- potentially a very small number of major story beats.

Level 3 motion should remain rare.

Scarcity is important so significant animation retains emotional impact.

Support reduced-motion preferences.

Where motion is reduced, substitute potentially problematic movement, scaling, depth, or parallax with calmer fades or state changes.

---

## 12. Birthday Reveal Direction

The Birthday Reveal is allowed to become more cinematic than the normal interface.

The normal warm visual system may transition into a **Deep Ink** background.

The reveal should progress deliberately through a small number of meaningful beats, potentially including:

- darkness / quiet opening;
- a short personal line;
- photograph;
- another line or memory;
- main birthday message or reveal;
- final celebratory moment.

The reveal should prioritise pacing and emotional content rather than visual spectacle.

### Earned Celebration Effect

One brief celebratory effect is approved.

Preferred direction:

A short, sophisticated burst of confetti containing mostly restrained abstract pieces with a small number of subtle heart shapes.

Possible colours:

- muted plum;
- warm ivory;
- restrained gold / clay;
- possibly a small amount of sage.

The effect should occur only at the emotional culmination of the Birthday Reveal.

It should be brief and disappear afterward.

Avoid:

- continuous heart rain;
- permanent particles;
- excessive confetti throughout the site;
- balloons;
- repeated celebration animations;
- bright generic party graphics.

The effect works precisely because the rest of the product is visually restrained.

---

## 13. Styles and Patterns to Avoid

Explicitly avoid:

- dominant pink/red Valentine's colour schemes;
- floating hearts throughout the product;
- script typography for normal body/UI copy;
- ornate envelope/wax/parchment aesthetics across the whole app;
- scrapbook clutter;
- faux Polaroids everywhere;
- literal paper textures on every surface;
- excessive gradients;
- excessive glassmorphism;
- dashboard-style grids;
- excessive shadows;
- stock romantic illustrations;
- generic love quotations used as decoration;
- autoplay animation that delays access to content;
- confetti during routine navigation;
- generic Valentine iconography;
- identical rounded treatment for every photo;
- corporate-style relationship timelines;
- excessive handwriting fonts;
- colour systems that compete with personal photographs;
- animations without a functional or emotional purpose.

---

## 14. Key Reference Influences

The selected direction draws selectively from the following types of references:

### Apple Journal

Borrow:

- photo and writing integration;
- content-first composition;
- clean mobile presentation.

Do not copy:

- overly generic Apple utility-app character.

### Day One

Borrow:

- calm long-form reading;
- writing-first presentation;
- memory/photo organisation.

Do not copy:

- journal-management or productivity-heavy UI.

### Retro

Borrow:

- intimate private-photo-journal feeling;
- curated groups of ordinary memories.

Do not copy:

- social networking mechanics.

### Apple Photos Memories

Borrow:

- curated visual storytelling;
- immersive presentation of important imagery.

Do not copy:

- photo-library management UI.

### Apple Invites

Borrow:

- strong hero photography;
- restrained premium event presentation.

Do not copy:

- event-management or generic celebration graphics.

### Things

Borrow:

- interface restraint;
- secondary controls staying visually quiet;
- clean modern product polish.

Do not copy:

- productivity semantics.

### Aesop

Borrow:

- editorial whitespace;
- warm/mineral neutrals;
- understated premium character.

Do not copy:

- overly austere commerce layouts.

### MUBI / A24

Borrow:

- cinematic photography;
- confident cropping;
- restrained visual storytelling.

Do not copy:

- cold or overly dark brand character across the entire product.

### Spotify Wrapped

Borrow only:

- reveal pacing;
- one-moment-at-a-time storytelling;
- clear progression through a special sequence.

Do not copy:

- neon colour;
- statistics/game-like presentation;
- constant movement;
- social-share visual language.

### Open When digital-letter references

Borrow:

- deliberate closed/open state;
- ritual around opening a message.

Do not copy:

- ornate stationery aesthetics.

---

## 15. Final Approved Direction

**Modern Editorial Keepsake**

A private, photo-led digital keepsake combining the emotional warmth and typography of an editorial journal with the precision, navigation, and interaction quality of a premium contemporary mobile app.

Use:

- warm neutral surfaces;
- deep ink typography;
- muted accents;
- expressive photography;
- Newsreader for emotional/editorial moments;
- Geist Sans for product/interface language;
- generous whitespace;
- restrained tactile motion;
- modern mobile interaction patterns;
- one earned celebratory moment during the Birthday Reveal.

Personal photographs and writing should create the emotional character.

The interface should remain sophisticated and understated.

---

## 16. Scope Boundary

This document defines visual and interaction direction only.

It does NOT change:

- V1 feature scope;
- product requirements;
- content requirements;
- technical architecture;
- information architecture;
- navigation destinations;
- implementation decisions already governed by the locked Product Specification.

Any information-architecture decisions should be handled during Day 3.

Any frontend implementation should occur only in the appropriate later development phase.
