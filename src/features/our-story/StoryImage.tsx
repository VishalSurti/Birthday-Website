import { useState } from 'react';
import type { StoryImage as ImageData } from './storyContent';

// Shared failure handling for narrative and viewer; callers key by image source.
export function StoryImage({
  image,
  eager = false,
}: {
  image: ImageData;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className="story-image-media"
      style={{
        aspectRatio:
          image.width && image.height
            ? `${image.width} / ${image.height}`
            : '4 / 3',
      }}
    >
      {failed ? (
        <span
          className="story-image-fallback"
          role="img"
          aria-label="Image unavailable"
        >
          Image unavailable
        </span>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
