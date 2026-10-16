# Public application assets

This directory is for safe, non-private UI assets. Vite serves files under `public/` as public URLs and copies them to production output.

Never put real birthday photography, audio, names, private writing or secrets here. Private media belongs only under ignored `/public/private-assets/` and must never enter Git. Git ignore protects the repository, not deployed access: anyone with a deployed asset URL may access it under the locked unlisted-URL model.

Final icons, PWA artwork and Open Graph artwork are deferred. Fonts are bundled from Fontsource packages instead of copied here.

`story-placeholders/` contains six locally authored geometric SVG development assets in the approved palette. These are neither personal photography nor release artwork. Story sample content references every asset to test image composition and the full-screen viewer. Replace those references with ignored private photography before release; do not commit private replacements here.

`reveal-placeholders/` contains two artificial geometric SVGs for opening/Reveal layout testing, in the approved Reveal palette. Both are used by the development experience. They are not personal photography or release artwork.
