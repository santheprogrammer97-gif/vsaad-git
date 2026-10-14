import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function vsaadApiPlugin() {
  return {
    name: 'vsaad-api-backend-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api/vsaad')) {
          try {
            // Dynamic import of backend handler
            // @ts-ignore
            const api = await import('./server/vsaadApiHandler.js');
            const handled = await api.handleVsaadApiRequest(req, res);
            if (handled) return;
          } catch (e) {
            console.error('Error in VSAAD API middleware:', e);
          }
        }
        next();
      });
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api/vsaad')) {
          try {
            // @ts-ignore
            const api = await import('./server/vsaadApiHandler.js');
            const handled = await api.handleVsaadApiRequest(req, res);
            if (handled) return;
          } catch (e) {
            console.error('Error in VSAAD API preview middleware:', e);
          }
        }
        next();
      });
    },
  };
}

import fs from 'fs';
import path from 'path';

function staticRoutesFallbackPlugin() {
  const routes = [
    'products',
    'tiles',
    'granite',
    'collections',
    'collections/granite',
    'collections/tiles',
    'collections/marble',
    'collections/countertops',
    'collections/staircase',
    'collections/cladding',
    'gallery',
    'quote-cart',
    'cart',
    'enquiry-cart',
    'about',
    'journal',
    'blog',
    'faq',
    'contact',
    'privacy-policy',
    'terms-and-conditions',
    'shipping-policy',
    'refund-policy',
    'admin',
  ];

  return {
    name: 'vsaad-static-routes-fallback-plugin',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;
      const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

      for (const route of routes) {
        const targetDir = path.join(distDir, route);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.writeFileSync(path.join(targetDir, 'index.html'), indexContent);
      }
    },
  };
}

// @ts-ignore
import tailwindcss from 'tailwindcss';
// @ts-ignore
import autoprefixer from 'autoprefixer';
// @ts-ignore
import tailwindConfig from './tailwind.config.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vsaadApiPlugin(), staticRoutesFallbackPlugin()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(tailwindConfig),
        autoprefixer,
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons';
          }
          if (id.includes('node_modules/three/')) {
            return 'three';
          }
          if (id.includes('node_modules/gsap/')) {
            return 'gsap';
          }
        },
      },
    },
  },
});
