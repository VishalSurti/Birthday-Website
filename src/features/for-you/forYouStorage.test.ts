import { describe, expect, it } from 'vitest';
import { createForYouStore, persistentKey, sessionKey } from './forYouStorage';
const content = ['a', 'b', 'c'].map((id) => ({ id, body: '[PLACEHOLDER]' }));
function memory() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
}

describe('For You storage', () => {
  it('does not mark seen on selection; saves unique opened IDs and reloads them', () => {
    const local = memory(),
      session = memory();
    const store = createForYouStore(
      content,
      () => local,
      () => session,
      () => 0,
    );
    expect(store.getSnapshot()).toEqual({ featuredId: 'a', seenIds: [] });
    store.markSeen('a');
    store.markSeen('a');
    store.markSeen('removed');
    expect(
      createForYouStore(
        content,
        () => local,
        () => session,
        () => 0.99,
      ).getSnapshot(),
    ).toEqual({ featuredId: 'a', seenIds: ['a'] });
    expect(JSON.parse(local.getItem(persistentKey)!)).toEqual({
      version: 1,
      seenIds: ['a'],
      lastFeaturedId: 'a',
    });
    expect(JSON.parse(session.getItem(sessionKey)!)).toEqual({
      version: 1,
      featuredId: 'a',
    });
  });
  it('keeps session selection across fresh instances but selects anew after session ends', () => {
    const local = memory(),
      session = memory();
    expect(
      createForYouStore(
        content,
        () => local,
        () => session,
        () => 0,
      ).getSnapshot().featuredId,
    ).toBe('a');
    expect(
      createForYouStore(
        content,
        () => local,
        () => session,
        () => 0.99,
      ).getSnapshot().featuredId,
    ).toBe('a');
    expect(
      createForYouStore(
        content,
        () => local,
        () => memory(),
        () => 0,
      ).getSnapshot().featuredId,
    ).toBe('b');
  });
  it.each([
    '{broken',
    'null',
    '[]',
    JSON.stringify({ version: 99, seenIds: ['a'] }),
  ])('uses defaults for malformed/incompatible storage: %s', (value) => {
    const local = memory(),
      session = memory();
    local.setItem(persistentKey, value);
    session.setItem(sessionKey, value);
    expect(
      createForYouStore(
        content,
        () => local,
        () => session,
        () => 0,
      ).getSnapshot(),
    ).toEqual({ featuredId: 'a', seenIds: [] });
  });
  it('removes stale/invalid/duplicate IDs and replaces a removed session featured ID', () => {
    const local = memory(),
      session = memory();
    local.setItem(
      persistentKey,
      JSON.stringify({
        version: 1,
        seenIds: ['a', 'a', 'removed', 42],
        lastFeaturedId: 'removed',
      }),
    );
    session.setItem(
      sessionKey,
      JSON.stringify({ version: 1, featuredId: 'removed' }),
    );
    expect(
      createForYouStore(
        content,
        () => local,
        () => session,
        () => 0,
      ).getSnapshot(),
    ).toEqual({ featuredId: 'b', seenIds: ['a'] });
  });
  it('keeps in-memory functionality when access or writes fail', () => {
    const denied = () => {
      throw new Error('unavailable');
    };
    const failedWrite = () => ({
      getItem: () => null,
      setItem: () => {
        throw new Error('full');
      },
    });
    for (const access of [denied, failedWrite]) {
      const store = createForYouStore(content, access, access, () => 0);
      store.markSeen('a');
      expect(store.getSnapshot()).toEqual({ featuredId: 'a', seenIds: ['a'] });
      expect(store.discover('a')?.id).toBe('b');
    }
  });
  it('discovers without replacing featured or marking seen, excluding last displayed even if closed', () => {
    const store = createForYouStore(
      content,
      () => memory(),
      () => memory(),
      () => 0,
    );
    store.markSeen('a');
    expect(store.discover('a')?.id).toBe('b');
    expect(store.discover('b')?.id).toBe('c');
    expect(store.getSnapshot()).toEqual({ featuredId: 'a', seenIds: ['a'] });
  });
  it('handles all-seen, one-message and empty discovery', () => {
    const store = createForYouStore(
      content,
      () => memory(),
      () => memory(),
      () => 0,
    );
    content.forEach(({ id }) => store.markSeen(id));
    expect(store.discover('a')?.id).toBe('b');
    expect(
      createForYouStore(
        content.slice(0, 1),
        () => memory(),
        () => memory(),
      ).discover('a')?.id,
    ).toBe('a');
    expect(
      createForYouStore(
        [],
        () => memory(),
        () => memory(),
      ).discover(),
    ).toBeUndefined();
  });
});
