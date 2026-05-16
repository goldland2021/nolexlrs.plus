import { buildWhatsAppLink, defaultWhatsAppMessage, whatsAppDisplayPhone } from "@/lib/whatsapp";

type ContactInfoProps = {
  showPhone?: boolean;
  showName?: boolean;
  compact?: boolean;
};

export default function ContactInfo({
  showPhone = true,
  showName = true,
  compact = false
}: ContactInfoProps) {
  const href = buildWhatsAppLink(defaultWhatsAppMessage);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 text-sm">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.707 12.293a.999.999 0 00-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 000-1.414l-4-4a.999.999 0 00-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 000-1.414l-4-4z" />
        </svg>
        <a
          href={href}
          className="text-ember hover:text-ember/80 transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          {showPhone && whatsAppDisplayPhone}
          {showPhone && showName && " • "}
          {showName && "ハヤシ"}
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-clay/60 bg-white/90">
      <div className="flex-shrink-0">
        <svg className="w-6 h-6 text-ember" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.707 12.293a.999.999 0 00-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 000-1.414l-4-4a.999.999 0 00-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 000-1.414l-4-4z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-medium text-ink">Contact on WhatsApp</p>
        <p className="text-sm text-ink/70">
          <a
            href={href}
            className="text-ember hover:text-ember/80 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            {whatsAppDisplayPhone}
          </a>
          {showName && " • ハヤシ (Hayashi)"}
        </p>
        <p className="text-xs text-ink/50 mt-1">Instant response • 24/7 available</p>
      </div>
    </div>
  );
}
