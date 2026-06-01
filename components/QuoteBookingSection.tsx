"use client";

import { useState } from "react";
import Booking from "@/components/Booking";
import RoutePicker, { type RouteQuote } from "@/components/RoutePicker";
import type { CityAirport } from "@/lib/city-routes";
import type { Dictionary, Locale } from "@/lib/i18n";

interface QuoteBookingSectionProps {
  locale: Locale;
  title: string;
  subtitle: string;
  directNote: string;
  booking: Dictionary["booking"];
  routeAirports?: CityAirport[];
  cityName?: string;
  citySearchName?: string;
  defaultAirportId?: string;
}

const copy = {
  en: {
    eyebrow: "Instant quote",
    routeTitle: "Route and fare estimate"
  },
  ja: {
    eyebrow: "すぐに見積もり",
    routeTitle: "ルートと参考料金"
  },
  zh: {
    eyebrow: "快速報價",
    routeTitle: "路線與參考價格"
  }
};

export default function QuoteBookingSection({
  locale,
  title,
  subtitle,
  directNote,
  booking,
  routeAirports,
  cityName,
  citySearchName,
  defaultAirportId
}: QuoteBookingSectionProps) {
  const [routeQuote, setRouteQuote] = useState<RouteQuote | null>(null);
  const labels = copy[locale] ?? copy.en;

  return (
    <section id="quote" className="section bg-[#e7e0d3]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2">
                <span className="text-sm font-semibold text-champagne">{labels.eyebrow}</span>
              </div>
              <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-ink/70 md:text-lg">{subtitle}</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft sm:p-6 md:p-7">
              <h3 className="mb-5 text-lg font-semibold text-ink">{labels.routeTitle}</h3>
              <RoutePicker
                locale={locale}
                onRouteCalculated={setRouteQuote}
                airports={routeAirports}
                cityName={cityName}
                citySearchName={citySearchName}
                defaultAirportId={defaultAirportId}
              />
            </div>

            <div>
              <Booking
                variant="embedded"
                title={booking.title}
                subtitle={booking.subtitle}
                fields={booking.fields}
                placeholders={booking.placeholders}
                buttonLabel={booking.button}
                messageHeader={booking.messageHeader}
                routeQuote={routeQuote}
              />
              <p className="mt-5 border-t border-clay/40 pt-4 text-center text-xs text-ink/60 sm:text-sm">
                {directNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
