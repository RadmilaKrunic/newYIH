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
