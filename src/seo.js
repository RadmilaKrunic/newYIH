// Everything search engines and link previews read: title, description,
// canonical URL, hreflang alternates, Open Graph and JSON-LD structured data.
// Used both by the prerender step (scripts/prerender.mjs) and in the browser.
import { apartments } from './data/apartments.js';
import { contact } from './data/contact.js';
import { photosFor, siteImage } from './data/photos.js';
import { LANGUAGES } from './i18n/index.js';
import { DEFAULT_LANG, localePath } from './i18n/paths.js';

export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://www.youritalianholidays.com').replace(/\/+$/, '');

const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`);

function structuredData(t, lang, page, url) {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Your Italian Holidays',
    description: t('meta.description'),
    url: absolute(localePath(lang)),
    logo: absolute(siteImage('logo.png')),
    image: absolute(siteImage('bruna-doppiopetto.jpg')),
    email: contact.email,
    telephone: contact.phone.replace(/\s+/g, ''),
    foundingDate: '2012',
    founder: { '@type': 'Person', name: 'Brunilda' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vicolo del Gallinaccio 7',
      addressLocality: 'Roma',
      postalCode: '00187',
      addressCountry: 'IT',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '16:00',
    },
    areaServed: { '@type': 'City', name: 'Roma' },
    availableLanguage: LANGUAGES.map((l) => l.name),
    sameAs: [contact.currentSite],
    containsPlace: apartments.map((a) => ({
      '@type': 'Apartment',
      name: a.title,
      description: t(`homes.${a.id}.description`),
      image: photosFor(a).slice(0, 3).map((p) => absolute(p.src)),
      address: { '@type': 'PostalAddress', streetAddress: a.address, addressLocality: 'Roma', addressCountry: 'IT' },
    })),
  };
  if (page !== 'faq') return [business];
  return [
    business,
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      url,
      mainEntity: t('faq.items', { returnObjects: true }).map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ];
}

/** All head data for one page in one language. `t` must be fixed to that language. */
export function seoFor(t, lang, page = '') {
  const url = absolute(localePath(lang, page));
  const title = page === 'faq' ? t('meta.faqTitle') : t('meta.title');
  const description = page === 'faq' ? t('meta.faqDescription') : t('meta.description');
  return {
    lang,
    title,
    description,
    url,
    alternates: [
      ...LANGUAGES.map((l) => ({ hreflang: l.code, href: absolute(localePath(l.code, page)) })),
      { hreflang: 'x-default', href: absolute(localePath(DEFAULT_LANG, page)) },
    ],
    image: absolute(siteImage('bruna-doppiopetto.jpg')),
    ogLocale: t('meta.ogLocale'),
    jsonLd: structuredData(t, lang, page, url),
  };
}

/** The head tags as plain objects, so the server and the browser build the same thing. */
export function headTags(seo) {
  return [
    { tag: 'meta', attrs: { name: 'description', content: seo.description } },
    { tag: 'link', attrs: { rel: 'canonical', href: seo.url } },
    ...seo.alternates.map((a) => ({ tag: 'link', attrs: { rel: 'alternate', hreflang: a.hreflang, href: a.href } })),
    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: 'Your Italian Holidays' } },
    { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
    { tag: 'meta', attrs: { property: 'og:url', content: seo.url } },
    { tag: 'meta', attrs: { property: 'og:image', content: seo.image } },
    { tag: 'meta', attrs: { property: 'og:locale', content: seo.ogLocale } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    ...seo.jsonLd.map((data) => ({ tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(data) })),
  ];
}

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** HTML for the prerendered <head>. Tags carry data-seo so the browser can replace them. */
export function headHtml(seo) {
  const tags = headTags(seo).map(({ tag, attrs, text }) => {
    const a = Object.entries(attrs).map(([k, v]) => ` ${k}="${escapeAttr(v)}"`).join('');
    if (tag === 'script') return `<script data-seo${a}>${text.replace(/</g, '\\u003c')}</script>`;
    return `<${tag} data-seo${a}>`;
  });
  return [`<title>${escapeText(seo.title)}</title>`, ...tags].join('\n    ');
}

/** Updates the live document head when the language or page changes in the browser. */
export function applySeo(seo, doc = document) {
  doc.documentElement.lang = seo.lang;
  doc.title = seo.title;
  doc.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  for (const { tag, attrs, text } of headTags(seo)) {
    const el = doc.createElement(tag);
    el.setAttribute('data-seo', '');
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (text) el.textContent = text;
    doc.head.appendChild(el);
  }
}
