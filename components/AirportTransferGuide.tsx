import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { airportGuideContent } from "@/lib/seo-content";
import { localizedPath } from "@/lib/seo";
import { compareByRoutePopularity } from "@/lib/route-popularity";

type AirportTransferGuideProps = {
  airport: "narita" | "haneda";
  locale: Locale;
};

export default function AirportTransferGuide({ airport, locale }: AirportTransferGuideProps) {
  const content = (airportGuideContent[locale] ?? airportGuideContent.en)[airport];
  const destinations = [...content.destinations].sort(compareByRoutePopularity);

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="section-title">{content.title}</h2>
            <p className="section-subtitle">{content.subtitle}</p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-lg border border-clay/60 bg-sand/40 p-5 sm:p-6">
              <h3 className="text-lg font-semibold">{content.destinationsTitle}</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {destinations.map((destination) => {
                  const card = (
                    <>
                      <h4 className="font-semibold text-ink">{destination.name}</h4>
                      <p className="mt-2 text-sm leading-6 text-ink/65">
                        {destination.description}
                      </p>
                    </>
                  );

                  return destination.href ? (
                    <Link
                      key={destination.name}
                      href={localizedPath(locale, destination.href)}
                      className="rounded-lg bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:text-ember"
                    >
                      {card}
                    </Link>
                  ) : (
                    <article key={destination.name} className="rounded-lg bg-white p-4 shadow-soft">
                      {card}
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-clay/60 bg-white p-5 shadow-soft sm:p-6">
              <h3 className="text-lg font-semibold">{content.tipsTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/70">
                {content.tips.map((tip) => (
                  <li key={tip} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ember" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
