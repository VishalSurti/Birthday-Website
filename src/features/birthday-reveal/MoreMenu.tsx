import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router';
import { ReplayContext } from './replayContext';

export function MoreMenu() {
  const replay = useContext(ReplayContext);
  const [token] = useState(() => crypto.randomUUID());
  const location = useLocation();
  const navigate = useNavigate();
  const button = useRef<HTMLButtonElement>(null);
  const open = !!replay && location.state?.more === token;
  if (!replay) return null;
  return (
    <>
      <button
        ref={button}
        className="more-trigger"
        aria-label="More"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => navigate(location.pathname, { state: { more: token } })}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <circle cx="5" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
        </svg>
      </button>
      {open && (
        <MoreSheet
          onClose={() => navigate(-1)}
          onReplay={replay}
          onRestore={() => button.current?.focus({ preventScroll: true })}
        />
      )}
    </>
  );
}
function MoreSheet({
  onClose,
  onReplay,
  onRestore,
}: {
  onClose: () => void;
  onReplay: () => void;
  onRestore: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const restore = useRef(onRestore);
  useEffect(() => {
    const node = dialog.current!;
    const overflow = document.body.style.overflow;
    const restoreFocus = restore.current;
    node.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      restoreFocus();
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      className="more-sheet"
      aria-label="More"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const box = event.currentTarget.getBoundingClientRect();
          if (
            event.clientY < box.top ||
            event.clientX < box.left ||
            event.clientX > box.right
          )
            onClose();
        }
      }}
    >
      <button className="more-sheet__close" onClick={onClose}>
        Close <span aria-hidden="true">×</span>
      </button>
      <button className="more-sheet__row" onClick={onReplay}>
        Replay Birthday Surprise
      </button>
    </dialog>,
    document.body,
  );
}
