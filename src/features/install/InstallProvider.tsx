import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router';
import { getOpenWhenStore } from '../open-when/openWhenStore';
import { InstallContext } from './InstallContext';
import { getInstallCapability } from './installCapability';
import { createInstallStore } from './installStore';

export function InstallProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createInstallStore);
  const [capability] = useState(getInstallCapability);
  const visible = useSyncExternalStore(store.subscribe, store.getSnapshot);
  const installed = useSyncExternalStore(
    capability.subscribe,
    capability.isInstalled,
  );
  const { pathname } = useLocation();
  useEffect(() => {
    const section =
      ['/for-you', '/open-when', '/our-story'].includes(pathname) ||
      (pathname.startsWith('/open-when/') &&
        getOpenWhenStore().letters.some(
          ({ id }) => pathname === `/open-when/${encodeURIComponent(id)}`,
        ));
    store.visit(pathname === '/', section, !installed);
  }, [pathname, installed, store]);
  return (
    <InstallContext
      value={{
        visible: visible && !installed,
        available: !installed,
        dismiss: store.dismiss,
        request: async () => {
          const result = await capability.request();
          if (result === 'dismissed') store.dismiss();
          return result === 'manual';
        },
      }}
    >
      {children}
    </InstallContext>
  );
}
