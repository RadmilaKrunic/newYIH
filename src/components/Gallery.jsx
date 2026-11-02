import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mapEmbedUrl, mapUrl } from '../data/apartments.js';
import { whatsappUrl } from '../data/contact.js';

function Photo({ photo, alt }) {
  if (!photo.crop) return <img loading="lazy" src={photo.src} alt={alt} />;
  return (
    <div className="photo-crop" style={{ aspectRatio: photo.crop.ratio }}>
      <img loading="lazy" src={photo.src} alt={alt} style={{ marginTop: photo.crop.offset }} />
    </div>
  );
}

export default function Gallery({ home, onClose }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const { id, name, title, address, photos } = home;

  // No cleanup that closes the dialog: React's StrictMode runs effects twice in
  // development, and closing here fired onClose and shut the modal right after it opened.
  // Unmounting removes the dialog from the page, which closes it anyway.
  useEffect(() => {
    if (!ref.current.open) ref.current.showModal();
  }, []);

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="gallery-title">
      <button type="button" className="btn" onClick={() => ref.current.close()}>
        {t('apartments.close')}
      </button>
      <h2 id="gallery-title">{title}</h2>
      <p>
        {address} · {t('apartments.city')}
      </p>
      <div className="property-facts">
        <div className="eyebrow">{t('apartments.detailEyebrow')}</div>
        <h3>{t('apartments.spaces')}</h3>
        <p>{address}</p>
        <p>
          <strong>{t(`homes.${id}.facts`)}</strong>
        </p>
        <p>{t(`homes.${id}.description`)}</p>
        {address.includes('Tritone') && <p className="access-note">{t('apartments.accessNote')}</p>}
        <div className="location-block">
          <h3>{t('apartments.where')}</h3>
          <p>
            {address} · {t('apartments.city')}
          </p>
          {!showMap && (
            <button type="button" className="btn" onClick={() => setShowMap(true)}>
              {t('apartments.showMap')}
            </button>
          )}
          <a className="map-link" href={mapUrl(address)} target="_blank" rel="noopener noreferrer">
            {t('apartments.openMaps')}
          </a>
          <div className="map-frame">
            {showMap && (
              <iframe
                title={t('apartments.mapTitle', { address })}
                src={mapEmbedUrl(address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            )}
          </div>
        </div>
        <h3>{t('apartments.tailored')}</h3>
        <p>{t('apartments.tailoredText')}</p>
        <a className="btn" href={whatsappUrl(t('apartments.proposalMessage', { name }))} target="_blank" rel="noopener noreferrer">
          {t('apartments.proposal')}
        </a>
      </div>
      <div className="gallery-photos">
        {photos.map((photo, i) => (
          <Photo key={photo.src} photo={photo} alt={t('apartments.photoAlt', { name: title, n: i + 1 })} />
        ))}
      </div>
    </dialog>
  );
}
