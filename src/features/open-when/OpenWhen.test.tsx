import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppShell } from '../../app/AppShell';
import { RootLayout } from '../../app/RootLayout';
import { OpenWhenCollection } from './OpenWhenCollection';
import { LetterReader } from './LetterReader';
import { createOpenWhenStore } from './openWhenStorage';

const content = [
  { id: 'a', title: '[PLACEHOLDER TITLE A]', body: '[PLACEHOLDER BODY A]' },
  {
    id: 'b',
    title: '[PLACEHOLDER TITLE B]',
    body: Array.from(
      { length: 30 },
      (_, i) => `[PLACEHOLDER LONG PARAGRAPH ${i}]`,
    ).join('\n\n'),
  },
];
let reduced = false;
beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  reduced = false;
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduced })),
  );
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
function setup(
  source: unknown = content,
  path = '/open-when',
  unavailable = false,
) {
  const store = createOpenWhenStore(source, () => {
    if (unavailable) throw Error('unavailable');
    return localStorage;
  });
  const router = createMemoryRouter(
    [
      {
        element: <AppShell />,
        children: [
          { path: '/open-when', element: <OpenWhenCollection store={store} /> },
        ],
      },
      {
        element: <RootLayout className="letter-layout" />,
        children: [
          {
            path: '/open-when/:letterId',
            element: <LetterReader store={store} />,
          },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  render(<RouterProvider router={router} />);
  return { store, router };
}
async function advance(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}
function card(title = 'A') {
  return screen.getByRole('link', {
    name: new RegExp(`PLACEHOLDER TITLE ${title}`),
  });
}

describe('Open When flows', () => {
  it('opens only after reader arrival, restores card focus, and reopens with a shorter transition', async () => {
    const { store, router } = setup();
    expect(
      within(within(screen.getByRole('main')).getByRole('list')).getAllByRole(
        'link',
      ),
    ).toHaveLength(2);
    expect(screen.getAllByText('Unopened')).toHaveLength(2);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(380);
    const origin = card();
    origin.focus();
    fireEvent.click(origin);
    expect(store.getSnapshot()).toEqual([]);
    await advance(319);
    expect(router.state.location.pathname).toBe('/open-when');
    expect(store.getSnapshot()).toEqual([]);
    await advance(1);
    expect(router.state.location.pathname).toBe('/open-when/a');
    expect(screen.getByText('[PLACEHOLDER BODY A]')).toBeTruthy();
    expect(store.getSnapshot()).toEqual(['a']);
    expect(screen.queryByRole('navigation')).toBeNull();
    const back = screen.getByRole('link', { name: 'Back to Open When' });
    expect(document.activeElement).toBe(back);
    fireEvent.click(back);
    await advance(0);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
    expect(card().textContent).toContain('Opened before');
    expect(document.activeElement).toBe(card());
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 380,
      behavior: 'instant',
    });
    fireEvent.click(card());
    await advance(219);
    expect(router.state.location.pathname).toBe('/open-when');
    await advance(1);
    expect(screen.getByRole('article')).toBeTruthy();
    expect(store.getSnapshot()).toEqual(['a']);
    await act(async () => {
      await router.navigate(-1);
    });
    expect(router.state.location.pathname).toBe('/open-when');
    expect(screen.queryByRole('link', { name: /Previous|Next/ })).toBeNull();
  });
  it('cancels unfinished selection when navigating away', async () => {
    const { router, store } = setup();
    fireEvent.click(card());
    await act(async () => {
      await router.navigate('/open-when/missing');
    });
    await advance(500);
    expect(router.state.location.pathname).toBe('/open-when/missing');
    expect(store.getSnapshot()).toEqual([]);
  });
  it('renders the complete long body and gives direct entry a safe parent escape', async () => {
    const { store, router } = setup(content, '/open-when/b');
    const article = screen.getByRole('article');
    expect(
      within(article).getByText('[PLACEHOLDER LONG PARAGRAPH 29]'),
    ).toBeTruthy();
    expect(article.querySelectorAll('.letter-body p')).toHaveLength(30);
    expect(store.getSnapshot()).toEqual(['b']);
    fireEvent.click(screen.getByRole('link', { name: 'Back to Open When' }));
    await advance(0);
    expect(router.state.location.pathname).toBe('/open-when');
  });
  it('recovers invalid routes without opening anything', async () => {
    const { store, router } = setup(content, '/open-when/missing');
    expect(
      screen.getByRole('region', { name: 'Letter unavailable' }),
    ).toBeTruthy();
    expect(store.getSnapshot()).toEqual([]);
    fireEvent.click(screen.getByRole('link', { name: 'Back to Open When' }));
    await advance(0);
    expect(router.state.location.pathname).toBe('/open-when');
  });
  it.each([[], null, [{ id: 'bad', title: '', body: '' }]])(
    'handles empty/malformed content %j',
    (source) => {
      setup(source);
      expect(
        screen.getByRole('region', { name: 'Letters unavailable' }),
      ).toBeTruthy();
      expect(
        screen.getByRole('link', { name: 'Back to Home' }).getAttribute('href'),
      ).toBe('/');
    },
  );
  it('keeps reading and in-memory state usable without storage', async () => {
    const { store } = setup(content, '/open-when', true);
    fireEvent.click(card());
    await advance(320);
    expect(screen.getByText('[PLACEHOLDER BODY A]')).toBeTruthy();
    expect(store.getSnapshot()).toEqual(['a']);
  });
  it('uses deliberate immediate navigation under reduced motion with arrival-only state', async () => {
    reduced = true;
    const { store, router } = setup();
    expect(store.getSnapshot()).toEqual([]);
    fireEvent.click(card());
    await advance(0);
    expect(router.state.location.pathname).toBe('/open-when/a');
    expect(screen.getByRole('article')).toBeTruthy();
    expect(store.getSnapshot()).toEqual(['a']);
  });
});

it('renders optional photography without changing opening or reader escape; failure keeps writing', () => {
  const { store } = setup(
    [
      {
        ...content[0],
        image: {
          src: '/app-assets/media-placeholder.svg',
          alt: '[Development image]',
          width: 800,
          height: 600,
        },
      },
    ],
    '/open-when/a',
  );
  const img = screen.getByRole('img', { name: '[Development image]' });
  expect(img.getAttribute('loading')).toBe('lazy');
  expect(store.getSnapshot()).toEqual(['a']);
  fireEvent.error(img);
  expect(screen.getByRole('img', { name: 'Image unavailable' })).toBeTruthy();
  expect(screen.getByText('[PLACEHOLDER BODY A]')).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Back to Open When' })).toBeTruthy();
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(screen.queryByRole('button', { name: /Next|Previous/ })).toBeNull();
});
it('ignores an invalid optional image without discarding a letter', () => {
  setup(
    [
      {
        ...content[0],
        image: { src: '//external.example/image', alt: 'Invalid' },
      },
    ],
    '/open-when/a',
  );
  expect(screen.queryByRole('img')).toBeNull();
  expect(screen.getByText('[PLACEHOLDER BODY A]')).toBeTruthy();
});
