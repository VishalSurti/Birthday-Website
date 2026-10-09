import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ForYouExperience } from './ForYouExperience';
import { createForYouStore } from './forYouStorage';

const messages = [
  { id: 'a', title: '[PLACEHOLDER TITLE A]', body: '[PLACEHOLDER BODY A]' },
  { id: 'b', title: '[PLACEHOLDER TITLE B]', body: '[PLACEHOLDER BODY B]' },
  { id: 'c', body: '[PLACEHOLDER LONG PARAGRAPH]\n\n'.repeat(60) },
];
let reduced = false;
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  reduced = false;
  window.history.replaceState(null, '', '/for-you');
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduced })),
  );
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  // jsdom has no native top-layer/focus-trap implementation; real Chrome verifies it.
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        this.setAttribute('open', '');
      },
    },
    close: {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        this.removeAttribute('open');
      },
    },
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function setup(content: unknown = messages) {
  const store = createForYouStore(
    content,
    () => localStorage,
    () => sessionStorage,
    () => 0,
  );
  const result = render(
    <BrowserRouter>
      <ForYouExperience store={store} />
    </BrowserRouter>,
  );
  return { store, ...result };
}
async function closeReader() {
  fireEvent.click(
    within(screen.getByRole('dialog')).getByRole('button', { name: 'Close' }),
  );
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
}
async function openFeatured() {
  const origin = screen.getByRole('button', { name: 'Open message' });
  origin.focus();
  fireEvent.click(origin);
  await screen.findByText('[PLACEHOLDER BODY A]');
  return origin;
}

describe('For You flows', () => {
  it('visits closed, marks seen only after readable, closes/restores focus and reads again', async () => {
    const { store } = setup();
    expect(store.getSnapshot().seenIds).toEqual([]);
    expect(screen.queryByText('[PLACEHOLDER BODY A]')).toBeNull();
    const origin = screen.getByRole('button', { name: 'Open message' });
    origin.focus();
    fireEvent.click(origin);
    expect(store.getSnapshot().seenIds).toEqual([]);
    expect(screen.getByRole('status').textContent).toBe('Opening message…');
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true');
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Close' }),
    );
    await screen.findByText('[PLACEHOLDER BODY A]');
    expect(store.getSnapshot().seenIds).toEqual(['a']);
    await closeReader();
    expect(document.activeElement).toBe(origin);
    fireEvent.click(screen.getByRole('button', { name: 'Read again' }));
    await screen.findByText('[PLACEHOLDER BODY A]');
    expect(store.getSnapshot().seenIds).toEqual(['a']);
    await closeReader();
  });

  it('does not mark a message seen when closed before the reveal finishes', async () => {
    const { store } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open message' }));
    await closeReader();
    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(store.getSnapshot().seenIds).toEqual([]);
  });

  it.each([false, true])(
    'keeps discovery closed until deliberate activation (reduced motion: %s)',
    async (reduce) => {
      reduced = reduce;
      const { store } = setup();
      await openFeatured();
      await closeReader();
      fireEvent.click(screen.getByRole('button', { name: 'Discover another' }));
      const dialog = screen.getByRole('dialog', { name: 'Another message' });
      expect(within(dialog).queryByText('[PLACEHOLDER BODY B]')).toBeNull();
      expect(store.getSnapshot().seenIds).toEqual(['a']);
      fireEvent.click(
        within(dialog).getByRole('button', { name: 'Open message' }),
      );
      await screen.findByText('[PLACEHOLDER BODY B]');
      expect(store.getSnapshot()).toEqual({
        featuredId: 'a',
        seenIds: ['a', 'b'],
      });
      await closeReader();
      expect(
        screen.getByRole('button', { name: 'Read again' }).textContent,
      ).toContain('[PLACEHOLDER TITLE A]');
    },
  );

  it('shows every configured message, allows unseen/seen opening and preserves All Messages', async () => {
    const { store } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'All messages' }));
    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(3);
    expect(store.getSnapshot().seenIds).toEqual([]);
    fireEvent.click(
      within(list).getByRole('button', {
        name: '[PLACEHOLDER TITLE B] Not opened yet',
      }),
    );
    await screen.findByText('[PLACEHOLDER BODY B]');
    await closeReader();
    expect(
      screen
        .getByRole('button', { name: 'All messages' })
        .getAttribute('aria-pressed'),
    ).toBe('true');
    fireEvent.click(
      screen.getByRole('button', {
        name: '[PLACEHOLDER TITLE B] Opened before',
      }),
    );
    await screen.findByText('[PLACEHOLDER BODY B]');
    await closeReader();
    expect(store.getSnapshot().seenIds).toEqual(['b']);
    fireEvent.click(
      screen.getByRole('button', { name: 'Message 3 Not opened yet' }),
    );
    const article = await screen.findByRole('article');
    expect(article.textContent).toBe(messages[2]!.body);
    await closeReader();
  });

  it('handles browser Back and Escape without leaving For You', async () => {
    setup();
    await openFeatured();
    await act(async () => {
      window.history.back();
    });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(window.location.pathname).toBe('/for-you');
    fireEvent.click(screen.getByRole('button', { name: 'Read again' }));
    await screen.findByText('[PLACEHOLDER BODY A]');
    fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { cancelable: true }),
    );
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(window.location.pathname).toBe('/for-you');
  });

  it.each([[], [{ id: 'broken', body: '' }], null])(
    'shows quiet recovery for no valid content: %j',
    (content) => {
      setup(content);
      expect(
        screen.getByRole('region', { name: 'Messages unavailable' }),
      ).toBeTruthy();
      expect(
        screen.getByRole('link', { name: 'Back to Home' }).getAttribute('href'),
      ).toBe('/');
      expect(screen.queryByRole('button', { name: 'Open message' })).toBeNull();
    },
  );

  it('keeps the same featured and seen state across remounts using the shared store', async () => {
    const { store, unmount } = setup();
    await openFeatured();
    await closeReader();
    unmount();
    render(
      <BrowserRouter>
        <ForYouExperience store={store} />
      </BrowserRouter>,
    );
    expect(
      screen.getByRole('button', { name: 'Read again' }).textContent,
    ).toContain('[PLACEHOLDER TITLE A]');
    expect(store.getSnapshot()).toEqual({ featuredId: 'a', seenIds: ['a'] });
  });
});
