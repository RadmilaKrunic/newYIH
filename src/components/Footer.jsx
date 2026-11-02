import { useTranslation } from 'react-i18next';
import { contact, whatsappUrl } from '../data/contact.js';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <footer>
        <div>
          <strong>Your Italian Holidays</strong>
          <br />
          {t('footer.tagline')}
        </div>
        <div>
          <a href={contact.currentSite} target="_blank" rel="noopener noreferrer">{t('footer.currentSite')}</a>
          <br />
          <span suppressHydrationWarning>© {new Date().getFullYear()} Your Italian Holidays</span>
        </div>
      </footer>
      <a className="btn float" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
        {t('footer.whatsapp')}
      </a>
    </>
  );
}
