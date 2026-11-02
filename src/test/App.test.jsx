import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../i18n/index.js';
import App from '../App.jsx';
import { apartments } from '../data/apartments.js';

// StrictMode, as in src/main.jsx, so double-run effects behave as in development.
const renderApp = (path = '/') =>
  render(
    <StrictMode>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </StrictMode>,
  );

describe('App', () => {
  it('switches between Italian and English through the URL', async () => {
    await i18n.changeLanguage('it');
    renderApp();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ciao, sono Brunilda.');
    expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en/');
    fireEvent.click(screen.getByRole('link', { name: 'EN' }));
    expect(await screen.findByText("I'm Brunilda.", { exact: false })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('Your Italian Holidays | Holiday apartments in central Rome');
    expect(screen.getByRole('link', { name: 'IT' })).toHaveAttribute('href', '/');
  });

  it('lists every apartment and filters by zone', async () => {
    await i18n.changeLanguage('it');
    renderApp();
    const grid = document.getElementById('properties');
    expect(within(grid).getAllByRole('heading', { level: 3 })).toHaveLength(apartments.length);
    fireEvent.click(screen.getByRole('button', { name: 'Monti' }));
    expect(within(grid).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['Domus Gabriella', 'Domus Maya']);
  });

  it('opens the apartment details with all photos and the map, and closes', async () => {
    await i18n.changeLanguage('it');
    renderApp();
    fireEvent.click(screen.getAllByRole('button', { name: 'Scopri la casa e tutte le foto ↗' })[0]);
    const dialog = document.querySelector('dialog');
    await new Promise((r) => setTimeout(r, 20));
    expect(document.querySelector('dialog')).toBe(dialog);
    expect(dialog.open).toBe(true);
    expect(within(dialog).getByRole('heading', { name: 'Noah Apartment' })).toBeInTheDocument();
    expect(within(dialog).getByText('Fino a 8 ospiti · 1° piano con ascensore')).toBeInTheDocument();
    expect(within(dialog).getByText(/è stato segnalato un guasto/)).toBeInTheDocument();
    expect(within(dialog).getAllByRole('img', { name: /Noah Apartment — foto/ })).toHaveLength(4);
    fireEvent.click(within(dialog).getByRole('button', { name: 'Mostra la mappa' }));
    expect(dialog.querySelector('iframe')).toHaveAttribute('src', expect.stringContaining('Via%20del%20Tritone%2053'));
    fireEvent.click(within(dialog).getByRole('button', { name: 'Chiudi ✕' }));
    await waitFor(() => expect(document.querySelector('dialog')).toBeNull());
  });

  it('opens the details from the card photo too', async () => {
    await i18n.changeLanguage('it');
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Apri le foto di Chloè' }));
    await new Promise((r) => setTimeout(r, 20));
    expect(document.querySelector('dialog[open]')).not.toBeNull();
    expect(within(document.querySelector('dialog')).getByRole('heading', { name: 'Chloè Apartment' })).toBeInTheDocument();
  });

  it('builds the WhatsApp request in the current language', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderApp('/en/');
    await screen.findByText('Tell us about your', { exact: false });
    const form = document.getElementById('request');
    const [arrival, departure] = form.querySelectorAll('input[type="date"]');
    fireEvent.change(arrival, { target: { value: '2030-05-01' } });
    fireEvent.change(departure, { target: { value: '2030-05-04' } });
    fireEvent.change(within(form).getByLabelText('Your name'), { target: { value: 'Ana' } });
    fireEvent.submit(form);
    const url = decodeURIComponent(open.mock.calls[0][0]);
    expect(url).toContain("Hi, I'm Ana. I'd like availability from 2030-05-01 to 2030-05-04 for 2 guests. Area: Any area.");
    open.mockRestore();
  });

  it('renders the FAQ page', async () => {
    renderApp('/en/faq/');
    expect(await screen.findByRole('heading', { name: 'Frequently asked questions' })).toBeInTheDocument();
    expect(screen.getByText('What are the check-in and check-out times?')).toBeInTheDocument();
  });
});
