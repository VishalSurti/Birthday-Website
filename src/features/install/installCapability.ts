export type InstallPrompt = Event & {
  prompt: () => Promise<unknown>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

// Capability is captured independently of route eligibility, and never persisted.
export function createInstallCapability(target: Window = window) {
  const media = target.matchMedia?.('(display-mode: standalone)');
  let installed =
    !!media?.matches ||
    (target.navigator as Navigator & { standalone?: boolean }).standalone ===
      true;
  let deferred: InstallPrompt | undefined;
  let pending = false;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());
  const capture = (event: Event) => {
    event.preventDefault();
    if (!installed) deferred = event as InstallPrompt;
  };
  const onInstalled = () => {
    installed = true;
    deferred = undefined;
    notify();
  };
  const onDisplayChange = () => {
    if (
      media?.matches ||
      (target.navigator as Navigator & { standalone?: boolean }).standalone ===
        true
    )
      onInstalled();
  };
  target.addEventListener('beforeinstallprompt', capture);
  target.addEventListener('appinstalled', onInstalled);
  media?.addEventListener?.('change', onDisplayChange);
  return {
    isInstalled: () => installed,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    request: async () => {
      if (installed || pending) return;
      if (!deferred) return 'manual' as const;
      const event = deferred;
      deferred = undefined;
      pending = true;
      try {
        // Called synchronously from the explicit button action, before any await.
        await event.prompt();
        const { outcome } = await event.userChoice;
        if (outcome === 'accepted') onInstalled();
        return outcome;
      } catch {
        return 'manual' as const;
      } finally {
        pending = false;
      }
    },
    dispose: () => {
      target.removeEventListener('beforeinstallprompt', capture);
      target.removeEventListener('appinstalled', onInstalled);
      media?.removeEventListener?.('change', onDisplayChange);
    },
  };
}

let capability: ReturnType<typeof createInstallCapability> | undefined;
export function getInstallCapability() {
  capability ??= createInstallCapability();
  return capability;
}
