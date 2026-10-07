import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { afterEach, describe, expect, it } from 'vitest';
import { AppRoutes } from './router';

function renderAt(path: string) {
  window.history.replaceState(null, '', path);
  return render(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>,
  );
}

afterEach(() => window.history.replaceState(null, '', '/'));

describe('browser-history routing foundation', () => {
  it.each([
    ['/', 'Home'],
    ['/for-you', 'For You'],
    ['/open-when', 'Open When'],
    ['/open-when/letter-01', 'Open When letter'],
    ['/our-story', 'Our Story'],
  ])('resolves direct entry to %s inside the root outlet', (path, heading) => {
    renderAt(path);
    expect(
      screen
        .getByRole('main')
        .contains(screen.getByRole('heading', { level: 1, name: heading })),
    ).toBe(true);
    if (path === '/open-when/letter-01')
      expect(screen.getByText('letter-01')).toBeTruthy();
  });

  it('recovers an unknown URL to Home using browser history', async () => {
    renderAt('/unknown/nested-page');
    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole('link', { name: 'Return to Home' }));
    expect(await screen.findByRole('heading', { name: 'Home' })).toBeTruthy();
    expect(window.location.pathname).toBe('/');
    expect(window.location.hash).toBe('');
  });
});
