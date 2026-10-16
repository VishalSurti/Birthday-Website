import { expect, it } from 'vitest';
import sample from '../../../content/sample/birthday-reveal.json';
import { validateReveal } from './revealContent';
it('keeps the four authored scenes and final birthday moment', () => {
  expect(validateReveal(sample).map((scene) => scene.id)).toEqual(
    sample.map((scene) => scene.id),
  );
});
it.each([
  null,
  {},
  [],
  [...sample, ...sample],
  sample.slice(0, 3),
  sample.map((item) => ({ ...item, id: '' })),
  sample.map((item) => ({ ...item, id: 'duplicate' })),
  sample.map((item) => ({ ...item, type: 'invalid' })),
  sample.map((item) => ({ ...item, headline: ' ' })),
  sample.map((item) => ({ ...item, type: 'final' })),
])('rejects incoherent scene data %#', (input) => {
  expect(validateReveal(input)).toEqual([]);
});
it('drops malformed optional body/media while preserving useful writing', () => {
  const result = validateReveal(
    sample.map((item) => ({
      ...item,
      body: {},
      image: { src: 'https://invalid.example/a', alt: 4 },
    })),
  );
  expect(result).toHaveLength(4);
  expect(result.every((item) => !item.body && !item.image)).toBe(true);
});
