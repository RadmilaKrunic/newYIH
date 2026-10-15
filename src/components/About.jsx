import { useTranslation } from 'react-i18next';
import { siteImage } from '../data/photos.js';

export default function About() {
  const { t } = useTranslation();
  const highlights = t('about.highlights', { returnObjects: true });
  return (
    <section id="bruna" className="section about">
      <div className="container about-grid">
        <img className="about-photo" src={siteImage('bruna-doppiopetto.jpg')} alt={t('about.photoAlt')} loading="lazy" />
        <div>
          <p className="eyebrow">{t('about.eyebrow')}</p>
          <h2 className="section-title">{t('about.title')}</h2>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
        </div>
      </div>
      <div className="container">
        <ul className="highlights">
          {highlights.map((h) => (
            <li key={h.title}>
              <strong>{h.title}</strong>
              <span>{h.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
