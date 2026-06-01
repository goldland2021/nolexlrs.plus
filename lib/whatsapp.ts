export const defaultWhatsAppMessage = "Hello, I need help with nolexlrs Japan airport pickup or homestay.";
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@nolexlrs.com";
export const whatsAppDisplayPhone = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY_PHONE || "+81 80-9277-6072";
export const whatsAppPhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || "818092776072";
export const weChatId = process.env.NEXT_PUBLIC_WECHAT_ID || "liyuxuan3512";
export const lineId = process.env.NEXT_PUBLIC_LINE_ID || "nolexlrs";
export const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `/api/whatsapp?text=${encoded}`;
}
