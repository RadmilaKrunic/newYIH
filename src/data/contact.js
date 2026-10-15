export const contact = {
  email: 'info@youritalianholidays.com',
  phone: '+39 347 809 1603',
  emergencyPhone: '+39 351 391 5959',
  whatsappNumber: '393478091603',
  office: { name: 'Tourist Station Trevi', address: 'Vicolo del Gallinaccio 7, Roma' },
  currentSite: 'https://www.youritalianholidays.com',
};

export const tel = (phone) => `tel:${phone.replace(/\s+/g, '')}`;
export const whatsappUrl = (text) =>
  `https://wa.me/${contact.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** The WhatsApp message built from the booking request form, in the current language. */
export function buildRequestMessage(t, { arrival, departure, guests, zone, name }) {
  const notSet = t('contact.messageNotSet');
  return [
    t('contact.message'),
    `${t('contact.arrival')}: ${arrival || notSet}`,
    `${t('contact.departure')}: ${departure || notSet}`,
    `${t('contact.guests')}: ${guests || notSet}`,
    `${t('contact.zone')}: ${zone ? t(`apartments.zones.${zone}`) : t('contact.anyZone')}`,
    name ? `${t('contact.messageName')}: ${name}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
