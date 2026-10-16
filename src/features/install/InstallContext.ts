import { createContext, useContext } from 'react';

export const InstallContext = createContext<{
  visible: boolean;
  available: boolean;
  dismiss: () => void;
  request: () => Promise<boolean>;
} | null>(null);
export const useInstall = () => useContext(InstallContext);
