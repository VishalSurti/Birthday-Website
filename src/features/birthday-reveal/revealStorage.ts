export const revealKey = 'birthday.reveal.v1';
type StorageAccess = () => Pick<Storage, 'getItem' | 'setItem'>;

export function createRevealStore(
  access: StorageAccess = () => window.localStorage,
) {
  let completed = false;
  try {
    const data: unknown = JSON.parse(access().getItem(revealKey) ?? 'null');
    completed = !!(
      data &&
      typeof data === 'object' &&
      'version' in data &&
      data.version === 1 &&
      'birthdayRevealCompleted' in data &&
      data.birthdayRevealCompleted === true
    );
  } catch {
    /* Safe first-use defaults. */
  }
  return {
    isCompleted: () => completed,
    finish: () => {
      if (completed) return;
      completed = true;
      try {
        access().setItem(
          revealKey,
          JSON.stringify({ version: 1, birthdayRevealCompleted: true }),
        );
      } catch {
        /* Completion remains usable in this runtime. */
      }
    },
  };
}
export type RevealStore = ReturnType<typeof createRevealStore>;
