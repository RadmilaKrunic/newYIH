import { useTranslation } from 'react-i18next';

export default function Intro() {
  const { t } = useTranslation();
  const numbers = t('intro.numbers', { returnObjects: true });
  return (
    <section className="intro" id="bruna">
      <div>
        <div className="eyebrow">{t('intro.eyebrow')}</div>
        <h2>
          {t('intro.title1')}
          <br />
          {t('intro.title2')}
        </h2>
        <p>{t('intro.p1')}</p>
        <p>{t('intro.p2')}</p>
        <div className="signature">{t('intro.signature')}</div>
      </div>
      <div className="numbers">
        {numbers.map((n) => (
          <div key={n.title}>
            <strong>{n.title}</strong>
            <span>{n.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
