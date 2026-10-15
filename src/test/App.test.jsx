import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../i18n/index.js';
import App from '../App.jsx';
import { apartments } from '../data/apartments.js';

const renderApp = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe('App', () => {
  it('switches between Italian and English', async () => {
    await i18n.changeLanguage('it');
    renderApp();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ciao, sono Brunilda.');
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Ciao, I'm Brunilda.");
    expect(document.documentElement.lang).toBe('en');
  });

  it('lists every apartment and filters by zone', async () => {
    await i18n.changeLanguage('it');
    renderApp();
    const section = document.getElementById('appartamenti');
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(apartments.length);
    fireEvent.click(within(section).getByRole('button', { name: 'Prati' }));
    expect(within(section).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['Vatican Apartment']);
  });

  it('opens the photo gallery and closes it with Escape', async () => {
    await i18n.changeLanguage('it');
    renderApp();
    fireEvent.click(screen.getAllByRole('button', { name: 'Scopri la casa e tutte le foto' })[0]);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('1 di 8')).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Foto successiva' }));
    expect(within(dialog).getByText('2 di 8')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the FAQ page', async () => {
    await i18n.changeLanguage('en');
    renderApp('/faq');
    expect(screen.getByRole('heading', { name: 'Frequently asked questions' })).toBeInTheDocument();
    expect(screen.getByText('What are the check-in and check-out times?')).toBeInTheDocument();
  });
});
