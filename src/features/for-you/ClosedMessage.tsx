import type { ForYouMessage } from './forYouSelection';

export function ClosedMessage({
  message,
  onOpen,
  read = false,
}: {
  message: ForYouMessage;
  onOpen: () => void;
  read?: boolean;
}) {
  return (
    <button
      type="button"
      className="for-you-card"
      onClick={(event) => {
        event.currentTarget.focus({ preventScroll: true });
        onOpen();
      }}
    >
      <span className="for-you-label">For you</span>
      {message.title && (
        <span className="for-you-card__title">{message.title}</span>
      )}
      <span className="for-you-card__action">
        {read ? 'Read again →' : 'Tap to open'}
      </span>
      {read && <span className="for-you-detail">Opened before</span>}
    </button>
  );
}
