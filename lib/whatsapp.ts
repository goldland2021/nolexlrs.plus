export const transferWhatsAppMessage =
  "Hello, I would like to book a Japan airport pickup with pickupjp.com. Please help me confirm the pickup details and price.";
export const homestayWhatsAppMessage =
  "Hello, I would like to book a pickupjp.com Japan homestay. Please help me check available rooms, dates, and pricing.";
export const defaultWhatsAppMessage = transferWhatsAppMessage;
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
export const whatsAppDisplayPhone = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY_PHONE || "+81 90-6399-7223";
export const whatsAppPhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || "819063997223";
export const weChatId = process.env.NEXT_PUBLIC_WECHAT_ID || "liyuxuan3512";
export const lineId = process.env.NEXT_PUBLIC_LINE_ID || "";
export const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `/api/whatsapp?text=${encoded}`;
}
