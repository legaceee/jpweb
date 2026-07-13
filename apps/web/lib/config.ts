export const contactConfig = {
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+919876543210",
  email: process.env.NEXT_PUBLIC_EMAIL || "info@jpenterprises.com",
  address: process.env.NEXT_PUBLIC_ADDRESS || "MG Road, Camp, Pune, Maharashtra 411001",
  googleMap: process.env.NEXT_PUBLIC_GOOGLE_MAP || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.3768233762885!2d73.8727402!3d18.5118742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzQyLjciTiA3M8KwNTInMjEuOSJFOg!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const getWhatsAppLink = (message: string) => {
  const encodedMsg = encodeURIComponent(message);
  // Clean raw number (remove spaces, symbols) for wa.me redirect
  const cleanNumber = contactConfig.whatsapp.replace(/[^\d+]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
};
export const getCallLink = () => {
  const cleanNumber = contactConfig.phone.replace(/[^\d+]/g, "");
  return `tel:${cleanNumber}`;
};
