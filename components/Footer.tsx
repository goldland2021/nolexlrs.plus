import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizedPath, siteName } from "@/lib/seo";
import { contactEmail } from "@/lib/whatsapp";
import ContactChannels from "@/components/ContactChannels";

type FooterProps = {
  locale?: Locale;
};

const footerCopy: Record<Locale, { tagline: string; serviceNote: string; reply: string; links: string[] }> = {
  en: {
    tagline: "Japan airport pickup and homestay support.",
    serviceNote: "Airport pickup, stays, and trip coordination.",
    reply: "Instant replies on WhatsApp.",
    links: ["Japan Airport Pickup", "Japan Homestay", "Tokyo Private Driver"]
  },
  ja: {
    tagline: "日本空港送迎と民泊サポート。",
    serviceNote: "空港送迎、滞在、旅行相談に対応。",
    reply: "WhatsAppで素早く返信します。",
    links: ["日本空港送迎", "日本民泊", "東京プライベートドライバー"]
  },
  zh: {
    tagline: "日本接機與民宿支援。",
    serviceNote: "接機、住宿與行程協調。",
    reply: "WhatsApp 快速回復。",
    links: ["日本接機", "日本民宿", "東京包車司機"]
  }
};

const footerLinks = [
  "",
  "/japan-homestay",
  "/tokyo-private-driver"
];

export default function Footer({ locale = "en" }: FooterProps) {
  const copy = footerCopy[locale] ?? footerCopy.en;

  return (
    <footer className="border-t border-champagne/25 bg-ink text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold">{siteName}</p>
            <p className="text-sm text-white/60">{copy.tagline}</p>
            <nav aria-label="Footer" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {footerLinks.map((href, index) => (
                <Link
                  key={href}
                  href={localizedPath(locale, href)}
                  className="text-white/70 underline-offset-4 hover:text-champagne hover:underline"
                >
                  {copy.links[index]}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-sm text-white/60">
            <p>{copy.serviceNote}</p>
            <div className="my-3">
              <ContactChannels compact dark />
            </div>
            <p>Email: {contactEmail}</p>
            <p>{copy.reply}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
