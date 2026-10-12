import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { StoryImage } from './StoryImage';
import { photoIndex, swipeDirection, type StoryMemory } from './storyContent';

export function StoryPhotoViewer({
  memory,
  initialIndex,
  onClose,
}: {
  memory: StoryMemory;
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const start = useRef<{ x: number; y: number; id: number } | undefined>(
    undefined,
  );
  const image = memory.images[index]!;
  const multiple = memory.images.length > 1;
  function move(delta: number) {
    setIndex((current) => photoIndex(current, delta, memory.images.length));
  }
  function close() {
    if (!closing.current) {
      closing.current = true;
      onClose();
    }
  }

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const origin =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scroll = window.scrollY;
    const overflow = document.body.style.overflow;
    node.showModal();
    closeButton.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      if (origin?.isConnected) origin.focus({ preventScroll: true });
      window.scrollTo({ top: scroll, behavior: 'instant' });
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialog}
      className="story-viewer"
      aria-label={`Photos from ${memory.title}`}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <div className="story-viewer__layout">
        <div className="story-viewer__toolbar">
          <button ref={closeButton} type="button" onClick={close}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <div
          className="story-viewer__stage"
          onPointerDown={(event) => {
            if (!multiple || !event.isPrimary || event.pointerType === 'mouse')
              return;
            start.current = {
              x: event.clientX,
              y: event.clientY,
              id: event.pointerId,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            start.current = undefined;
          }}
          onPointerUp={(event) => {
            const origin = start.current;
            start.current = undefined;
            if (!origin || origin.id !== event.pointerId) return;
            move(
              swipeDirection(
                event.clientX - origin.x,
                event.clientY - origin.y,
              ),
            );
          }}
        >
          <StoryImage key={image.src} image={image} eager />
        </div>
        {multiple && (
          <div className="story-viewer__navigation">
            <button
              type="button"
              aria-label="Previous photo"
              disabled={index === 0}
              onClick={() => move(-1)}
            >
              ←
            </button>
            <div className="story-viewer__position">
              <span className="story-viewer__dots" aria-hidden="true">
                {memory.images.map((_, i) => (
                  <span key={i} className={i === index ? 'is-current' : ''} />
                ))}
              </span>
              <span className="story-visually-hidden" role="status">
                Photo {index + 1} of {memory.images.length} in {memory.title}
              </span>
            </div>
            <button
              type="button"
              aria-label="Next photo"
              disabled={index === memory.images.length - 1}
              onClick={() => move(1)}
            >
              →
            </button>
          </div>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
