import { describe, expect, it, vi } from 'vitest';
import { createRevealStore, revealKey } from './revealStorage';

describe('Reveal completion persistence', () => {
  it.each([
    null,
    '{',
    '{}',
    'null',
    'true',
    '{"version":2,"birthdayRevealCompleted":true}',
    '{"version":1,"birthdayRevealCompleted":"true"}',
    '{"version":1,"birthdayRevealCompleted":false}',
  ])('safely defaults incomplete for %s', (value) => {
    const setItem = vi.fn();
    const store = createRevealStore(() => ({ getItem: () => value, setItem }));
    expect(store.isCompleted()).toBe(false);
    expect(setItem).not.toHaveBeenCalled();
  });
  it('writes only version and completion, once; completed replay cannot reset it', () => {
    const setItem = vi.fn();
    const store = createRevealStore(() => ({ getItem: () => null, setItem }));
    store.finish();
    store.finish();
    expect(store.isCompleted()).toBe(true);
    expect(setItem).toHaveBeenCalledExactlyOnceWith(
      revealKey,
      '{"version":1,"birthdayRevealCompleted":true}',
    );
    const returning = createRevealStore(() => ({
      getItem: () => setItem.mock.calls[0]![1] as string,
      setItem,
    }));
    returning.finish();
    expect(returning.isCompleted()).toBe(true);
    expect(setItem).toHaveBeenCalledTimes(1);
  });
  it('survives storage access/write denial in memory but fresh launches use safe defaults', () => {
    const access = () => {
      throw new Error('blocked');
    };
    const store = createRevealStore(access);
    expect(store.isCompleted()).toBe(false);
    store.finish();
    expect(store.isCompleted()).toBe(true);
    expect(createRevealStore(access).isCompleted()).toBe(false);
  });
});
