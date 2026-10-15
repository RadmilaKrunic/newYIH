import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ZONES } from '../data/apartments.js';
import { contact, tel, whatsappUrl } from '../data/contact.js';

const GUEST_OPTIONS = [2, 1, ...Array.from({ length: 13 }, (_, i) => i + 3)];
const today = () => new Date().toLocaleDateString('en-CA');

export default function Contact() {
  const { t } = useTranslation();
  const departureRef = useRef(null);
  const [form, setForm] = useState({ arrival: '', departure: '', guests: '2', zone: '', name: '' });
  const update = (field) => (e) => {
    if (field === 'departure' || field === 'arrival') departureRef.current?.setCustomValidity('');
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const departure = departureRef.current;
    if (form.departure <= form.arrival) {
      departure.setCustomValidity(t('contact.departureError'));
      departure.reportValidity();
      return;
    }
    const zone = form.zone ? t(`apartments.zones.${form.zone}`) : t('contact.anyZone');
    const message = t('contact.message', { ...form, zone });
    window.open(whatsappUrl(message), '_blank', 'noopener');
  };

  return (
    <section className="contact" id="contatti">
      <div>
        <div className="eyebrow">{t('contact.eyebrow')}</div>
        <h2>
          {t('contact.title1')}
          <br />
          {t('contact.title2')}
        </h2>
        <p>{t('contact.text')}</p>
        <p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          <a href={tel(contact.phone)}>{contact.phone}</a>
        </p>
        <p>
          <strong>{t('contact.emergency')}</strong>
          <br />
          <a href={tel(contact.emergencyPhone)}>{contact.emergencyPhone}</a>
        </p>
        <p>
          <strong>{contact.office.name}</strong>
          <br />
          {contact.office.address}
          <br />
          {t('contact.hours')}
        </p>
      </div>
      <form id="request" onSubmit={onSubmit}>
        <label>
          {t('contact.arrival')}
          <input type="date" required min={today()} value={form.arrival} onChange={update('arrival')} />
        </label>
        <label>
          {t('contact.departure')}
          <input ref={departureRef} type="date" required min={form.arrival || undefined} value={form.departure} onChange={update('departure')} />
        </label>
        <label>
          {t('contact.guests')}
          <select value={form.guests} onChange={update('guests')}>
            {GUEST_OPTIONS.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
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
        <label className="wide">
          {t('contact.name')}
          <input autoComplete="given-name" placeholder={t('contact.namePlaceholder')} required value={form.name} onChange={update('name')} />
        </label>
        <button className="btn wide" type="submit">{t('contact.submit')}</button>
        <p className="wide">{t('contact.hint')}</p>
      </form>
    </section>
  );
}
