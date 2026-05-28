export const defaultWhatsAppMessage = "Hello I need airport transfer";
export const contactEmail = "jpairport.com@gmail.com";
export const whatsAppDisplayPhone = "+81 80-9277-6072";
export const whatsAppPhoneNumber = "818092776072";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `/api/whatsapp?text=${encoded}`;
}
