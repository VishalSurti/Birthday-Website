import { createContext } from 'react';
export const ReplayContext = createContext<(() => void) | null>(null);
