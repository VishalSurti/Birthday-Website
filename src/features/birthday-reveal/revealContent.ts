import {
  validateImageReference,
  type ImageReference,
} from '../../components/media/imageReference';
export type RevealScene = {
  id: string;
  type: 'text' | 'photo' | 'text-photo' | 'final';
  headline: string;
  body?: string;
  image?: ImageReference;
};
const text = (value: unknown): value is string =>
  typeof value === 'string' && !!value.trim();
// Fail closed on incoherent sequences; malformed optional media never discards writing.
export function validateReveal(input: unknown): RevealScene[] {
  if (!Array.isArray(input) || input.length < 3 || input.length > 5) return [];
  const scenes: RevealScene[] = [];
  const ids = new Set<string>();
  for (const item of input as unknown[]) {
    if (!item || typeof item !== 'object') return [];
    const value = item as Record<string, unknown>;
    if (
      !text(value.id) ||
      ids.has(value.id) ||
      !text(value.headline) ||
      !['text', 'photo', 'text-photo', 'final'].includes(String(value.type))
    )
      return [];
    ids.add(value.id);
    scenes.push({
      id: value.id,
      type: value.type as RevealScene['type'],
      headline: value.headline,
      body: text(value.body) ? value.body : undefined,
      image: validateImageReference(value.image),
    });
  }
  return scenes.at(-1)?.type === 'final' &&
    scenes.filter((scene) => scene.type === 'final').length === 1
    ? scenes
    : [];
}
