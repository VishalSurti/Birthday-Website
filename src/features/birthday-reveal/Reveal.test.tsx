import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import sample from '../../../content/sample/birthday-reveal.json';
import { AppRoutes } from '../../app/router';
import { RevealGate } from './RevealGate';
import { RevealExperience } from './RevealExperience';
import { validateReveal } from './revealContent';
import { createRevealStore } from './revealStorage';
import { revealTiming as timing } from './revealTiming';

let reduced = false;
beforeEach(() => {
  vi.useFakeTimers();
  reduced = false;
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  vi.stubGlobal('matchMedia', () => ({
    matches: reduced,
    addEventListener() {},
    removeEventListener() {},
  }));
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      value() {
        this.setAttribute('open', '');
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
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState(null, '', '/');
});
const tick = async (ms: number) => {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
};
function store(completed = false) {
  const write = vi.fn();
  const value = createRevealStore(() => ({
    getItem: () =>
      completed ? '{"version":1,"birthdayRevealCompleted":true}' : null,
    setItem: write,
  }));
  return { value, write };
}
function app(path: string, completed = false) {
  const state = store(completed);
  window.history.replaceState(null, '', path);
  const view = render(
    <BrowserRouter>
      <AppRoutes revealStore={state.value} />
    </BrowserRouter>,
  );
  return { ...state, ...view };
}
async function start() {
  fireEvent.click(
    screen.getByRole('button', { name: 'Open your birthday surprise' }),
  );
  await tick(reduced ? timing.reduced : timing.entry);
}
async function finalScene() {
  for (let i = 0; i < 3; i++) {
    fireEvent.click(screen.getByRole('button', { name: 'Tap to continue' }));
    await tick(reduced ? timing.reduced : timing.scene);
  }
}
describe('entry and first Reveal', () => {
  it.each([
    '/',
    '/for-you',
    '/open-when',
    '/open-when/letter-01',
    '/our-story',
    '/unknown',
    '/birthday-reveal',
  ])(
    'gates incomplete direct entry %s without mounting normal content',
    (path) => {
      const state = app(path);
      expect(
        screen.getByRole('button', { name: 'Open your birthday surprise' }),
      ).toBeTruthy();
      expect(screen.queryByRole('navigation')).toBeNull();
      expect(screen.queryByRole('button', { name: 'More' })).toBeNull();
      expect(
        screen.queryByRole('button', { name: /Skip|Exit|Close/ }),
      ).toBeNull();
      expect(state.write).not.toHaveBeenCalled();
    },
  );
  it.each([false, true])(
    'finishes only AFTER final entrance + celebration, then Continue reaches Home (reduced=%s)',
    async (reduce) => {
      reduced = reduce;
      const state = app('/our-story');
      await tick(10000);
      expect(
        screen.queryByRole('heading', { name: '[REVEAL LINE 01]' }),
      ).toBeNull();
      const openingImage = screen.getByRole('img');
      expect(openingImage.getAttribute('loading')).toBe('eager');
      expect(openingImage.getAttribute('fetchpriority')).toBe('high');
      expect(openingImage.parentElement?.style.aspectRatio).toBe('400 / 500');
      await start();
      const cue = screen.getByRole('button', { name: 'Tap to continue' });
      expect(document.activeElement).toBe(cue);
      fireEvent.click(cue);
      fireEvent.click(cue);
      fireEvent.click(cue);
      expect(
        screen.getByRole('heading', { name: '[REVEAL LINE 02]' }),
      ).toBeTruthy();
      await tick(reduced ? timing.reduced : timing.scene);
      fireEvent.error(screen.getByRole('img'));
      expect(
        screen.getByRole('img', { name: 'Image unavailable' }),
      ).toBeTruthy();
      fireEvent.click(cue);
      await tick(reduced ? timing.reduced : timing.scene);
      fireEvent.click(cue);
      expect(
        screen.getByRole('heading', { name: 'Happy Birthday' }),
      ).toBeTruthy();
      expect(state.value.isCompleted()).toBe(false);
      await tick(reduced ? timing.reduced : timing.scene);
      expect(document.querySelectorAll('.reveal-celebration')).toHaveLength(1);
      fireEvent.click(screen.getByRole('button', { name: 'Continue to Home' }));
      await tick(timing.celebration - 1);
      expect(state.write).not.toHaveBeenCalled();
      await tick(1);
      expect(state.write).toHaveBeenCalledTimes(1);
      expect(
        screen.getByRole('heading', { name: 'Happy Birthday' }),
      ).toBeTruthy();
      expect(document.querySelector('.reveal-celebration')).toBeNull();
      await tick(5000);
      expect(state.write).toHaveBeenCalledTimes(1);
      fireEvent.click(screen.getByRole('button', { name: 'Continue to Home' }));
      await tick(reduced ? timing.reduced : timing.home);
      expect(window.location.pathname).toBe('/');
      expect(screen.getByRole('heading', { name: 'Home' })).toBeTruthy();
      expect(document.activeElement).toBe(screen.getByRole('main'));
    },
  );
  it('cancels timers on interruption, persists no scene, and restarts through opening', async () => {
    const state = app('/for-you');
    await start();
    await finalScene();
    await tick(1000);
    state.unmount();
    await tick(10000);
    expect(state.write).not.toHaveBeenCalled();
    app('/for-you');
    await start();
    expect(
      screen.getByRole('heading', { name: '[REVEAL LINE 01]' }),
    ).toBeTruthy();
  });
  it('prevents double start and held-key advances', async () => {
    app('/');
    const button = screen.getByRole('button', {
      name: 'Open your birthday surprise',
    });
    fireEvent.click(button);
    fireEvent.click(button);
    await tick(timing.entry);
    const cue = screen.getByRole('button', { name: 'Tap to continue' });
    expect(fireEvent.keyDown(cue, { key: 'Enter', repeat: true })).toBe(false);
    expect(
      screen.getByRole('heading', { name: '[REVEAL LINE 01]' }),
    ).toBeTruthy();
  });
});
describe('returning entry and replay', () => {
  it('does not authorize a replay from its URL or stale history state', () => {
    app('/birthday-reveal', true);
    expect(screen.getByRole('heading', { name: 'Home' })).toBeTruthy();
  });
  it.each(['/for-you', '/our-story', '/open-when', '/'])(
    'More replay is deliberate and exits to %s without clearing completion',
    async (path) => {
      const state = app(path, true);
      fireEvent.click(screen.getByRole('button', { name: 'More' }));
      expect(screen.getByRole('dialog', { name: 'More' })).toBeTruthy();
      expect(
        screen.getByRole('button', { name: 'Install / Add to Home Screen' }),
      ).toBeTruthy();
      fireEvent.click(
        screen.getByRole('button', { name: 'Replay Birthday Surprise' }),
      );
      expect(
        screen.getByRole('heading', { name: '[REVEAL LINE 01]' }),
      ).toBeTruthy();
      expect(
        screen.queryByRole('button', { name: 'Open your birthday surprise' }),
      ).toBeNull();
      fireEvent.click(screen.getByRole('button', { name: 'Exit' }));
      await tick(50);
      expect(window.location.pathname).toBe(path);
      expect(screen.getByRole('button', { name: 'More' })).toBeTruthy();
      expect(state.value.isCompleted()).toBe(true);
      expect(state.write).not.toHaveBeenCalled();
    },
  );
  it('finished replay reaches Home and never rewrites completion', async () => {
    const state = app('/our-story', true);
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Replay Birthday Surprise' }),
    );
    await finalScene();
    await tick(timing.celebration);
    fireEvent.click(screen.getByRole('button', { name: 'Continue to Home' }));
    await tick(timing.home);
    expect(window.location.pathname).toBe('/');
    expect(state.write).not.toHaveBeenCalled();
  });
});
it('unusable content offers recovery without falsely completing or bypassing first use', () => {
  const state = store();
  render(
    <BrowserRouter>
      <RevealGate store={state.value} content={[]}>
        <p>Hidden app</p>
      </RevealGate>
    </BrowserRouter>,
  );
  expect(
    screen.getByRole('heading', { name: 'Birthday surprise unavailable' }),
  ).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Try again' })).toBeTruthy();
  expect(screen.queryByText('Hidden app')).toBeNull();
  expect(state.write).not.toHaveBeenCalled();
});
it('failed storage still allows current-runtime Home arrival', async () => {
  const state = createRevealStore(() => {
    throw new Error('denied');
  });
  const home = vi.fn();
  render(
    <RevealExperience
      scenes={validateReveal(sample)}
      store={state}
      onHome={home}
    />,
  );
  await start();
  await finalScene();
  await tick(timing.celebration);
  fireEvent.click(screen.getByRole('button', { name: 'Continue to Home' }));
  await tick(timing.home);
  expect(state.isCompleted()).toBe(true);
  expect(home).toHaveBeenCalledOnce();
});
