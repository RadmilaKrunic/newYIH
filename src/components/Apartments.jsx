import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apartments, mapUrl, ZONES } from '../data/apartments.js';
import { photosFor } from '../data/photos.js';
import Gallery from './Gallery.jsx';

const withPhotos = apartments.map((a) => ({ ...a, photos: photosFor(a) }));

export default function Apartments() {
  const { t } = useTranslation();
  const [zone, setZone] = useState('all');
  const [openId, setOpenId] = useState(null);

  const visible = useMemo(
    () => (zone === 'all' ? withPhotos : withPhotos.filter((a) => a.zone === zone)),
    [zone],
  );
  const opened = withPhotos.find((a) => a.id === openId);

  return (
    <section id="appartamenti" className="section apartments">
      <div className="container">
        <p className="eyebrow">{t('apartments.eyebrow')}</p>
        <h2 className="section-title">{t('apartments.title')}</h2>
        <p className="lead">{t('apartments.intro')}</p>

        <div className="filters" role="group" aria-label={t('apartments.filterLabel')}>
          {['all', ...ZONES].map((z) => (
            <button
              key={z}
              type="button"
              aria-pressed={zone === z}
              className={`chip${zone === z ? ' is-active' : ''}`}
              onClick={() => setZone(z)}
            >
              {z === 'all' ? t('apartments.all') : t(`apartments.zones.${z}`)}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="empty">{t('apartments.empty')}</p>
        ) : (
          <ul className="apartment-grid">
            {visible.map((a) => (
              <li key={a.id} className="apartment-card">
                <button type="button" className="card-media" onClick={() => setOpenId(a.id)}>
                  {a.photos[0] && (
                    <img src={a.photos[0]} alt={t('apartments.photoAlt', { name: a.name, n: 1 })} loading="lazy" />
                  )}
                  <span className="photo-count">{t('apartments.photos', { count: a.photos.length })}</span>
                </button>
                <div className="card-body">
                  <p className="card-zone">{t(`apartments.zones.${a.zone}`)}</p>
                  <h3>{a.name}</h3>
                  <p className="card-address">{a.address}</p>
                  <div className="card-actions">
                    <button type="button" className="link-button" onClick={() => setOpenId(a.id)}>
                      {t('apartments.open')}
                    </button>
                    <a href={mapUrl(a.address)} target="_blank" rel="noreferrer">{t('apartments.map')}</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {opened && <Gallery apartment={opened} onClose={() => setOpenId(null)} />}
    </section>
  );
}
