import { describe, expect, it } from 'vitest';
import { selectMessage, validateMessages } from './forYouSelection';

const messages = ['a', 'b', 'c'].map((id) => ({ id, body: '[PLACEHOLDER]' }));
describe('For You selection', () => {
  it('randomly selects from unseen candidates, not the seen pool', () => {
    expect(selectMessage(messages, ['a'], undefined, () => 0)?.id).toBe('b');
    expect(selectMessage(messages, ['a'], undefined, () => 0.99)?.id).toBe('c');
  });
  it('falls back to all messages when seen and avoids the previous featured', () => {
    expect(selectMessage(messages, ['a', 'b', 'c'], 'a', () => 0)?.id).toBe(
      'b',
    );
    expect(selectMessage(messages, [], 'a', () => 0)?.id).toBe('b');
  });
  it('preserves unseen priority when the previous featured is the only unseen candidate', () => {
    expect(selectMessage(messages, ['b', 'c'], 'a', () => 0)?.id).toBe('a');
  });
  it('handles empty/single collections and a removed previous ID', () => {
    expect(selectMessage([], [], undefined, () => 0)).toBeUndefined();
    expect(selectMessage(messages.slice(0, 1), ['a'], 'a', () => 0)?.id).toBe(
      'a',
    );
    expect(selectMessage(messages, [], 'removed', () => 0)?.id).toBe('a');
  });
  it('validates bodies, IDs and optional titles without changing authored order', () => {
    expect(
      validateMessages([
        null,
        {},
        { id: '', body: 'x' },
        { id: 'a', body: ' ' },
        { id: 'a', body: '[PLACEHOLDER]', title: 42 },
        { id: 'a', body: 'duplicate' },
        { id: 'b', body: 2 },
        messages[2],
      ]),
    ).toEqual([messages[0], messages[2]]);
    expect(validateMessages({})).toEqual([]);
  });
});
