import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// VSAAD routes to generate static fallback index.html for servers without rewrite
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

if (fs.existsSync(distDir)) {
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (fs.existsSync(indexHtmlPath)) {
    const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

    // 1. Create physical subfolder index.html files
    for (const route of routes) {
      const targetDir = path.join(distDir, route);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(path.join(targetDir, 'index.html'), indexContent);
      console.log(`[postbuild] Created fallback: dist/${route}/index.html`);
    }

    // 2. Ensure .htaccess is in dist
    const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
`;
    fs.writeFileSync(path.join(distDir, '.htaccess'), htaccessContent);
    console.log('[postbuild] Created .htaccess in dist');
  }
}
