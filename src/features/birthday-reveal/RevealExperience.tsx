import { revealTiming } from './revealTiming';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { RevealImage } from './RevealImage';
import type { RevealScene } from './revealContent';
import type { RevealStore } from './revealStorage';

// Timers express successful visual phases, never CSS animation-event delivery.
const reducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export function RevealExperience({
  scenes,
  store,
  onHome,
  onExit,
}: {
  scenes: RevealScene[];
  store: RevealStore;
  onHome: () => void;
  onExit?: () => void;
}) {
  const [started, setStarted] = useState(!!onExit);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<
    'ready' | 'entering' | 'changing' | 'leaving'
  >('ready');
  const [finished, setFinished] = useState(false);
  const lock = useRef(false);
  const main = useRef<HTMLElement>(null);
  const advance = useRef<HTMLButtonElement>(null);
  const scene = scenes[index];
  const final = scene?.type === 'final';
  const reduced = reducedMotion();

  useEffect(() => {
    main.current?.focus();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  useEffect(() => {
    if (phase === 'ready') return;
    const duration = reduced
      ? revealTiming.reduced
      : phase === 'entering'
        ? revealTiming.entry
        : phase === 'changing'
          ? revealTiming.scene
          : revealTiming.home;
    const timer = window.setTimeout(() => {
      if (phase === 'leaving') {
        onHome();
        return;
      }
      if (phase === 'entering') setStarted(true);
      setPhase('ready');
      lock.current = false;
      if (phase === 'entering') advance.current?.focus();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [phase, reduced, onHome]);
  useEffect(() => {
    if (!started || !final || phase !== 'ready' || finished) return;
    // Final entrance must finish FIRST. Celebration then has its own complete interval.
    // Reduced motion keeps this same interval with static/fading accents.
    const timer = window.setTimeout(() => {
      store.finish();
      setFinished(true);
    }, revealTiming.celebration);
    return () => window.clearTimeout(timer);
  }, [started, final, phase, finished, store]);
  useEffect(() => {
    if (started) advance.current?.focus({ preventScroll: true });
  }, [started]);

  function progress() {
    if (lock.current || phase !== 'ready' || (final && !finished)) return;
    lock.current = true;
    if (final) setPhase('leaving');
    else {
      setIndex(index + 1);
      setPhase('changing');
    }
  }
  if (!scene)
    return (
      <main ref={main} tabIndex={-1} className="reveal-opening">
        <h1>Birthday surprise unavailable</h1>
        <p>The content could not be loaded. Please try again.</p>
        <button
          className="reveal-primary"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
        {onExit && <button onClick={onExit}>Exit</button>}
      </main>
    );

  if (!started)
    return (
      <main
        ref={main}
        tabIndex={-1}
        className={`reveal-opening ${phase === 'entering' ? 'is-entering' : ''}`}
      >
        <div className="reveal-opening__content">
          <p className="reveal-context">[BIRTHDAY OPENING PLACEHOLDER]</p>
          <h1>[Personal opening line]</h1>
          <p className="reveal-support">[Placeholder supporting line]</p>
          <RevealImage
            image={{
              src: '/app-assets/reveal-placeholders/composition-01.svg',
              alt: 'Development placeholder image for Birthday Reveal layout testing.',
            }}
          />
          <button
            className="reveal-primary"
            aria-disabled={phase !== 'ready'}
            onClick={() => {
              if (lock.current) return;
              lock.current = true;
              setPhase('entering');
            }}
          >
            Open your birthday surprise
          </button>
        </div>
      </main>
    );

  return (
    <main
      ref={main}
      tabIndex={-1}
      aria-label="Birthday Reveal"
      className={`birthday-reveal ${phase === 'leaving' ? 'is-leaving' : ''}`}
    >
      {onExit && (
        <button className="reveal-exit" onClick={onExit}>
          <span aria-hidden="true">× </span>Exit
        </button>
      )}
      <div
        className="reveal-scene-region"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          key={scene.id}
          className={`reveal-scene ${final ? 'reveal-scene--final' : ''}`}
        >
          {final && scene.image && <RevealImage image={scene.image} />}
          <h1>{scene.headline}</h1>
          {!final && scene.image && <RevealImage image={scene.image} />}
          {scene.body && <p>{scene.body}</p>}
        </div>
      </div>
      {final && phase === 'ready' && !finished && (
        <div className="reveal-celebration" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} style={{ '--piece': i } as CSSProperties} />
          ))}
        </div>
      )}
      <button
        ref={advance}
        className="reveal-advance"
        aria-label={final ? 'Continue to Home' : 'Tap to continue'}
        aria-disabled={phase !== 'ready' || (final && !finished)}
        onClick={progress}
        onKeyDown={(event) => {
          if (event.repeat && (event.key === 'Enter' || event.key === ' '))
            event.preventDefault();
        }}
      >
        <span>
          {final
            ? finished
              ? 'Continue'
              : 'A birthday moment'
            : 'Tap to continue'}
        </span>
      </button>
    </main>
  );
}
