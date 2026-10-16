import { describe, expect, it } from 'vitest';
import { createForYouStore } from '../features/for-you/forYouStorage';
import { createOpenWhenStore } from '../features/open-when/openWhenStorage';
import { createRevealStore } from '../features/birthday-reveal/revealStorage';

const messages = ['a', 'b'].map((id) => ({ id, body: '[PLACEHOLDER]' }));
const letters = messages.map((message) => ({
  ...message,
  title: '[PLACEHOLDER]',
}));

function memory() {
  const values = new Map<string, string>();
  return {
    values,
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
}

function existingRecords() {
  const local = memory();
  const session = memory();
  local.setItem(
    'birthday.for-you.v1',
    '{"version":1,"seenIds":["a"],"lastFeaturedId":"a"}',
  );
  session.setItem(
    'birthday.for-you.session.v1',
    '{"version":1,"featuredId":"a"}',
  );
  local.setItem(
    'birthday.open-when.v1',
    '{"version":1,"openedLetterIds":["a"]}',
  );
  local.setItem(
    'birthday.reveal.v1',
    '{"version":1,"birthdayRevealCompleted":true}',
  );
  return { local, session };
}

describe('feature-scoped persistence compatibility', () => {
  it('retains existing deployed keys, payloads and valid state without migration', () => {
    const { local, session } = existingRecords();
    const before = [...local.values];
    const sessionBefore = [...session.values];
    const forYou = createForYouStore(
      messages,
      () => local,
      () => session,
    );
    const openWhen = createOpenWhenStore(letters, () => local);
    const reveal = createRevealStore(() => local);
    expect(forYou.getSnapshot()).toEqual({ featuredId: 'a', seenIds: ['a'] });
    expect(openWhen.getSnapshot()).toEqual(['a']);
    expect(reveal.isCompleted()).toBe(true);
    forYou.markSeen('a');
    openWhen.markOpened('a');
    reveal.finish();
    expect([...local.values]).toEqual(before);
    expect([...session.values]).toEqual(sessionBefore);
  });

  it('uses safe first-use defaults after storage is cleared between instances', () => {
    const { local, session } = existingRecords();
    expect(createRevealStore(() => local).isCompleted()).toBe(true);
    local.values.clear();
    session.values.clear();
    const reveal = createRevealStore(() => local);
    const forYou = createForYouStore(
      messages,
      () => local,
      () => session,
      () => 0,
    );
    const openWhen = createOpenWhenStore(letters, () => local);
    expect(reveal.isCompleted()).toBe(false);
    expect(forYou.getSnapshot()).toEqual({ featuredId: 'a', seenIds: [] });
    expect(openWhen.getSnapshot()).toEqual([]);
    // Successful interactions still work after the reset.
    reveal.finish();
    forYou.markSeen('b');
    openWhen.markOpened('b');
    expect(reveal.isCompleted()).toBe(true);
    expect(forYou.getSnapshot().seenIds).toEqual(['b']);
    expect(openWhen.getSnapshot()).toEqual(['b']);
    expect([...local.values.keys()].sort()).toEqual([
      'birthday.for-you.v1',
      'birthday.open-when.v1',
      'birthday.reveal.v1',
    ]);
    expect([...session.values.keys()]).toEqual(['birthday.for-you.session.v1']);
  });

  it.each([
    'birthday.for-you.v1',
    'birthday.open-when.v1',
    'birthday.reveal.v1',
  ])('isolates a malformed %s record from the other features', (key) => {
    const { local, session } = existingRecords();
    local.setItem(key, '{broken');
    const forYou = createForYouStore(
      messages,
      () => local,
      () => session,
    );
    const openWhen = createOpenWhenStore(letters, () => local);
    const reveal = createRevealStore(() => local);
    expect(forYou.getSnapshot()).toEqual({
      featuredId: 'a',
      seenIds: key === 'birthday.for-you.v1' ? [] : ['a'],
    });
    expect(openWhen.getSnapshot()).toEqual(
      key === 'birthday.open-when.v1' ? [] : ['a'],
    );
    expect(reveal.isCompleted()).toBe(key !== 'birthday.reveal.v1');
  });
});
