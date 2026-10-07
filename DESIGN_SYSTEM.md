# Birthday Website V1 — Design System

**Status:** Implementation reference for locked V1 design

**Detailed visual source:** `HIGH_FIDELITY_DESIGN.md`

`HIGH_FIDELITY_DESIGN.md` wins if this reference conflicts with it. Product behaviour remains governed by `PRODUCT_SPEC.md`; navigation and structure follow the IA and wireframes. Tokens below are conceptual, independent of frontend tooling.

## Design direction

**Modern Editorial Keepsake** — approximately 70% editorial keepsake / 30% premium modern app.

Prioritise personal content, photography as the main expressive colour, generous whitespace, warmth, and a restrained modern interface. Romance comes from content rather than generic decorative romance.

## Colour tokens

| Token | Value |
|---|---|
| `color.canvas` | `#F6F1E8` |
| `color.paper` | `#FFFCF7` |
| `color.surfaceSoft` | `#EFE8DE` |
| `color.surfacePlum` | `#F3EAEE` |
| `color.surfaceSage` | `#EDF0E9` |
| `color.surfaceClay` | `#F5ECE4` |
| `color.ink` | `#201E1B` |
| `color.textSecondary` | `#6F6962` |
| `color.plum` | `#755A67` |
| `color.plumStrong` | `#5D4652` |
| `color.sage` | `#7C8474` |
| `color.clay` | `#B47C57` |
| `color.deepInk` | `#171617` |
| `color.border` | `#DDD4CA` |

Pale accent surfaces are occasional; avoid a rainbow-card effect. Canvas, Paper, Ink and photography dominate. Sage and Clay are not suitable for small low-contrast text.

## Birthday Reveal tokens

| Token | Value |
|---|---|
| `reveal.background` | `#171617` |
| `reveal.text` | `#FFFCF7` |
| `reveal.textSecondary` | `#CFC6BC` |
| `reveal.plum` | `#A98898` |
| `reveal.clay` | `#C8966E` |
| `reveal.sage` | `#99A091` |

The Reveal is more intense and vibrant than the normal app while staying within the same colour families. Reserve the single brief approved celebration for the final Reveal scene; no persistent particles.

## Typography

Newsreader carries emotional/editorial content; Geist Sans carries UI/interface text. Self-host production fonts and preload only critical weights. Keep text visible with a resilient strategy such as `font-display: swap`.

Recommended fallbacks:

```text
Newsreader, Georgia, "Times New Roman", serif
Geist, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

| Token | Typeface | Size | Line height | Weight |
|---|---|---:|---:|---:|
| `type.displayXL` | Newsreader | 48px | 0.98–1.04 | 500 |
| `type.display` | Newsreader | 36px | 1.08 | 500 |
| `type.heading2` | Newsreader | 28px | 1.15 | 500 |
| `type.heading3Editorial` | Newsreader | 22px | 1.25 | 500 |
| `type.heading3UI` | Geist | 22px | 1.25 | 600 |
| `type.bodyEmotional` | Newsreader | 19px | 1.65 | normal |
| `type.body` | Geist | 17px | 1.6 | 400 |
| `type.uiBody` | Geist | 15–16px | 1.45 | 450–500 |
| `type.caption` | Geist | 13px | 1.4 | 450 |
| `type.microLabel` | Geist | 11px | 1.3 | 600 |

Display XL is reserved for exceptional moments. Micro labels may use 0.08–0.12em letter spacing. Screen-specific typography in the detailed visual source takes precedence over these shared defaults.

## Spacing

Use a 4px base scale: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80`.

| Token | Value |
|---|---:|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.5` | 20px |
| `space.6` | 24px |
| `space.8` | 32px |
| `space.10` | 40px |
| `space.12` | 48px |
| `space.16` | 64px |
| `space.20` | 80px |

Mobile gutters normally use 20px, up to 24px on wider phones. Important photography may break the grid; text retains its gutter.

## Radii

| Token | Value |
|---|---:|
| `radius.small` | 10px |
| `radius.medium` | 16px |
| `radius.large` | 20px |
| `radius.xl` | 24px |
| `radius.full` | 999px |

Use full radius only for genuine pills/circles.

## Borders

Default: `1px solid #DDD4CA`. Prefer tonal separation over unnecessary borders.

## Shadows

Ordinary cards have no shadow by default. Floating contextual surfaces may use:

```text
0 8px 30px rgba(32, 30, 27, 0.08)
```

## Layout

Primary design width is approximately 360–430px mobile portrait. Suggested wider-screen maximums: Home ~680px; Message/Letter reader ~640px; Our Story ~760px. Desktop increases whitespace instead of stretching mobile content indefinitely.

Respect top/bottom safe-area insets and reserve space beneath content for persistent navigation. Avoid horizontal page scrolling.

## Responsive validation

| Target | Reference viewport |
|---|---|
| Narrow phone | 360 × 800 |
| Small phone | 375 × 667 |
| Compact phone | 390 × 844 |
| Normal Android | 412 × 915 |
| Large phone | 430 × 932 |
| Landscape | approximately 844 × 390 |
| Tablet | approximately 768 × 1024 |
| Desktop | approximately 1440 × 900 |

375px width is an important compact-phone test: check navigation labels, wrapping, buttons, photo pairs and safe areas. Validate recent Safari on iOS, Chrome on Android, desktop Chromium and desktop Safari; use a physical phone where available.

## Buttons

| Variant | Contract |
|---|---|
| Primary | Deep Plum background; Paper text; 52px height; 20–24px horizontal padding; 16px radius; Geist 15px / 600 |
| Secondary | Paper background; Ink text; standard hairline; 52px height; 16px radius |
| Icon | Minimum 44 × 44px target |

Pressed feedback uses approximately `scale(0.985)` with restrained tonal feedback. Provide visible focus, selected state and disabled state only where genuinely required.

## Navigation

Exactly four primary destinations: **Home / For You / Open When / Our Story**. Use grounded bottom navigation with icon + visible text label, never a floating glass pill. Paper surface, hairline top border, approximately 64px content height plus safe area; selected state combines weight/indicator with colour.

Home and For You remain distinct. Home previews the session's featured message without showing its full body or marking it seen. Focused readers/viewer hide bottom navigation and provide Back/Close to their originating context. Birthday Reveal stays outside primary navigation.

## Cards / surfaces

Cards represent meaningful content objects only. Typical surfaces use Paper or an approved pale surface, approximately 18–20px radius, little/no shadow and 20–24px internal padding where appropriate. Do not wrap every piece of content in a card.

## For You implementation rules

- Featured / All Messages are editorial text tabs within For You; active tab uses a Plum underline.
- Featured closed messages may use Pale Plum; opening is deliberate.
- Use a full-height quiet Paper reader with natural scrolling; Close returns to the originating For You state.
- Use editorial message rows rather than many heavy cards. Seen and unseen messages remain fully accessible.
- Mark seen only after actual reveal. Keep the featured message stable through session navigation and refresh; Discover another does not automatically expose its message text.

## Open When implementation rules

- One-column mobile collection using Paper / restrained pale surfaces.
- Use an abstract correspondence cue only, without ornate envelopes.
- All letters are immediately accessible. Opened state is quieter but fully active; no checkmarks or progress counters.
- Dedicated Paper reader: Newsreader body 19px / 1.7, 24px gutter; Back returns to the collection, without Previous/Next controls.
- First opening uses a short tactile transition; subsequent openings are faster/subtler. Mark opened only when the reader is successfully reached.

## Our Story implementation rules

- Continuous editorial page with introduction, memory chapters and open-ended closing.
- Newsreader headings, Geist body, photography-led colour and generous chapter spacing (approximately 64–88px).
- Photos are optional; image-bearing memories use 1–3 photos. Text-led memories need no image placeholder.
- No generic memory cards, corporate timeline, separate memory pages or read/completion state.

## Photo Viewer

The full-screen Our Story photo viewer is required. Use Deep Ink and contain photos rather than unnecessarily cropping. Multi-photo swiping stays within the originating memory. Provide an obvious Close target, browser Back and keyboard-usable controls; return to the originating story position.

## Image rules

Use authentic photography; avoid heavy global filters. Meaningful images receive concise contextual alt text. Decorative imagery uses empty alt text / is hidden from assistive technology. Reserve image dimensions and preserve associated writing when media fails.

## Motion

| Token | Duration |
|---|---|
| `motion.fast` | 120–180ms |
| `motion.standard` | 220–320ms |
| `motion.transitional` | 320–420ms |
| `motion.expressive` | 450–700ms |

Use calm ease-out motion with no strong bounce/overshoot. These shared defaults do not replace the detailed source's specific interaction timings.

## Reduced motion

Respect `prefers-reduced-motion`. Replace strong transformations with fades, minimal movement or direct state changes. Behaviour and persistence semantics must not change.

## Accessibility

Use semantic structure, approximately 44px minimum targets, readable font sizing, sufficient contrast, visible keyboard focus and keyboard-usable desktop controls. Do not communicate state through colour alone or animation alone. No rapid flashing.

Preferred focus: approximately 2px Deep Plum outline with 2px offset; retain a visible contrasting focus treatment on dark surfaces.

## Link Preview

Recommended title: `A little something for you`

Recommended description: `Made especially for you.`

Do not expose Birthday Reveal details, personal photography, private message text or relationship memories. Preview artwork should be minimal and non-spoiler.

## Privacy

Follow `PRODUCT_SPEC.md`: private/unlisted URL, no behavioural tracking, appropriate noindex behaviour and controlled distribution. Do not invent authentication or a PIN gate. Anyone possessing the URL may technically access the app; noindex is not security.

## Implementation rule

Use shared design tokens and reusable components/primitives instead of scattering duplicated raw styling values throughout the application.
