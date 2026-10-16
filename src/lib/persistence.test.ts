import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  localStorageAccess,
  sessionStorageAccess,
  readVersioned,
  writeStorage,
} from './persistence';

afterEach(() => vi.restoreAllMocks());

describe('safe persistence boundary', () => {
  it.each([
    null,
    '{broken',
    'null',
    '[]',
    'true',
    '42',
    '"string"',
    '{}',
    '{"version":99}',
    '{"version":"1"}',
  ])(
    'returns defaults for absent, malformed or incompatible data: %s',
    (raw) => {
      const access = () => ({ getItem: () => raw, setItem: vi.fn() });
      expect(readVersioned(access, 'test', 1)).toEqual({});
    },
  );

  it('round-trips a versioned record without adding fields or extra writes', () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: vi.fn((key: string, value: string) => values.set(key, value)),
    };
    const record = { version: 1, enabled: true };
    writeStorage(() => storage, 'test', record);
    expect(readVersioned(() => storage, 'test', 1)).toEqual(record);
    expect(storage.setItem).toHaveBeenCalledExactlyOnceWith(
      'test',
      JSON.stringify(record),
    );
    expect(readVersioned(() => storage, 'test', 99)).toEqual({});
  });

  it.each([
    ['localStorage', localStorageAccess],
    ['sessionStorage', sessionStorageAccess],
  ] as const)(
    'catches a denied window.%s property on reads and writes',
    (name, access) => {
      vi.spyOn(window, name, 'get').mockImplementation(() => {
        throw new Error('blocked');
      });
      expect(readVersioned(access, 'test', 1)).toEqual({});
      expect(() => writeStorage(access, 'test', { version: 1 })).not.toThrow();
    },
  );

  it('catches injected provider and getItem failures', () => {
    const denied = () => {
      throw new Error('blocked');
    };
    const brokenRead = () => ({
      getItem: () => {
        throw new Error('read failed');
      },
      setItem: vi.fn(),
    });
    for (const access of [denied, brokenRead])
      expect(readVersioned(access, 'test', 1)).toEqual({});
    expect(() => writeStorage(denied, 'test', { version: 1 })).not.toThrow();
  });

  it('silently tolerates a failed setItem', () => {
    const storage = {
      getItem: () => null,
      setItem: vi.fn(() => {
        throw new Error('quota');
      }),
    };
    expect(() =>
      writeStorage(() => storage, 'test', { version: 1 }),
    ).not.toThrow();
    expect(storage.setItem).toHaveBeenCalledTimes(1);
  });
});
