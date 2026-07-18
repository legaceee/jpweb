import { contactConfig, getWhatsAppLink, getCallLink } from "../lib/config";

export const BUSINESS_CONFIG = {
  name: "JP Enterprises",
  get whatsappNumber() {
    return contactConfig.whatsapp;
  },
  get phone() {
    return contactConfig.phone;
  },
  get email() {
    return contactConfig.email;
  },
  get address() {
    return contactConfig.address;
  },
  serviceArea: contactConfig.serviceArea,
  googleMapDirections: contactConfig.googleMapDirections,
};

export { contactConfig, getWhatsAppLink, getCallLink };
