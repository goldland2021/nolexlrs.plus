"use client";

import { useState } from "react";
import { trackWhatsAppLeadConversion } from "@/lib/analytics";
import {
  buildWhatsAppLink,
  defaultWhatsAppMessage,
  lineId,
  lineUrl,
  weChatId
} from "@/lib/whatsapp";
import ActiveWhatsAppPhone from "@/components/ActiveWhatsAppPhone";

type ContactChannelsProps = {
  compact?: boolean;
  dark?: boolean;
  message?: string;
};

function channelClass(dark: boolean) {
  return `inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-semibold transition ${
    dark
      ? "border-champagne/40 bg-white/10 text-white hover:bg-white/20"
      : "border-ink/20 bg-white text-ink/75 hover:border-champagne hover:text-ink"
  }`;
}

function CopyChannel({
  dark,
  label,
  value
}: {
  dark: boolean;
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyValue = async () => {
    try {
      await navigator.clipboard?.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className={channelClass(dark)} onClick={copyValue}>
      {label}: {copied ? "Copied" : value}
    </button>
  );
}

export default function ContactChannels({
  compact = false,
  dark = false,
  message = defaultWhatsAppMessage
}: ContactChannelsProps) {
  const whatsappHref = buildWhatsAppLink(message);
  const classes = compact ? "flex flex-wrap justify-center gap-2" : "flex flex-wrap gap-3";

  return (
    <div className={classes}>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className={channelClass(dark)}
        onClick={() => trackWhatsAppLeadConversion("contact_channels")}
      >
        WhatsApp: <span className="ml-1"><ActiveWhatsAppPhone /></span>
      </a>
      <CopyChannel dark={dark} label="WeChat" value={weChatId} />
      {lineUrl ? (
        <a href={lineUrl} target="_blank" rel="noreferrer" className={channelClass(dark)}>
          LINE: {lineId}
        </a>
      ) : (
        <CopyChannel dark={dark} label="LINE" value={lineId} />
      )}
    </div>
  );
}
