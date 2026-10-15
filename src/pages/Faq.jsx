import { useTranslation } from 'react-i18next';
import { whatsappUrl } from '../data/contact.js';

export default function Faq() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true });
  return (
    <div className="faq-main">
      <div className="eyebrow">{t('faq.eyebrow')}</div>
      <h1>{t('faq.title')}</h1>
      <p className="faq-intro">{t('faq.intro')}</p>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <div className="faq-help">
        <p>{t('faq.help')}</p>
        <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{t('faq.write')}</a>
      </div>
    </div>
  );
}
