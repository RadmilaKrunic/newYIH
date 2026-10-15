// Each language has its own URL so search engines can index both:
//   Italian (default): /        /faq/
//   English:           /en/     /en/faq/
// Trailing slashes match the prerendered folders (faq/index.html), so hosts serve them without a redirect.
export const DEFAULT_LANG = 'it';
export const PAGES = ['', 'faq'];

export const langFromPath = (pathname = '/') =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LANG;

export const pageFromPath = (pathname = '/') => {
  const rest = pathname.replace(/^\/en(\/|$)/, '/').replace(/^\/+|\/+$/g, '');
  return PAGES.includes(rest) ? rest : '';
};

export const localePath = (lang, page = '') => {
  const prefix = lang === DEFAULT_LANG ? '/' : `/${lang}/`;
  return page ? `${prefix}${page}/` : prefix;
};
