export type Letter = { id: string; title: string; body: string };

// First valid occurrence wins; retain authored order. Optional media is deferred.
export function validateLetters(input: unknown): Letter[] {
  if (!Array.isArray(input)) return [];
  const ids = new Set<string>();
  return input.flatMap((item: unknown) => {
    if (!item || typeof item !== 'object') return [];
    const value = item as Record<string, unknown>;
    if (
      typeof value.id !== 'string' ||
      !value.id.trim() ||
      ids.has(value.id) ||
      typeof value.title !== 'string' ||
      !value.title.trim() ||
      typeof value.body !== 'string' ||
      !value.body.trim()
    )
      return [];
    ids.add(value.id);
    return [{ id: value.id, title: value.title, body: value.body }];
  });
}
