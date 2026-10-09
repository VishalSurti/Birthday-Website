import { Link, useParams } from 'react-router';

import { routes } from '../app/routes';

export function LetterPage() {
  const { letterId } = useParams();
  return (
    <>
      <Link className="recovery-link" to={routes.openWhen}>
        Back to Open When
      </Link>
      <h1>Open When letter</h1>
      <p>[PLACEHOLDER LETTER]</p>
      <p>
        Route reference: <code>{letterId}</code>
      </p>
    </>
  );
}
