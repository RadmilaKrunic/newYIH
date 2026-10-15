import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LANGUAGES } from '../i18n/index.js';
import { localePath, pageFromPath } from '../i18n/paths.js';

// Real links (not buttons) so search engines can follow them to the other language.
export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const { pathname, hash } = useLocation();
  const page = pageFromPath(pathname);
  const current = i18n.resolvedLanguage;
  return (
    <div className="lang-switch" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map(({ code, label, name }) => (
        <Link
          key={code}
          to={`${localePath(code, page)}${hash}`}
          lang={code}
          hrefLang={code}
          title={name}
          aria-current={current === code ? 'true' : undefined}
          className={current === code ? 'active' : undefined}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
