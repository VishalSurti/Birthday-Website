import { NavLink } from 'react-router';
import { routes } from '../../app/routes';
import './BottomNavigation.css';

const destinations = [
  {
    to: routes.home,
    label: 'Home',
    path: 'M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9',
  },
  {
    to: routes.forYou,
    label: 'For You',
    path: 'M5 3h14v14l-4 4H5V3Zm10 18v-4h4M8 8h8M8 12h6',
  },
  {
    to: routes.openWhen,
    label: 'Open When',
    path: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  },
  {
    to: routes.ourStory,
    label: 'Our Story',
    path: 'M12 5v16M12 5C9 3 6 3 3 4v15c3-1 6-1 9 2 3-3 6-3 9-2V4c-3-1-6-1-9 1Z',
  },
] as const;

export function BottomNavigation() {
  return (
    <nav className="bottom-navigation" aria-label="Primary">
      <ul className="bottom-navigation__items">
        {destinations.map(({ to, label, path }) => (
          <li key={to}>
            <NavLink to={to} end className="bottom-navigation__link">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d={path} />
              </svg>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
