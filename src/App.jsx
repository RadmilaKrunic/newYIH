import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Faq from './pages/Faq.jsx';
import { langFromPath, pageFromPath } from './i18n/paths.js';
import { applySeo, seoFor } from './seo.js';

// Keeps the language, the <head> tags and the scroll position in step with the URL.
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const { i18n } = useTranslation();
  const lang = langFromPath(pathname);
  const page = pageFromPath(pathname);

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    applySeo(seoFor(i18n.getFixedT(lang), lang, page));
  }, [i18n, lang, page]);

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/en" element={<Home />} />
          <Route path="/en/faq" element={<Faq />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
