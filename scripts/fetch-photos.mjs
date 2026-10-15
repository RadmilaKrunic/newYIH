// Copies the example site's photos into src/photos/ so the app no longer
// depends on the old site. Safe to re-run: existing files are skipped.
//
//   npm run fetch-photos
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { apartments } from '../src/data/apartments.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'photos');
const base = process.env.VITE_REMOTE_PHOTO_BASE ?? 'https://your-italian-holidays.chirpyplume16.chatgpt.site/assets/';

// Files are renamed 01.jpg, 02.jpg... so they keep the example site's order.
const jobs = [
  ...['logo.png', 'bruna-doppiopetto.jpg', 'deposito-bagagli.jpg'].map((file) => ({ url: `${base}${file}`, dest: join(root, 'site', file) })),
  ...apartments.flatMap(({ folder, seedPhotos }) =>
    seedPhotos.map((file, i) => ({
      url: `${base}${folder}/${file}`,
      dest: join(root, folder, `${String(i + 1).padStart(2, '0')}${file.slice(file.lastIndexOf('.'))}`),
    })),
  ),
];

let ok = 0;
let failed = 0;
for (const { url, dest } of jobs) {
  try {
    await access(dest);
    ok++;
    continue;
  } catch {
    // not downloaded yet
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
  } catch (err) {
    failed++;
    console.error(`Could not download ${url}: ${err.message}`);
  }
}
console.log(`${ok} photos in src/photos, ${failed} failed.`);
process.exitCode = failed ? 1 : 0;
