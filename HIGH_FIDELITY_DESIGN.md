# Birthday Website V1 — High-Fidelity Mobile Design Specification

**Status:** Day 5 high-fidelity design approved and locked for V1  
**Design direction:** Modern Editorial Keepsake  
**Authoritative inputs:** `PRODUCT_SPEC.md`, `DESIGN_DIRECTION.md`, `INFORMATION_ARCHITECTURE.md`, `WIREFRAMES.md`

This document defines the final V1 high-fidelity visual system and mobile design treatment.

It specifies:

- final colour system;
- typography;
- spacing;
- surfaces;
- borders;
- radii;
- shadows;
- navigation;
- cards;
- buttons;
- icons;
- photography;
- screen styling;
- interaction states;
- motion;
- loading/error/empty states;
- responsive behaviour;
- accessibility-related visual rules;
- font-loading behaviour;
- link-preview behaviour;
- image alternative-text guidance;
- testing targets.

It does not modify product scope, information architecture, persistence behaviour, navigation structure, or feature logic.

The Product Specification remains authoritative for product behaviour.

---

# 1. Final Design Direction

The final design direction is:

**Modern Editorial Keepsake**

The Birthday Website should feel like a private, photo-led editorial keepsake presented through a polished contemporary mobile product.

Approximate balance:

**70% editorial keepsake / 30% premium modern app**

The experience should feel:

- personal;
- intimate;
- thoughtful;
- warm;
- premium;
- modern;
- emotionally expressive;
- visually memorable;
- calm;
- deliberate;
- highly polished.

The emotional character should come primarily from:

- personal writing;
- personal photography;
- pacing;
- hierarchy;
- typography;
- whitespace.

UI decoration should remain restrained.

Core principle:

> **The interface frames the relationship. It does not perform the relationship.**

---

# 2. Visual Personality

The product should feel like a combination of:

- a private photo journal;
- an editorial memory book;
- a premium digital keepsake;
- a polished modern mobile application.

It should not feel like:

- a generic birthday website;
- a Valentine's Day template;
- a scrapbook template;
- a greeting card;
- a SaaS dashboard;
- a generic gallery;
- a social-media application.

---

# 3. Final Colour System

## 3.1 Core Palette

### Canvas

`#F6F1E8`

Primary application background.

Use across:

- Home;
- For You;
- Open When;
- Our Story;
- general application shell.

The Canvas should feel warm rather than white.

---

### Paper

`#FFFCF7`

Primary elevated surface.

Use for:

- message cards;
- letters;
- readers;
- sheets;
- contextual surfaces;
- selected content objects.

---

### Soft Surface

`#EFE8DE`

Quiet tonal surface.

Use for:

- subtle secondary areas;
- previously opened states;
- quiet interface sections;
- restrained loading/error surfaces.

---

### Ink

`#201E1B`

Primary text colour.

Use instead of pure black.

---

### Warm Grey

`#6F6962`

Secondary text colour.

Use for:

- captions;
- metadata;
- dates;
- inactive navigation labels;
- supporting descriptions.

---

### Plum

`#755A67`

Primary emotional accent.

Use for:

- selected navigation details;
- micro-labels;
- selected states;
- important small UI accents;
- feature-card details;
- primary emotional emphasis.

---

### Deep Plum

`#5D4652`

Higher-contrast Plum.

Use for:

- primary buttons;
- smaller Plum text requiring stronger contrast;
- high-priority actions.

---

### Sage

`#7C8474`

Secondary atmospheric accent.

Use sparingly.

Appropriate for:

- decorative tonal surfaces;
- tiny section accents;
- selected Open When cards;
- quiet Story chapter details.

Do not use Sage for small body text.

---

### Clay

`#B47C57`

Warm secondary accent.

Use sparingly for:

- selected decorative details;
- Birthday Reveal;
- Open When tonal variation;
- small warm visual accents.

---

### Deep Ink

`#171617`

Use for:

- Birthday Reveal;
- Story Photo Viewer;
- cinematic dark surfaces.

---

### Hairline

`#DDD4CA`

Default border/divider.

---

# 4. Tonal Surface Variants

The application may use extremely pale accent surfaces to prevent the overall experience from feeling visually cold.

These remain intentionally subtle.

Suggested families:

### Pale Plum

Approximately:

`#F3EAEE`

Use selectively for:

- For You closed-message surface;
- occasional feature surface;
- very restrained selected state.

---

### Pale Sage

Approximately:

`#EDF0E9`

Use selectively for:

- occasional Open When card;
- small supporting section.

---

### Pale Clay

Approximately:

`#F5ECE4`

Use selectively for:

- warm supporting surface;
- occasional Open When variation;
- selected Home detail.

---

## Tonal Surface Rule

These colours should not create a multi-coloured card grid.

Use them as quiet emotional variation.

The interface should still appear predominantly:

- Canvas;
- Paper;
- Ink;
- photography.

Recommended overall balance:

```text
85–90% neutral / photography-led
10–15% designed accent colour
```

---

# 5. Colour Distribution by Experience

## Home

Warm Canvas + Paper + personal photography.

Plum used for:

- subtle labels;
- active controls;
- selected feature details.

Clay may appear in very small warm accents.

---

## For You

Slightly warmer and more intimate.

A pale Plum surface may be used for the featured closed message.

Plum is the dominant designed accent.

---

## Open When

Warm Paper remains primary.

A small number of letters may use extremely restrained:

- pale Plum;
- pale Sage;
- pale Clay;

while remaining part of one cohesive collection.

Do not assign a unique bright colour to every letter.

---

## Our Story

Photography provides nearly all expressive colour.

Use Plum, Sage or Clay only for:

- chapter markers;
- fine lines;
- tiny metadata details.

---

## Birthday Reveal

This is the most visually intense experience.

Use:

- Deep Ink;
- warm Paper text;
- richer Plum;
- Clay/gold warmth;
- small Sage details;
- richer photography.

The Reveal may feel more vibrant than the rest of the app without introducing a new unrelated palette.

---

# 6. Birthday Reveal Accent Palette

Normal app Plum:

`#755A67`

Reveal Plum:

`#A98898`

Reveal Clay:

approximately `#C8966E`

Reveal Sage:

approximately `#99A091`

Reveal primary text:

`#FFFCF7`

Reveal secondary text:

approximately `#CFC6BC`

These brighter versions stay within the same colour families as the rest of the product.

This allows the Reveal to feel:

- richer;
- more luminous;
- more celebratory;

without appearing to belong to a different application.

---

# 7. Birthday Reveal Vibrancy Rule

The Birthday Reveal should be more visually intense than the normal application.

Increase intensity through:

- Deep Ink background;
- stronger contrast;
- richer photography;
- brighter warm text;
- slightly stronger Plum/Clay accents;
- carefully controlled light/glow;
- the single celebratory burst;
- more expressive motion.

Do not increase vibrancy through:

- neon colours;
- bright pink;
- bright red;
- rainbow gradients;
- constant particles;
- colourful UI chrome;
- glowing buttons everywhere;
- unrelated colour families.

Core principle:

> **The Reveal becomes more intense, not stylistically unrelated.**

---

# 8. Typography System

Use:

**Newsreader + Geist Sans**

Newsreader carries emotion.

Geist carries interface.

---

# 9. Newsreader Usage

Use Newsreader primarily for:

- major emotional statements;
- Birthday Reveal;
- important Home statements;
- letter content;
- letter titles;
- Story memory headings;
- highlighted quotes;
- significant For You messages.

Do not use it for every heading and control.

---

# 10. Geist Sans Usage

Use Geist Sans primarily for:

- navigation;
- buttons;
- controls;
- metadata;
- labels;
- dates;
- captions;
- supporting body copy;
- tabs;
- system/error messages.

---

# 11. Final Type Scale

## Display XL

Typeface: Newsreader  
Size: `48px`  
Line height: `0.98–1.04`  
Weight: `500`

Use only for exceptional moments, primarily final Reveal content.

---

## Display / H1

Typeface: Newsreader  
Size: `36px`  
Line height: `1.08`  
Weight: `500`

Use for:

- page-level emotional headings;
- Home headline;
- For You;
- Open When;
- Our Story.

---

## H2 Editorial

Typeface: Newsreader  
Size: `28px`  
Line height: `1.15`  
Weight: `500`

Use for:

- memory titles;
- letter titles;
- major message titles.

---

## H3

Typeface: Newsreader or Geist depending context  
Size: `22px`  
Line height: `1.25`

Newsreader weight:

`500`

Geist weight:

`600`

---

## Emotional Body

Typeface: Newsreader  
Size: `19px`  
Line height: `1.65`

Use for:

- letters;
- intimate message content;
- selected emotional text.

For very long content, `18px` is acceptable.

---

## Standard Body

Typeface: Geist Sans  
Size: `17px`  
Line height: `1.6`  
Weight: `400`

Use for:

- Our Story body copy;
- supporting descriptions;
- ordinary text.

---

## UI Body

Typeface: Geist Sans  
Size: `15–16px`  
Line height: `1.45`  
Weight: `450–500`

---

## Caption

Typeface: Geist Sans  
Size: `13px`  
Line height: `1.4`

Colour:

Warm Grey.

---

## Micro Label

Typeface: Geist Sans  
Size: `11px`  
Weight: `600`  
Line height: `1.3`

Letter spacing:

`0.08–0.12em`

Use for:

- `OPEN WHEN`;
- chapter markers;
- small metadata.

---

# 12. Typography Rules

Use Newsreader when the words themselves carry emotion.

Use Geist when the text explains the interface.

Example:

```text
OPEN WHEN             → Geist
you miss me           → Newsreader

03 / SUMMER           → Geist
That weekend...       → Newsreader
```

Avoid:

- script fonts;
- generic handwriting fonts;
- excessive italics;
- excessive uppercase.

Authentic handwriting may be introduced only as a genuine scanned note/signature.

---

# 13. Font Loading Strategy

Production should avoid relying on runtime third-party font delivery for critical typography.

Preferred approach:

**self-host the required Newsreader and Geist font files with the application.**

Benefits:

- faster predictable loading;
- improved privacy;
- better offline support;
- fewer external dependencies;
- more reliable Birthday Reveal typography.

---

# 14. Critical Font Loading

Preload the minimum font files required for:

- Personalised Opening;
- Birthday Reveal;
- primary UI shell.

Particularly prioritise:

- Newsreader 500;
- Geist regular/medium;
- Geist semibold if used for buttons/navigation.

Do not preload unnecessary weights.

---

# 15. Font Fallbacks

Recommended fallback philosophy:

### Newsreader

```text
Newsreader,
Georgia,
"Times New Roman",
serif
```

Use a visually reasonable serif fallback.

---

### Geist

```text
Geist,
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
sans-serif
```

---

# 16. Font Display Behaviour

Use a resilient loading strategy such as:

`font-display: swap`

or an equivalent strategy that keeps text visible while limiting disruptive layout shifts.

Text must never remain invisible while a font downloads.

The fallback should be reasonably close in:

- width;
- perceived weight;
- line length.

The opening screen gives the browser time to load critical fonts before the user deliberately starts the Birthday Reveal.

---

# 17. Spacing System

Use a 4px base scale.

Approved spacing:

```text
4
8
12
16
20
24
32
40
48
64
80
```

---

# 18. Mobile Gutters

Standard mobile edge gutter:

`20px`

Use up to:

`24px`

on wider phones.

Important photography may occasionally break beyond the standard grid.

Text should not.

---

# 19. Vertical Rhythm

Typical spacing relationships:

```text
label → heading           8px

heading → supporting text
12–16px

text → action
20–24px

card internal padding
20–24px

section → section
40–48px

story chapter → chapter
64–88px

major emotional pause
64px+
```

Whitespace is part of the design.

Do not fill blank space merely because room exists.

---

# 20. Radius System

Use a controlled radius scale.

### Small

`10px`

### Medium

`16px`

### Large

`20px`

### Extra Large

`24px`

### Full

`999px`

Use Full only for genuine pills/circles.

Do not make every surface pill-shaped.

---

# 21. Border System

Default:

```text
1px solid #DDD4CA
```

Accent borders may use Plum at low visual strength.

Avoid:

- thick outlines;
- decorative frames;
- strong card borders.

---

# 22. Shadow System

Normal cards:

**no shadow**

Use colour, spacing and border separation instead.

Floating contextual surfaces may use:

```text
0 8px 30px rgba(32, 30, 27, 0.08)
```

Viewer controls or stronger overlays may use slightly more depth.

Avoid:

- strong multi-layer shadows;
- floating card stacks.

---

# 23. Icon System

Use one consistent rounded line-icon family.

Guidance:

```text
20–22px
approximately 1.75px stroke
rounded joins
rounded caps
```

Recommended semantics:

- Home → house;
- For You → note/message symbol;
- Open When → envelope;
- Our Story → book/photo-story symbol;
- More → ellipsis;
- Back → chevron-left;
- Close → X;
- Replay → rotate/replay arrow;
- Install → device/home-screen symbol.

Do not use a heart as a permanent navigation icon.

---

# 24. Primary Buttons

Background:

Deep Plum `#5D4652`

Text:

Paper `#FFFCF7`

Height:

`52px`

Horizontal padding:

`20–24px`

Radius:

`16px`

Typeface:

Geist Sans `15px / 600`

Pressed state:

- scale to approximately `0.985`;
- slight darkening;
- `100–130ms`.

---

# 25. Secondary Buttons

Background:

Paper.

Text:

Ink.

Border:

Hairline.

Height:

`52px`

Radius:

`16px`.

---

# 26. Text Actions

Colour:

Deep Plum.

Touch area:

minimum approximately `44px`.

Use for:

- Browse all messages;
- section entry;
- quiet secondary action.

---

# 27. Icon Buttons

Minimum target:

`44 × 44px`

Use for:

- More;
- Close;
- Back.

---

# 28. Interaction States

All controls should support:

- Rest;
- Pressed;
- Focus;
- Selected;
- Disabled where genuinely required.

Do not represent selected state through colour alone.

Use combinations such as:

- weight;
- underline;
- icon change;
- tonal surface;
- accent marker.

---

# 29. Primary Mobile Navigation

Use a grounded bottom navigation.

Do not use a large floating glass capsule.

Surface:

Paper at approximately `94–97%` opacity.

A small amount of blur may be used if technically simple.

Top border:

Hairline.

Approximate content height:

`64px`

plus safe-area inset.

---

# 30. Bottom Navigation Structure

```text
Home
For You
Open When
Our Story
```

Each item includes:

- icon;
- text label.

Labels remain visible.

Recommended:

```text
icon
label
```

Selected state:

- Ink text/icon;
- small Plum indicator;
- slightly stronger weight.

Inactive:

Warm Grey.

---

# 31. Top-Level Header

Typical structure:

```text
Page title                         More
```

Page title may use Newsreader.

More uses Geist-compatible iconography.

Headers should feel light and content-led, not like heavy app bars.

---

# 32. Personalised Opening Screen

Background:

Canvas.

Mood:

warm;
quiet;
anticipatory.

Layout:

- generous safe-area spacing;
- approximately 20–24px side padding;
- content vertically balanced.

Typography:

small context → Geist.

Main opening statement:

Newsreader `36–40px`.

Supporting line:

Geist `15–16px`.

---

# 33. Opening-Screen Photography

Use one meaningful image.

Preferred ratio:

- `4:5`;
- `3:4`;

depending source photograph.

Radius:

`16px`.

No:

- decorative stickers;
- collage treatment;
- heavy border;
- strong shadow.

---

# 34. Opening CTA

Primary button:

**Open your birthday surprise**

Deep Plum background.

The CTA should feel intentional and calm rather than loud.

---

# 35. Birthday Reveal Transition

After CTA:

```text
Warm Canvas
→ subtle darkening
→ crossfade
→ Deep Ink
```

Normal duration:

approximately `450–600ms`.

Reduced motion:

approximately `150–200ms`.

---

# 36. Birthday Reveal Structure

Use approximately:

**3–5 scenes**

over approximately:

**45–90 seconds**, depending interaction speed.

Use:

- 1–3 selected photos;
- short personal lines;
- deliberate progression;
- final emotional message;
- one celebratory culmination.

Do not use scrolling inside the Reveal.

---

# 37. Reveal Typography

Main emotional line:

Newsreader `36–44px`.

Supporting text:

Newsreader or Geist `17–20px`.

Continue cue:

Geist `13px / 500`.

Colour:

light secondary text.

---

# 38. Reveal Photography

Use:

- centred portrait;
- near-full-width crop;
- one cinematic photograph.

Radius:

`12–16px`

or square corners where an intentional cinematic treatment fits the specific photograph.

Do not use a uniform card treatment.

---

# 39. Reveal Motion

Standard transition:

- crossfade;
- `350–500ms`;
- optional `8–12px` vertical settling.

Photo emphasis may use:

`scale(1.02) → scale(1.00)`

over approximately:

`600–800ms`.

Use sparingly.

Do not animate every sentence separately.

---

# 40. Final Reveal Scene

Hierarchy:

```text
selected image / focal visual

Happy Birthday

final personal message

earned celebration

continue
```

`Happy Birthday`:

Newsreader Display XL.

The final message may use Newsreader `19–22px`.

---

# 41. Final Celebration

Use one brief confetti-like burst.

Colours:

- Reveal Plum;
- warm Paper;
- Clay;
- restrained Sage.

Most elements:

abstract shapes.

Tiny hearts:

approximately `10–15%` of visible pieces.

Duration:

approximately `1.2–1.8s`.

Everything disappears afterward.

No persistent particles.

---

# 42. Reveal → Home Transition

Preferred:

```text
Deep Ink
→ dissolve / crossfade
→ Canvas
→ normal application shell
```

Approximate duration:

`600–750ms`.

A shared-image transition may be used if the same photo naturally belongs in both scenes.

Do not force photo reuse solely for animation.

---

# 43. Home

Background:

Canvas.

Final hierarchy:

```text
Greeting
Hero
Personal line

For You feature
Open When entry
Our Story entry
```

No dashboard grid.

---

# 44. Home Header

Context/greeting detail:

Geist `13px`.

Main greeting:

Newsreader `32–36px`.

More:

44px icon target.

Spacing afterward:

approximately `24px`.

---

# 45. Home Hero

One meaningful image.

Default ratio:

approximately `4:3`.

Radius:

`16px`.

No strong border.

No heavy shadow.

Optional caption:

Geist Caption / Warm Grey.

---

# 46. Home Personal Line

Newsreader:

`22–26px`.

Line height:

approximately `1.3`.

Use approximately:

2–4 lines.

Leave generous spacing around the statement.

---

# 47. Home For You Preview

This is Home's most prominent content card.

Background:

Paper or a very subtle pale Plum.

Radius:

`20px`.

Padding:

`20px`.

Structure:

```text
FOR YOU

optional title

short teaser

Open message →
```

Label:

Geist Micro Label.

Title:

Newsreader `24px`.

Teaser:

Geist or Newsreader depending tone.

The full message is not exposed.

Preview appearance does not mark the message seen.

---

# 48. Home Open When Entry

Use:

Paper / Soft Surface / very pale warm tone.

Radius:

`18px`.

Structure:

```text
OPEN WHEN

short line

abstract envelope detail

Explore letters →
```

Use an abstract correspondence cue.

Avoid ornate envelope illustration.

---

# 49. Home Our Story Entry

Use photography more prominently.

Structure:

```text
photo
OUR STORY
short line
Read our story →
```

Radius:

`18px`.

Text should not sit over a visually busy photograph unless readability is guaranteed.

---

# 50. For You Page

Background:

Canvas.

Title:

Newsreader `36px`.

Supporting line:

Geist `15–16px`.

---

# 51. Featured / All Messages Tabs

Use editorial text tabs.

Structure:

```text
Featured        All messages
────────
```

Active:

- Ink;
- Geist `600`;
- Plum underline approximately `2px`.

Inactive:

Warm Grey.

Do not use a large filled segmented pill.

---

# 52. Featured Closed Message

Surface:

Paper or subtle Pale Plum.

Radius:

`20px`.

Border:

Hairline.

Padding:

`24px`.

Recommended minimum visual height:

approximately `240–280px`.

Structure:

```text
FOR YOU

optional title

large breathing space

Tap to open
```

Title:

Newsreader `26–30px`.

---

# 53. Message Opening Detail

Use one subtle motif:

- Plum dot;
- fine line;
- restrained edge detail;
- small tonal mark.

Do not use:

- wax seals;
- decorative hearts;
- ornate stationery.

---

# 54. Message Pressed State

Scale:

`0.985`.

Duration:

approximately `120ms`.

Small tonal/border strengthening.

No dramatic bounce.

---

# 55. Message Reader

Background:

Paper.

Content gutter:

`24px`.

Close target:

44px.

Optional title:

Newsreader `28px`.

Body:

Newsreader `19px / 1.65`.

Long message:

Newsreader `18px`.

No card around the text inside the reader.

The reading experience should feel visually quiet.

---

# 56. Discover Another

Preferred style:

secondary bordered button.

Label:

**Discover another**

Do not use shuffle-style algorithmic visual language.

---

# 57. All Messages Collection

Avoid fifteen large cards.

Use editorial rows.

Recommended structure:

```text
optional title
short cue / preview
seen/unseen detail                           →
──────────────────────────────────────────────
```

Row height:

approximately `72–84px`.

Unread:

- Ink;
- optional small Plum dot.

Seen:

- remains fully accessible;
- metadata uses Warm Grey.

No checkmarks.

No progress count.

---

# 58. Open When Page

Background:

Canvas.

Title:

Newsreader `36px`.

Intro:

Geist `16px / 1.55`.

Space before first letter:

approximately `28–32px`.

---

# 59. Open When Card

Single-column mobile layout.

Background:

Paper or one of the approved extremely pale tonal surfaces.

Radius:

`20px`.

Border:

Hairline.

Padding:

`22–24px`.

Structure:

```text
OPEN WHEN

you miss me

small state detail
```

Label:

Geist Micro / Plum.

Title:

Newsreader `24–28px`.

---

# 60. Open When Colour Variation

A small number of cards may use:

- Paper;
- Pale Plum;
- Pale Sage;
- Pale Clay.

Distribution should feel curated rather than alternating mechanically.

Avoid:

- rainbow effect;
- saturated card colours;
- one unique colour per letter.

---

# 61. Envelope Visual Motif

Use one restrained cue consistently:

- shallow flap line;
- fine seam;
- edge fold;
- tiny seal-like dot.

Do not use:

- ornate wax seal;
- stamp graphics;
- paper texture;
- realistic envelope animation.

---

# 62. Opened / Unopened Letter States

## Unopened

- Ink title;
- slightly stronger Plum accent;
- inviting Paper/tonal surface.

Optional subtle text:

`unopened`

---

## Opened

Use:

- slightly quieter surface;
- reduced accent strength;
- caption such as `opened before`.

Do not use:

- ticks;
- progress marks;
- crossed-out text;
- completion badges.

Opened letters remain equally accessible.

---

# 63. Letter Opening Motion

First opening:

approximately `320–420ms`.

Sequence:

```text
press
→ seam/flap detail changes
→ selected surface expands
→ reader appears
```

Repeat opening:

approximately `180–240ms`.

Reduced motion:

simple fade.

---

# 64. Letter Reader

Background:

Paper.

Back control:

44px target.

Label:

`OPEN WHEN`

Geist Micro / Plum.

Title:

Newsreader `32px`.

Body:

Newsreader `19px / 1.7`.

Gutter:

`24px`.

Paragraph spacing:

approximately `18–22px`.

---

# 65. Letter Photography

Photo is optional.

When used:

- full content width;
- radius `12–16px`;
- approximately `28–36px` spacing around it.

Do not force photos into every letter.

---

# 66. Optional Voice Player

Only if separately approved under the Product Specification gate.

Surface:

Soft Surface.

Radius:

`16px`.

Height:

approximately `56–64px`.

Include only:

- play/pause;
- progress;
- duration.

No autoplay.

No background music.

---

# 67. Our Story

Background:

Canvas.

Title:

Newsreader `36px`.

Opening introduction:

Newsreader `22px / 1.45`

or Geist `17px`, depending content.

Top gap before first memory:

approximately `48px`.

---

# 68. Story Chapter Rhythm

Chapter spacing:

approximately `64–88px`.

Spacing may vary according to emotional importance.

Do not make every memory mechanically identical.

---

# 69. Story Metadata

Chapter number:

Geist Micro Label.

Date/context:

Geist Caption.

Colour:

Warm Grey or Deep Plum.

Never fabricate dates for visual consistency.

---

# 70. Story Memory Title

Newsreader:

`28–32px`.

Line height:

`1.15`.

Spacing below:

`16–20px`.

---

# 71. Story Body

Geist:

`17px / 1.6`.

Use Newsreader selectively for emotionally significant passages.

---

# 72. Highlighted Story Line

Newsreader:

`24px / 1.35`.

May use italic selectively.

Do not add decorative quotation marks solely as ornament.

---

# 73. Single Story Image

Default:

content width.

Radius:

`16px`.

Important memory:

may break nearer to the screen edge.

Do not place images inside generic card shells.

---

# 74. Memory Pair

Gap:

`8px`.

Radius:

`12px`.

If images become too small on narrow devices, stack vertically.

---

# 75. Three-Image Memory

Preferred layout:

```text
large primary image

8px gap

two smaller supporting images
```

Primary radius:

`16px`.

Supporting radius:

`12px`.

Never exceed the Product Specification's 3-photo memory limit.

---

# 76. Text-Led Memory

No image placeholder is required.

Use deliberate whitespace.

A text-only memory should feel intentional.

---

# 77. Story Ending

Before closing:

approximately `80px` whitespace.

Closing line:

Newsreader `26–30px`.

Supporting line:

Geist `15–17px`.

The ending should communicate continuation.

No completion message.

---

# 78. Story Photo Viewer

Background:

Deep Ink.

Photo:

contained within available viewport.

Do not unnecessarily crop.

Close:

44px target.

For multiple photos:

small pagination dots.

Active:

Paper.

Inactive:

low-opacity Paper.

---

# 79. Story Viewer Motion

Open:

approximately `220–300ms`.

Use:

- subtle expansion;
- fade.

Close:

reverse where practical.

Reduced motion:

fade approximately `150ms`.

Swipe only within photographs belonging to the originating memory.

---

# 80. More Menu

Mobile preference:

bottom sheet.

Background:

Paper.

Top radius:

`24px`.

Padding:

`20px`.

Quiet shadow.

Overlay:

approximately `18–24%` dark scrim.

Rows:

minimum `52px`.

Contents:

- Replay Birthday Surprise;
- Install/Add to Home Screen where relevant.

Do not add general settings.

---

# 81. Install Suggestion

Only show when Product Specification eligibility rules are satisfied.

Surface:

Paper.

Radius:

`20–24px`.

Optional icon:

`40–48px`.

Title:

Newsreader `22px`

or Geist `20px / 600`.

Body:

Geist `15px`.

Primary action:

Deep Plum.

Secondary action:

text action.

Installation must look optional.

---

# 82. Loading State

Background:

Canvas.

Use:

- small identity mark;
- static mark;
- restrained opacity pulse.

Do not use:

- large spinner;
- progress percentage;
- dramatic loading animation.

---

# 83. Image Placeholder

Use fixed intended image ratio.

Background:

Soft Surface.

Radius matches eventual image.

Avoid large skeleton-shimmer systems.

---

# 84. Error and Empty States

Use:

- Canvas;
- Newsreader headline;
- concise Geist explanation;
- one clear recovery action.

Do not use:

- cartoon illustrations;
- sad-face icon;
- technical language.

---

# 85. Offline Missing Content

Show only when the current content cannot load.

Hierarchy:

```text
short headline

one-sentence explanation

Try again
```

If some content is already cached, keep it visible.

---

# 86. Missing Image State

Preserve layout ratio.

Use Soft Surface.

Optional:

- small image icon;
- concise neutral text.

Never remove the associated story/message.

---

# 87. Locked Content

Birthday V1 includes no generic locked-content state.

There is:

- no birthday date gate;
- no locked For You message;
- no locked Open When letter.

Do not create a reusable V1 Locked Card component.

---

# 88. Completed States

Birthday Reveal completion is communicated by entering Home.

Do not display:

`Completed`

Open When:

opened state remains subtle.

For You:

seen state remains subtle.

Our Story:

no completion state.

---

# 89. Background Treatment

Normal application:

flat Canvas.

Do not add persistent:

- gradients;
- paper grain;
- floating blobs;
- particles;
- decorative hearts.

If texture is ever tested, omit it unless virtually imperceptible.

Preferred V1 implementation:

clean tonal surfaces.

---

# 90. Photography Rules

Photography provides most of the app's colour.

Do not use one universal crop or treatment.

Use:

### Hero

`4:3`, `3:4`, or composition-specific crop.

### Story portrait

composition-led portrait crop.

### Pairs

coordinated crops where appropriate.

### Reveal

cinematic composition.

### Viewer

uncropped/contained whenever practical.

---

# 91. Photography Colour Treatment

Avoid heavy global filtering.

Permitted:

- exposure corrections;
- crop corrections;
- slight warmth consistency.

Avoid:

- sepia;
- fake film grain everywhere;
- washed-out beige preset;
- excessive saturation;
- heavy contrast filter.

Authenticity takes priority over palette matching.

---

# 92. Image Borders and Shadows

Default:

no border.

Default:

no shadow.

Radius may provide enough separation.

Use Hairline only where required for readability.

---

# 93. Image Alternative Text

Meaningful photographs should receive concise, contextual alt text.

Alt text describes what the photograph shows.

The surrounding visible story/caption provides the emotional interpretation.

Example:

Good:

`Us laughing together beside the lake during our weekend away.`

Avoid:

`photo`

or:

`memory image`

or duplicating the entire visible caption.

---

# 94. Decorative Image Accessibility

Purely decorative elements should normally use empty alternative text / be hidden from assistive technology.

Examples:

- confetti;
- abstract envelope lines;
- decorative dots;
- purely decorative background shapes.

Birthday Reveal photography is meaningful and should generally receive useful alt text.

---

# 95. Motion System

Use three levels.

## Level 1 — Functional

Duration:

`100–180ms`

For:

- press feedback;
- selected navigation;
- minor state change.

---

## Level 2 — Transitional

Duration:

`220–420ms`

For:

- message opening;
- letter opening;
- photo viewer;
- More sheet.

---

## Level 3 — Emotional

Duration:

approximately `450–800ms`

For:

- Birthday Reveal;
- final Reveal → Home transition.

Do not use Level 3 motion for routine navigation.

---

# 96. Easing

Use calm ease-out curves.

Avoid:

- strong bounce;
- rubber-band effects;
- large overshoot;
- playful spring motion.

Tiny spring behaviour may be used for touch feedback only if visually restrained.

---

# 97. Reduced Motion

Respect `prefers-reduced-motion`.

Remove/reduce:

- parallax;
- image zoom;
- large transforms;
- confetti trajectories;
- strong spatial transitions.

Replace with:

- fades;
- direct state change;
- minimal movement.

No information may depend on motion.

---

# 98. Accessibility

Minimum interactive target:

approximately `44 × 44px`.

Do not use colour alone to indicate:

- current navigation item;
- seen/unseen;
- opened/unopened.

Body sizes:

generally at least `15–16px`.

Reading content:

generally `17–19px`.

Accent colours such as Sage and Clay should not be used as small low-contrast text.

---

# 99. Keyboard Behaviour

On desktop:

- navigation must be keyboard-usable;
- Back/Close must be keyboard-accessible;
- Story Viewer controls must work without pointer-only interaction;
- focus state must remain visible.

---

# 100. Focus Style

Preferred:

`2px` Deep Plum outline.

Offset:

approximately `2px`.

Never remove browser focus indication without a replacement.

---

# 101. Link Preview / Open Graph Strategy

External messaging previews must not spoil the Birthday Reveal.

Provide intentionally neutral Open Graph metadata.

Recommended preview title:

**A little something for you**

Recommended description:

**Made especially for you.**

Exact wording may be slightly personalised later, but should not mention:

- Happy Birthday;
- Birthday Reveal;
- private messages;
- Open When letters;
- relationship memories.

---

# 102. Open Graph Preview Image

Do not use:

- personal photograph;
- Happy Birthday artwork;
- Story image;
- Reveal photograph;
- romantic collage.

Preferred preview image:

a minimal branded graphic using:

- warm Canvas;
- subtle Plum;
- optional personal symbol or abstract mark.

The preview should feel polished but intentionally vague.

---

# 103. Link-Preview Privacy Rule

External previews should reveal as little personal information as reasonably possible.

The user should discover the emotional content only after opening the site.

Do not assume messaging apps will suppress previews.

Design the preview intentionally instead.

---

# 104. Privacy Behaviour

Privacy behaviour remains governed by `PRODUCT_SPEC.md`.

The current locked model is:

- private/unlisted URL;
- no authentication;
- no behavioural analytics;
- `noindex`;
- controlled distribution.

Anyone with the URL may technically access the application.

This high-fidelity document does not add a PIN/passphrase gate.

---

# 105. Search Engine Metadata

Implementation should include appropriate `noindex` behaviour as required by the Product Specification.

This discourages search-engine indexing.

It does not constitute authentication or security.

---

# 106. Returning User Behaviour

Returning behaviour remains governed by the Product Specification and Information Architecture.

Normal returning visit:

```text
Launch
→ resolve persisted state
→ Reveal completed
→ Home
```

Do not replay Birthday Reveal automatically.

---

# 107. Birthday Replay

Replay exists only through:

```text
More
→ Replay Birthday Surprise
```

Replay:

- may be exited;
- does not clear completion;
- does not change normal next-launch behaviour.

---

# 108. Responsive Design Targets

Primary target:

modern smartphone in portrait orientation.

Design should remain intentional across:

- small phones;
- normal phones;
- large phones;
- landscape;
- tablets;
- desktop.

---

# 109. Responsive Test Matrix

Use these viewport classes during development and QA.

| Target | Reference viewport |
|---|---:|
| Narrow Android | `360 × 800` |
| Small phone | `375 × 667` |
| Typical compact phone | `390 × 844` |
| Typical Android | `412 × 915` |
| Large phone | `430 × 932` |
| Phone landscape | approximately `844 × 390` |
| Tablet portrait | approximately `768 × 1024` |
| Desktop | approximately `1440 × 900` |

These are reference classes, not rigid physical-device requirements.

---

# 110. Small-Phone Validation

The `375px`-wide class is particularly important.

Verify:

- four-tab navigation remains readable;
- labels do not wrap awkwardly;
- H1 sizes do not overflow;
- buttons remain usable;
- images do not create horizontal scroll;
- Story pairs remain legible;
- safe-area spacing remains correct;
- long titles wrap naturally.

---

# 111. Browser Testing Targets

Test on recent versions of:

- Safari on iOS;
- Chrome on Android;
- Chromium desktop browser;
- Safari desktop.

Where available, test on at least one physical phone rather than relying only on responsive browser tools.

---

# 112. Safe Area Behaviour

Fixed bottom navigation and focused screens must respect:

- iPhone home indicator;
- top safe area;
- browser UI changes.

Content must never be hidden underneath persistent navigation.

---

# 113. Desktop Behaviour

Do not simply stretch mobile content full width.

Recommended maximum content widths:

```text
Home                  ~680px
Message / Letter      ~640px
Our Story             ~760px
```

Photography may grow beyond these text measures where visually appropriate.

---

# 114. Design Character by Experience

## Opening

Warm, quiet, anticipatory.

## Birthday Reveal

Cinematic, richer, more vibrant, emotionally paced.

## Home

Warm, personal, curated.

## For You

Intimate, tactile, soft Plum warmth.

## Open When

Tactile, calm, subtly varied.

## Our Story

Editorial, spacious, photography-led.

## Story Viewer

Minimal and immersive.

## Errors / system states

Quiet and reassuring.

---

# 115. Anti-Patterns

Do not introduce during implementation:

- bright pink/red global palette;
- floating hearts;
- Valentine graphics;
- script UI fonts;
- neon Reveal colours;
- excessive gradients;
- excessive glassmorphism;
- heavy shadows;
- fake paper textures;
- faux Polaroid stacks;
- dashboard grids;
- floating glass navigation pill;
- animated backgrounds;
- particles outside the Reveal;
- ornate envelope illustrations;
- completion badges;
- gamification;
- excessive skeleton loaders;
- every photograph inside the same rounded card.

---

# 116. Implementation Quality Priority

If development time becomes constrained, preserve quality in this order:

1. typography;
2. spacing;
3. photography selection/cropping;
4. layout hierarchy;
5. navigation;
6. reading experience;
7. core transitions;
8. Birthday Reveal polish;
9. decorative details.

Do not compensate for weak layout with additional animation.

---

# 117. Final Day 5 Decisions

The following are approved and locked for V1:

1. Modern Editorial Keepsake remains the final visual direction.
2. Newsreader + Geist Sans is the final typography pairing.
3. Core production fonts should be self-hosted.
4. Canvas is warm ivory rather than pure white.
5. Ink replaces pure black.
6. Plum is the primary designed accent.
7. Sage and Clay are secondary accents.
8. Extremely pale Plum/Sage/Clay surfaces may be used selectively.
9. Normal application remains predominantly neutral and photography-led.
10. Birthday Reveal is intentionally more vibrant than the normal app.
11. Birthday Reveal remains within the same colour families rather than introducing neon or unrelated colours.
12. Birthday Reveal uses Deep Ink.
13. Normal app remains warm/light.
14. Bottom navigation uses a grounded bar rather than a floating glass pill.
15. Cards use little or no shadow.
16. Default major card radius is approximately `20px`.
17. Buttons use approximately `16px` radius.
18. Photography uses varied editorial treatment.
19. Home remains editorial, not dashboard-like.
20. Featured / All Messages uses editorial text tabs.
21. For You may use subtle Pale Plum warmth.
22. Message Reader is full-height and visually quiet.
23. Open When uses abstract correspondence details rather than literal ornate envelopes.
24. Open When cards may use limited pale tonal variation.
25. Letters remain visually active after opening.
26. Letter content uses Newsreader.
27. Our Story body copy primarily uses Geist.
28. Our Story headings and emotional lines use Newsreader.
29. Our Story photography provides most section colour.
30. Story Viewer uses Deep Ink.
31. More and installation UI use restrained Paper sheets.
32. Loading/error states are text-led and calm.
33. V1 has no generic locked-content visual system.
34. Motion follows Functional / Transitional / Emotional tiers.
35. Confetti/hearts appear only during the final Birthday Reveal moment.
36. Link preview metadata must remain non-spoiler.
37. External preview image should not use personal photography.
38. Meaningful photography receives contextual alt text.
39. Decorative imagery is hidden appropriately from assistive technology.
40. Responsive QA must include small-phone through desktop reference sizes.

---

# 118. Design-System / Implementation Documentation Handoff

The next documentation phase should turn these visual decisions into reusable implementation tokens.

Document tokens for:

### Colour

- `canvas`
- `paper`
- `surface-soft`
- `surface-plum`
- `surface-sage`
- `surface-clay`
- `ink`
- `text-secondary`
- `plum`
- `plum-strong`
- `sage`
- `clay`
- `deep-ink`
- `border`

---

### Typography

- `display-xl`
- `display`
- `heading-2`
- `heading-3`
- `body`
- `body-emotional`
- `caption`
- `micro-label`
- `button`
- `nav-label`

---

### Spacing

Use:

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80`

---

### Radius

- `small = 10`
- `medium = 16`
- `large = 20`
- `xl = 24`
- `full`

---

### Motion

- `fast = 120–180ms`
- `standard = 220–320ms`
- `transitional = 320–420ms`
- `expressive = 450–700ms`

---

# 119. Reusable Component Contracts

Implementation documentation should define visual and interaction contracts for:

- AppShell;
- BottomNavigation;
- PageHeader;
- PrimaryButton;
- SecondaryButton;
- IconButton;
- FeatureCard;
- MessageCard;
- MessageReader;
- MessageCollectionRow;
- OpenWhenCard;
- LetterReader;
- StoryMemory;
- StoryPhotoViewer;
- MoreSheet;
- InstallPrompt;
- LoadingState;
- ErrorState;
- ImagePlaceholder.

Component documentation must not change Product Specification behaviour.

---

# 120. Content-Specific Decisions That Remain Separate

The following are not blockers for the visual system:

- final personal photographs;
- exact personal messages;
- exact Open When letters;
- exact Story copy;
- exact Birthday Reveal copy;
- final PWA name;
- final app icon artwork;
- exact Open Graph preview artwork.

Those should follow the locked system without reopening layout or interaction structure.

---

# 121. Final Design Statement

**Birthday Website V1 is a warm, photo-led editorial keepsake wrapped in a restrained premium mobile interface.**

Warm Canvas and Paper surfaces create intimacy.

Ink typography creates clarity.

Muted Plum provides the primary designed emotional accent.

Very pale Plum, Sage and Clay surfaces add enough warmth to prevent the interface feeling cold without becoming colourful or decorative.

Newsreader carries emotional meaning.

Geist provides modern interface precision.

Photography supplies most of the expressive colour.

Generous whitespace gives personal writing room to matter.

The normal application remains calm and understated.

The Birthday Reveal deliberately becomes darker, richer, more luminous and slightly more vibrant, using the same colour families with greater intensity so that the moment feels special without becoming visually disconnected from the rest of the product.

Motion remains restrained until an emotional moment earns stronger expression.

External link previews remain intentionally vague so the gift is discovered only after opening the site.

Nothing decorative should compete with the personal words, memories and photographs.

---

# 122. Scope Boundary

This document defines the final visual and high-fidelity interaction system.

It does not modify:

- feature scope;
- navigation structure;
- product behaviour;
- persistence rules;
- privacy model;
- content model;
- Birthday Reveal completion behaviour;
- PWA eligibility behaviour;
- audio inclusion rules.

Where implementation constraints arise:

1. Product Specification wins.
2. Information Architecture remains authoritative.
3. Wireframe structure remains authoritative.
4. This high-fidelity design should be approximated as closely as technically practical.
5. Design should only be reopened if a genuine accessibility, usability or technical conflict exists.

---

**End of locked Day 5 High-Fidelity Design Specification**