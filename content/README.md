# Content locations

This repository is public. Real birthday writing belongs only in ignored `/content/private/`; real photos/audio belong only in ignored `/public/private-assets/`. Never commit real names, personal dates, messages, letters, memories, photographs, audio or secrets. Respect all existing `.gitignore` patterns.

`sample/` is for unmistakable public development placeholders following `CONTENT_SCHEMA.md`. No invented romantic writing or relationship facts. Samples are not release content; replace all placeholders privately before release. For You currently loads `sample/for-you.json` to exercise short, untitled and long-message flows. Open When loads nine public fixtures from `sample/open-when.json`, including long-title and multi-paragraph letters. Letter 01 includes one optional artificial development image; the other eight remain image-free. The final private content-loading system remains deferred.

`npm run privacy:check` inspects Git-tracked paths, including staged files. It supplements `.gitignore`; it cannot identify personal information placed in an otherwise public filename. Always review staged content.

Our Story uses `sample/our-story.json` and artificial local SVGs in `/public/app-assets/story-placeholders/`. The 12 memories and all writing/alt text are explicit development fixtures, not invented relationship content. Replace these references with authentic private writing and photos before release; meaningful photographs need actual contextual alt text. Story has no persisted read/view/completion state.

Birthday Reveal uses four scenes in `sample/birthday-reveal.json`, ending in one final scene. All personal copy is placeholder text; only the generic Happy Birthday heading is final interface language. Local artificial SVG references can later become `/private-assets/...` references. Completion belongs to runtime state, never authored content.

All implemented image fields share `{ src, alt, width?, height? }` validation. Use local root-relative static URLs and real positive dimensions where known. Invalid optional media does not discard writing. Empty alt is supported for decorative images; meaningful photo alt text must come from actual content authoring. No active audio/video fields are implemented.
