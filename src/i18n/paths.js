// Each language has its own URL so search engines can index both:
//   Italian (default): /        /faq/
//   English:           /en/     /en/faq/
// The weddings & special moments page uses the same English slug in both languages:
//   /intimate-weddings-rome/ and /en/intimate-weddings-rome/
// Trailing slashes match the prerendered folders (faq/index.html), so hosts serve them without a redirect.
export const DEFAULT_LANG = 'it';
export const MOMENTS_PAGE = 'intimate-weddings-rome';
export const PAGES = ['', 'faq', MOMENTS_PAGE];

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
