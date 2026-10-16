import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeManifestIcons: false, // Already covered by the public-only glob below.
      manifest: {
        name: 'Birthday Website',
        short_name: 'Birthday',
        description: 'Made especially for you.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#F6F1E8',
        theme_color: '#F6F1E8',
        icons: [
          {
            src: '/app-assets/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/app-assets/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Public allowlist plus explicit exclusion: never enumerate private filenames.
        globPatterns: [
          'index.html',
          'registerSW.js',
          'assets/*.{js,css,woff2}',
          'app-assets/**/*.{svg,png}',
        ],
        globIgnores: ['**/private-assets/**'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          /^\/private-assets\//,
          /^\/app-assets\//,
          /^\/assets\//,
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url, request, sameOrigin }) =>
              sameOrigin &&
              url.pathname.startsWith('/private-assets/') &&
              request.destination === 'image',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'birthday-private-images',
              cacheableResponse: { statuses: [200] },
              expiration: { maxEntries: 60 },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    clearMocks: true,
  },
});
