import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import sample from '../../../content/sample/our-story.json';
import { AppShell } from '../../app/AppShell';
import { OurStoryExperience } from './OurStoryExperience';

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
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
function setup(content: unknown = sample) {
  const router = createMemoryRouter(
    [
      {
        element: <AppShell />,
        children: [
          {
            path: '/our-story',
            element: <OurStoryExperience content={content} />,
          },
          { path: '/', element: <h1>Home</h1> },
        ],
      },
    ],
    { initialEntries: ['/', '/our-story'], initialIndex: 1 },
  );
  render(<RouterProvider router={router} />);
  return router;
}
function open(memory = 6, index = 2) {
  const button = screen.getByRole('button', {
    name: `View photo ${index} from ${sample.memories[memory - 1]!.title}`,
  });
  fireEvent.click(button);
  return button;
}
async function close() {
  fireEvent.click(
    within(screen.getByRole('dialog')).getByRole('button', { name: 'Close' }),
  );
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
}
function viewerImage() {
  return within(screen.getByRole('dialog')).getByRole('img');
}
function status() {
  return within(screen.getByRole('dialog')).getByRole('status').textContent;
}

describe('continuous Story', () => {
  it('renders all 12 authored chapters, optional content, image variations and open-ended closing', () => {
    setup();
    expect(
      screen.getByRole('heading', { name: 'Our Story', level: 1 }),
    ).toBeTruthy();
    expect(screen.getByText(sample.introduction)).toBeTruthy();
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(12);
    articles.forEach((article, i) => {
      expect(
        within(article).getByRole('heading', { level: 2 }).textContent,
      ).toBe(sample.memories[i]!.title);
      expect(within(article).queryAllByRole('img')).toHaveLength(
        sample.memories[i]!.images?.length ?? 0,
      );
      expect(within(article).queryAllByRole('link')).toHaveLength(0);
    });
    expect(
      within(articles[1]!).queryByText('[PLACEHOLDER BROAD TIME LABEL]'),
    ).toBeNull();
    expect(
      within(articles[1]!).getByText(
        '[PLACEHOLDER HIGHLIGHTED LINE — DEVELOPMENT ONLY]',
      ),
    ).toBeTruthy();
    expect(
      within(articles[0]!).queryByText(
        '[PLACEHOLDER HIGHLIGHTED LINE — DEVELOPMENT ONLY]',
      ),
    ).toBeNull();
    expect(articles[6]!.textContent).toContain('PARAGRAPH 4');
    expect(
      screen.getByRole('region', { name: 'Story continues' }).textContent,
    ).toBe(sample.closing);
    expect(
      articles[11]!.compareDocumentPosition(
        screen.getByRole('region', { name: 'Story continues' }),
      ) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
  it.each([null, { memories: [] }, { memories: [{ id: 'bad' }] }])(
    'recovers no valid memories %j',
    (source) => {
      setup(source);
      expect(
        screen.getByRole('region', { name: 'Story unavailable' }),
      ).toBeTruthy();
      expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
    },
  );
  it('preserves writing and reserved media wrapper when narrative image fails', () => {
    setup();
    const chapter = screen.getAllByRole('article')[0]!;
    fireEvent.error(within(chapter).getByRole('img'));
    expect(
      within(chapter).getByRole('img', { name: 'Image unavailable' }),
    ).toBeTruthy();
    expect(chapter.textContent).toContain(sample.memories[0]!.body);
    expect(chapter.textContent).not.toContain('.svg');
  });
});
describe('Story viewer', () => {
  it('opens the selected photo, closes with focus/scroll restored and no extra Back step', async () => {
    const router = setup();
    vi.stubGlobal('scrollY', 720);
    const origin = open();
    expect(viewerImage().getAttribute('src')).toBe(
      sample.memories[5]!.images![1]!.src,
    );
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true');
    expect(document.activeElement).toBe(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Close' }),
    );
    await close();
    expect(document.activeElement).toBe(origin);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 720,
      behavior: 'instant',
    });
    await act(async () => {
      await router.navigate(-1);
    });
    expect(screen.getByRole('heading', { name: 'Home' })).toBeTruthy();
  });
  it('single-image viewer has no arrows/dots/status and ignores directional keys', async () => {
    setup();
    open(1, 1);
    const src = viewerImage().getAttribute('src');
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' });
    expect(viewerImage().getAttribute('src')).toBe(src);
    expect(
      within(screen.getByRole('dialog')).queryByRole('button', {
        name: 'Next photo',
      }),
    ).toBeNull();
    expect(within(screen.getByRole('dialog')).queryByRole('status')).toBeNull();
    await close();
  });
  it('buttons and keyboard stop at both boundaries and never reach another memory', async () => {
    setup();
    open();
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Next photo' }));
    expect(status()).toContain('Photo 3 of 3');
    expect(
      (
        within(dialog).getByRole('button', {
          name: 'Next photo',
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    for (let i = 0; i < 5; i++)
      fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(viewerImage().getAttribute('src')).toBe(
      sample.memories[5]!.images![2]!.src,
    );
    fireEvent.click(
      within(dialog).getByRole('button', { name: 'Previous photo' }),
    );
    for (let i = 0; i < 5; i++) fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(status()).toContain('Photo 1 of 3');
    expect(viewerImage().getAttribute('src')).toBe(
      sample.memories[5]!.images![0]!.src,
    );
    expect(
      (
        within(dialog).getByRole('button', {
          name: 'Previous photo',
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    await close();
    open(6, 2);
    expect(status()).toContain('Photo 2 of 3');
    await close();
  });
  it('keeps failed viewer images recoverable within the same memory', async () => {
    setup();
    open();
    fireEvent.error(viewerImage());
    expect(
      within(screen.getByRole('dialog')).getByRole('img', {
        name: 'Image unavailable',
      }),
    ).toBeTruthy();
    expect(screen.getByRole('dialog').textContent).not.toContain('.svg');
    fireEvent.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Next photo',
      }),
    );
    expect(viewerImage().getAttribute('src')).toBe(
      sample.memories[5]!.images![2]!.src,
    );
    await close();
  });
  it.each([false, true])(
    'Escape and browser Back dismiss with unchanged semantics (reduced motion %s)',
    async (reduced) => {
      vi.stubGlobal(
        'matchMedia',
        vi.fn(() => ({ matches: reduced })),
      );
      const router = setup();
      open();
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowLeft' });
      expect(status()).toContain('Photo 1 of 3');
      fireEvent(
        screen.getByRole('dialog'),
        new Event('cancel', { cancelable: true }),
      );
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      open();
      await act(async () => {
        await router.navigate(-1);
      });
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(router.state.location.pathname).toBe('/our-story');
    },
  );
  it('never reads or writes localStorage while browsing, navigating photos, closing or reopening', async () => {
    const read = vi.spyOn(Storage.prototype, 'getItem');
    const write = vi.spyOn(Storage.prototype, 'setItem');
    setup();
    open();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' });
    await close();
    open(1, 1);
    await close();
    // Router initialization reads its own session transition setting, not Story state.
    expect(
      read.mock.contexts.filter((storage) => storage === localStorage),
    ).toHaveLength(0);
    expect(write).not.toHaveBeenCalled();
  });
});
