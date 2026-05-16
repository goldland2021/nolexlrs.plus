"use client";

import RoutePicker from "@/components/RoutePicker";

interface RoutePickerSectionProps {
  locale: "en" | "ja" | "zh";
  title: string;
  subtitle: string;
}

const sectionCopy = {
  en: {
    eyebrow: "Fare estimator",
    title: "Check Your Airport Transfer Estimate",
    subtitle:
      "Search your hotel or address, review the route and reference fare, then send it to WhatsApp for a confirmed fixed quote."
  },
  ja: {
    eyebrow: "Fare estimator",
    title: "Check Your Airport Transfer Estimate",
    subtitle:
      "Search your hotel or address, review the route and reference fare, then send it to WhatsApp for a confirmed fixed quote."
  },
  zh: {
    eyebrow: "Fare estimator",
    title: "Check Your Airport Transfer Estimate",
    subtitle:
      "Search your hotel or address, review the route and reference fare, then send it to WhatsApp for a confirmed fixed quote."
  }
};

export default function RoutePickerSection({ locale, title, subtitle }: RoutePickerSectionProps) {
  const copy = sectionCopy[locale] ?? { eyebrow: "Fare estimator", title, subtitle };

  return (
    <section className="section grid-dots">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex rounded-full bg-ember/10 px-4 py-2">
            <span className="text-sm font-semibold text-ember">{copy.eyebrow}</span>
          </div>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-subtitle">{copy.subtitle}</p>
        </div>
        <div className="mt-8 max-w-5xl sm:mt-10">
          <div className="rounded-lg border border-clay/60 bg-white/95 p-4 shadow-soft sm:p-6 md:p-8">
            <RoutePicker locale={locale} onRouteCalculated={() => {}} />
          </div>
        </div>
      </div>
    </section>
  );
}
