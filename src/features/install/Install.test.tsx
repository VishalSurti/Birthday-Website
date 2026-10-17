import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { AppRoutes } from '../../app/router';
import { createRevealStore } from '../birthday-reveal/revealStorage';
import { createInstallCapability } from './installCapability';
import { installKey } from './installStore';

let capability: ReturnType<typeof createInstallCapability>;
let media: EventTarget & { matches: boolean };
vi.mock('./installCapability', async (original) => ({
  ...(await original<typeof import('./installCapability')>()),
  getInstallCapability: () => capability,
}));
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState(null, '', '/');
  media = Object.assign(new EventTarget(), { matches: false });
  vi.stubGlobal('matchMedia', () => media);
  capability = createInstallCapability();
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      value() {
        this.setAttribute('open', '');
        this.querySelector('button')?.focus();
      },
    },
    close: {
      configurable: true,
      value() {
        this.removeAttribute('open');
      },
    },
  });
});
afterEach(() => {
  capability.dispose();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
function Driver() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate('/open-when/letter-01')}>
        Valid reader
      </button>
      <button onClick={() => navigate('/open-when/missing')}>
        Invalid reader
      </button>
      <button onClick={() => navigate('/')}>Go Home</button>
    </>
  );
}
function app(path = '/', complete = true, driver = false) {
  window.history.replaceState(null, '', path);
  const reveal = createRevealStore(() => ({
    getItem: () =>
      complete ? ' {"version":1,"birthdayRevealCompleted":true}' : null,
    setItem: vi.fn(),
  }));
  return render(
    <BrowserRouter>
      <AppRoutes revealStore={reveal} />
      {driver && <Driver />}
    </BrowserRouter>,
  );
}
function navigate(path: string) {
  fireEvent.click(document.querySelector(`nav a[href="${path}"]`)!);
}
function eligible() {
  navigate('/for-you');
  navigate('/');
  expect(screen.getByRole('heading', { name: 'Keep this close' })).toBeTruthy();
}
function prompt(outcome: 'accepted' | 'dismissed') {
  const event = Object.assign(
    new Event('beforeinstallprompt', { cancelable: true }),
    {
      prompt: vi.fn(async () => {}),
      userChoice: Promise.resolve({ outcome }),
    },
  );
  window.dispatchEvent(event);
  return event;
}
const tick = async (ms: number) => {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
};
it('captures during intercepted first use but shows no install UI until real Home -> section -> Home', async () => {
  vi.useFakeTimers();
  const event = prompt('accepted');
  app('/our-story', false);
  expect(event.defaultPrevented).toBe(true);
  expect(screen.queryByText('Keep this close')).toBeNull();
  expect(screen.queryByRole('button', { name: 'Install' })).toBeNull();
  fireEvent.click(
    screen.getByRole('button', { name: 'Open your birthday surprise' }),
  );
  await tick(500);
  expect(screen.queryByRole('button', { name: 'Install' })).toBeNull();
  for (let i = 0; i < 3; i++) {
    fireEvent.click(screen.getByRole('button', { name: 'Tap to continue' }));
    await tick(400);
  }
  await tick(1500);
  fireEvent.click(screen.getByRole('button', { name: 'Continue to Home' }));
  await tick(700);
  expect(screen.getByRole('heading', { name: 'Home' })).toBeTruthy();
  expect(screen.queryByText('Keep this close')).toBeNull();
  navigate('/our-story');
  navigate('/');
  expect(screen.getByText('Keep this close')).toBeTruthy();
  expect(event.prompt).not.toHaveBeenCalled();
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: 'Install' })),
  );
  expect(event.prompt).toHaveBeenCalledTimes(1);
  expect(screen.queryByText('Keep this close')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'More' }));
  expect(
    screen.queryByRole('button', { name: 'Install / Add to Home Screen' }),
  ).toBeNull();
  expect(
    screen.getByRole('button', { name: 'Replay Birthday Surprise' }),
  ).toBeTruthy();
});
it('does not steal focus, and does not reshow an ignored suggestion during the runtime', () => {
  app();
  navigate('/for-you');
  const home = document.querySelector<HTMLAnchorElement>('nav a[href="/"]')!;
  home.focus();
  fireEvent.click(home);
  expect(document.activeElement).toBe(home);
  expect(screen.getByText('Keep this close')).toBeTruthy();
  navigate('/our-story');
  navigate('/');
  expect(screen.queryByText('Keep this close')).toBeNull();
  expect(localStorage.getItem(installKey)).toBeNull();
});
it.each(['Valid reader', 'Invalid reader'])(
  'only a genuinely valid nested reader counts: %s',
  (name) => {
    app('/', true, true);
    fireEvent.click(screen.getByRole('button', { name }));
    fireEvent.click(screen.getByRole('button', { name: 'Go Home' }));
    expect(!!screen.queryByText('Keep this close')).toBe(
      name === 'Valid reader',
    );
  },
);
it('does not count a completed deep-link section before the first Home', () => {
  app('/our-story');
  navigate('/');
  expect(screen.queryByText('Keep this close')).toBeNull();
  eligible();
});
it('persists Not now, suppresses future promotion, but retains More/manual install access', async () => {
  const view = app();
  eligible();
  fireEvent.click(screen.getByRole('button', { name: 'Not now' }));
  expect(JSON.parse(localStorage.getItem(installKey)!)).toEqual({
    version: 1,
    installPromptDismissed: true,
  });
  view.unmount();
  app();
  navigate('/our-story');
  navigate('/');
  expect(screen.queryByText('Keep this close')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'More' }));
  const installAction = screen.getByRole('button', {
    name: 'Install / Add to Home Screen',
  });
  installAction.focus(); // Keyboard activation removes this focused action.
  await act(async () => fireEvent.click(installAction));
  expect(
    screen.getByRole('heading', { name: 'Add to Home Screen' }),
  ).toBeTruthy();
  expect(document.activeElement).toBe(
    screen.getByRole('button', { name: /Close/ }),
  );
  expect(screen.getAllByRole('dialog')).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: /Close/ }));
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  await waitFor(() =>
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'More' }),
    ),
  );
});
it('opens concise iOS guidance from the card only on action and restores its trigger focus', async () => {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('iPhone');
  app();
  eligible();
  const install = screen.getByRole('button', { name: 'Install' });
  await act(async () => fireEvent.click(install));
  expect(
    screen.getByText(
      'Open the browser Share menu, then choose Add to Home Screen.',
    ),
  ).toBeTruthy();
  expect(localStorage.getItem(installKey)).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /Close/ }));
  expect(document.activeElement).toBe(install);
});
it('records native dismissal, consumes the prompt once and leaves More available', async () => {
  const event = prompt('dismissed');
  app();
  eligible();
  await act(async () =>
    fireEvent.click(screen.getByRole('button', { name: 'Install' })),
  );
  expect(event.prompt).toHaveBeenCalledTimes(1);
  expect(JSON.parse(localStorage.getItem(installKey)!)).toEqual({
    version: 1,
    installPromptDismissed: true,
  });
  fireEvent.click(screen.getByRole('button', { name: 'More' }));
  expect(
    screen.getByRole('button', { name: 'Install / Add to Home Screen' }),
  ).toBeTruthy();
});
it.each(['standalone', 'appinstalled'])(
  'hides install actions but retains replay in %s state',
  (mode) => {
    if (mode === 'standalone') {
      media.matches = true;
      media.dispatchEvent(new Event('change'));
    }
    app();
    if (mode === 'appinstalled')
      act(() => window.dispatchEvent(new Event('appinstalled')));
    navigate('/our-story');
    navigate('/');
    expect(screen.queryByText('Keep this close')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    expect(
      screen.queryByRole('button', { name: 'Install / Add to Home Screen' }),
    ).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Replay Birthday Surprise' }),
    ).toBeTruthy();
  },
);
it('does not count replay as engagement or reset the show-once lifetime across replay', async () => {
  app();
  async function replay() {
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Replay Birthday Surprise' }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Exit' }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Home' })).toBeTruthy(),
    );
  }
  await replay();
  expect(screen.queryByText('Keep this close')).toBeNull();
  eligible();
  await replay();
  expect(screen.queryByText('Keep this close')).toBeNull();
});
it('keeps dismissal effective for the runtime if storage writes fail', () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw Error('quota');
  });
  app();
  eligible();
  fireEvent.click(screen.getByRole('button', { name: 'Not now' }));
  navigate('/our-story');
  navigate('/');
  expect(screen.queryByText('Keep this close')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'More' }));
  expect(
    screen.getByRole('button', { name: 'Install / Add to Home Screen' }),
  ).toBeTruthy();
});

it('replaces open More guidance with Replay when installation completes', async () => {
  app();
  fireEvent.click(screen.getByRole('button', { name: 'More' }));
  await act(async () =>
    fireEvent.click(
      screen.getByRole('button', { name: 'Install / Add to Home Screen' }),
    ),
  );
  expect(
    screen.getByRole('heading', { name: 'Add to Home Screen' }),
  ).toBeTruthy();
  act(() => window.dispatchEvent(new Event('appinstalled')));
  expect(
    screen.queryByRole('heading', { name: 'Add to Home Screen' }),
  ).toBeNull();
  expect(
    screen.getByRole('button', { name: 'Replay Birthday Surprise' }),
  ).toBeTruthy();
  expect(
    screen.queryByRole('button', { name: 'Install / Add to Home Screen' }),
  ).toBeNull();
});
