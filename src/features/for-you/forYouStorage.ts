import { selectMessage, validateMessages } from './forYouSelection';
import {
  localStorageAccess,
  sessionStorageAccess,
  readVersioned,
  writeStorage,
  type StorageAccess,
} from '../../lib/persistence';

export const persistentKey = 'birthday.for-you.v1';
export const sessionKey = 'birthday.for-you.session.v1';

// One feature-scoped instance survives route remounts, including when storage fails.
// Creating a fresh instance models a reload; sessionStorage keeps the featured ID.
export function createForYouStore(
  content: unknown,
  local: StorageAccess = localStorageAccess,
  session: StorageAccess = sessionStorageAccess,
  random: () => number = Math.random,
) {
  const messages = validateMessages(content);
  const validIds = new Set(messages.map(({ id }) => id));
  const persistent = readVersioned(local, persistentKey, 1);
  const sessionState = readVersioned(session, sessionKey, 1);
  const validStoredIds = (value: unknown): string[] =>
    Array.isArray(value)
      ? value.filter(
          (id): id is string => typeof id === 'string' && validIds.has(id),
        )
      : [];
  const seenIds = [...new Set(validStoredIds(persistent.seenIds))];
  const previousId =
    typeof persistent.lastFeaturedId === 'string' &&
    validIds.has(persistent.lastFeaturedId)
      ? persistent.lastFeaturedId
      : undefined;
  const featuredId =
    typeof sessionState.featuredId === 'string' &&
    validIds.has(sessionState.featuredId)
      ? sessionState.featuredId
      : selectMessage(messages, seenIds, previousId, random)?.id;
  let snapshot = { featuredId, seenIds };
  const listeners = new Set<() => void>();
  const save = () => {
    snapshot = {
      ...snapshot,
      seenIds: [
        ...new Set([
          ...snapshot.seenIds,
          ...validStoredIds(readVersioned(local, persistentKey, 1).seenIds),
        ]),
      ],
    };
    writeStorage(local, persistentKey, {
      version: 1,
      seenIds: snapshot.seenIds,
      lastFeaturedId: featuredId,
    });
  };
  if (featuredId) {
    writeStorage(session, sessionKey, { version: 1, featuredId });
    save();
  }
  return {
    messages,
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    markSeen: (id: string) => {
      if (!validIds.has(id) || snapshot.seenIds.includes(id)) return;
      snapshot = { ...snapshot, seenIds: [...snapshot.seenIds, id] };
      save();
      listeners.forEach((listener) => listener());
    },
    discover: (previousDisplayedId?: string) => {
      const alternatives = messages.filter(
        ({ id }) => id !== previousDisplayedId,
      );
      return selectMessage(
        alternatives.length ? alternatives : messages,
        snapshot.seenIds,
        undefined,
        random,
      );
    },
  };
}
export type ForYouStore = ReturnType<typeof createForYouStore>;
