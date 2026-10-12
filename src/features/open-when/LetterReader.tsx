import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { routes } from '../../app/routes';
import type { OpenWhenStore } from './openWhenStorage';
import './open-when.css';

export function LetterReader({ store }: { store: OpenWhenStore }) {
  const { letterId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const back = useRef<HTMLAnchorElement>(null);
  const letter = store.letters.find((item) => item.id === letterId);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    back.current?.focus({ preventScroll: true });
  }, [letterId]);
  useEffect(() => {
    // A committed valid reading page, including direct entry, is the opening boundary.
    if (letter) store.markOpened(letter.id);
  }, [letter, store]);

  return (
    <div className="letter-reader">
      <Link
        ref={back}
        className="letter-back"
        to={routes.openWhen}
        replace
        onClick={(event) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const origin: unknown = state;
          if (
            store.returnContext &&
            origin &&
            typeof origin === 'object' &&
            'openWhenFrom' in origin &&
            origin.openWhenFrom === store.returnContext.key
          ) {
            event.preventDefault();
            void navigate(-1);
          }
        }}
      >
        <span aria-hidden="true">← </span>Back to Open When
      </Link>
      {letter ? (
        <article>
          <p className="letter-label">Open when</p>
          <h1>{letter.title}</h1>
          <div
            className={`letter-body${letter.body.length > 1200 ? ' letter-body--long' : ''}`}
          >
            {letter.body.split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      ) : (
        <section aria-label="Letter unavailable">
          <h1>This letter isn’t available.</h1>
          <p>Return to Open When to choose a letter.</p>
        </section>
      )}
    </div>
  );
}
