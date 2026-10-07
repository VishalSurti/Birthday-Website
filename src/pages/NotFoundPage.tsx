import { Link } from 'react-router';
import { routes } from '../app/routes';

export function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>This page is not available.</p>
      <Link className="recovery-link" to={routes.home}>
        Return to Home
      </Link>
    </>
  );
}
