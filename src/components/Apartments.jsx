import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apartments, mapUrl, ZONES } from '../data/apartments.js';
import { photosFor } from '../data/photos.js';
import { whatsappUrl } from '../data/contact.js';
import Gallery from './Gallery.jsx';

const homes = apartments.map((a) => ({ ...a, photos: photosFor(a) }));

export default function Apartments() {
  const { t } = useTranslation();
  const [zone, setZone] = useState('all');
  const [openId, setOpenId] = useState(null);

  const visible = zone === 'all' ? homes : homes.filter((h) => h.zone === zone);
  const opened = homes.find((h) => h.id === openId);

  return (
    <section id="appartamenti" style={{ paddingTop: 25 }}>
      <div className="section-top">
        <div>
          <div className="eyebrow">{t('apartments.eyebrow')}</div>
          <h2>{t('apartments.title')}</h2>
        </div>
        <p>{t('apartments.tagline')}</p>
      </div>
      <div className="filters" aria-label={t('apartments.filterLabel')}>
        {['all', ...ZONES].map((z) => (
          <button key={z} type="button" className={zone === z ? 'active' : undefined} aria-pressed={zone === z} onClick={() => setZone(z)}>
            {z === 'all' ? t('apartments.all') : t(`apartments.zones.${z}`)}
          </button>
        ))}
      </div>
      <div className="grid" id="properties">
        {visible.map((h) => (
          <article key={h.id} className="card">
            {h.photos[0] && (
              <button type="button" className="photo-button" onClick={() => setOpenId(h.id)} aria-label={t('apartments.openPhotos', { name: h.name })}>
                <img loading="lazy" src={h.photos[0].src} alt={t('apartments.coverAlt', { name: h.name })} />
              </button>
            )}
            <div className="body">
              <div className="place">
                {t(`apartments.zones.${h.zone}`)} · {t('apartments.city')}
              </div>
              <h3>{h.name}</h3>
              <p>
                {h.address}
                <br />
                {t(`homes.${h.id}.description`)}
              </p>
              <div className="detail">{t(`homes.${h.id}.facts`)}</div>
              <a className="map-card-link" href={mapUrl(h.address)} target="_blank" rel="noopener noreferrer">
                {t('apartments.map')}
              </a>
              <button type="button" className="btn" onClick={() => setOpenId(h.id)}>
                {t('apartments.open')}
              </button>
              <a href={whatsappUrl(t('apartments.askDetailsMessage', { name: h.name }))} target="_blank" rel="noopener noreferrer">
                {t('apartments.askDetails')}
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="notice">{t('apartments.notice')}</p>
      {opened && <Gallery home={opened} onClose={() => setOpenId(null)} />}
    </section>
  );
}
