import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, it } from 'vitest';
import { HomePage } from './HomePage';
it('adds only a public development hero with reserved 4:3 space and critical loading policy', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
  expect(screen.getByText('[FEATURE PLACEHOLDER — HOME]')).toBeTruthy();
  const img = screen.getByRole('img');
  expect(img.getAttribute('src')).toBe('/app-assets/media-placeholder.svg');
  expect(img.parentElement?.style.aspectRatio).toBe('800 / 600');
  expect(img.getAttribute('loading')).toBe('eager');
  expect(img.getAttribute('fetchpriority')).toBe('high');
});
