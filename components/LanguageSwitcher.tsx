"use client";

import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n";

const labels: Record<string, string> = {
  en: "EN",
  ja: "JP",
  zh: "ZH"
};

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const currentLocaleMatch = pathname.match(/^\/(en|ja|zh)(?=\/|$)/);
  const currentLocale = currentLocaleMatch?.[1] ?? "en";
  const basePath = pathname.replace(/^\/(en|ja|zh)(?=\/|$)/, "");

  if (basePath === "/tokyo-roaming") {
    return null;
  }

  return (
    <div className="fixed right-5 top-20 z-40 flex items-center gap-2 rounded-md border border-champagne/30 bg-ink/95 p-1 shadow-soft">
      {locales.map((locale) => {
        const href = `/${locale}${basePath || ""}`;
        const label = labels[locale] ?? locale.toUpperCase();

        return (
          <a
            key={locale}
            href={href}
            className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs font-semibold transition ${
              locale === currentLocale
                ? "border-champagne bg-champagne text-ink shadow-soft"
                : "border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
            aria-label={`Switch language to ${locale}`}
            aria-current={locale === currentLocale ? "page" : undefined}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}
