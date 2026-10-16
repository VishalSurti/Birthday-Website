import { useState } from 'react';
import type { RevealImage as ImageReference } from './revealContent';

export function RevealImage({ image }: { image: ImageReference }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div
      className="reveal-image reveal-image--fallback"
      role="img"
      aria-label="Image unavailable"
    >
      Image unavailable
    </div>
  ) : (
    <img
      className="reveal-image"
      src={image.src}
      alt={image.alt}
      width="400"
      height="500"
      onError={() => setFailed(true)}
    />
  );
}
