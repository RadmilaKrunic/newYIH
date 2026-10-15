// Server entry used only by scripts/prerender.mjs to turn each page into static HTML.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import i18n from './i18n/index.js';
import App from './App.jsx';
import { langFromPath, localePath, PAGES } from './i18n/paths.js';
import { LANGUAGES } from './i18n/index.js';
import { headHtml, seoFor, SITE_URL } from './seo.js';

export const routes = LANGUAGES.flatMap(({ code }) => PAGES.map((page) => ({ lang: code, page, path: localePath(code, page) })));

export { SITE_URL, seoFor };

export async function render(path, page) {
  const lang = langFromPath(path);
  await i18n.changeLanguage(lang);
  const html = renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );
  const seo = seoFor(i18n.getFixedT(lang), lang, page);
  return { html, head: headHtml(seo), lang, seo };
}
