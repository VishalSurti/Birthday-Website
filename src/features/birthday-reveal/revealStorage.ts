import {
  localStorageAccess,
  readVersioned,
  writeStorage,
  type StorageAccess,
} from '../../lib/persistence';

export const revealKey = 'birthday.reveal.v1';

export function createRevealStore(access: StorageAccess = localStorageAccess) {
  const data = readVersioned(access, revealKey, 1);
  let completed = data.birthdayRevealCompleted === true;
  return {
    isCompleted: () => completed,
    finish: () => {
      if (completed) return;
      completed = true;
      writeStorage(access, revealKey, {
        version: 1,
        birthdayRevealCompleted: true,
      });
    },
  };
}
export type RevealStore = ReturnType<typeof createRevealStore>;
