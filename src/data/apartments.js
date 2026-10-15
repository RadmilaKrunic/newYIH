// The apartments shown on the site, in the example site's order.
//
// To add photos to an apartment, drop image files into src/photos/<folder>/.
// Files are shown in filename order (01.jpg, 02.jpg, ...); the first is the card cover.
// See src/photos/README.md.
//
// `seedPhotos` are the original photos from the example site. They are used
// only while src/photos/<folder>/ is empty; run `npm run fetch-photos` once to
// copy them into the repo.
//
// Description and capacity text live in src/i18n/locales/<lang>.json under
// homes.<id>, so every apartment can be translated.

const range = (n) => Array.from({ length: n }, (_, i) => `${i}.jpg`);

export const ZONES = ['trevi', 'spagna', 'veneto', 'prati', 'monti'];

// Some example-site photos are cropped (ratio = visible box, offset = how far the image is moved up).
const TALL = { ratio: '1290/1935', offset: '-33.3333%' };
const WIDE = { ratio: '1290/858', offset: '-75.1163%' };

export const apartments = [
  { id: 'noah', name: 'Noah', title: 'Noah Apartment', zone: 'trevi', address: 'Via del Tritone 53', folder: 'noah', seedPhotos: range(4) },
  { id: 'chloe', name: 'Chloè', title: 'Chloè Apartment', zone: 'trevi', address: 'Via del Tritone 53', folder: 'chloe', seedPhotos: range(9) },
  { id: 'luxury', name: 'Trevi Luxury', title: 'Trevi Luxury Apartment', zone: 'trevi', address: 'Via del Tritone 53', folder: 'luxury', seedPhotos: range(8) },
  { id: 'linda', name: 'Linda', title: 'Casa Linda', zone: 'trevi', address: 'Via del Tritone 53', folder: 'linda', seedPhotos: range(9) },
  { id: 'deluxe', name: 'Deluxe', title: 'Deluxe Apartment', zone: 'trevi', address: 'Via del Tritone 53', folder: 'deluxe', seedPhotos: range(9) },
  { id: 'babuino72', name: 'Spagna Suite · Babuino 72', title: 'Spagna Suite', zone: 'spagna', address: 'Via del Babuino 72', folder: 'babuino72', seedPhotos: range(10) },
  { id: 'babuino164', name: 'Spagna Suite · Babuino 164', title: 'Spagna Suite 2', zone: 'spagna', address: 'Via del Babuino 164', folder: 'babuino164', seedPhotos: range(10) },
  {
    id: 'veneto',
    name: 'Veneto Luxury Big Apartment',
    title: 'Veneto Luxury Big Apartment',
    zone: 'veneto',
    address: 'Via Lombardia 14',
    folder: 'veneto',
    seedPhotos: ['1.jpg', '0.jpg', ...range(10).slice(2)],
  },
  { id: 'barberini', name: 'New Suite Barberini', title: 'New Suite Barberini', zone: 'veneto', address: 'Via Emilia 47', folder: 'barberini', seedPhotos: range(10) },
  { id: 'vatican', name: 'Vaticano · Prati', title: 'Vatican Apartment', zone: 'prati', address: 'Via Costantino Morin 27', folder: 'vatican', seedPhotos: range(10) },
  {
    id: 'gabriella',
    name: 'Domus Gabriella',
    title: 'Domus Gabriella',
    zone: 'monti',
    address: 'Via degli Ibernesi 7',
    folder: 'domus-gabriella',
    seedPhotos: ['04.jpg', '08.jpg', '03.jpg', '06.jpg', '25.jpg', '16.jpg', '32.jpg', '30.jpg'],
  },
  {
    id: 'maya',
    name: 'Domus Maya',
    title: 'Domus Maya Apartment',
    zone: 'monti',
    address: 'Via dei Quattro Cantoni 6',
    folder: 'maya',
    seedPhotos: range(10),
    seedCrops: [TALL, WIDE, TALL, WIDE, WIDE, { ratio: '1290/1934', offset: '-33.4109%' }, TALL, WIDE, WIDE, TALL],
  },
];

export const mapQuery = (address) => `${address}, Roma, Italia`;
export const mapUrl = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery(address))}`;
export const mapEmbedUrl = (address) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery(address))}&output=embed`;
