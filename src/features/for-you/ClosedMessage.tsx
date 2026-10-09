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
      onClick={onOpen}
      aria-label={read ? 'Read again' : 'Open message'}
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
