import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../i18n/index.js';
import App from '../App.jsx';
import itMoments from '../i18n/locales/moments/it.json';
import enMoments from '../i18n/locales/moments/en.json';
import { momentsImage } from '../data/photos.js';
import { seoFor, SITE_URL } from '../seo.js';

const shape = (value) => {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, shape(value[k])]));
  }
  return typeof value;
};

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe('weddings & special moments page', () => {
  it('has the same text keys in English and Italian', () => {
    expect(shape(enMoments)).toEqual(shape(itMoments));
  });

  it('renders in English with every section, linked from the menu', async () => {
    await i18n.changeLanguage('en');
    renderAt('/en/intimate-weddings-rome/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your Special Moments in Rome');
    for (const name of ['Small weddings, big emotions.', 'Every special moment deserves to be remembered.', 'Your Rome, exactly as you imagine it.']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByText('Brunilda (Bruna)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Weddings & events' })).toHaveAttribute('href', '/en/intimate-weddings-rome/');
    expect(screen.getByRole('heading', { level: 3, name: 'Trevi' }).parentElement).toHaveTextContent('5 apartments · in the same building');
  });

  it('uses Italian headings on the Italian page', async () => {
    await i18n.changeLanguage('it');
    renderAt('/intimate-weddings-rome/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I tuoi momenti speciali a Roma');
    expect(screen.getByText('Matrimoni intimi a Roma')).toBeInTheDocument();
    expect(screen.getByText(/circondati dalle persone che ami/)).toBeInTheDocument();
  });

  it('opens one FAQ answer at a time', async () => {
    await i18n.changeLanguage('en');
    renderAt('/en/intimate-weddings-rome/');
    const faq = document.getElementById('faq');
    const [first, second] = within(faq).getAllByRole('button');
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(second);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('sends the enquiry as a WhatsApp message', async () => {
    await i18n.changeLanguage('en');
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderAt('/en/intimate-weddings-rome/');
    fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: 'proposal' } });
    fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Overnight stays'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Anna' } });
    fireEvent.click(screen.getByRole('button', { name: 'Plan your experience' }));
    const text = decodeURIComponent(new URL(open.mock.calls[0][0]).searchParams.get('text'));
    expect(text).toBe(
      "Hi Bruna, I'm Anna. I'd like to plan: Marriage proposal.\nDate or period: to be defined\nGuests: 2\nOvernight stays: 3 nights\nApproximate budget: to be defined",
    );
    open.mockRestore();
  });

  it('links the home page events card to the page', async () => {
    await i18n.changeLanguage('it');
    renderAt('/');
    expect(screen.getByRole('link', { name: 'Matrimoni & momenti speciali →' })).toHaveAttribute('href', '/intimate-weddings-rome/');
  });

  it('prefers a photo over the drawn placeholder', () => {
    const files = { '../photos/moments/matrimoni.svg': 'drawn.svg', '../photos/moments/matrimoni.jpg': 'photo.jpg' };
    expect(momentsImage('matrimoni', undefined, files)).toEqual({ src: 'photo.jpg', isPhoto: true });
    expect(momentsImage('sorprese', 'x.svg', { '../photos/site/x.svg': 'x.svg' })).toEqual({ src: 'x.svg', isPhoto: false });
  });

  it('describes the service and FAQ for search engines, with English as the default language', () => {
    const seo = seoFor(i18n.getFixedT('en'), 'en', 'intimate-weddings-rome');
    expect(seo.title).toBe('Intimate Weddings & Tailor-Made Experiences in Rome | Your Italian Holidays');
    expect(seo.alternates.at(-1)).toEqual({ hreflang: 'x-default', href: `${SITE_URL}/en/intimate-weddings-rome/` });
    const [business, service, faq] = seo.jsonLd;
    expect(business.founder).toMatchObject({ name: 'Brunilda', alternateName: 'Bruna' });
    expect(service['@type']).toBe('Service');
    expect(faq.mainEntity).toHaveLength(9);
    expect(seoFor(i18n.getFixedT('it'), 'it', 'intimate-weddings-rome').title).toMatch(/^Matrimoni intimi/);
  });
});
