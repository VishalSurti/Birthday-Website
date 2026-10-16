import { describe, expect, it, vi } from 'vitest';
import { createInstallStore, installKey } from './installStore';

function memory(raw: string | null = null) {
  return {
    getItem: () => raw,
    setItem: vi.fn((_key: string, value: string) => {
      raw = value;
    }),
  };
}
function eligible(store: ReturnType<typeof createInstallStore>) {
  store.visit(true, false, true);
  store.visit(false, true, true);
  store.visit(true, false, true);
}
describe('install dismissal and runtime eligibility', () => {
  it('requires Home then section then Home, offers once, and never persists eligibility', () => {
    const storage = memory();
    const store = createInstallStore(() => storage);
    store.visit(false, true, true); // Completed deep link before any Home is insufficient.
    store.visit(true, false, true);
    expect(store.getSnapshot()).toBe(false);
    store.visit(false, false, true); // More/replay/unknown are not sections.
    store.visit(true, false, true);
    expect(store.getSnapshot()).toBe(false);
    store.visit(false, true, true);
    expect(store.getSnapshot()).toBe(false);
    store.visit(true, false, true);
    expect(store.getSnapshot()).toBe(true);
    store.visit(false, true, true);
    store.visit(true, false, true);
    expect(store.getSnapshot()).toBe(false);
    expect(storage.setItem).not.toHaveBeenCalled();
  });
  it('persists explicit dismissal only, once, and respects it in a fresh instance', () => {
    const storage = memory();
    const store = createInstallStore(() => storage);
    eligible(store);
    store.dismiss();
    store.dismiss();
    expect(store.getSnapshot()).toBe(false);
    expect(storage.setItem).toHaveBeenCalledExactlyOnceWith(
      installKey,
      '{"version":1,"installPromptDismissed":true}',
    );
    const next = createInstallStore(() => storage);
    eligible(next);
    expect(next.getSnapshot()).toBe(false);
  });
  it.each([
    null,
    '{broken',
    '[]',
    'true',
    '{"version":99,"installPromptDismissed":true}',
    '{"version":1,"installPromptDismissed":"true"}',
  ])('safely allows eligibility with absent/invalid state: %s', (raw) => {
    const store = createInstallStore(() => memory(raw));
    eligible(store);
    expect(store.getSnapshot()).toBe(true);
  });
  it.each(['access', 'read', 'write'])(
    'keeps dismissal in memory on %s failure, with safe fresh defaults',
    (failure) => {
      const access = () => {
        if (failure === 'access') throw Error('denied');
        return {
          getItem: () => {
            if (failure === 'read') throw Error('read');
            return null;
          },
          setItem: () => {
            if (failure === 'write') throw Error('quota');
          },
        };
      };
      const store = createInstallStore(access);
      eligible(store);
      store.dismiss();
      eligible(store);
      expect(store.getSnapshot()).toBe(false);
      const fresh = createInstallStore(access);
      eligible(fresh);
      expect(fresh.getSnapshot()).toBe(true);
    },
  );
  it('does not claim or display a suggestion when installed', () => {
    const storage = memory();
    const store = createInstallStore(() => storage);
    store.visit(true, false, false);
    store.visit(false, true, false);
    store.visit(true, false, false);
    expect(store.getSnapshot()).toBe(false);
    expect(storage.setItem).not.toHaveBeenCalled();
  });
});
