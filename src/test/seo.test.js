import { describe, expect, it } from 'vitest';
import i18n from '../i18n/index.js';
import { langFromPath, localePath, pageFromPath } from '../i18n/paths.js';
import { applySeo, headHtml, seoFor, SITE_URL } from '../seo.js';

describe('language URLs', () => {
  it('maps paths to language and page and back', () => {
    expect(langFromPath('/')).toBe('it');
    expect(langFromPath('/en/')).toBe('en');
    expect(langFromPath('/en/faq/')).toBe('en');
    expect(langFromPath('/enterprise')).toBe('it');
    expect(pageFromPath('/en/faq/')).toBe('faq');
    expect(pageFromPath('/faq')).toBe('faq');
    expect(pageFromPath('/en')).toBe('');
    expect(localePath('it')).toBe('/');
    expect(localePath('en', 'faq')).toBe('/en/faq/');
  });
});

describe('seoFor', () => {
  it('gives each language its own title, canonical URL and hreflang alternates', () => {
    const seo = seoFor(i18n.getFixedT('en'), 'en', 'faq');
    expect(seo.title).toBe('FAQ | Your Italian Holidays Rome');
    expect(seo.url).toBe(`${SITE_URL}/en/faq/`);
    expect(seo.alternates).toEqual([
      { hreflang: 'it', href: `${SITE_URL}/faq/` },
      { hreflang: 'en', href: `${SITE_URL}/en/faq/` },
      { hreflang: 'x-default', href: `${SITE_URL}/faq/` },
    ]);
  });

  it('describes the business, every apartment and the FAQ as structured data', () => {
    const [business, faq] = seoFor(i18n.getFixedT('it'), 'it', 'faq').jsonLd;
    expect(business['@type']).toBe('LodgingBusiness');
    expect(business.containsPlace).toHaveLength(12);
    expect(business.address.streetAddress).toBe('Vicolo del Gallinaccio 7');
    expect(faq['@type']).toBe('FAQPage');
    expect(faq.mainEntity[0].name).toBe('A che ora sono previsti check-in e check-out?');
    expect(seoFor(i18n.getFixedT('it'), 'it', '').jsonLd).toHaveLength(1);
  });

  it('renders head HTML that is safe to inline', () => {
    const html = headHtml(seoFor(i18n.getFixedT('it'), 'it', ''));
    expect(html).toContain('<title>Your Italian Holidays | Appartamenti per vacanze nel centro di Roma</title>');
    expect(html).toContain(`<link data-seo rel="canonical" href="${SITE_URL}/">`);
    expect(html).not.toMatch(/<\/script>.*<\/script>.*<\/script>/s);
  });

  it('replaces the head tags in the browser without duplicating them', () => {
    applySeo(seoFor(i18n.getFixedT('it'), 'it', ''));
    applySeo(seoFor(i18n.getFixedT('en'), 'en', ''));
    expect(document.documentElement.lang).toBe('en');
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelector('link[rel="canonical"]').href).toBe(`${SITE_URL}/en/`);
    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1);
  });
});
