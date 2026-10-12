import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { PageHeader } from '../../components/layout/PageHeader';
import { routes } from '../../app/routes';
import type { OpenWhenStore } from './openWhenStorage';
import './open-when.css';

export function OpenWhenCollection({ store }: { store: OpenWhenStore }) {
  const openedIds = useSyncExternalStore(store.subscribe, store.getSnapshot);
  const location = useLocation();
  const navigate = useNavigate();
  const [openingId, setOpeningId] = useState<string>();
  const timer = useRef<number | undefined>(undefined);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useLayoutEffect(() => {
    const context = store.returnContext;
    if (context?.key !== location.key) return;
    const card = [...(list.current?.querySelectorAll('a') ?? [])].find(
      (link) => link.dataset.letterId === context.letterId,
    );
    card?.focus({ preventScroll: true });
    window.scrollTo({ top: context.scrollY, behavior: 'instant' });
  }, [store, location.key]);

  return (
    <>
      <PageHeader title="Open When" />
      {store.letters.length === 0 ? (
        <section aria-label="Letters unavailable">
          <h2>Something isn’t ready here yet.</h2>
          <p>Please try again later.</p>
          <Link className="recovery-link" to={routes.home}>
            Back to Home
          </Link>
        </section>
      ) : (
        <ul ref={list} className="letter-collection">
          {store.letters.map((letter) => {
            const opened = openedIds.includes(letter.id);
            const destination = `${routes.openWhen}/${encodeURIComponent(letter.id)}`;
            return (
              <li key={letter.id}>
                <Link
                  to={destination}
                  data-letter-id={letter.id}
                  className={`letter-card${opened ? ' letter-card--opened' : ''}${openingId === letter.id ? ' letter-card--opening' : ''}`}
                  onClick={(event) => {
                    if (
                      event.button !== 0 ||
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey
                    )
                      return;
                    event.preventDefault();
                    if (timer.current !== undefined) return;
                    const arrive = () => {
                      store.returnContext = {
                        key: location.key,
                        letterId: letter.id,
                        scrollY: window.scrollY,
                      };
                      void navigate(destination, {
                        state: { openWhenFrom: location.key },
                      });
                    };
                    if (
                      window.matchMedia('(prefers-reduced-motion: reduce)')
                        .matches
                    ) {
                      arrive();
                      return;
                    }
                    setOpeningId(letter.id);
                    const token = opened
                      ? '--motion-standard'
                      : '--motion-transitional';
                    const duration =
                      parseFloat(
                        getComputedStyle(event.currentTarget).getPropertyValue(
                          token,
                        ),
                      ) || (opened ? 220 : 320);
                    // Routing never depends on animation events; unmount cancels pending selection.
                    timer.current = window.setTimeout(arrive, duration);
                  }}
                >
                  <span className="letter-label">Open when</span>
                  <span className="letter-card__title">
                    {letter.title}
                  </span>{' '}
                  <span className="letter-state">
                    {opened ? 'Opened before' : 'Unopened'}
                  </span>
                  <span className="letter-seam" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
