import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ZONES } from '../data/apartments.js';
import { buildRequestMessage, contact, tel, whatsappUrl } from '../data/contact.js';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ arrival: '', departure: '', guests: '2', zone: '', name: '' });
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const datesInvalid = form.arrival && form.departure && form.departure <= form.arrival;

  const onSubmit = (e) => {
    e.preventDefault();
    if (datesInvalid) return;
    window.open(whatsappUrl(buildRequestMessage(t, form)), '_blank', 'noopener');
  };

  return (
    <section id="contatti" className="section contact">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="lead">{t('contact.text')}</p>
          <dl className="contact-list">
            <dt>{t('contact.email')}</dt>
            <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            <dt>{t('contact.phone')}</dt>
            <dd><a href={tel(contact.phone)}>{contact.phone}</a></dd>
            <dt>{t('contact.emergency')}</dt>
            <dd><a href={tel(contact.emergencyPhone)}>{contact.emergencyPhone}</a></dd>
            <dt>{t('contact.office')}</dt>
            <dd>
              {contact.office.name}<br />
              {contact.office.address}<br />
              {t('contact.hours')}
            </dd>
          </dl>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-row">
            <label>
              {t('contact.arrival')}
              <input type="date" value={form.arrival} onChange={update('arrival')} />
            </label>
            <label>
              {t('contact.departure')}
              <input
                type="date"
                value={form.departure}
                min={form.arrival || undefined}
                onChange={update('departure')}
                aria-invalid={datesInvalid || undefined}
              />
            </label>
          </div>
          {datesInvalid && <p className="form-error" role="alert">{t('contact.departureError')}</p>}
          <div className="form-row">
            <label>
              {t('contact.guests')}
              <input type="number" min="1" max="20" value={form.guests} onChange={update('guests')} />
            </label>
            <label>
              {t('contact.zone')}
              <select value={form.zone} onChange={update('zone')}>
                <option value="">{t('contact.anyZone')}</option>
                {ZONES.map((z) => (
                  <option key={z} value={z}>{t(`apartments.zones.${z}`)}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            {t('contact.name')}
            <input type="text" autoComplete="name" value={form.name} onChange={update('name')} />
          </label>
          <button type="submit" className="btn btn-primary" disabled={datesInvalid}>{t('contact.submit')}</button>
          <p className="hint">{t('contact.hint')}</p>
        </form>
      </div>
    </section>
  );
}
