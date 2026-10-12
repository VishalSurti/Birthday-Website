import { describe, expect, it } from 'vitest';
import { photoIndex, swipeDirection, validateStory } from './storyContent';
const image = {
  src: '/app-assets/test.svg',
  alt: 'Development placeholder.',
  width: 960,
  height: 720,
};
const memory = {
  id: 'a',
  title: '[PLACEHOLDER TITLE]',
  body: '[PLACEHOLDER BODY]',
};
describe('Story validation', () => {
  it('preserves authored order and first valid occurrence, with optional fields absent', () => {
    const story = validateStory({
      memories: [
        { ...memory, id: 'b' },
        memory,
        { ...memory, title: 'duplicate' },
      ],
    });
    expect(story.memories.map((m) => m.id)).toEqual(['b', 'a']);
    expect(story.memories[1]).toMatchObject({ ...memory, images: [] });
    expect(story.memories[1]?.timeLabel).toBeUndefined();
    expect(story.memories[1]?.highlightedLine).toBeUndefined();
  });
  it('rejects missing/blank required fields and malformed memories without losing valid writing', () => {
    expect(
      validateStory({
        memories: [
          null,
          2,
          {},
          { ...memory, id: ' ' },
          { ...memory, title: '' },
          { ...memory, body: ' ' },
          { id: 'x', title: 'missing body' },
          memory,
        ],
      }).memories,
    ).toHaveLength(1);
  });
  it.each([0, 1, 2, 3, 4])(
    'accepts %s images, limiting excess to three',
    (count) => {
      expect(
        validateStory({
          memories: [
            { ...memory, images: Array.from({ length: count }, () => image) },
          ],
        }).memories[0]?.images,
      ).toHaveLength(Math.min(count, 3));
    },
  );
  it('ignores invalid images and optional fields, and omits invalid dimensions', () => {
    const story = validateStory({
      introduction: 12,
      closing: ' ',
      memories: [
        {
          ...memory,
          timeLabel: 42,
          highlightedLine: [],
          images: [
            null,
            {},
            { ...image, src: ' ' },
            { ...image, src: 'javascript:bad' },
            { ...image, alt: 3 },
            { ...image, width: -1, height: Infinity },
          ],
        },
      ],
    });
    expect(story.introduction).toBeUndefined();
    expect(story.closing).toBeUndefined();
    expect(story.memories[0]?.images).toEqual([
      { src: image.src, alt: image.alt, width: undefined, height: undefined },
    ]);
    expect(story.memories[0]?.timeLabel).toBeUndefined();
    expect(story.memories[0]?.highlightedLine).toBeUndefined();
  });
  it.each([null, [], 42, {}, { memories: 'bad' }])(
    'degrades malformed collection %j quietly',
    (source) => {
      expect(validateStory(source).memories).toEqual([]);
    },
  );
});
describe('bounded same-memory navigation', () => {
  it('never wraps or escapes the supplied memory length', () => {
    for (const count of [1, 2, 3]) {
      expect(photoIndex(0, -1, count)).toBe(0);
      expect(photoIndex(count - 1, 1, count)).toBe(count - 1);
      expect(photoIndex(0, 99, count)).toBe(count - 1);
      expect(photoIndex(count - 1, -99, count)).toBe(0);
    }
  });
  it('requires a deliberate horizontal swipe, ignoring taps and vertical gestures', () => {
    expect(swipeDirection(-80, 10)).toBe(1);
    expect(swipeDirection(80, -10)).toBe(-1);
    expect(swipeDirection(-20, 0)).toBe(0);
    expect(swipeDirection(-80, 100)).toBe(0);
    expect(swipeDirection(0, 0)).toBe(0);
  });
});
