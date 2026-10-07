# Public application assets

This directory is for safe, non-private UI assets. Vite serves files under `public/` as public URLs and copies them to production output.

Never put real birthday photography, audio, names, private writing or secrets here. Private media belongs only under ignored `/public/private-assets/` and must never enter Git. Git ignore protects the repository, not deployed access: anyone with a deployed asset URL may access it under the locked unlisted-URL model.

Final icons, PWA artwork and Open Graph artwork are deferred. Fonts are bundled from Fontsource packages instead of copied here.
