import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { siteImage } from '../data/photos.js';

export default function Header() {
  const { t } = useTranslation();
  return (
    <header>
      <Link to="/" aria-label={t('nav.home')}>
        <img src={siteImage('logo.png')} alt="Your Italian Holidays" />
      </Link>
      <nav>
        <Link to="/#appartamenti">{t('nav.apartments')}</Link>
        <Link to="/#esperienze">{t('nav.services')}</Link>
        <Link to="/#bruna">{t('nav.about')}</Link>
        <Link to="/faq">{t('nav.faq')}</Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
