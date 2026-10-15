# Your Italian Holidays

React + Vite site for Your Italian Holidays (Rome holiday apartments and services), in Italian and English.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit + component tests
npm run build      # production build in dist/
```

## Adding photos

Drop image files into `src/photos/<apartment-folder>/` (for example `src/photos/vatican/11.jpg`).
They show up automatically in that apartment's gallery, in filename order; the first is the card cover.
Folder names are the `folder` field in `src/data/apartments.js`. Site images (logo, founder photo) go in `src/photos/site/`.

Until a folder has local files, the site shows the original photos from the example site.
Run `npm run fetch-photos` once to copy all of them into `src/photos/` and commit them,
so the site no longer depends on the example site.

## Adding an apartment

Add an entry to `src/data/apartments.js` (`id`, `name`, `zone`, `address`, `folder`) and put its photos in `src/photos/<folder>/`.

## Languages

Texts live in `src/i18n/locales/it.json` and `en.json` (same keys in both; a test checks this).
The chosen language is remembered in the browser. To add a language, copy `it.json`, translate it,
and register it in `src/i18n/index.js`.
