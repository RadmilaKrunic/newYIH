import { describe, expect, it } from 'vitest';
import { localPhotos, photosFor, siteImage } from '../data/photos.js';

const base = 'https://example.test/assets/';

describe('photosFor', () => {
  it('uses the seed photos, with their crops, while the folder has no local files', () => {
    const crop = { ratio: '1/1', offset: '-10%' };
    expect(photosFor({ folder: 'noah', seedPhotos: ['0.jpg', '1.jpg'], seedCrops: [undefined, crop] }, {}, base)).toEqual([
      { src: `${base}noah/0.jpg`, crop: undefined },
      { src: `${base}noah/1.jpg`, crop },
    ]);
  });

  it('prefers local files, sorted by number, and ignores other folders', () => {
    const files = {
      '../photos/noah/10.jpg': '/n10',
      '../photos/noah/2.jpg': '/n2',
      '../photos/noah/extra/1.jpg': '/nested',
      '../photos/noah-2/1.jpg': '/other',
    };
    expect(photosFor({ folder: 'noah', seedPhotos: ['0.jpg'] }, files, base)).toEqual([{ src: '/n2' }, { src: '/n10' }]);
    expect(localPhotos('noah-2', files)).toEqual(['/other']);
  });
});

describe('siteImage', () => {
  it('falls back to the remote image when there is no local copy', () => {
    expect(siteImage('logo.png', {}, base)).toBe(`${base}logo.png`);
    expect(siteImage('logo.png', { '../photos/site/logo.png': '/logo' }, base)).toBe('/logo');
  });
});
