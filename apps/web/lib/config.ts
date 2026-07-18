export const contactConfig = {
  get phone() {
    return (
      process.env.NEXT_PUBLIC_PHONE ||
      process.env.PHONE ||
      "+91 XXXXX XXXXX"
    );
  },
  get whatsapp() {
    const raw =
      process.env.NEXT_PUBLIC_WHATSAPP ||
      process.env.WHATSAPP ||
      "91XXXXXXXXXX";
    // Strip +, spaces, hyphens, and non-digit characters for clean wa.me compatibility
    return raw.replace(/[^\d]/g, "");
  },
  get email() {
    return (
      process.env.NEXT_PUBLIC_EMAIL ||
      process.env.EMAIL ||
      "info@jpenterprises.com"
    );
  },
  get address() {
    return (
      process.env.NEXT_PUBLIC_ADDRESS ||
      process.env.ADDRESS ||
      "Rashmi Avenue, Shop No. 6, Thakur Complex, Mumbai, Maharashtra"
    );
  },
  serviceArea: "Mumbai",
  googleMapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5!2d72.8!3d19.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEyJzAwLjAiTiA3MsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapDirections:
    "https://www.google.com/maps/search/Rashmi+Avenue+Shop+No+6+Thakur+Complex+Mumbai",
};

export const getWhatsAppLink = (message: string) => {
  const cleanNumber = contactConfig.whatsapp;
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
};

export const getCallLink = () => {
  const cleanNumber = contactConfig.phone.replace(/[^\d+]/g, "");
  return `tel:${cleanNumber}`;
};
