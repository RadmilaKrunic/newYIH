// Turns the built single-page app into one real HTML file per page and language,
// so search engines and link previews see the full content without running JavaScript.
// Also writes sitemap.xml and robots.txt. Runs after `vite build` (see package.json).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, routes, SITE_URL } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');

const pages = [];
for (const route of routes) {
  const { html, head, lang, seo } = await render(route.path, route.page);
  const out = template
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file = join(dist, route.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, out);
  pages.push(seo);
  console.log(`prerendered ${route.path}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
${p.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`).join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await rm(ssrDir, { recursive: true, force: true });
console.log(`sitemap.xml and robots.txt written for ${SITE_URL}`);
