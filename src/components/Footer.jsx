import { useTranslation } from 'react-i18next';
import { contact, whatsappUrl } from '../data/contact.js';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">Your Italian Holidays</p>
          <p>{t('footer.tagline')}</p>
        </div>
        <div className="footer-links">
          <a href={contact.currentSite} target="_blank" rel="noreferrer">{t('footer.currentSite')}</a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">{t('footer.whatsapp')}</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Your Italian Holidays</p>
      </div>
    </footer>
  );
}
