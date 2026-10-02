# Birthday Website V1 — Low-Fidelity Mobile Wireframes

**Status:** Day 4 proposed final wireframe specification  
**Phase:** Low-Fidelity Mobile Wireframes  
**Authoritative inputs:** `PRODUCT_SPEC.md`, `DESIGN_DIRECTION.md`, `INFORMATION_ARCHITECTURE.md`

This document translates the locked Birthday Website V1 requirements into mobile-first low-fidelity screen structure.

It defines layout, hierarchy, navigation, interaction structure, state changes, scrolling and important responsive behaviour.

It intentionally does **not** define final:

- colours;
- photography;
- exact typography sizing;
- visual decoration;
- polished iconography;
- production animation timing;
- frontend implementation.

The Product Specification remains authoritative if any implementation interpretation differs from this document.

---

# 1. Wireframe Principles

The wireframes use the following structural rules:

- Design for portrait smartphone first.
- Use a shallow information hierarchy.
- Keep personal writing and photography as the dominant content.
- Avoid dashboard-style layouts.
- Keep four permanent destinations:
  - Home;
  - For You;
  - Open When;
  - Our Story.
- Birthday Reveal remains outside permanent navigation.
- Focused readers and viewers hide bottom navigation.
- Bottom navigation remains visible on top-level browsing surfaces.
- Home and For You remain distinct.
- All For You messages remain accessible.
- Open When letters are never locked.
- Our Story remains one continuous narrative.
- Our Story includes the required full-screen photo viewer.
- Replay Birthday Surprise and installation live under More.
- Important interactions remain easy to use one-handed on a phone.
- No essential information relies solely on animation.

---

# 2. Mobile Layout Framework

Primary design reference viewport:

```text
Approximate phone width: 360–430px
Portrait orientation
```

Structural spacing guidance:

```text
Screen edge gutter        ~20–24px
Small internal spacing    ~8–12px
Normal element spacing    ~16px
Section spacing           ~24–40px
Large emotional break     ~48px+
Minimum touch target      ~44px
```

Exact values may change during high-fidelity design.

Top-level screens use:

```text
┌────────────────────────────┐
│ safe area / top header     │
│                            │
│ scrollable page content    │
│                            │
│                            │
│ bottom padding             │
├────────────────────────────┤
│ persistent bottom nav      │
│ safe area                  │
└────────────────────────────┘
```

Content must include enough bottom padding that the fixed navigation never obscures text or controls.

Focused content uses:

```text
┌────────────────────────────┐
│ Back / Close        action │
│                            │
│ focused content            │
│                            │
│                            │
│                            │
└────────────────────────────┘
```

No bottom navigation appears during focused reading/viewing.

---

# 3. Primary Navigation

Use four equal-priority destinations:

```text
┌────────────────────────────────────┐
│                                    │
│            PAGE CONTENT            │
│                                    │
├────────────────────────────────────┤
│ Home   For You   Open When   Story │
└────────────────────────────────────┘
```

Final labels:

```text
Home
For You
Open When
Our Story
```

Icons may accompany labels in high fidelity, but labels remain visible.

The selected tab must be obvious without relying on colour alone.

Top-level navigation is peer navigation:

```text
Home ↔ For You ↔ Open When ↔ Our Story
```

Tab switching does not create a Back requirement.

Useful scroll position may be retained while switching sections within the current session.

---

# 4. More Menu

A small More action is available from the normal app shell.

Low-fidelity placement:

```text
┌────────────────────────────┐
│ Page title              ⋯  │
│                            │
```

The menu contains only:

```text
Replay Birthday Surprise
Install / Add to Home Screen
```

The installation action appears only where relevant.

Wireframe:

```text
             ┌─────────────────────────┐
             │ Replay Birthday Surprise│
             │                         │
             │ Add to Home Screen      │
             └─────────────────────────┘
```

This is a compact sheet/menu, not a Settings page.

Primary dismissal:

- tap outside;
- swipe/dismiss where platform appropriate;
- Back.

---

# 5. First Entry — Personalised Opening

## Purpose

Create a deliberate moment before Birthday Reveal begins.

The Reveal must **not** autoplay.

## Wireframe

```text
┌────────────────────────────┐
│                            │
│                            │
│       [small context]      │
│                            │
│      Personal opening      │
│         message            │
│                            │
│                            │
│      [visual / image]      │
│                            │
│                            │
│ ┌────────────────────────┐ │
│ │ Open your birthday     │ │
│ │ surprise               │ │
│ └────────────────────────┘ │
│                            │
└────────────────────────────┘
```

## Content hierarchy

1. Personalised opening line.
2. Supporting emotional/contextual line if required.
3. One strong visual area.
4. Primary start action.

## Primary action

**Open your birthday surprise**

Large and thumb-friendly.

## Secondary actions

None.

There is no Skip button.

There is no navigation into the normal app before the first Reveal is successfully completed.

## Scrolling

Prefer no scrolling on normal phone heights.

On unusually short screens, allow minimal natural vertical scroll rather than shrinking controls excessively.

## Important states

If `birthdayRevealCompleted = false`, normal app launch returns here.

If storage has been cleared or is invalid, safe first-use behaviour may also return here.

---

# 6. Birthday Reveal — Scene Structure

Use approximately 3–5 scenes.

The low-fidelity structure assumes five beats, but content can collapse to four if final writing works better.

The sequence should feel like:

```text
Opening
   ↓
Quiet emotional beat
   ↓
Photo / memory beat
   ↓
Deeper personal beat
   ↓
Final birthday moment
```

Meaningful moments advance deliberately.

---

# 7. Birthday Reveal — Scene 1

## Purpose

Move from the opening screen into the cinematic experience and establish a slower emotional pace.

## Wireframe

```text
┌────────────────────────────┐
│                            │
│                            │
│                            │
│       Short opening        │
│          line              │
│                            │
│                            │
│                            │
│                            │
│                            │
│                            │
│      tap to continue       │
│                            │
└────────────────────────────┘
```

## Primary action

Tap the large interaction area.

Do not require precise tapping on a small button.

## Navigation

No bottom navigation.

No first-view Skip.

## Scrolling

None.

## Reduced motion

Scene changes may use simple fade/state replacement.

---

# 8. Birthday Reveal — Photo Scene

## Purpose

Introduce shared imagery without turning the Reveal into a gallery.

## Wireframe

```text
┌────────────────────────────┐
│                            │
│     short supporting       │
│          line              │
│                            │
│ ┌────────────────────────┐ │
│ │                        │ │
│ │      PHOTO AREA        │ │
│ │                        │ │
│ │                        │ │
│ └────────────────────────┘ │
│                            │
│       personal line        │
│                            │
│      tap to continue       │
└────────────────────────────┘
```

## Hierarchy

1. Short text.
2. One selected photograph.
3. Personal supporting line.
4. Continue cue.

## Primary action

Tap to continue.

## Secondary actions

None.

The photo is not an independent viewer inside Birthday Reveal.

---

# 9. Birthday Reveal — Emotional Text Scene

## Purpose

Create breathing space before the final birthday message.

## Wireframe

```text
┌────────────────────────────┐
│                            │
│                            │
│     Larger personal        │
│        statement           │
│                            │
│       supporting           │
│       short text           │
│                            │
│                            │
│                            │
│      tap to continue       │
│                            │
└────────────────────────────┘
```

This scene may be primarily text-led.

Avoid filling every scene with photography.

---

# 10. Birthday Reveal — Final Scene

## Purpose

Deliver the main birthday message and emotional culmination.

## Wireframe

```text
┌────────────────────────────┐
│                            │
│      [final visual]        │
│                            │
│        Happy Birthday      │
│                            │
│     final personalised     │
│         message            │
│                            │
│       * celebration *      │
│                            │
│                            │
│      tap to continue       │
│                            │
└────────────────────────────┘
```

The celebratory effect occurs once here.

The effect may contain restrained confetti with a small number of subtle heart shapes.

## Completion behaviour

After the final scene successfully finishes:

```text
birthdayRevealCompleted = true
```

Completion must not be recorded earlier.

## Primary action

Tap to continue into Home after the final scene has completed.

## Transition

Use a smooth visual transition into Home.

Conceptually:

```text
Final Reveal
   ↓
background / image continuity
   ↓
Home hero resolves into place
```

Avoid an abrupt hard page cut where possible.

---

# 11. Interrupted First Reveal

If the site closes before the final scene successfully finishes:

```text
Next visit
→ Personalised Opening
→ Start Reveal again
```

Do not resume from Scene 3, Scene 4, etc.

No scene progress is persisted.

---

# 12. Replay Birthday Reveal

Replay is entered through:

```text
More
→ Replay Birthday Surprise
```

Use the same content sequence.

Unlike first viewing, replay contains an obvious but restrained exit.

Wireframe addition:

```text
┌────────────────────────────┐
│ × Exit                     │
│                            │
│        reveal scene        │
│                            │
└────────────────────────────┘
```

Exit returns to the top-level destination from which replay was started.

Replay never resets completion state.

Finishing a replay transitions to Home.

---

# 13. Home — Layout Options Considered

Three approaches were considered.

### Option A — Editorial vertical composition

```text
Greeting
Hero
For You preview
Open When entry
Our Story entry
```

Advantages:

- strongest fit with Modern Editorial Keepsake;
- emotional hierarchy is obvious;
- avoids dashboard appearance;
- simple mobile scrolling.

### Option B — Compact card dashboard

```text
Hero
[For You] [Open When]
[Our Story] [...]
```

Advantages:

- compact;
- fast scanning.

Disadvantages:

- too product-dashboard-like;
- equalises content that should have different emotional weight.

### Option C — Full-screen hero with overlaid section links

Advantages:

- cinematic.

Disadvantages:

- makes normal browsing unnecessarily theatrical;
- weak content discoverability;
- difficult with varied photography.

## Approved wireframe direction

**Option A — Editorial vertical composition.**

---

# 14. Home — Default State

## Purpose

Act as the emotional landing page and discovery surface.

Home is **not** For You.

## Wireframe

```text
┌────────────────────────────┐
│ Personal greeting       ⋯  │
│                            │
│ ┌────────────────────────┐ │
│ │                        │ │
│ │       HERO VISUAL      │ │
│ │                        │ │
│ └────────────────────────┘ │
│                            │
│       personal line        │
│                            │
│ ────────────────────────── │
│                            │
│ FOR YOU                    │
│ ┌────────────────────────┐ │
│ │ Featured message      │ │
│ │ preview / teaser       │ │
│ │                        │ │
│ │ Open message →         │ │
│ └────────────────────────┘ │
│                            │
│ OPEN WHEN                  │
│ ┌────────────────────────┐ │
│ │ Short section preview  │ │
│ │ Explore letters →      │ │
│ └────────────────────────┘ │
│                            │
│ OUR STORY                  │
│ ┌────────────────────────┐ │
│ │ Story preview           │ │
│ │ Read our story →       │ │
│ └────────────────────────┘ │
│                            │
├────────────────────────────┤
│ Home | For You | Open |Story│
└────────────────────────────┘
```

## Hierarchy

1. Personalised greeting.
2. Strong hero.
3. Short emotional statement.
4. Featured For You preview.
5. Open When entry.
6. Our Story entry.

The three feature entries should not all use identical equal-size cards in final design.

Low fidelity only indicates content zones.

## Primary action

No single forced CTA.

Home acts as discovery.

The strongest contextual action is normally the For You preview.

## For You preview rule

The preview may show:

- title;
- very short excerpt;
- abstract teaser.

It must not expose the complete message.

Seeing the preview does **not** mark the message seen.

## Scrolling

Normal vertical scrolling.

Bottom navigation remains fixed.

---

# 15. Returning-User Entry

Returning flow:

```text
Launch
→ resolve local state
→ birthdayRevealCompleted = true
→ Home
```

No welcome-back modal.

No onboarding.

No restoration of last tab.

No restoration of an old reader or photo viewer.

Home uses the same layout as the default Home wireframe.

The current For You featured message is selected for the new session according to the locked message-selection rules.

---

# 16. For You — Layout Options Considered

### Option A — Featured message followed by inline full collection

Simple, but 15 messages make the page long and visually noisy.

### Option B — Separate Message History page

Clear separation, but conflicts with the locked IA because there is no history-only page.

### Option C — Two browsing states within For You

```text
Featured | All Messages
```

The section stays at the same primary depth while allowing focused presentation and complete collection access.

## Approved wireframe direction

**Option C — Featured and All Messages as two states within For You.**

The control need not become a literal segmented control in high fidelity; that is a structural wireframe concept.

---

# 17. For You — Featured Message Closed State

## Purpose

Present the session's featured message as something deliberately opened.

## Wireframe

```text
┌────────────────────────────┐
│ For You                 ⋯  │
│                            │
│ [ Featured ] [ All ]       │
│                            │
│                            │
│      Something for you     │
│                            │
│ ┌────────────────────────┐ │
│ │                        │ │
│ │    CLOSED MESSAGE      │ │
│ │                        │ │
│ │   optional title       │ │
│ │                        │ │
│ │      Tap to open       │ │
│ └────────────────────────┘ │
│                            │
│                            │
├────────────────────────────┤
│ Home | For You | Open |Story│
└────────────────────────────┘
```

## Primary action

Open featured message.

## Secondary action

Browse all messages.

## Important state

The message remains unseen until the deliberate reveal occurs.

Merely visiting this screen does not mark it seen.

## Scrolling

Usually minimal before opening.

If supporting copy exists, natural scrolling is allowed.

---

# 18. For You — Message Opening Transition

Tap on the closed message.

Structure:

```text
Closed message
     ↓
surface expands / sheet enters
     ↓
reader initially preserves closed identity
     ↓
short reveal
     ↓
message becomes readable
```

The low-fidelity transition should establish spatial continuity without prescribing final animation.

---

# 19. Message Reader — Revealed State

## Purpose

Give personal writing full attention.

## Wireframe

```text
┌────────────────────────────┐
│ × Close                    │
│                            │
│       optional title       │
│                            │
│                            │
│      MESSAGE BODY          │
│                            │
│      MESSAGE BODY          │
│                            │
│      MESSAGE BODY          │
│                            │
│                            │
│    [optional voice only    │
│     if later approved]     │
│                            │
└────────────────────────────┘
```

## Hierarchy

1. Close.
2. Optional title.
3. Message body.
4. Optional approved voice attachment.

## State change

Once the message has actually been revealed:

```text
message ID → seenForYouMessageIds
```

## Primary action

Read.

## Secondary action

Close.

## Scrolling

Natural vertical scroll for medium/long messages.

No pagination.

## Navigation

Close returns to the exact originating state:

- Featured; or
- All Messages; or
- deliberate further-discovery flow.

---

# 20. For You — Featured Message After Reading

## Wireframe

```text
┌────────────────────────────┐
│ For You                 ⋯  │
│                            │
│ [ Featured ] [ All ]       │
│                            │
│ ┌────────────────────────┐ │
│ │ Featured message       │ │
│ │ opened/read state      │ │
│ │                        │ │
│ │ Read again →           │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Discover another       │ │
│ └────────────────────────┘ │
│                            │
│ Browse all messages →      │
│                            │
├────────────────────────────┤
│ Home | For You | Open |Story│
└────────────────────────────┘
```

## Primary action

Discover another.

## Secondary actions

- Read featured message again.
- Browse all.

---

# 21. For You — Discover Another

## Purpose

Allow deliberate further discovery without changing the session's original featured-message identity through ordinary navigation.

Flow:

```text
Featured message read
→ Discover another
→ choose another valid message
→ present closed/reveal state
→ user deliberately opens
→ mark seen once revealed
→ Close
→ return to For You
```

Wireframe:

```text
┌────────────────────────────┐
│ × Close                    │
│                            │
│      Another message       │
│                            │
│ ┌────────────────────────┐ │
│ │                        │ │
│ │    CLOSED MESSAGE      │ │
│ │                        │ │
│ │      Tap to open       │ │
│ └────────────────────────┘ │
│                            │
└────────────────────────────┘
```

It must not reveal the next message automatically merely because Discover Another was tapped.

The interaction remains deliberate.

---

# 22. For You — Complete Message Collection

## Purpose

Allow access to all approximately 15 messages.

Unread messages are accessible.

## Wireframe

```text
┌────────────────────────────┐
│ For You                 ⋯  │
│                            │
│ [ Featured ] [ All ]       │
│                            │
│ ALL MESSAGES               │
│                            │
│ ┌────────────────────────┐ │
│ │ Message title / cue    │ │
│ │ subtle unread state    │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Message title / cue    │ │
│ │ subtle seen state      │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Message title / cue    │ │
│ │ subtle unread state    │ │
│ └────────────────────────┘ │
│                            │
│            ...             │
│                            │
├────────────────────────────┤
│ Home | For You | Open |Story│
└────────────────────────────┘
```

## Hierarchy

Use configured collection order.

No separate chronological history sorting is introduced.

## Primary action

Open any message.

## State

Seen/unseen styling is subtle.

Unread does **not** mean locked.

## Scrolling

Natural vertical scroll.

Closing a Message Reader returns to approximately the previous collection position.

## Explicitly excluded

No:

- search;
- filter;
- favourites;
- folders;
- progress counter;
- "12/15 read".

---

# 23. Open When — Layout Options Considered

### Option A — Two-column envelope grid

Advantages:

- compact;
- visually collection-like.

Disadvantages:

- long titles become cramped;
- smaller tap areas;
- nine scenario titles need room.

### Option B — Single-column envelope stack

Advantages:

- highly readable;
- strong mobile touch targets;
- accommodates variable title length;
- allows richer unopened/opened state.

Disadvantage:

- longer page.

## Approved wireframe direction

**Option B — Single-column envelope stack on mobile.**

Tablet/desktop may later use more columns without changing information architecture.

---

# 24. Open When — Collection

## Purpose

Allow deliberate selection among all nine letters.

## Wireframe

```text
┌────────────────────────────┐
│ Open When               ⋯  │
│                            │
│ A letter for when...       │
│                            │
│ ┌────────────────────────┐ │
│ │ OPEN WHEN              │ │
│ │ you're having          │ │
│ │ a bad day              │ │
│ │                        │ │
│ │ unopened               │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ OPEN WHEN              │ │
│ │ you miss me            │ │
│ │                        │ │
│ │ previously opened      │ │
│ └────────────────────────┘ │
│                            │
│           ...              │
│                            │
├────────────────────────────┤
│ Home | For You | Open |Story│
└────────────────────────────┘
```

## Primary action

Tap any letter.

## State

Only:

```text
Available / unopened
Available / opened
```

All nine remain accessible.

## Scrolling

Vertical.

Return from a letter restores approximate session position.

## Explicitly excluded

No:

- locks;
- countdowns;
- progress counts;
- completion marks;
- Previous/Next letter navigation.

---

# 25. Open When — First Opening State

Flow:

```text
Envelope tapped
→ tactile opening transition
→ dedicated reader
```

Low-fidelity transition concept:

```text
┌────────────────────────────┐
│                            │
│      selected envelope     │
│                            │
│        [opening...]        │
│                            │
└────────────────────────────┘
```

First opening receives the fuller short transition.

Previously opened letters receive a faster/subtler transition.

The final destination is identical.

Opened state is persisted only once the reader has successfully been reached.

---

# 26. Open When — Letter Reader

## Purpose

Provide calm long-form reading.

## Wireframe

```text
┌────────────────────────────┐
│ ← Open When                │
│                            │
│        OPEN WHEN           │
│                            │
│      letter title          │
│                            │
│      LETTER TEXT           │
│                            │
│      LETTER TEXT           │
│                            │
│ ┌────────────────────────┐ │
│ │ optional photograph    │ │
│ └────────────────────────┘ │
│                            │
│      LETTER TEXT           │
│                            │
│ [optional approved voice]  │
│                            │
└────────────────────────────┘
```

## Hierarchy

1. Back.
2. Letter context/title.
3. Letter text.
4. Optional photo where appropriate.
5. Optional voice recording only if later approved.

Not every letter should have a photo.

## Primary action

Read.

## Secondary action

Back to collection.

## Scrolling

Natural continuous scroll.

No pagination.

Bottom navigation hidden.

---

# 27. Our Story — Main Structure

## Purpose

Present approximately 10–15 curated memories as one continuous narrative.

## Overall wireframe

```text
┌────────────────────────────┐
│ Our Story               ⋯  │
│                            │
│      short opening         │
│      introduction          │
│                            │
│ ────────────────────────── │
│                            │
│        MEMORY 01           │
│                            │
│        MEMORY 02           │
│                            │
│        MEMORY 03           │
│                            │
│           ...              │
│                            │
│     open-ended closing     │
│         message            │
│                            │
├────────────────────────────┤
│ Home | For You | Open |Story│
└────────────────────────────┘
```

Scrolling is continuous.

No separate memory-detail pages.

---

# 28. Our Story — Single-Photo Memory

## Wireframe

```text
│ 01                         │
│ Memory title               │
│ broad date / context       │
│                            │
│ ┌────────────────────────┐ │
│ │                        │ │
│ │        PHOTO           │ │
│ │                        │ │
│ └────────────────────────┘ │
│                            │
│ Personal story / caption   │
│ Personal story / caption   │
│                            │
```

Photo is tappable and opens Story Photo Viewer.

---

# 29. Our Story — Two-Photo Memory

## Wireframe

```text
│ 02                         │
│ Memory title               │
│                            │
│ ┌──────────┐ ┌──────────┐ │
│ │ PHOTO A  │ │ PHOTO B  │ │
│ │          │ │          │ │
│ └──────────┘ └──────────┘ │
│                            │
│ Personal story / caption   │
│                            │
│ “optional highlighted      │
│  personal line”            │
│                            │
```

The two-photo composition may stack rather than sit side-by-side on very narrow screens.

---

# 30. Our Story — Three-Photo Memory

## Wireframe

```text
│ 03                         │
│ Memory title               │
│                            │
│ ┌────────────────────────┐ │
│ │      PRIMARY PHOTO     │ │
│ └────────────────────────┘ │
│                            │
│ ┌──────────┐ ┌──────────┐ │
│ │ PHOTO 2  │ │ PHOTO 3  │ │
│ └──────────┘ └──────────┘ │
│                            │
│ Personal story             │
│                            │
```

This remains within the locked 1–3 photo limit per memory.

---

# 31. Our Story — Text-Led Memory

Some memories need no photograph.

Wireframe:

```text
│ 04                         │
│                            │
│ Memory title               │
│                            │
│       personal story       │
│       personal story       │
│       personal story       │
│                            │
│     optional highlighted   │
│        personal line       │
│                            │
```

This variation prevents the page becoming a repetitive gallery.

---

# 32. Our Story — Chapter Rhythm

Do not repeat an identical card template twelve times.

Low-fidelity rhythm may alternate:

```text
Introduction
    ↓
Large single image
    ↓
Text-led memory
    ↓
Two-photo memory
    ↓
Large emotional memory
    ↓
Shorter memory
    ↓
Three-photo composition
    ↓
...
    ↓
Open-ended closing
```

The structural rule is consistency of hierarchy, not identical composition.

---

# 33. Our Story — Ending

## Purpose

Communicate continuation rather than finality.

Wireframe:

```text
│                            │
│ ────────────────────────── │
│                            │
│       closing line         │
│                            │
│     personal message       │
│                            │
│      “...so far.”          │
│                            │
│                            │
```

No:

- "You've reached the end";
- completion badge;
- percentage;
- achievement.

---

# 34. Story Photo Viewer

## Purpose

Allow closer viewing without creating an independent gallery.

## Single-photo memory

```text
┌────────────────────────────┐
│ × Close                    │
│                            │
│                            │
│ ┌────────────────────────┐ │
│ │                        │ │
│ │                        │ │
│ │     FULL PHOTO         │ │
│ │                        │ │
│ │                        │ │
│ └────────────────────────┘ │
│                            │
│                            │
└────────────────────────────┘
```

## Multi-photo memory

```text
┌────────────────────────────┐
│ × Close                    │
│                            │
│                            │
│        FULL PHOTO          │
│                            │
│                            │
│       ← swipe →            │
│                            │
│          ● ○ ○             │
│                            │
└────────────────────────────┘
```

## Rules

Swipe only among photographs belonging to the originating memory.

Do not swipe into other memories.

Close returns to the same approximate story position.

Browser Back should also close the viewer naturally.

Bottom navigation is hidden.

Desktop later receives keyboard-usable controls.

---

# 35. Eligible PWA Install Suggestion

The proactive suggestion may appear only after:

```text
Reveal completed
AND
recipient entered at least one primary content section
AND
subsequent eligible Home view
AND
install suggestion not previously dismissed
```

## Wireframe

```text
┌────────────────────────────┐
│            Home            │
│                            │
│       normal content       │
│                            │
│ ┌────────────────────────┐ │
│ │ Keep this close?       │ │
│ │ Add it to your         │ │
│ │ Home Screen.           │ │
│ │                        │ │
│ │ [Not now]   [Add]      │ │
│ └────────────────────────┘ │
│                            │
├────────────────────────────┤
│ Home | For You | Open |Story│
└────────────────────────────┘
```

This may be a subtle bottom sheet/card.

It must not obscure the initial Home arrival after Birthday Reveal.

Dismissal persists.

Installation remains available later through More.

---

# 36. Manual Installation Help

Where native prompting is unavailable, tapping:

```text
More → Add to Home Screen
```

may open concise platform instructions.

Wireframe:

```text
┌────────────────────────────┐
│ × Close                    │
│                            │
│ Add to Home Screen         │
│                            │
│ 1. Open browser menu       │
│ 2. Choose Add to Home...   │
│ 3. Confirm                 │
│                            │
└────────────────────────────┘
```

Only platform-relevant steps should appear.

This is a contextual help sheet, not onboarding.

---

# 37. Initial Loading State

## Purpose

Cover only the short period while shell/assets/state resolve.

Wireframe:

```text
┌────────────────────────────┐
│                            │
│                            │
│                            │
│       small identity       │
│                            │
│       loading state        │
│                            │
│                            │
└────────────────────────────┘
```

Keep this visually quiet.

Do not create a long animated intro.

---

# 38. Image Loading State

Reserve the intended image dimensions.

```text
┌────────────────────────────┐
│                            │
│      image placeholder     │
│      fixed aspect area     │
│                            │
└────────────────────────────┘
```

Written content should remain visible where possible.

Avoid large layout shifts when images arrive.

---

# 39. Offline — Cached Content

When core content is already cached:

```text
normal application experience
```

No persistent "offline mode" banner is required unless a failure actually affects content.

---

# 40. Offline — Required Resource Missing

If content required for the current experience was never cached:

```text
┌────────────────────────────┐
│                            │
│ This part isn't available  │
│ offline yet.               │
│                            │
│ Your saved content is      │
│ still here.                │
│                            │
│      [ Try again ]         │
│                            │
└────────────────────────────┘
```

Preserve any content that is available.

Avoid technical terminology.

---

# 41. Missing Image Error

```text
┌────────────────────────────┐
│     media unavailable      │
└────────────────────────────┘

Caption / story remains visible.
```

Do not remove the entire memory or letter because optional media failed.

---

# 42. Story Photo Viewer Error

```text
┌────────────────────────────┐
│ × Close                    │
│                            │
│ Photo couldn't be loaded.  │
│                            │
│        [ Retry ]           │
│                            │
└────────────────────────────┘
```

Close always remains available.

---

# 43. Invalid Letter Route

```text
┌────────────────────────────┐
│                            │
│ That letter couldn't       │
│ be found.                  │
│                            │
│ [Back to Open When]        │
│                            │
└────────────────────────────┘
```

Do not expose raw IDs or technical errors.

---

# 44. Invalid Message Route

```text
┌────────────────────────────┐
│                            │
│ That message couldn't      │
│ be found.                  │
│                            │
│ [Back to For You]          │
│                            │
└────────────────────────────┘
```

---

# 45. Content Configuration Failure

This is not an intended release state, but the app should fail safely.

Used when:

- no For You content is configured;
- no Open When letters exist;
- Our Story contains no memories.

Wireframe:

```text
┌────────────────────────────┐
│                            │
│ Something isn't ready      │
│ here yet.                  │
│                            │
│      [ Back Home ]         │
│                            │
└────────────────────────────┘
```

This should never replace pre-release validation.

---

# 46. Persistence Failure

If local writes fail:

- continue current experience;
- do not block message reading;
- do not block letter reading;
- do not block Birthday Reveal completion visually.

No technical modal should interrupt the emotional flow.

The next visit may behave as first-use or lose seen/opened distinctions.

There is no account recovery flow.

---

# 47. No Locked Content Screens

Day 4 explicitly contains **no** wireframes for:

- birthday countdown;
- pre-birthday date gate;
- locked Open When letter;
- locked For You message;
- achievement unlock.

These states are not part of V1.

---

# 48. Seen / Opened State Language

For You:

```text
Unseen message
→ subtle emphasis

Seen message
→ subtle quieter presentation
```

Open When:

```text
Unopened envelope
→ primary unopened presentation

Opened envelope
→ subtle opened indicator
```

Avoid:

```text
✓ Completed
Read 8/15
Opened 4/9
Progress 72%
```

Personal content is not a task list.

---

# 49. Back Behaviour Summary

```text
Message Reader
→ Close
→ exact originating For You state

Open When Letter
→ Back
→ collection at approximate previous position

Story Photo Viewer
→ Close / browser Back
→ same story position

More
→ dismiss
→ same underlying top-level screen

Install Help
→ Close
→ originating screen

First Birthday Reveal
→ no normal Skip

Replay
→ Exit
→ originating top-level screen
```

Completed Birthday Reveal must not remain immediately behind Home in normal browser Back history.

---

# 50. Screen Transition Model

Low-fidelity structural transitions:

### Top-level tab switch

```text
instant / restrained content transition
```

Do not create large cinematic motion.

### Message opening

```text
card/surface → full-height reader
```

### Letter opening

```text
selected envelope → short tactile transition → reading page
```

### Story photo

```text
photo → full-screen viewer
```

### Birthday Reveal

```text
scene → scene
```

using the strongest motion level.

### Reveal → Home

```text
cinematic state resolves into normal app shell
```

This is the most important cross-surface transition in V1.

---

# 51. Reduced-Motion Wireframe Behaviour

Where reduced motion is requested:

Birthday Reveal:

```text
fade / immediate content replacement
```

For You:

```text
closed state → fade to reader
```

Open When:

```text
envelope → reader with minimal transition
```

Story viewer:

```text
photo → viewer without zoom/depth animation
```

All interactions retain the same:

- information;
- navigation;
- completion state;
- persistence behaviour.

---

# 52. Mobile Usability Rules

All interactive controls must:

- be reachable with standard touch interaction;
- avoid tiny text-only hit areas;
- use at least roughly 44px interactive targets;
- remain clear at common phone widths;
- avoid controls underneath the home indicator;
- keep close/back actions predictable;
- not depend only on hover;
- retain keyboard usability on desktop.

Long text must:

- use normal page scrolling;
- avoid horizontal scroll;
- avoid pagination;
- leave comfortable side margins.

---

# 53. Scroll Behaviour

### Home

Continuous vertical scroll.

### For You Featured

Minimal scroll unless content requires it.

### Message Collection

Vertical scroll.

### Message Reader

Independent full-height vertical reader.

### Open When

Vertical collection scroll.

### Letter Reader

Independent continuous vertical scroll.

### Our Story

Long continuous page scroll.

### Photo Viewer

No page scroll.

Swipe horizontally only within photos from the same memory.

### Birthday Reveal

No scroll.

Use scene advancement instead.

---

# 54. Session Position Behaviour

Within the active session:

- switching away from Open When and returning may preserve collection position;
- switching away from Our Story and returning may preserve approximate story position;
- closing a reader/viewer returns to approximate origin;
- switching to Home does not change the For You session-featured message.

Across separate visits:

- launch Home;
- do not restore old tab;
- do not reopen readers;
- do not restore story scroll;
- do not reopen photo viewer.

---

# 55. Complete Core Screen Map

```text
APP ENTRY
│
├─ Reveal incomplete
│   └─ PERSONALISED OPENING
│       └─ Open your birthday surprise
│           └─ BIRTHDAY REVEAL
│               ├─ Scene 1
│               ├─ Scene 2 / photo
│               ├─ Scene 3
│               ├─ optional additional scene
│               └─ Final scene + celebration
│                   └─ HOME
│
└─ Reveal complete
    └─ HOME


MAIN APP

HOME
├─ Greeting
├─ Hero
├─ For You preview → FOR YOU
├─ Open When entry → OPEN WHEN
├─ Our Story entry → OUR STORY
└─ MORE
    ├─ Replay Birthday Surprise → REPLAY REVEAL
    └─ Install/Add to Home Screen → INSTALL HELP


FOR YOU
├─ Featured state
│   ├─ Featured closed message
│   ├─ MESSAGE READER
│   ├─ Discover another
│   │   └─ MESSAGE READER
│   └─ Read again
│
└─ All Messages state
    ├─ Message
    ├─ Message
    ├─ Message
    └─ MESSAGE READER


OPEN WHEN
├─ Unopened envelope
├─ Opened envelope
└─ LETTER READER


OUR STORY
├─ Introduction
├─ Memory 01
├─ Memory 02
├─ Memory 03
├─ ...
├─ Closing
└─ STORY PHOTO VIEWER
    └─ swipe only within originating memory
```

---

# 56. Major State Matrix

| Experience | State | Primary change |
|---|---|---|
| App entry | Reveal incomplete | Show personalised opening |
| App entry | Reveal complete | Go Home |
| Birthday Reveal | In progress | Not persisted |
| Birthday Reveal | Final scene finished | Persist completed |
| Birthday replay | In progress | Existing completion unchanged |
| For You | Featured unseen | Closed presentation |
| For You | Featured opened | Seen state persisted |
| For You collection | Unseen message | Accessible |
| For You collection | Seen message | Accessible with subtle distinction |
| Open When | Unopened | Accessible |
| Open When | Opened | Accessible with subtle distinction |
| Our Story | Normal | No read state |
| Story Viewer | Open | Temporary UI only |
| Install prompt | Eligible | Contextual prompt allowed |
| Install prompt | Dismissed | Persist dismissal |
| Storage invalid | Safe default | May behave as first visit |
| Offline cached | Normal | Continue |
| Offline uncached | Recovery | Explanation + Retry |

---

# 57. Day 4 Structural Decisions Locked by These Wireframes

The following decisions should be treated as fixed going into high-fidelity design unless an actual usability issue is found:

1. Four-tab persistent bottom navigation.
2. Home and For You remain separate.
3. Home uses a vertically stacked editorial composition.
4. Home is the normal landing page after Reveal and on later visits.
5. More remains a small secondary menu.
6. Birthday Reveal begins only after a deliberate first-entry action.
7. First Reveal contains no normal Skip.
8. Reveal uses approximately 3–5 discrete scenes rather than a scroll experience.
9. Reveal final scene contains the one earned celebration.
10. Reveal completion occurs only after the final scene successfully finishes.
11. Replay uses the same Reveal structure but provides an exit.
12. For You uses Featured and All Messages browsing states.
13. Featured message begins closed.
14. Messages become seen only after actual reveal.
15. Discover Another remains deliberate and does not automatically expose message text.
16. All messages remain accessible.
17. Message Reader is a focused full-height surface.
18. Open When uses a single-column mobile collection.
19. All Open When letters remain available.
20. Opened/unopened state is subtle and non-progressive.
21. Open When letters use dedicated full reading pages.
22. Our Story is one continuous editorial page.
23. Memory layouts may vary between text-led, single-, two-, and three-photo compositions.
24. Our Story contains no separate memory-detail pages.
25. Story photographs open the required full-screen viewer.
26. Viewer swiping stays within the originating memory.
27. Focused content hides bottom navigation.
28. Back/Close returns to the user's originating context.
29. PWA installation never interrupts first Reveal or initial Home arrival.
30. No locked-content screen exists in V1.
31. Loading/errors preserve writing whenever possible.
32. No progress counts or gamification appear anywhere.

---

# 58. Day 5 High-Fidelity Handoff

Day 5 may now focus on visual execution without changing structure.

High-fidelity work should determine:

- exact type hierarchy;
- final Newsreader/Geist application;
- exact warm-neutral palette;
- image crops;
- surface styling;
- card/envelope appearance;
- final navigation styling;
- iconography;
- borders/radii;
- final responsive spacing;
- detailed motion behaviour;
- final Birthday Reveal art direction;
- confetti/heart treatment;
- PWA icon/name where scheduled.

Day 5 should **not** need to reconsider:

- page inventory;
- navigation destinations;
- Home vs For You;
- message availability;
- Open When navigation;
- Our Story page structure;
- photo-viewer requirement;
- Reveal entry/replay/completion behaviour;
- persistence semantics.

---

# 59. Scope Boundary

These wireframes define the approved V1 structural design.

They do not authorise:

- new product features;
- new top-level destinations;
- authentication;
- social features;
- tracking;
- notifications;
- dedicated gallery;
- separate audio section;
- settings/profile areas;
- gamification;
- additional persistence;
- invented relationship content.

If high-fidelity design exposes a genuine usability conflict, compare the issue first against the locked Product Specification and Information Architecture.

The Product Specification remains the final authority.