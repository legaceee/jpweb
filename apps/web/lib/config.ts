export const contactConfig = {
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+919876543210",
  email: process.env.NEXT_PUBLIC_EMAIL || "info@jpenterprises.com",
  address: process.env.NEXT_PUBLIC_ADDRESS || "MG Road, Camp, Pune, Maharashtra 411001",
};

export const getWhatsAppLink = (message: string) => {
  const encodedMsg = encodeURIComponent(message);
  // Clean raw number (remove spaces, symbols) for wa.me redirect
  const cleanNumber = contactConfig.whatsapp.replace(/[^\d+]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
};
