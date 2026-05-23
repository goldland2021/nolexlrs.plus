import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { homeSeoContent, type HomeSeoContent } from "@/lib/seo-content";
import { localizedPath } from "@/lib/seo";

type SeoContentProps = {
  locale: Locale;
  content?: HomeSeoContent;
};

const retiredRouteHrefs = new Set(["/narita-airport-to-tokyo-disney-resort"]);

export default function SeoContent({ locale, content: customContent }: SeoContentProps) {
  const content = customContent ?? homeSeoContent[locale] ?? homeSeoContent.en;
  const visibleRoutes = content.routes.filter((route) => !retiredRouteHrefs.has(route.href));

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="section-title">{content.routesTitle}</h2>
            <p className="section-subtitle">{content.routesSubtitle}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {visibleRoutes.map((route) => (
              <Link
                key={route.title}
                href={localizedPath(locale, route.href)}
                className="rounded-lg border border-clay/60 bg-sand/40 p-5 transition hover:-translate-y-0.5 hover:border-ember/50 hover:bg-white hover:shadow-soft"
              >
                <h3 className="text-lg font-semibold text-ink">{route.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65">{route.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="section-title">{content.faqTitle}</h2>
              <p className="section-subtitle">{content.faqSubtitle}</p>
            </div>

            <div className="grid gap-4">
              {content.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-clay/60 bg-white p-5 shadow-soft"
                >
                  <h3 className="font-semibold text-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
