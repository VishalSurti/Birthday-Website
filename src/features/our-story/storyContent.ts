export type StoryImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
export type StoryMemory = {
  id: string;
  title: string;
  body: string;
  timeLabel?: string;
  highlightedLine?: string;
  images: StoryImage[];
};
export type Story = {
  introduction?: string;
  memories: StoryMemory[];
  closing?: string;
};
const text = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value : undefined;
const dimension = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : undefined;
function images(input: unknown): StoryImage[] {
  if (!Array.isArray(input)) return [];
  return input
    .flatMap((item: unknown) => {
      if (!item || typeof item !== 'object') return [];
      const value = item as Record<string, unknown>;
      const src = text(value.src);
      // Content references local public/private assets, never scripts or remote trackers.
      if (
        !src ||
        !src.startsWith('/') ||
        src.startsWith('//') ||
        typeof value.alt !== 'string'
      )
        return [];
      return [
        {
          src,
          alt: value.alt,
          width: dimension(value.width),
          height: dimension(value.height),
        },
      ];
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
