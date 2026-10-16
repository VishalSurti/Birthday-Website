export type StorageAccess = () => Pick<Storage, 'getItem' | 'setItem'>;

// Resolve browser properties lazily, inside the guarded read/write operations.
export const localStorageAccess: StorageAccess = () => window.localStorage;
export const sessionStorageAccess: StorageAccess = () => window.sessionStorage;

export function readVersioned(
  access: StorageAccess,
  key: string,
  version: number,
): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(access().getItem(key) ?? 'null');
    return value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      'version' in value &&
      value.version === version
      ? (value as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

export function writeStorage(
  access: StorageAccess,
  key: string,
  value: Record<string, unknown>,
) {
  try {
    access().setItem(key, JSON.stringify(value));
  } catch {
    // A failed write never rolls back the feature's in-memory state.
  }
}
