import { useTranslation } from 'react-i18next';
import { siteImage } from '../data/photos.js';

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true });
  return (
    <section id="esperienze" className="section services">
      <div className="container">
        <p className="eyebrow">{t('services.eyebrow')}</p>
        <h2 className="section-title">{t('services.title')}</h2>
        <ol className="service-grid">
          {items.map((s, i) => (
            <li key={s.title} className="service-card">
              <p className="service-kicker">
                {String(i + 1).padStart(2, '0')} / {s.kicker}
              </p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {i === 2 && (
                <img className="service-photo" src={siteImage('deposito-bagagli.jpg')} alt={t('services.photoAlt')} loading="lazy" />
              )}
            </li>
          ))}
        </ol>
        <p className="note">{t('services.note')}</p>
      </div>
    </section>
  );
}
