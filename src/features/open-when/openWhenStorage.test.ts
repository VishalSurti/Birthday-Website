import { describe, expect, it, vi } from 'vitest';
import { validateLetters } from './openWhenContent';
import { createOpenWhenStore, openWhenKey } from './openWhenStorage';

const letters = ['a', 'b'].map((id) => ({
  id,
  title: '[PLACEHOLDER TITLE]',
  body: '[PLACEHOLDER BODY]',
}));
function memory(initial: string | null = null) {
  let value = initial;
  return {
    getItem: () => value,
    setItem: (_key: string, next: string) => {
      value = next;
    },
  };
}
describe('Open When content', () => {
  it('retains authored order and the first valid duplicate', () => {
    expect(
      validateLetters([
        letters[1],
        letters[0],
        { ...letters[1], title: 'duplicate' },
      ]),
    ).toEqual([letters[1], letters[0]]);
  });
  it('rejects malformed items and missing/blank required fields', () => {
    expect(
      validateLetters([
        null,
        4,
        'text',
        {},
        { ...letters[0], id: ' ' },
        { ...letters[0], title: '' },
        { ...letters[0], body: ' ' },
        { ...letters[0], body: 2 },
        { id: 'a', title: 'missing body' },
        letters[0],
      ]),
    ).toEqual([letters[0]]);
    for (const source of [null, {}, 'bad', []])
      expect(validateLetters(source)).toEqual([]);
  });
});
describe('Open When storage', () => {
  it('only persists version and deduplicated valid opened IDs and survives recreation', () => {
    const storage = memory();
    const store = createOpenWhenStore(letters, () => storage);
    expect(storage.getItem()).toBeNull();
    store.markOpened('a');
    store.markOpened('a');
    store.markOpened('missing');
    expect(JSON.parse(storage.getItem()!)).toEqual({
      version: 1,
      openedLetterIds: ['a'],
    });
    expect(createOpenWhenStore(letters, () => storage).getSnapshot()).toEqual([
      'a',
    ]);
    expect(openWhenKey).toBe('birthday.open-when.v1');
  });
  it('ignores stale, invalid and duplicate IDs', () => {
    const storage = memory(
      JSON.stringify({
        version: 1,
        openedLetterIds: ['a', 'removed', 42, 'a'],
      }),
    );
    expect(createOpenWhenStore(letters, () => storage).getSnapshot()).toEqual([
      'a',
    ]);
  });
  it.each([
    'broken',
    'null',
    '[]',
    '{"version":2,"openedLetterIds":["a"]}',
    '{"version":1,"openedLetterIds":42}',
  ])('uses safe defaults for %s', (value) => {
    expect(
      createOpenWhenStore(letters, () => memory(value)).getSnapshot(),
    ).toEqual([]);
  });
  it('maintains in-memory opened state when access or writes fail', () => {
    const denied = () => {
      throw Error('unavailable');
    };
    const full = () => ({
      getItem: () => null,
      setItem: () => {
        throw Error('full');
      },
    });
    for (const access of [denied, full]) {
      const store = createOpenWhenStore(letters, access);
      store.markOpened('b');
      expect(store.getSnapshot()).toEqual(['b']);
    }
  });
  it.each(['read', 'write'])(
    'keeps opened state and notifications usable after a %s failure',
    (failure) => {
      const storage = {
        getItem: () => {
          if (failure === 'read') throw new Error('blocked read');
          return null;
        },
        setItem: vi.fn(() => {
          if (failure === 'write') throw new Error('quota');
        }),
      };
      const store = createOpenWhenStore(letters, () => storage);
      const listener = vi.fn();
      store.subscribe(listener);
      store.markOpened('b');
      store.markOpened('b');
      store.markOpened('removed');
      expect(store.getSnapshot()).toEqual(['b']);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenCalledExactlyOnceWith(
        openWhenKey,
        '{"version":1,"openedLetterIds":["b"]}',
      );
      expect(createOpenWhenStore(letters, () => storage).getSnapshot()).toEqual(
        [],
      );
    },
  );
});
