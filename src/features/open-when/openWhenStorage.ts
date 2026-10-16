import { validateLetters } from './openWhenContent';
import {
  localStorageAccess,
  readVersioned,
  writeStorage,
  type StorageAccess,
} from '../../lib/persistence';

export const openWhenKey = 'birthday.open-when.v1';

export function createOpenWhenStore(
  content: unknown,
  access: StorageAccess = localStorageAccess,
) {
  const letters = validateLetters(content);
  const validIds = new Set(letters.map(({ id }) => id));
  const data = readVersioned(access, openWhenKey, 1);
  const validStoredIds = (value: unknown): string[] =>
    Array.isArray(value)
      ? value.filter(
          (id): id is string => typeof id === 'string' && validIds.has(id),
        )
      : [];
  let openedLetterIds = [...new Set(validStoredIds(data.openedLetterIds))];
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
      openedLetterIds = [
        ...new Set([
          ...openedLetterIds,
          ...validStoredIds(
            readVersioned(access, openWhenKey, 1).openedLetterIds,
          ),
          id,
        ]),
      ];
      writeStorage(access, openWhenKey, { version: 1, openedLetterIds });
      listeners.forEach((listener) => listener());
    },
  };
}
export type OpenWhenStore = ReturnType<typeof createOpenWhenStore>;
