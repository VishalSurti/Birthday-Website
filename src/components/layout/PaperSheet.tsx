import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Shared native sheet; More keeps its existing history and replay ownership.
export function PaperSheet({
  label,
  children,
  onClose,
  onRestore,
}: {
  label: string;
  children: ReactNode;
  onClose: () => void;
  onRestore: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
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
  useEffect(() => {
    // Replacing a focused sheet action with guidance can leave focus on body.
    if (!dialog.current?.contains(document.activeElement))
      closeButton.current?.focus();
  }, [label]);
  return createPortal(
    <dialog
      ref={dialog}
      className="more-sheet"
      aria-label={label}
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
      <button ref={closeButton} className="more-sheet__close" onClick={onClose}>
        Close <span aria-hidden="true">×</span>
      </button>
      {children}
    </dialog>,
    document.body,
  );
}
