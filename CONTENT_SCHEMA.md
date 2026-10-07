# Birthday Website V1 — Content Schema

**PRIVACY: This repository is public. Never place real private birthday content in this document or commit it to this repository.**

Private authored content belongs under `/content/private/`. Private media belongs under `/public/private-assets/`. Both are intentionally ignored. The shapes below contain development placeholders only and do not prescribe a framework or storage format.

## Common rules

Every content item should have a stable non-sensitive `id`, such as `message-01`. IDs must not contain private message text. Optional fields may be absent. Never invent missing dates or personal content. Collection order is authored; application state is separate.

## ImageReference

```text
{
  src: "/private-assets/...",
  alt: "Concise contextual description",
  width?: number,
  height?: number
}
```

Meaningful photos require useful contextual alt text supplied from the real image. Decorative imagery uses empty alt text / is hidden from assistive technology. Asset references are examples, not real files.

## AudioReference

Audio remains optional/outside Core V1. This conceptual shape does not approve inclusion; every audio field below requires the Product Specification Section 14 gate and explicit approval.

```text
{
  src: "/private-assets/...",
  durationSeconds?: number
}
```

No autoplay. Only approved prerecorded voice attachments; no background music or separate audio section.

## For You message

```text
{
  id: "message-01",
  title?: "[PRIVATE OPTIONAL TITLE]",
  body: "[PRIVATE MESSAGE BODY]",
  audio?: AudioReference
}
```

Body is required; title is optional. Seen/unseen is application state. Messages are never locked, including unseen messages. Target approximately 15 per Product Spec; its release gate requires all 15 intended messages unless an explicit scope adjustment is approved.

## Open When letter

```text
{
  id: "letter-01",
  title: "[PRIVATE OPEN WHEN TITLE]",
  body: "[PRIVATE LETTER BODY]",
  image?: ImageReference,
  audio?: AudioReference
}
```

Title/body are required; image is optional; audio is optional only if later approved. Opened/unopened is application state. All letters are immediately accessible with no authored unlock conditions. Target 9 letters.

## Story memory

```text
{
  id: "memory-01",
  title: "[PRIVATE MEMORY TITLE]",
  body: "[PRIVATE MEMORY STORY]",
  timeLabel?: "[PRIVATE DATE OR BROAD TIME LABEL]",
  images?: [ImageReference],
  highlightedLine?: "[PRIVATE OPTIONAL LINE]"
}
```

Title/body are required. Date/time label and highlighted line are optional; never fabricate a date. Photos are optional, with a maximum of 3 images per memory. No authored read/completion state. Target approximately 12 memories within a 10–15 range; do not add filler to meet a number.

## Birthday Reveal scene

```text
{
  id: "reveal-scene-01",
  type: "text | photo | text-photo | final",
  headline?: "[PRIVATE REVEAL LINE]",
  body?: "[PRIVATE SUPPORTING COPY]",
  image?: ImageReference,
  audio?: AudioReference
}
```

`type` denotes one of the four listed values, not a literal combined string. Use approximately 3–5 scenes total and 1–3 photos across the whole Reveal. Progression/completion is application logic, not scene data. Only the final scene may use the approved celebration. Audio requires separate approval.

## Home configuration

```text
{
  greeting: "[PRIVATE GREETING]",
  personalLine?: "[PRIVATE SHORT LINE]",
  heroImage: ImageReference
}
```

The Home For You preview derives from the session's featured message rather than duplicating message content. Showing a preview never marks the message seen.

## Story collection

```text
{
  introduction: "[PRIVATE INTRODUCTION]",
  memories: [StoryMemory],
  closing: "[PRIVATE OPEN-ENDED CLOSING]"
}
```

`StoryMemory` refers to the Story memory shape above. Preserve the continuous narrative and open-ended closing. Bracketed schema references denote arrays, not a fixed item count.

## Recommended private structure

```text
/content/private/
  home.*
  for-you.*
  open-when.*
  our-story.*
  birthday-reveal.*
```

```text
/public/private-assets/
  images/
  audio/
```

The final implementation format may be JSON, TypeScript modules or another simple static structured format. The optional audio directory does not authorise audio inclusion. Do not add a database/backend merely for content.

## Validation principles

Implementation should safely detect/tolerate:

- duplicate IDs;
- missing required fields;
- invalid asset references;
- more than three Story images;
- invalid Reveal scene type;
- malformed private content.

Development placeholders must be clearly identifiable. Release must contain no placeholder personal content. Follow Product Spec content/release gates; preserve available writing when optional media fails and avoid raw technical errors in the user interface.

## State is not authored content

Do not place seen state, opened state, Reveal completion, install prompt dismissal, story completion or history timestamps in content data.

Permitted runtime state belongs to application/session persistence as defined in the Product Spec and IA. Story completion and history timestamps are not tracked in V1; this list does not authorise adding them. Featured-message selection is session-only; Reveal scene progress is not persisted.

If `CONTENT_SCHEMA.md` conflicts with `PRODUCT_SPEC.md`, the Product Specification wins.
