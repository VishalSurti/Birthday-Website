import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ClosedMessage } from './ClosedMessage';
import type { ForYouMessage } from './forYouSelection';

export function MessageReader({
  message,
  closed,
  onOpen,
  onClose,
  onSeen,
}: {
  message: ForYouMessage;
  closed: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSeen: (id: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const [readable, setReadable] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const origin =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scrollY = window.scrollY;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (origin?.isConnected) origin.focus({ preventScroll: true });
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, []);

  useEffect(() => {
    if (closed) return;
    closeRef.current?.focus();
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const duration =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--motion-standard-min',
        ),
      ) || 220;
    // Timing works without animation events, including reduced motion and failed CSS.
    const timer = window.setTimeout(
      () => setReadable(true),
      reduced ? 0 : duration,
    );
    return () => window.clearTimeout(timer);
  }, [closed]);

  useEffect(() => {
    if (readable) onSeen(message.id); // Runs after readable content is committed to the DOM.
  }, [readable, message.id, onSeen]);

  function close() {
    if (closing.current) return;
    closing.current = true;
    onClose();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="for-you-reader"
      aria-label={closed ? 'Another message' : 'Message reader'}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <div className="for-you-reader__content">
        <div className="for-you-reader__toolbar">
          <button
            ref={closeRef}
            type="button"
            className="for-you-close"
            onClick={close}
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        {closed ? (
          <>
            <h2 className="for-you-reader__title">Another message</h2>
            <ClosedMessage message={message} onOpen={onOpen} />
          </>
        ) : readable ? (
          <article
            className={
              message.body.length > 1000
                ? 'for-you-reading for-you-reading--long'
                : 'for-you-reading'
            }
          >
            {message.title && (
              <h2 className="for-you-reader__title">{message.title}</h2>
            )}
            <div className="for-you-reading__body">{message.body}</div>
          </article>
        ) : (
          <p role="status" className="for-you-detail">
            Opening message…
          </p>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
