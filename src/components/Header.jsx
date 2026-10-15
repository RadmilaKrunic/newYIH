import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { siteImage } from '../data/photos.js';

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={close}>
          <img src={siteImage('logo.png')} alt="" className="brand-logo" onError={(e) => (e.currentTarget.hidden = true)} />
          <span>Your Italian Holidays</span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {t('nav.menu')}
        </button>
        <nav id="main-nav" className={`main-nav${open ? ' is-open' : ''}`}>
          <Link to="/#appartamenti" onClick={close}>{t('nav.apartments')}</Link>
          <Link to="/#esperienze" onClick={close}>{t('nav.services')}</Link>
          <Link to="/#bruna" onClick={close}>{t('nav.about')}</Link>
          <Link to="/faq" onClick={close}>{t('nav.faq')}</Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
