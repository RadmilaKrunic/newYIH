import { useTranslation } from 'react-i18next';
import { apartments } from '../data/apartments.js';
import { photosFor } from '../data/photos.js';

const heroImage = photosFor(apartments.find((a) => a.id === 'luxury'))[0];

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero" style={{ '--hero-image': `url("${heroImage}")` }}>
      <div className="container hero-inner">
        <p className="eyebrow">{t('hero.eyebrow')}</p>
        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>
        <p className="hero-text">{t('hero.text')}</p>
        <a href="#appartamenti" className="btn btn-primary">{t('hero.cta')}</a>
      </div>
    </section>
  );
}
