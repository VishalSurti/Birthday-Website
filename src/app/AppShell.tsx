import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { BottomNavigation } from '../components/navigation/BottomNavigation';
import { RootLayout } from './RootLayout';
import { routes } from './routes';
import './AppShell.css';

export function AppShell() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef<string | undefined>(undefined);
  const positions = useRef(new Map<string, number>());
  useLayoutEffect(() => {
    // Same-path readers, viewers and More retain their existing restoration rules.
    // On a POP remount, the browser or focused reader owns restoration.
    // Fresh documents already begin at the top; PUSH/REPLACE entries reset below.
    if (
      previousPath.current !== pathname &&
      (previousPath.current !== undefined || navigationType !== 'POP')
    ) {
      window.scrollTo({
        top: positions.current.get(pathname) ?? 0,
        behavior: 'instant',
      });
    }
    previousPath.current = pathname;
    const remember = () => positions.current.set(pathname, window.scrollY);
    window.addEventListener('scroll', remember, { passive: true });
    return () => window.removeEventListener('scroll', remember);
  }, [pathname, navigationType]);
  const width =
    pathname === routes.ourStory
      ? 'story'
      : pathname === routes.home
        ? 'home'
        : 'reader';

  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        Skip to content
      </a>
      <RootLayout width={width} className="app-shell__content" />
      <BottomNavigation />
    </div>
  );
}
