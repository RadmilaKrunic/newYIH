# Photos

Each apartment has a folder here, named after its `folder` in `src/data/apartments.js`
(for example `noah/`, `vatican/`). Site images (logo, founder photo, luggage storage) live in `site/`.

| Folder | Apartment | Address |
|---|---|---|
| `noah/` | Noah Apartment | Via del Tritone 53 |
| `chloe/` | Chloè Apartment | Via del Tritone 53 |
| `luxury/` | Trevi Luxury Apartment | Via del Tritone 53 |
| `linda/` | Casa Linda | Via del Tritone 53 |
| `deluxe/` | Deluxe Apartment | Via del Tritone 53 |
| `babuino72/` | Spagna Suite | Via del Babuino 72 |
| `babuino164/` | Spagna Suite 2 | Via del Babuino 164 |
| `veneto/` | Veneto Luxury Big Apartment | Via Lombardia 14 |
| `barberini/` | New Suite Barberini | Via Emilia 47 |
| `vatican/` | Vatican Apartment | Via Costantino Morin 27 |
| `domus-gabriella/` | Domus Gabriella | Via degli Ibernesi 7 |
| `maya/` | Domus Maya Apartment | Via dei Quattro Cantoni 6 |

**To add photos:** drop `.jpg`, `.png` or `.webp` files into the apartment's folder.
They appear in filename order, so name them `01.jpg`, `02.jpg`, ... The first one is the card cover.

While a folder is empty, the site shows the original photos from the example site.
Run `npm run fetch-photos` once to copy those into this folder.
