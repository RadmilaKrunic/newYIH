# Photos

Each apartment has a folder here, named after its `folder` in `src/data/apartments.js`
(for example `noah/`, `vatican/`). Site images (logo, founder photo, luggage storage) live in `site/`.

**To add photos:** drop `.jpg`, `.png` or `.webp` files into the apartment's folder.
They appear in filename order, so name them `01.jpg`, `02.jpg`, ... The first one is the card cover.

While a folder is empty, the site shows the original photos from the example site.
Run `npm run fetch-photos` once to copy those into this folder.
