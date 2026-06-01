"use client";

import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { trackWhatsAppLeadConversion } from "@/lib/analytics";

export default function WhatsAppButton() {
  const href = buildWhatsAppLink(defaultWhatsAppMessage);

  return (
    <a
      href={href}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-md bg-champagne px-5 py-3 text-sm font-semibold text-ink shadow-lift transition hover:-translate-y-0.5 hover:bg-gold"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title="WhatsApp"
      onClick={() => trackWhatsAppLeadConversion("floating_button")}
    >
      WhatsApp
    </a>
  );
}
