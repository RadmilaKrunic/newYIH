import { useTranslation } from 'react-i18next';
import { localSiteImage, siteImage } from '../data/photos.js';

// One photo per card, in card order, from src/photos/site/. Cards whose file is missing show no photo.
// The luggage photo also falls back to the example site until it is copied locally.
const SERVICE_PHOTOS = [
  'servizio-case-vacanze.jpg',
  'servizio-transfer.jpg',
  'deposito-bagagli.jpg',
  'servizio-tour.jpg',
  'servizio-gite.jpg',
  'servizio-esperienze.jpg',
  'servizio-eventi.jpg',
  'servizio-su-misura.jpg',
];

const servicePhoto = (i) => (i === 2 ? siteImage(SERVICE_PHOTOS[i]) : SERVICE_PHOTOS[i] && localSiteImage(SERVICE_PHOTOS[i]));
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
            {servicePhoto(i) && (
              <img className="luggage-photo" src={servicePhoto(i)} alt={i === 2 ? t('services.photoAlt') : s.title} loading="lazy" />
            )}
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
