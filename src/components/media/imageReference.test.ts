import { expect, it } from 'vitest';
import { validateImageReference } from './imageReference';
it.each([
  '/app-assets/example.svg',
  '/private-assets/images/example.webp',
  '/private-assets/example.avif',
  '/app-assets/example.jpg',
])('accepts static root-relative %s without requiring a file', (src) => {
  expect(
    validateImageReference({ src, alt: '', width: 800, height: 600 }),
  ).toEqual({ src, alt: '', width: 800, height: 600 });
});
it.each([
  null,
  [],
  {},
  { src: '' },
  { src: ' /image.png', alt: '' },
  { src: 'https://tracker.example/a', alt: '' },
  { src: '//tracker.example/a', alt: '' },
  { src: '/\\tracker.example/a', alt: '' },
  { src: 'data:image/png;base64,x', alt: '' },
  { src: '/image.png', alt: 7 },
])('rejects malformed or non-local references %#', (input) => {
  expect(validateImageReference(input)).toBeUndefined();
});
it.each([0, -1, Infinity, NaN, '800', null])(
  'ignores invalid optional dimensions %s',
  (dimension) => {
    const value = validateImageReference({
      src: '/app-assets/example.png',
      alt: 'Provided text',
      width: dimension,
      height: dimension,
    });
    expect(value?.width).toBeUndefined();
    expect(value?.height).toBeUndefined();
    expect(value?.alt).toBe('Provided text');
  },
);
