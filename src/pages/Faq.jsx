import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { contact, whatsappUrl } from '../data/contact.js';

export default function Faq() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true });
  return (
    <section className="section faq">
      <div className="container narrow">
        <Link to="/" className="back-link">{t('faq.back')}</Link>
        <h1 className="section-title">{t('faq.title')}</h1>
        <p className="lead">{t('faq.intro')}</p>
        <div className="faq-list">
          {items.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <p className="faq-outro">
          {t('faq.intro2')}{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> ·{' '}
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a>
        </p>
      </div>
    </section>
  );
}
