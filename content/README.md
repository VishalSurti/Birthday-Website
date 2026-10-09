# Content locations

This repository is public. Real birthday writing belongs only in ignored `/content/private/`; real photos/audio belong only in ignored `/public/private-assets/`. Never commit real names, personal dates, messages, letters, memories, photographs, audio or secrets. Respect all existing `.gitignore` patterns.

`sample/` is for unmistakable public development placeholders following `CONTENT_SCHEMA.md`. No invented romantic writing or relationship facts. Samples are not release content; replace all placeholders privately before release. For You currently loads `sample/for-you.json` to exercise short, untitled and long-message flows. The final private content-loading system is deferred.

`npm run privacy:check` inspects Git-tracked paths, including staged files. It supplements `.gitignore`; it cannot identify personal information placed in an otherwise public filename. Always review staged content.
