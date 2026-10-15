import { describe, expect, it } from 'vitest';
import it_ from '../i18n/locales/it.json';
import en from '../i18n/locales/en.json';
import { ZONES } from '../data/apartments.js';

const shape = (value) => {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, shape(value[k])]));
  }
  return typeof value;
};

describe('translations', () => {
  it('English has exactly the same keys as Italian', () => {
    expect(shape(en)).toEqual(shape(it_));
  });

  it('every zone has a label', () => {
    for (const zone of ZONES) {
      expect(it_.apartments.zones[zone]).toBeTruthy();
      expect(en.apartments.zones[zone]).toBeTruthy();
    }
  });
});
