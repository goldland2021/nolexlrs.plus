"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackWhatsAppLeadConversion } from "@/lib/analytics";
import { cityLabels, localizedCityPath, type CitySlug } from "@/lib/city-routes";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/seo";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";

type HeroProps = {
  title: string;
  subtitle: string;
  features?: string[];
  imageSrc: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaMessage?: string;
  locale?: Locale;
  citySlug?: CitySlug;
  showCityNav?: boolean;
  showRoamingButton?: boolean;
  roamingButtonLabel?: string;
};

const primaryCitySlugs: CitySlug[] = ["tokyo", "osaka", "fukuoka"];

function cityButtonClass(active: boolean) {
  return `inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold transition ${
    active
      ? "border-champagne bg-champagne text-ink shadow-lift"
      : "border-white/20 bg-white/10 text-white/75 hover:border-champagne hover:text-white"
  }`;
}

export default function Hero({
  title,
  subtitle,
  features = [],
  imageSrc,
  imageAlt,
  ctaLabel = "Get Quote on WhatsApp",
  ctaMessage = defaultWhatsAppMessage,
  locale = "en",
  citySlug = "tokyo",
  showCityNav = true,
  showRoamingButton = false,
  roamingButtonLabel = "2,000 VIP"
}: HeroProps) {
  const href = buildWhatsAppLink(ctaMessage);
  const roamingHref = localizedPath(locale, "/tokyo-roaming");
  const labels = cityLabels[locale] ?? cityLabels.en;
  const [roamingButtonEnabled, setRoamingButtonEnabled] = useState(false);

  useEffect(() => {
    if (!showRoamingButton) return;

    let cancelled = false;

    fetch("/api/roaming-reward", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled) setRoamingButtonEnabled(data?.enabled !== false);
      })
      .catch(() => {
        if (!cancelled) setRoamingButtonEnabled(true);
      });

    return () => {
      cancelled = true;
    };
  }, [showRoamingButton]);

  return (
    <section className="section fancy-bg">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            {showCityNav ? (
              <div className="flex flex-wrap gap-3">
                {primaryCitySlugs.map((slug) => {
                  const active = slug === citySlug;

                  return (
                    <Link
                      key={slug}
                      href={localizedCityPath(locale, slug)}
                      className={cityButtonClass(active)}
                    >
                      {labels[slug]}
                    </Link>
                  );
                })}
              </div>
            ) : null}
            <h1 className="max-w-3xl text-4xl font-semibold text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg text-white/70 md:text-xl">
              {subtitle}
            </p>
            {features.length > 0 && (
              <ul className="grid gap-3 text-white/80 md:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-champagne" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href={href}
                className="inline-flex items-center justify-center rounded-md bg-champagne px-6 py-3 font-semibold text-ink shadow-lift transition hover:-translate-y-0.5 hover:bg-gold"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppLeadConversion("hero_cta")}
              >
                {ctaLabel}
              </a>
              {showRoamingButton && roamingButtonEnabled ? (
                <Link
                  href={roamingHref}
                  className="group inline-flex h-10 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 text-sm font-semibold text-champagne shadow-soft transition hover:-translate-y-0.5 hover:border-champagne hover:bg-white/20"
                  aria-label="Open Tokyo Roaming VIP ride reward"
                >
                  <svg className="h-4 w-5" viewBox="0 0 32 24" aria-hidden="true">
                    <path
                      d="M4.5 13.5 7 8.25A4 4 0 0 1 10.6 6h8.9a4 4 0 0 1 3.55 2.16l2.82 5.34H27a2 2 0 0 1 2 2v3h-3.25a3.25 3.25 0 0 1-6.5 0h-6.5a3.25 3.25 0 0 1-6.5 0H3v-3a2 2 0 0 1 1.5-1.94Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9.2 8.8 7.8 12h7.1V8.5h-4.3c-.6 0-1.13.34-1.4.3Zm8.1-.3V12h5.6l-1.62-3.07a.75.75 0 0 0-.66-.43H17.3Z"
                      fill="#fff8e6"
                      opacity="0.86"
                    />
                    <circle cx="9.5" cy="18.5" r="1.7" fill="#fff8e6" />
                    <circle cx="22.5" cy="18.5" r="1.7" fill="#fff8e6" />
                  </svg>
                  <span>{roamingButtonLabel}</span>
                </Link>
              ) : null}
            </div>
          </div>
          <div className="relative reveal">
            <div className="relative overflow-hidden rounded-lg border border-white/20 bg-ink shadow-soft">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={720}
                height={520}
                className="h-[360px] w-full object-cover md:h-[420px] image-warm"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
