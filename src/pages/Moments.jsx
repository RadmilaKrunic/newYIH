import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { apartments, ZONES } from '../data/apartments.js';
import { whatsappUrl } from '../data/contact.js';
import { momentsImage, photosFor, siteImage } from '../data/photos.js';
import { localePath } from '../i18n/paths.js';
import '../moments.css';

// "Your Special Moments in Rome": intimate weddings, celebrations and tailor-made stays.
// Text: src/i18n/locales/moments/<lang>.json. Photos: src/photos/moments/ (see its README).

const SECTION_IMAGES = {
  weddings: ['matrimoni'],
  celebrations: ['sorprese'],
  'tailor-made': ['su-misura', 'servizio-esperienze.svg'],
};

const EVENT_TYPES = ['wedding', 'proposal', 'birthday', 'anniversary', 'honeymoon', 'family', 'stay', 'other'];
const NIGHTS = Array.from({ length: 14 }, (_, i) => i + 1);

function Picture({ image, alt, className, priority }) {
  if (!image) return null;
  return (
    <div className={`moments-picture${image.isPhoto ? ' is-photo' : ''}${className ? ` ${className}` : ''}`}>
      <img src={image.src} alt={alt} loading={priority ? undefined : 'lazy'} fetchPriority={priority ? 'high' : undefined} />
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <div className="moments-hero">
      <div className="moments-hero-text">
        <div className="eyebrow">{t('moments.hero.eyebrow')}</div>
        <h1>
          {t('moments.hero.title')} <em>{t('moments.hero.titleEm')}</em>
        </h1>
        <p className="moments-subtitle">{t('moments.hero.subtitle')}</p>
        <div className="moments-actions">
          <a className="btn" href="#richiesta">{t('moments.hero.cta')}</a>
          <a className="moments-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            {t('moments.hero.whatsapp')} ↗
          </a>
        </div>
      </div>
      <Picture image={momentsImage('hero', 'servizio-tour.svg')} alt={t('moments.hero.imageAlt')} className="moments-hero-picture" priority />
    </div>
  );
}

function Intro() {
  const { t } = useTranslation();
  return (
    <section className="moments-intro">
      <h2>{t('moments.intro.title')}</h2>
      {t('moments.intro.paragraphs', { returnObjects: true }).map((p) => (
        <p key={p}>{p}</p>
      ))}
      <p className="moments-closing">{t('moments.intro.closing')}</p>
    </section>
  );
}

function Bruna() {
  const { t } = useTranslation();
  return (
    <section className="moments-bruna" id="bruna">
      <figure className="moments-portrait">
        <img src={siteImage('bruna-doppiopetto.png')} alt={t('moments.bruna.photoAlt')} loading="lazy" />
        <figcaption>
          {t('moments.bruna.caption')}
          <small>{t('moments.bruna.role')}</small>
        </figcaption>
      </figure>
      <div>
        <div className="eyebrow">{t('moments.bruna.eyebrow')}</div>
        <h2>{t('moments.bruna.title')}</h2>
        {t('moments.bruna.paragraphs', { returnObjects: true }).map((p) => (
          <p key={p}>{p}</p>
        ))}
        <blockquote>{t('moments.bruna.quote')}</blockquote>
      </div>
    </section>
  );
}

function Feature({ section, index }) {
  const [name, fallback] = SECTION_IMAGES[section.id] ?? [];
  return (
    <section className={`moments-feature${index % 2 ? ' is-reversed' : ''}`} id={section.id}>
      <Picture image={momentsImage(name, fallback)} alt={section.imageAlt} />
      <div>
        <div className="eyebrow">{section.eyebrow}</div>
        <h2>{section.title}</h2>
        {section.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {section.listTitle && <p className="moments-list-title">{section.listTitle}</p>}
        {section.list.length > 0 && (
          <ul className="moments-list">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.after.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {section.highlight && <p className="moments-highlight">{section.highlight}</p>}
      </div>
    </section>
  );
}

// One card per area: how many apartments, whether they share a building, and a cover photo.
const zoneGroups = () =>
  ZONES.map((zone) => {
    const homes = apartments.filter((a) => a.zone === zone);
    const sameBuilding = homes.length > 1 && new Set(homes.map((a) => a.address)).size === 1;
    return { zone, homes, sameBuilding, cover: photosFor(homes[0])[0]?.src };
  }).filter((g) => g.homes.length > 0);

function Stay() {
  const { t, i18n } = useTranslation();
  const home = localePath(i18n.resolvedLanguage);
  return (
    <section className="moments-stay" id="soggiorno">
      <div className="moments-stay-text">
        <div className="eyebrow">{t('moments.stay.eyebrow')}</div>
        <h2>{t('moments.stay.title')}</h2>
        {t('moments.stay.paragraphs', { returnObjects: true }).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <ul className="moments-zones">
        {zoneGroups().map(({ zone, homes, sameBuilding, cover }) => (
          <li key={zone}>
            <Link to={`${home}#appartamenti`}>
              {cover && <img src={cover} alt="" loading="lazy" />}
              <div>
                <h3>{t(`apartments.zones.${zone}`)}</h3>
                <p className="moments-zone-count">
                  {t('moments.stay.zoneCount', { count: homes.length })}
                  {sameBuilding && ` · ${t('moments.stay.sameBuilding')}`}
                </p>
                <p className="moments-zone-names">{homes.map((a) => a.title).join(' · ')}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link className="btn" to={`${home}#appartamenti`}>{t('moments.stay.link')}</Link>
    </section>
  );
}

function Budget() {
  const { t } = useTranslation();
  return (
    <section className="moments-budget">
      <h2>{t('moments.budget.title')}</h2>
      {t('moments.budget.paragraphs', { returnObjects: true }).map((p) => (
        <p key={p}>{p}</p>
      ))}
    </section>
  );
}

function Faq() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);
  const uid = useId();
  return (
    <section className="moments-faq" id="faq">
      <div className="eyebrow">{t('moments.faq.eyebrow')}</div>
      <h2>{t('moments.faq.title')}</h2>
      <ul className="faq-questions">
        {t('moments.faq.items', { returnObjects: true }).map((item, i) => {
          const isOpen = open === i;
          const answerId = `${uid}-a${i}`;
          return (
            <li key={item.q} className={isOpen ? 'is-open' : undefined}>
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </button>
              </h3>
              <div id={answerId} className="faq-answer" hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Enquiry() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ type: 'wedding', date: '', guests: '2', nights: '0', budget: '', name: '', idea: '' });
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const nightsLabel = (n) => {
    if (n === '0') return t('moments.enquiry.noStay');
    if (n === 'more') return t('moments.enquiry.nightsMore');
    return t('moments.enquiry.nightsOption', { count: Number(n) });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const unspecified = t('moments.enquiry.unspecified');
    const message = t('moments.enquiry.message', {
      name: form.name.trim(),
      type: t(`moments.enquiry.types.${form.type}`),
      date: form.date.trim() || unspecified,
      guests: form.guests || unspecified,
      nights: nightsLabel(form.nights),
      budget: form.budget.trim() || unspecified,
      idea: form.idea.trim(),
    }).trim();
    window.open(whatsappUrl(message), '_blank', 'noopener');
  };

  return (
    <section className="contact moments-enquiry" id="richiesta">
      <div>
        <div className="eyebrow">{t('moments.enquiry.eyebrow')}</div>
        <h2>{t('moments.enquiry.title')}</h2>
        {t('moments.enquiry.paragraphs', { returnObjects: true }).map((p) => (
          <p key={p}>{p}</p>
        ))}
        <div className="signature">{t('moments.enquiry.signature')}</div>
        <p className="moments-signature-role">{t('moments.enquiry.signatureRole')}</p>
      </div>
      <form onSubmit={onSubmit}>
        <label className="wide">
          {t('moments.enquiry.type')}
          <select value={form.type} onChange={update('type')}>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>{t(`moments.enquiry.types.${type}`)}</option>
            ))}
          </select>
        </label>
        <label>
          {t('moments.enquiry.date')}
          <input placeholder={t('moments.enquiry.datePlaceholder')} value={form.date} onChange={update('date')} />
        </label>
        <label>
          {t('moments.enquiry.guests')}
          <input type="number" min="1" max="200" inputMode="numeric" value={form.guests} onChange={update('guests')} />
        </label>
        <label>
          {t('moments.enquiry.nights')}
          <select value={form.nights} onChange={update('nights')}>
            {['0', ...NIGHTS.map(String), 'more'].map((n) => (
              <option key={n} value={n}>{nightsLabel(n)}</option>
            ))}
          </select>
        </label>
        <label>
          {t('moments.enquiry.budget')}
          <input placeholder={t('moments.enquiry.budgetPlaceholder')} value={form.budget} onChange={update('budget')} />
        </label>
        <label className="wide">
          {t('moments.enquiry.name')}
          <input autoComplete="given-name" placeholder={t('moments.enquiry.namePlaceholder')} required value={form.name} onChange={update('name')} />
        </label>
        <label className="wide">
          {t('moments.enquiry.idea')}
          <textarea rows="4" placeholder={t('moments.enquiry.ideaPlaceholder')} value={form.idea} onChange={update('idea')} />
        </label>
        <button className="btn wide" type="submit">{t('moments.enquiry.submit')}</button>
        <p className="wide">{t('moments.enquiry.hint')}</p>
      </form>
    </section>
  );
}

export default function Moments() {
  const { t, i18n } = useTranslation();
  return (
    <div className="moments" lang={i18n.resolvedLanguage}>
      <Hero />
      <Intro />
      <Bruna />
      {t('moments.sections', { returnObjects: true }).map((section, i) => (
        <Feature key={section.id} section={section} index={i} />
      ))}
      <Stay />
      <Budget />
      <Faq />
      <Enquiry />
      <p className="moments-note">{t('moments.note')}</p>
    </div>
  );
}
