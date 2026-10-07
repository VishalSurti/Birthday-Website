import { Outlet } from 'react-router';

// A semantic outlet container only; App Shell & Navigation belongs to Day 8.
export function RootLayout() {
  return (
    <main className="content-container">
      <Outlet />
    </main>
  );
}
