"use client";

import { usePathname } from "next/navigation";
import { buildWhatsAppLink, defaultWhatsAppMessage, homestayWhatsAppMessage } from "@/lib/whatsapp";
import { trackWhatsAppLeadConversion } from "@/lib/analytics";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isHomestayPage = pathname.includes("/japan-homestay");
  const href = buildWhatsAppLink(isHomestayPage ? homestayWhatsAppMessage : defaultWhatsAppMessage);

  return (
    <a
      href={href}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-md bg-champagne px-5 py-3 text-sm font-semibold text-ink shadow-lift transition hover:-translate-y-0.5 hover:bg-gold"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title="WhatsApp"
      onClick={() => trackWhatsAppLeadConversion(isHomestayPage ? "floating_button_homestay" : "floating_button")}
    >
      WhatsApp
    </a>
  );
}
