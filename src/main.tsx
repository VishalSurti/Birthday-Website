import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './app/router';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/globals.css';

const root = document.getElementById('root');
if (!root) throw new Error('Application root is missing.');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
