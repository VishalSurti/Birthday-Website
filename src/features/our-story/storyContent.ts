import {
  validateImageReference,
  type ImageReference,
} from '../../components/media/imageReference';
export type StoryMemory = {
  id: string;
  title: string;
  body: string;
  timeLabel?: string;
  highlightedLine?: string;
  images: ImageReference[];
};
export type Story = {
  introduction?: string;
  memories: StoryMemory[];
  closing?: string;
};
const text = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value : undefined;
function images(input: unknown): ImageReference[] {
  if (!Array.isArray(input)) return [];
  return input
    .flatMap((item) => {
      const image = validateImageReference(item);
      return image ? [image] : [];
    })
    .slice(0, 3);
}
export function validateStory(input: unknown): Story {
  if (!input || typeof input !== 'object') return { memories: [] };
  const value = input as Record<string, unknown>;
  const ids = new Set<string>();
  const memories = Array.isArray(value.memories)
    ? value.memories.flatMap((item: unknown) => {
        if (!item || typeof item !== 'object') return [];
        const memory = item as Record<string, unknown>;
        const id = text(memory.id),
          title = text(memory.title),
          body = text(memory.body);
        if (!id || ids.has(id) || !title || !body) return [];
        ids.add(id);
        return [
          {
            id,
            title,
            body,
            timeLabel: text(memory.timeLabel),
            highlightedLine: text(memory.highlightedLine),
            images: images(memory.images),
          },
        ];
      })
    : [];
  return {
    introduction: text(value.introduction),
    memories,
    closing: text(value.closing),
  };
}

// A bounded index into ONE memory, never an index into all Story images.
export function photoIndex(index: number, delta: number, count: number) {
  return Math.max(0, Math.min(count - 1, index + delta));
}
export function swipeDirection(dx: number, dy: number): -1 | 0 | 1 {
  return Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5
    ? dx < 0
      ? 1
      : -1
    : 0;
}
