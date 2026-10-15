// The list of apartments shown on the site.
//
// To add photos to an apartment, drop image files into src/photos/<folder>/.
// Files are shown in filename order (01.jpg, 02.jpg, ...). See README.md.
//
// `seedPhotos` are the original photos from the example site. They are used
// only while src/photos/<folder>/ is empty; run `npm run fetch-photos` once to
// copy them into the repo.
//
// Name and descriptions live in src/i18n/locales/<lang>.json under
// apartments.<id>, so every apartment can be translated.

const range = (n) => Array.from({ length: n }, (_, i) => `${i}.jpg`);

export const ZONES = ['trevi', 'spagna', 'veneto', 'prati', 'monti'];

export const apartments = [
  {
    id: 'domus-gabriella',
    name: 'Domus Gabriella',
    zone: 'monti',
    address: 'Via degli Ibernesi 7, Roma',
    folder: 'domus-gabriella',
    seedPhotos: ['04.jpg', '08.jpg', '03.jpg', '06.jpg', '25.jpg', '16.jpg', '32.jpg', '30.jpg'],
  },
  { id: 'noah', name: 'Noah Apartment', zone: 'trevi', address: 'Via del Tritone 53, Roma', folder: 'noah', seedPhotos: range(4) },
  { id: 'linda', name: 'Casa Linda', zone: 'trevi', address: 'Via del Tritone 53, Roma', folder: 'linda', seedPhotos: range(9) },
  { id: 'deluxe', name: 'Deluxe Apartment', zone: 'trevi', address: 'Via del Tritone 53, Roma', folder: 'deluxe', seedPhotos: range(9) },
  {
    id: 'veneto',
    name: 'Veneto Luxury Big Apartment',
    zone: 'veneto',
    address: 'Via Lombardia 14, Roma',
    folder: 'veneto',
    seedPhotos: ['1.jpg', '0.jpg', ...range(10).slice(2)],
  },
  { id: 'chloe', name: 'Chloè Apartment', zone: 'trevi', address: 'Via del Tritone 53, Roma', folder: 'chloe', seedPhotos: range(9) },
  { id: 'luxury', name: 'Trevi Luxury Apartment', zone: 'trevi', address: 'Via del Tritone 53, Roma', folder: 'luxury', seedPhotos: range(8) },
  { id: 'babuino72', name: 'Spagna Suite', zone: 'spagna', address: 'Via del Babuino 72, Roma', folder: 'babuino72', seedPhotos: range(10) },
  { id: 'maya', name: 'Domus Maya Apartment', zone: 'monti', address: 'Via dei Quattro Cantoni, Roma', folder: 'maya', seedPhotos: range(10) },
  { id: 'babuino164', name: 'Spagna Suite 2', zone: 'spagna', address: 'Via del Babuino 164, Roma', folder: 'babuino164', seedPhotos: range(10) },
  { id: 'vatican', name: 'Vatican Apartment', zone: 'prati', address: 'Via Costantino Morin 27, Roma', folder: 'vatican', seedPhotos: range(10) },
  { id: 'barberini', name: 'New Suite Barberini', zone: 'veneto', address: 'Via Emilia 47, Roma', folder: 'barberini', seedPhotos: range(10) },
];

export const mapUrl = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
