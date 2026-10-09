import { Outlet } from 'react-router';

type RootLayoutProps = {
  width?: 'home' | 'reader' | 'story';
  className?: string;
};

// Shared document-flow container for both browsing and focused routes.
export function RootLayout({
  width = 'reader',
  className = '',
}: RootLayoutProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`content-container content-container--${width} ${className}`}
    >
      <Outlet />
    </main>
  );
}
