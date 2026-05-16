export const defaultWhatsAppMessage = "Hello I need airport transfer";
export const whatsAppDisplayPhone = "+81 80-4789-1812";
export const whatsAppPhoneNumber = "818047891812";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsAppPhoneNumber}?text=${encoded}`;
}
