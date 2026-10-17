import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { MediaImage } from './MediaImage';
const image = {
  src: '/app-assets/example.webp',
  alt: '[Authored alt]',
  width: 800,
  height: 600,
};
it('passes through alt and dimensions, reserves ratio and defaults to lazy/async without high priority', () => {
  render(<MediaImage image={image} />);
  const img = screen.getByRole('img', { name: image.alt });
  expect(img.getAttribute('width')).toBe('800');
  expect(img.getAttribute('height')).toBe('600');
  expect(img.parentElement?.style.aspectRatio).toBe('800 / 600');
  expect(img.getAttribute('loading')).toBe('lazy');
  expect(img.getAttribute('decoding')).toBe('async');
  expect(img.getAttribute('fetchpriority')).toBeNull();
  expect(img.parentElement?.dataset.state).toBe('loading');
  fireEvent.load(img);
  expect(img.parentElement?.dataset.state).toBe('loaded');
});
it('supports caller-selected fallback ratio, eager/high priority and contained fit', () => {
  render(
    <MediaImage
      image={{ src: image.src, alt: image.alt }}
      fallbackRatio="4 / 5"
      loading="eager"
      fetchPriority="high"
      fit="contain"
    />,
  );
  const img = screen.getByRole('img') as HTMLImageElement;
  expect(img.parentElement?.style.aspectRatio).toBe('4 / 5');
  expect(img.hasAttribute('width')).toBe(false);
  expect(img.getAttribute('loading')).toBe('eager');
  expect(img.getAttribute('fetchpriority')).toBe('high');
  expect(img.style.objectFit).toBe('contain');
});
it('preserves space on failure without broken image/URL and resets when the source changes', () => {
  const { container, rerender } = render(<MediaImage image={image} />);
  fireEvent.error(screen.getByRole('img'));
  const fallback = screen.getByRole('img', { name: 'Image unavailable' });
  expect(container.querySelector('img')).toBeNull();
  expect(container.textContent).not.toContain(image.src);
  expect(fallback.parentElement?.style.aspectRatio).toBe('800 / 600');
  rerender(
    <MediaImage image={{ ...image, src: '/private-assets/example.avif' }} />,
  );
  const next = screen.getByRole('img', { name: image.alt });
  expect(next.getAttribute('src')).toBe('/private-assets/example.avif');
  expect(next.parentElement?.dataset.state).toBe('loading');
  expect(screen.queryByRole('img', { name: 'Image unavailable' })).toBeNull();
  expect(next.parentElement?.style.aspectRatio).toBe('800 / 600');
  fireEvent.load(next);
  expect(next.parentElement?.dataset.state).toBe('loaded');
});
it('keeps decorative empty alt and failure silent', () => {
  const { container } = render(<MediaImage image={{ ...image, alt: '' }} />);
  const img = container.querySelector('img')!;
  expect(img.alt).toBe('');
  expect(screen.queryByRole('img')).toBeNull();
  fireEvent.error(img);
  expect(screen.queryByRole('img')).toBeNull();
  expect(container.textContent).toBe('');
});

it('derives loading for a new source after a successful image and lets its events settle status', () => {
  const { rerender } = render(
    <MediaImage
      image={image}
      loading="eager"
      fetchPriority="high"
      fit="contain"
    />,
  );
  fireEvent.load(screen.getByRole('img'));
  rerender(
    <MediaImage
      image={{ ...image, src: '/app-assets/next.webp' }}
      loading="eager"
      fetchPriority="high"
      fit="contain"
    />,
  );
  const next = screen.getByRole('img') as HTMLImageElement;
  expect(next.parentElement?.dataset.state).toBe('loading');
  expect(next.alt).toBe(image.alt);
  expect(next.getAttribute('loading')).toBe('eager');
  expect(next.getAttribute('fetchpriority')).toBe('high');
  expect(next.style.objectFit).toBe('contain');
  fireEvent.error(next);
  expect(screen.getByRole('img', { name: 'Image unavailable' })).toBeTruthy();
});
