import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/seo";
import { contactEmail } from "@/lib/whatsapp";
import ActiveWhatsAppPhone from "@/components/ActiveWhatsAppPhone";

type FooterProps = {
  locale?: Locale;
};

const footerCopy: Record<Locale, { tagline: string; serviceNote: string; reply: string; links: string[] }> = {
  en: {
    tagline: "Private airport pickups in Tokyo.",
    serviceNote: "Available 24/7. English speaking drivers.",
    reply: "Instant replies on WhatsApp.",
    links: ["Narita Airport Transfer", "Haneda Airport Transfer", "Tokyo Private Driver"]
  },
  ja: {
    tagline: "東京のプライベート空港送迎。",
    serviceNote: "24時間対応。英語対応ドライバー。",
    reply: "WhatsAppで素早く返信します。",
    links: ["成田空港送迎", "羽田空港送迎", "東京プライベートドライバー"]
  },
  zh: {
    tagline: "東京私人機場接送服務。",
    serviceNote: "24小時服務，可安排英文司機。",
    reply: "WhatsApp 快速回復。",
    links: ["成田機場接送", "羽田機場接送", "東京包車司機"]
  }
};

const footerLinks = [
  "/narita-airport-transfer",
  "/haneda-airport-transfer",
  "/tokyo-private-driver"
];

export default function Footer({ locale = "en" }: FooterProps) {
  const copy = footerCopy[locale] ?? footerCopy.en;

  return (
    <footer className="border-t border-clay/60 bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold">JP Airport Transfer</p>
            <p className="text-sm text-ink/60">{copy.tagline}</p>
            <nav aria-label="Footer" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {footerLinks.map((href, index) => (
                <Link
                  key={href}
                  href={localizedPath(locale, href)}
                  className="text-ink/70 underline-offset-4 hover:text-ember hover:underline"
                >
                  {copy.links[index]}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-sm text-ink/60">
            <p>{copy.serviceNote}</p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.707 12.293a.999.999 0 00-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 000-1.414l-4-4a.999.999 0 00-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 000-1.414l-4-4z" />
              </svg>
              WhatsApp: <ActiveWhatsAppPhone />
            </p>
            <p>Email: {contactEmail}</p>
            <p>{copy.reply}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
