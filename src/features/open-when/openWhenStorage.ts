import { validateLetters } from './openWhenContent';

export const openWhenKey = 'birthday.open-when.v1';
type StorageAccess = () => Pick<Storage, 'getItem' | 'setItem'>;

export function createOpenWhenStore(
  content: unknown,
  access: StorageAccess = () => window.localStorage,
) {
  const letters = validateLetters(content);
  const validIds = new Set(letters.map(({ id }) => id));
  let openedLetterIds: string[] = [];
  try {
    const data: unknown = JSON.parse(access().getItem(openWhenKey) ?? 'null');
    if (
      data &&
      typeof data === 'object' &&
      'version' in data &&
      data.version === 1 &&
      'openedLetterIds' in data &&
      Array.isArray(data.openedLetterIds)
    ) {
      openedLetterIds = [
        ...new Set(
          data.openedLetterIds.filter(
            (id): id is string => typeof id === 'string' && validIds.has(id),
          ),
        ),
      ];
    }
  } catch {
    /* Missing or unavailable storage uses the same safe defaults. */
  }
  const listeners = new Set<() => void>();
  return {
    letters,
    // Only temporary return context, never written to storage.
    returnContext: undefined as
      { key: string; letterId: string; scrollY: number } | undefined,
    getSnapshot: () => openedLetterIds,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    markOpened: (id: string) => {
      if (!validIds.has(id) || openedLetterIds.includes(id)) return;
      openedLetterIds = [...openedLetterIds, id];
      try {
        access().setItem(
          openWhenKey,
          JSON.stringify({ version: 1, openedLetterIds }),
        );
      } catch {
        /* Reading and in-memory state remain available. */
      }
      listeners.forEach((listener) => listener());
    },
  };
}
export type OpenWhenStore = ReturnType<typeof createOpenWhenStore>;
