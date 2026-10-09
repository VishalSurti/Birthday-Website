export type ForYouMessage = { id: string; title?: string; body: string };

// Keep the first valid occurrence of each ID, in authored order.
export function validateMessages(input: unknown): ForYouMessage[] {
  if (!Array.isArray(input)) return [];
  const ids = new Set<string>();
  return input.flatMap((item: unknown) => {
    if (!item || typeof item !== 'object') return [];
    const value = item as Record<string, unknown>;
    if (
      typeof value.id !== 'string' ||
      !value.id.trim() ||
      ids.has(value.id) ||
      typeof value.body !== 'string' ||
      !value.body.trim()
    )
      return [];
    ids.add(value.id);
    return [
      {
        id: value.id,
        body: value.body,
        ...(typeof value.title === 'string' && value.title.trim()
          ? { title: value.title }
          : {}),
      },
    ];
  });
}

export function selectMessage(
  messages: readonly ForYouMessage[],
  seenIds: readonly string[],
  previousId?: string,
  random: () => number = Math.random,
): ForYouMessage | undefined {
  const unseen = messages.filter((message) => !seenIds.includes(message.id));
  const eligible = unseen.length ? unseen : messages;
  const alternatives = eligible.filter((message) => message.id !== previousId);
  const pool = alternatives.length ? alternatives : eligible;
  return pool[Math.floor(random() * pool.length)];
}
