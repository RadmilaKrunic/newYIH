import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mapUrl } from '../data/apartments.js';

export default function Gallery({ apartment, onClose }) {
  const { t } = useTranslation();
  const { name, address, photos } = apartment;
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);
  const total = photos.length;

  const go = useCallback((step) => setIndex((i) => (i + step + total) % total), [total]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previousFocus?.focus?.();
    };
  }, [go, onClose]);

  return (
    <div className="gallery-backdrop" onClick={onClose}>
      <div
        className="gallery"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="gallery-header">
          <div>
            <h3 id="gallery-title">{name}</h3>
            <p>
              {address} · <a href={mapUrl(address)} target="_blank" rel="noreferrer">{t('apartments.map')}</a>
            </p>
          </div>
          <button ref={closeRef} type="button" className="btn btn-ghost" onClick={onClose}>
            {t('apartments.close')}
          </button>
        </header>

        {total > 0 && (
          <div className="gallery-stage">
            <img src={photos[index]} alt={t('apartments.photoAlt', { name, n: index + 1 })} />
            {total > 1 && (
              <>
                <button type="button" className="gallery-nav prev" aria-label={t('apartments.prev')} onClick={() => go(-1)}>‹</button>
                <button type="button" className="gallery-nav next" aria-label={t('apartments.next')} onClick={() => go(1)}>›</button>
              </>
            )}
            <p className="gallery-counter">{t('apartments.counter', { n: index + 1, total })}</p>
          </div>
        )}

        <ul className="gallery-thumbs">
          {photos.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                aria-current={i === index}
                aria-label={t('apartments.photoAlt', { name, n: i + 1 })}
                onClick={() => setIndex(i)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
