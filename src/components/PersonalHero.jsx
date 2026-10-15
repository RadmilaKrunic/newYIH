import { useTranslation } from 'react-i18next';
import { siteImage } from '../data/photos.js';

export default function PersonalHero() {
  const { t } = useTranslation();
  return (
    <div className="hero personal-hero">
      <div className="hero-content">
        <div className="eyebrow">{t('hero.eyebrow')}</div>
        <h1>
          {t('hero.title')}
          <br />
          <em>
            {t('hero.titleEm1')}
            <br />
            {t('hero.titleEm2')}
          </em>
        </h1>
        <p>{t('hero.p1')}</p>
        <p>{t('hero.p2')}</p>
        <a className="btn booking" href="#appartamenti">{t('hero.cta')}</a>
      </div>
      <div className="portrait">
        <img src={siteImage('bruna-doppiopetto.jpg')} alt={t('hero.photoAlt')} fetchPriority="high" />
        <span>{t('hero.badge')}</span>
      </div>
    </div>
  );
}
