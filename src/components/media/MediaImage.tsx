import { useState } from 'react';
import type { ImageReference } from './imageReference';
import './media-image.css';

type Props = {
  image: ImageReference;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high';
  fit?: 'cover' | 'contain';
  fallbackRatio?: string;
};
export function MediaImage({
  image,
  className = '',
  loading = 'lazy',
  fetchPriority,
  fit = 'cover',
  fallbackRatio = '4 / 3',
}: Props) {
  const [state, setState] = useState({ src: image.src, status: 'loading' });
  const status = state.src === image.src ? state.status : 'loading';
  const decorative = image.alt === '';
  return (
    <span
      className={`media-image ${className}`}
      data-state={status}
      aria-hidden={decorative || undefined}
      style={{
        aspectRatio:
          image.width && image.height
            ? `${image.width} / ${image.height}`
            : fallbackRatio,
      }}
    >
      {status === 'error' ? (
        <span
          className="media-image__fallback"
          role={decorative ? undefined : 'img'}
          aria-label={decorative ? undefined : 'Image unavailable'}
        >
          {!decorative && 'Image unavailable'}
        </span>
      ) : (
        <img
          ref={(node) => {
            if (node?.complete && node.naturalWidth > 0 && status !== 'loaded')
              setState({ src: image.src, status: 'loaded' });
          }}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          draggable={false}
          style={{ objectFit: fit }}
          onLoad={() => setState({ src: image.src, status: 'loaded' })}
          onError={() => setState({ src: image.src, status: 'error' })}
        />
      )}
    </span>
  );
}
