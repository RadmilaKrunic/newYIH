// Resolves the photo list for each apartment and for the site itself.
//
// Local files in src/photos/ always win. Vite picks up every image in that
// folder at build time, so adding a photo is just adding a file.

const localFiles = import.meta.glob('../photos/**/*.{jpg,jpeg,png,webp,avif,svg,JPG,JPEG,PNG,WEBP,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const DEFAULT_REMOTE_BASE = 'https://your-italian-holidays.chirpyplume16.chatgpt.site/assets/';
const remoteBase = import.meta.env?.VITE_REMOTE_PHOTO_BASE ?? DEFAULT_REMOTE_BASE;

const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true });

/** Returns the URLs of local images in src/photos/<folder>/, sorted by filename. */
export function localPhotos(folder, files = localFiles) {
  const prefix = `../photos/${folder}/`;
  return Object.keys(files)
    .filter((path) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
    .sort(byName)
    .map((path) => files[path]);
}

/**
 * The apartment's photos as { src, crop } objects: local files if there are any,
 * otherwise the seed photos from the example site (with the example's crops).
 */
export function photosFor({ folder, seedPhotos = [], seedCrops = [] }, files = localFiles, base = remoteBase) {
  const local = localPhotos(folder, files);
  if (local.length > 0) return local.map((src) => ({ src }));
  return seedPhotos.map((file, i) => ({ src: `${base}${folder}/${file}`, crop: seedCrops[i] }));
}

/** A single site image (logo, founder photo...) stored at src/photos/site/<file>. */
export function siteImage(file, files = localFiles, base = remoteBase) {
  return files[`../photos/site/${file}`] ?? `${base}${file}`;
}

/** A site image only if it exists in src/photos/site/, otherwise undefined (no remote fallback). */
export function localSiteImage(file, files = localFiles) {
  return files[`../photos/site/${file}`];
}

const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP'];

/**
 * An image for the weddings & special moments page from src/photos/moments/:
 * a photo (<name>.jpg/.png/.webp) wins over the drawn placeholder (<name>.svg),
 * then `fallback` (a site image name) is used. See src/photos/moments/README.md.
 */
export function momentsImage(name, fallback, files = localFiles) {
  for (const ext of PHOTO_EXTENSIONS) {
    const photo = files[`../photos/moments/${name}.${ext}`];
    if (photo) return { src: photo, isPhoto: true };
  }
  const drawn = files[`../photos/moments/${name}.svg`] ?? (fallback && localSiteImage(fallback, files));
  return drawn ? { src: drawn, isPhoto: false } : undefined;
}
