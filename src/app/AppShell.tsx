import { useLocation } from 'react-router';
import { BottomNavigation } from '../components/navigation/BottomNavigation';
import { RootLayout } from './RootLayout';
import { routes } from './routes';
import './AppShell.css';

export function AppShell() {
  const { pathname } = useLocation();
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
