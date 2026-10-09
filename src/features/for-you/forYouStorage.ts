import { selectMessage, validateMessages } from './forYouSelection';

export const persistentKey = 'birthday.for-you.v1';
export const sessionKey = 'birthday.for-you.session.v1';
type StorageAccess = () => Pick<Storage, 'getItem' | 'setItem'>;

function read(access: StorageAccess, key: string): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(access().getItem(key) ?? 'null');
    return value &&
      typeof value === 'object' &&
      'version' in value &&
      value.version === 1
      ? (value as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function write(access: StorageAccess, key: string, value: unknown) {
  try {
    access().setItem(key, JSON.stringify(value));
  } catch {
    /* Memory remains usable. */
  }
}

// One feature-scoped instance survives route remounts, including when storage fails.
// Creating a fresh instance models a reload; sessionStorage keeps the featured ID.
export function createForYouStore(
  content: unknown,
  local: StorageAccess = () => window.localStorage,
  session: StorageAccess = () => window.sessionStorage,
  random: () => number = Math.random,
) {
  const messages = validateMessages(content);
  const validIds = new Set(messages.map(({ id }) => id));
  const persistent = read(local, persistentKey);
  const sessionState = read(session, sessionKey);
  const seenIds = Array.isArray(persistent.seenIds)
    ? [
        ...new Set(
          persistent.seenIds.filter(
            (id): id is string => typeof id === 'string' && validIds.has(id),
          ),
        ),
      ]
    : [];
  const previousId =
    typeof persistent.lastFeaturedId === 'string'
      ? persistent.lastFeaturedId
      : undefined;
  const featuredId =
    typeof sessionState.featuredId === 'string' &&
    validIds.has(sessionState.featuredId)
      ? sessionState.featuredId
      : selectMessage(messages, seenIds, previousId, random)?.id;
  let snapshot = { featuredId, seenIds };
  const listeners = new Set<() => void>();
  const save = () =>
    write(local, persistentKey, {
      version: 1,
      seenIds: snapshot.seenIds,
      lastFeaturedId: featuredId,
    });
  if (featuredId) {
    write(session, sessionKey, { version: 1, featuredId });
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
