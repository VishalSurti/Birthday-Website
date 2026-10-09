import { fireEvent, render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { afterEach, describe, expect, it } from 'vitest';
import { AppRoutes } from './router';

const destinations = [
  ['/', 'Home'],
  ['/for-you', 'For You'],
  ['/open-when', 'Open When'],
  ['/our-story', 'Our Story'],
] as const;

function renderAt(path: string) {
  window.history.replaceState(null, '', path);
  return render(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>,
  );
}

afterEach(() => window.history.replaceState(null, '', '/'));

describe('application shell and primary navigation', () => {
  it.each(destinations)(
    'renders %s with exactly four labelled links and one current destination',
    (path, title) => {
      renderAt(path);
      expect(
        within(screen.getByRole('main')).getByRole('heading', {
          level: 1,
          name: title,
        }),
      ).toBeTruthy();
      const nav = within(screen.getByRole('navigation', { name: 'Primary' }));
      expect(nav.getAllByRole('link')).toHaveLength(4);
      for (const [href, label] of destinations) {
        const link = nav.getByRole('link', { name: label });
        expect(link.getAttribute('href')).toBe(href);
        expect(link.getAttribute('aria-current')).toBe(
          href === path ? 'page' : null,
        );
      }
      expect(nav.getByRole('link', { current: 'page' }).textContent).toBe(
        title,
      );
      expect(nav.queryByRole('img')).toBeNull();
    },
  );

  it('updates route content and current state while retaining focus on the persistent navigation', async () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    for (const [path, title] of [...destinations.slice(1), destinations[0]]) {
      const link = within(nav).getByRole('link', { name: title });
      link.focus();
      fireEvent.click(link);
      expect(
        await screen.findByRole('heading', { name: title, level: 1 }),
      ).toBeTruthy();
      expect(window.location.pathname).toBe(path);
      expect(within(nav).getByRole('link', { current: 'page' })).toBe(link);
      expect(document.activeElement).toBe(link);
    }
  });

  it('lets keyboard users skip to the main region without adding a history entry', () => {
    renderAt('/for-you');
    const length = window.history.length;
    fireEvent.click(screen.getByRole('link', { name: 'Skip to content' }));
    expect(document.activeElement).toBe(screen.getByRole('main'));
    expect(window.location.hash).toBe('');
    expect(window.history.length).toBe(length);
  });

  it('keeps the focused letter placeholder outside primary navigation with a parent escape', async () => {
    renderAt('/open-when/letter-01');
    expect(
      screen.getByRole('heading', { name: 'Open When letter' }),
    ).toBeTruthy();
    expect(screen.getByText('letter-01')).toBeTruthy();
    expect(screen.queryByRole('navigation', { name: 'Primary' })).toBeNull();
    fireEvent.click(screen.getByRole('link', { name: 'Back to Open When' }));
    expect(
      await screen.findByRole('heading', { name: 'Open When' }),
    ).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
  });

  it('recovers an unknown URL to Home outside the primary shell', async () => {
    renderAt('/unknown/nested-page');
    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeTruthy();
    expect(screen.queryByRole('navigation', { name: 'Primary' })).toBeNull();
    fireEvent.click(screen.getByRole('link', { name: 'Return to Home' }));
    expect(await screen.findByRole('heading', { name: 'Home' })).toBeTruthy();
    expect(window.location.pathname).toBe('/');
    expect(
      screen.getByRole('link', { name: 'Home', current: 'page' }),
    ).toBeTruthy();
  });
});
