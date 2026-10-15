import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { siteImage } from '../data/photos.js';
import { localePath } from '../i18n/paths.js';

export default function Header() {
  const { t, i18n } = useTranslation();
  const home = localePath(i18n.resolvedLanguage);
  return (
    <header>
      <Link to={home} aria-label={t('nav.home')}>
        <img src={siteImage('logo.png')} alt="Your Italian Holidays" width="240" height="128" />
      </Link>
      <nav>
        <Link to={`${home}#appartamenti`}>{t('nav.apartments')}</Link>
        <Link to={`${home}#esperienze`}>{t('nav.services')}</Link>
        <Link to={`${home}#bruna`}>{t('nav.about')}</Link>
        <Link to={localePath(i18n.resolvedLanguage, 'faq')}>{t('nav.faq')}</Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
