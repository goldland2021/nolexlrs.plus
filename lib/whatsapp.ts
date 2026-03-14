export const defaultWhatsAppMessage = "Hello I need airport transfer";

export function buildWhatsAppLink(message: string) {
  // 优先使用环境变量，如果没有则使用默认号码
  // ハヤシ的WhatsApp电话号码: +81 8092776072
  const defaultPhone = "818092776072"; // WhatsApp格式: 去掉+号，国际区号81
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? defaultPhone;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
