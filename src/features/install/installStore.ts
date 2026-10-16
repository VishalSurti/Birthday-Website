import {
  localStorageAccess,
  readVersioned,
  writeStorage,
  type StorageAccess,
} from '../../lib/persistence';

export const installKey = 'birthday.install.v1';

export function createInstallStore(access: StorageAccess = localStorageAccess) {
  let dismissed =
    readVersioned(access, installKey, 1).installPromptDismissed === true;
  let homeSeen = false;
  let sectionSeen = false;
  let shown = false;
  let visible = false;
  const listeners = new Set<() => void>();
  const show = (next: boolean) => {
    if (visible === next) return;
    visible = next;
    listeners.forEach((listener) => listener());
  };
  return {
    getSnapshot: () => visible,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    // Called only for actual routes exposed by the completed Reveal gate.
    // These three eligibility flags are runtime-only, never visit history.
    visit: (home: boolean, section: boolean, canOffer: boolean) => {
      if (homeSeen && section) sectionSeen = true;
      if (home) homeSeen = true;
      if (home && sectionSeen && !shown && !dismissed && canOffer) {
        shown = true;
        show(true);
      } else if (!home || dismissed || !canOffer) show(false);
    },
    dismiss: () => {
      if (!dismissed) {
        dismissed = true;
        writeStorage(access, installKey, {
          version: 1,
          installPromptDismissed: true,
        });
      }
      show(false);
    },
  };
}
