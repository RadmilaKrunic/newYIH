import { useTranslation } from 'react-i18next';
import { siteImage } from '../data/photos.js';
import { whatsappUrl } from '../data/contact.js';

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true });
  return (
    <section className="service-section" id="esperienze">
      <div className="eyebrow">{t('services.eyebrow')}</div>
      <h2>
        {t('services.title1')}
        <br />
        {t('services.title2')}
      </h2>
      <p className="service-intro">{t('services.intro')}</p>
      <div className="services">
        {items.map((s, i) => (
          <article key={s.title}>
            <span>
              {String(i + 1).padStart(2, '0')} / {s.kicker}
            </span>
            <h3>{s.title}</h3>
            {i === 2 && <img className="luggage-photo" src={siteImage('deposito-bagagli.jpg')} alt={t('services.photoAlt')} loading="lazy" />}
            <p>{s.text}</p>
          </article>
        ))}
      </div>
      <p className="service-note">{t('services.note')}</p>
      <a className="btn" style={{ marginTop: 20 }} href={whatsappUrl(t('services.ctaMessage'))} target="_blank" rel="noopener noreferrer">
        {t('services.cta')}
      </a>
    </section>
  );
}
