import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import {
  createInstallCapability,
  type InstallPrompt,
} from './installCapability';

let capability: ReturnType<typeof createInstallCapability>;
let media: EventTarget & { matches: boolean };
beforeEach(() => {
  media = Object.assign(new EventTarget(), { matches: false });
  vi.stubGlobal('matchMedia', () => media);
  capability = createInstallCapability();
});
afterEach(() => {
  capability.dispose();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function capture(outcome: 'accepted' | 'dismissed') {
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
it('captures early, prevents default, never prompts automatically, and consumes an event once', async () => {
  const event = capture('accepted');
  expect(event.defaultPrevented).toBe(true);
  expect(event.prompt).not.toHaveBeenCalled();
  const first = capability.request();
  const second = capability.request();
  expect(await first).toBe('accepted');
  expect(await second).toBeUndefined();
  expect(event.prompt).toHaveBeenCalledTimes(1);
  expect(capability.isInstalled()).toBe(true);
});
it('returns native dismissal, then falls back to manual help without reusing the event', async () => {
  const event = capture('dismissed');
  expect(await capability.request()).toBe('dismissed');
  expect(await capability.request()).toBe('manual');
  expect(event.prompt).toHaveBeenCalledTimes(1);
});
it('falls back quietly if the platform prompt fails', async () => {
  const event = capture('dismissed') as InstallPrompt;
  event.prompt = async () => {
    throw Error('unavailable');
  };
  expect(await capability.request()).toBe('manual');
});
it('responds to appinstalled and clears a deferred event without persisting installed state', async () => {
  const write = vi.spyOn(Storage.prototype, 'setItem');
  const event = capture('accepted');
  window.dispatchEvent(new Event('appinstalled'));
  expect(capability.isInstalled()).toBe(true);
  expect(await capability.request()).toBeUndefined();
  expect(event.prompt).not.toHaveBeenCalled();
  expect(write).not.toHaveBeenCalled();
});
it('uses standalone display mode and iOS standalone as platform sources', () => {
  media.matches = true;
  media.dispatchEvent(new Event('change'));
  expect(capability.isInstalled()).toBe(true);
  capability.dispose();
  media.matches = false;
  Object.defineProperty(navigator, 'standalone', {
    configurable: true,
    value: true,
  });
  capability = createInstallCapability();
  expect(capability.isInstalled()).toBe(true);
  Reflect.deleteProperty(navigator, 'standalone');
});
it('removes capture listeners when disposed', () => {
  capability.dispose();
  const event = capture('accepted');
  expect(event.defaultPrevented).toBe(false);
});
