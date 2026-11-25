import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { whatsappUrl } from '../data/contact.js';
import { answerParts, homeAnchor } from '../data/faq.js';
import { localePath } from '../i18n/paths.js';

// Desktop-style folder icon: the selected topic shows an open folder with papers inside.
function FolderIcon({ open }) {
  return (
    <svg className="faq-folder-icon" viewBox="0 0 120 92" aria-hidden="true" focusable="false">
      <path d="M8 14a8 8 0 0 1 8-8h28l10 10h50a8 8 0 0 1 8 8v56a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8z" fill="#d2bba0" />
      {open ? (
        <>
          <rect x="22" y="18" width="74" height="54" rx="2" fill="#f4efe6" transform="rotate(-3 59 45)" />
          <rect x="26" y="22" width="74" height="54" rx="2" fill="#fbf8f2" />
          <path d="M4 40a6 6 0 0 1 6-7h104a5 5 0 0 1 5 6l-9 42a8 8 0 0 1-8 7H16a8 8 0 0 1-8-7z" fill="#e3cfb6" />
        </>
      ) : (
        <path d="M8 30a7 7 0 0 1 7-7h90a7 7 0 0 1 7 7v50a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8z" fill="#e3cfb6" />
      )}
    </svg>
  );
}

export default function Faq() {
  const { t, i18n } = useTranslation();
  const topics = t('faq.topics', { returnObjects: true });
  const [topicId, setTopicId] = useState(topics[0].id);
  const [openQ, setOpenQ] = useState(null);
  const uid = useId();
  const lang = i18n.resolvedLanguage;
  const topic = topics.find((x) => x.id === topicId) ?? topics[0];

  const selectTopic = (id) => {
    setTopicId(id);
    setOpenQ(null);
  };

  return (
    <div className="faq-main" lang={lang}>
      <div className="faq-eyebrow">{t('faq.eyebrow')}</div>
      <h1>{t('faq.title')}</h1>

      <div className="faq-folders" role="tablist" aria-label={t('faq.topicsLabel')}>
        {topics.map(({ id, label }) => {
          const selected = id === topic.id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`${uid}-tab-${id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              className={`faq-folder${selected ? ' is-open' : ''}`}
              onClick={() => selectTopic(id)}
            >
              <FolderIcon open={selected} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <section className="faq-panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${topic.id}`}>
        <h2>{topic.label}</h2>
        <ul className="faq-questions">
          {topic.items.map((item, i) => {
            const open = openQ === i;
            const answerId = `${uid}-${topic.id}-a${i}`;
            return (
              <li key={item.q} className={open ? 'is-open' : undefined}>
                <button type="button" aria-expanded={open} aria-controls={answerId} onClick={() => setOpenQ(open ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </button>
                <div id={answerId} className="faq-answer" hidden={!open}>
                  <p>
                    {answerParts(item.a).map((part, n) =>
                      typeof part === 'string' ? (
                        part
                      ) : (
                        <Link key={n} to={`${localePath(lang)}#${homeAnchor(part.homeId)}`}>{part.text}</Link>
                      ),
                    )}
                  </p>
                  {item.contact && (
                    <a className="faq-ask" href={whatsappUrl(t('faq.askMessage', { q: item.q }))} target="_blank" rel="noopener noreferrer">
                      {t('faq.ask')}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="faq-help">
        <p>{t('faq.helpText')}</p>
        <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{t('faq.write')}</a>
      </div>
    </div>
  );
}
