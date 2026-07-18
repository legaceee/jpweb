// TODO: Replace phone and WhatsApp numbers with real JP Enterprises business numbers
// TODO: Replace Google Maps embed URL with the actual business listing embed

export const contactConfig = {
  phone: "+91 XXXXX XXXXX",
  // TODO: Replace with actual WhatsApp Business number (format: country code + number, no spaces)
  whatsapp: "91XXXXXXXXXX",
  email: "info@jpenterprises.com",
  address:
    "Rashmi Avenue, Shop No. 6, Thakur Complex, Mumbai, Maharashtra",
  serviceArea: "Mumbai",
  googleMapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5!2d72.8!3d19.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEyJzAwLjAiTiA3MsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapDirections:
    "https://www.google.com/maps/search/Rashmi+Avenue+Shop+No+6+Thakur+Complex+Mumbai",
};

export const getWhatsAppLink = (message: string) => {
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${contactConfig.whatsapp}?text=${encodedMsg}`;
};

export const getCallLink = () => {
  const cleanNumber = contactConfig.phone.replace(/[^\d+]/g, "");
  return `tel:${cleanNumber}`;
};
