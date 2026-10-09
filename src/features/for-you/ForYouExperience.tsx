import { useState, useSyncExternalStore } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { PageHeader } from '../../components/layout/PageHeader';
import { routes } from '../../app/routes';
import { ClosedMessage } from './ClosedMessage';
import { MessageReader } from './MessageReader';
import type { ForYouStore } from './forYouStorage';
import './for-you.css';

type ReaderState = {
  messageId: string;
  closed: boolean;
  origin: 'featured' | 'all';
};
function readReaderState(state: unknown): ReaderState | undefined {
  if (!state || typeof state !== 'object' || !('forYouReader' in state)) return;
  const reader = state.forYouReader;
  if (!reader || typeof reader !== 'object') return;
  if (
    'messageId' in reader &&
    typeof reader.messageId === 'string' &&
    'closed' in reader &&
    typeof reader.closed === 'boolean' &&
    'origin' in reader &&
    (reader.origin === 'featured' || reader.origin === 'all')
  )
    return reader as ReaderState;
}

export function ForYouExperience({ store }: { store: ForYouStore }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reader = readReaderState(state);
  const [view, setView] = useState<'featured' | 'all'>(
    reader?.origin ?? 'featured',
  );
  const { featuredId, seenIds } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
  );
  const featured = store.messages.find(({ id }) => id === featuredId);
  const [lastDisplayedId, setLastDisplayedId] = useState(featuredId);
  const message = store.messages.find(({ id }) => id === reader?.messageId);

  function open(messageId: string, closed = false) {
    setLastDisplayedId(messageId);
    void navigate(routes.forYou, {
      state: {
        forYouReader: { messageId, closed, origin: view } satisfies ReaderState,
      },
    });
  }

  return (
    <>
      <PageHeader title="For You" />
      {!featured ? (
        <section aria-label="Messages unavailable">
          <h2 className="for-you-heading">Something isn’t ready here yet.</h2>
          <p>Please try again later.</p>
          <Link className="recovery-link" to={routes.home}>
            Back to Home
          </Link>
        </section>
      ) : (
        <>
          <div className="for-you-tabs" role="group" aria-label="Message views">
            <button
              type="button"
              aria-pressed={view === 'featured'}
              onClick={() => setView('featured')}
            >
              Featured
            </button>
            <button
              type="button"
              aria-pressed={view === 'all'}
              onClick={() => setView('all')}
            >
              All messages
            </button>
          </div>
          {view === 'featured' ? (
            <section aria-label="Featured message" className="for-you-featured">
              <ClosedMessage
                message={featured}
                read={seenIds.includes(featured.id)}
                onOpen={() => open(featured.id)}
              />
              {seenIds.includes(featured.id) && (
                <button
                  type="button"
                  className="for-you-secondary"
                  onClick={() => {
                    const next = store.discover(lastDisplayedId);
                    if (next) open(next.id, true);
                  }}
                >
                  Discover another
                </button>
              )}
            </section>
          ) : (
            <section aria-label="All messages">
              <ul className="for-you-collection">
                {store.messages.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="for-you-row"
                      onClick={() => open(item.id)}
                    >
                      <span className="for-you-row__text">
                        <span className="for-you-row__title">
                          {item.title ?? `Message ${index + 1}`}
                        </span>{' '}
                        <span className="for-you-detail">
                          {seenIds.includes(item.id)
                            ? 'Opened before'
                            : 'Not opened yet'}
                        </span>
                      </span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
      {message && reader && (
        <MessageReader
          key={message.id}
          message={message}
          closed={reader.closed}
          onOpen={() => {
            void navigate(routes.forYou, {
              replace: true,
              state: { forYouReader: { ...reader, closed: false } },
            });
          }}
          onClose={() => {
            void navigate(-1);
          }}
          onSeen={store.markSeen}
        />
      )}
    </>
  );
}
