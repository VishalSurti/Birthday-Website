import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

// Audit generated public artifacts, never read or enumerate private media.
const read = (file) =>
  readFileSync(new URL(`../dist/${file}`, import.meta.url));
const manifest = JSON.parse(read('manifest.webmanifest'));
for (const [key, value] of Object.entries({
  name: 'Birthday Website',
  short_name: 'Birthday',
  description: 'Made especially for you.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#F6F1E8',
  theme_color: '#F6F1E8',
}))
  assert.equal(manifest[key], value, `Manifest ${key}`);
assert.deepEqual(
  Object.keys(manifest).sort(),
  [
    'name',
    'short_name',
    'description',
    'start_url',
    'scope',
    'display',
    'background_color',
    'theme_color',
    'lang',
    'icons',
  ].sort(),
);
for (const size of [192, 512]) {
  const icon = manifest.icons.find((item) => item.sizes === `${size}x${size}`);
  assert.ok(icon && icon.type === 'image/png');
  assert.equal(icon.src, `/app-assets/icons/icon-${size}.png`);
  const png = read(icon.src.slice(1));
  assert.equal(png.readUInt32BE(16), size);
  assert.equal(png.readUInt32BE(20), size);
  if (size === 512) assert.ok(icon.purpose.includes('maskable'));
}
assert.equal(
  read('app-assets/icons/apple-touch-icon.png').readUInt32BE(16),
  180,
);
const html = read('index.html').toString();
assert.ok(
  html.includes('noindex, nofollow') && html.includes('viewport-fit=cover'),
);
assert.ok(
  html.includes('manifest.webmanifest') && html.includes('apple-touch-icon'),
);
assert.ok(read('registerSW.js').toString().includes("register('/sw.js'"));
const sw = read('sw.js').toString();
const urls = [...sw.matchAll(/\burl:"([^"]+)"/g)].map((match) => match[1]);
assert.ok(urls.length > 0, 'Revisioned precache missing');
assert.equal(new Set(urls).size, urls.length, 'Duplicate precache entries');
for (const url of urls) {
  assert.ok(
    !decodeURIComponent(url).includes('private-assets'),
    'Private filename in precache',
  );
  assert.ok(
    /^(index\.html|registerSW\.js|manifest\.webmanifest|assets\/[^/]+\.(js|css|woff2)|app-assets\/.+\.(svg|png))$/.test(
      url,
    ),
    'Unexpected precache path',
  );
}
for (const file of ['index.html', 'registerSW.js', 'manifest.webmanifest'])
  assert.ok(urls.includes(file));
for (const file of readdirSync(new URL('../dist/assets/', import.meta.url))) {
  if (/\.(js|css|woff2)$/.test(file))
    assert.ok(urls.includes(`assets/${file}`), 'Missing build asset');
}
for (const operation of [
  'skipWaiting()',
  'clientsClaim()',
  'cleanupOutdatedCaches()',
  'NavigationRoute',
  'StaleWhileRevalidate',
  'sameOrigin',
  'maxEntries:60',
]) {
  assert.ok(sw.includes(operation), `Missing generated strategy: ${operation}`);
}
console.log(
  `PWA build check passed: safe manifest/icons, ${urls.length} unique public precache entries, fonts, registration and update strategy.`,
);
