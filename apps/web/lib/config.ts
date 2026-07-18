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
      "Rashmi Avenue, Shop No. 6, Thakur Complex, Kandivali East, Mumbai, Maharashtra 400101"
    );
  },
  serviceArea: "Mumbai",
  get googleMapEmbed() {
    return (
      process.env.NEXT_PUBLIC_MAP_EMBED_URL ||
      "https://maps.google.com/maps?q=Rashmi+Avenue+Shop+No+6+Thakur+Complex+Kandivali+East+Mumbai&t=&z=16&ie=UTF8&iwloc=&output=embed"
    );
  },
  get googleMapDirections() {
    return (
      process.env.NEXT_PUBLIC_MAP_DIRECTIONS_URL ||
      "https://www.google.com/maps/dir/?api=1&destination=Rashmi+Avenue+Shop+No+6+Thakur+Complex+Kandivali+East+Mumbai"
    );
  },
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
