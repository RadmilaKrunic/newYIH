import { useTranslation } from 'react-i18next';
import { whatsappUrl } from '../data/contact.js';

export default function Faq() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true });
  return (
    <div className="faq-main">
      <div className="eyebrow">{t('faq.eyebrow')}</div>
      <h1>{t('faq.title')}</h1>
      <p className="faq-intro">
        {t('faq.intro')}
        <br />
        {t('faq.intro2')}
      </p>
      <div className="faq-list">
        {items.map((item) => (
          // Open by default, as on the example site; visitors can still collapse each one.
          <details key={item.q} open>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <div className="faq-help">
        <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{t('faq.write')}</a>
      </div>
    </div>
  );
}
