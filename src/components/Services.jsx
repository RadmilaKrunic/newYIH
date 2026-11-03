import { useTranslation } from 'react-i18next';
import { localSiteImage, siteImage } from '../data/photos.js';
import { whatsappUrl } from '../data/contact.js';
import { useSiteConfig } from '../siteConfig.js';

// One image per card, in card order, from src/photos/site/. A photo (<name>.jpg) wins over the
// drawn illustration (<name>.svg); the luggage card falls back to the example site's photo.
const SERVICE_IMAGES = [
  'servizio-case-vacanze',
  'servizio-transfer',
  'deposito-bagagli',
  'servizio-tour',
  'servizio-gite',
  'servizio-esperienze',
  'servizio-eventi',
  'servizio-su-misura',
];

const LUGGAGE = 2;

// The luggage card always keeps its photo; the other cards' images follow the
// showServiceIllustrations switch in site-config.json.
const serviceImage = (i, showOthers) => {
  const name = SERVICE_IMAGES[i];
  if (!name || (i !== LUGGAGE && !showOthers)) return undefined;
  const local = localSiteImage(`${name}.jpg`) ?? localSiteImage(`${name}.svg`);
  return local ?? (i === LUGGAGE ? siteImage(`${name}.jpg`) : undefined);
};

export default function Services() {
  const { t } = useTranslation();
  const { showServiceIllustrations } = useSiteConfig();
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
            {serviceImage(i, showServiceIllustrations) && (
              <img className="luggage-photo" src={serviceImage(i, showServiceIllustrations)} alt={i === LUGGAGE ? t('services.photoAlt') : s.title} loading="lazy" />
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
