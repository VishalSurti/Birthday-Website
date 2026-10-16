import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import sample from '../../../content/sample/birthday-reveal.json';
import { createRevealStore, type RevealStore } from './revealStorage';
import { validateReveal } from './revealContent';
import { RevealExperience } from './RevealExperience';
import { ReplayContext } from './replayContext';
import './birthday-reveal.css';

const replayPath = '/birthday-reveal';
const topLevel = ['/', '/for-you', '/open-when', '/our-story'];
export function RevealGate({
  children,
  store: supplied,
  content = sample,
}: {
  children: ReactNode;
  store?: RevealStore;
  content?: unknown;
}) {
  const [store] = useState(() => supplied ?? createRevealStore());
  const [grant, setGrant] = useState<{
    origin: string;
    token: string;
    sourceKey: string;
  } | null>(null);
  const arrival = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [firstKey, setFirstKey] = useState<string | null>(() =>
    store.isCompleted() ? null : location.key,
  );
  if (!store.isCompleted() && firstKey !== location.key)
    setFirstKey(location.key);
  // Permission exists only in this runtime and is consumed by leaving the route.
  if (
    grant &&
    location.pathname !== replayPath &&
    location.key !== grant.sourceKey
  )
    setGrant(null);
  useLayoutEffect(() => {
    if (arrival.current) {
      arrival.current = false;
      document.getElementById('main-content')?.focus();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.key]);
  const home = () => {
    arrival.current = true;
    if (grant?.origin === '/') navigate(-1);
    else navigate('/', { replace: true });
  };
  const replay = () => {
    const token = crypto.randomUUID();
    setGrant({ origin: location.pathname, token, sourceKey: location.key });
    navigate(replayPath, { replace: true, state: { revealToken: token } });
  };
  if (!store.isCompleted() || firstKey === location.key)
    return (
      <RevealExperience
        key={location.key}
        scenes={validateReveal(content)}
        store={store}
        onHome={home}
      />
    );
  return (
    <>
      {location.pathname === replayPath ? (
        grant && location.state?.revealToken === grant.token ? (
          <RevealExperience
            scenes={validateReveal(content)}
            store={store}
            onHome={home}
            onExit={() => {
              // Replay replaced the More entry; Back restores the existing origin.
              arrival.current = true;
              navigate(-1);
            }}
          />
        ) : (
          <Navigate to="/" replace />
        )
      ) : (
        <ReplayContext
          value={topLevel.includes(location.pathname) ? replay : null}
        >
          {children}
        </ReplayContext>
      )}
    </>
  );
}
