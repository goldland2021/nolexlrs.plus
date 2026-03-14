export const defaultWhatsAppMessage = "Hello I need airport transfer";

export function buildWhatsAppLink(message: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
