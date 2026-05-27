import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { homeSeoContent, type HomeSeoContent } from "@/lib/seo-content";
import { localizedPath } from "@/lib/seo";
import { compareByRoutePopularity } from "@/lib/route-popularity";
import { routePagePath, routePageSlugs } from "@/lib/route-pages";

type SeoContentProps = {
  locale: Locale;
  content?: HomeSeoContent;
};

const retiredRouteHrefs = new Set(["/narita-airport-to-tokyo-disney-resort"]);
const routePageHrefs = new Set(routePageSlugs.map(routePagePath));
const visibleRouteLimit = 6;

const sectionLabels = {
  en: {
    moreRoutes: (count: number) => `Show ${count} more routes`,
    lessRoutes: "Hide routes",
    servicesTitle: "Other Private Driver Services",
    servicesSubtitle:
      "Airport drop-off, hotel transfers, Shinkansen pickup, cruise terminal transfers, and private day trips."
  },
  ja: {
    moreRoutes: (count: number) => `他のルートを${count}件表示`,
    lessRoutes: "ルートを閉じる",
    servicesTitle: "その他の専用車サービス",
    servicesSubtitle:
      "空港お送り、ホテル間移動、新幹線駅送迎、クルーズターミナル送迎、日帰り観光に対応します。"
  },
  zh: {
    moreRoutes: (count: number) => `展開另外 ${count} 條路線`,
    lessRoutes: "收起路線",
    servicesTitle: "其他私人專車服務",
    servicesSubtitle: "包含機場送機、酒店移動、新幹線站接送、郵輪碼頭接送和私人一日遊。"
  }
} satisfies Record<Locale, {
  moreRoutes: (count: number) => string;
  lessRoutes: string;
  servicesTitle: string;
  servicesSubtitle: string;
}>;

function RouteCard({ locale, route }: { locale: Locale; route: HomeSeoContent["routes"][number] }) {
  return (
    <Link
      href={localizedPath(locale, route.href)}
      className="rounded-lg border border-clay/60 bg-sand/40 p-5 transition hover:-translate-y-0.5 hover:border-ember/50 hover:bg-white hover:shadow-soft"
    >
      <h3 className="text-lg font-semibold text-ink">{route.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/65">{route.description}</p>
    </Link>
  );
}

export default function SeoContent({ locale, content: customContent }: SeoContentProps) {
  const content = customContent ?? homeSeoContent[locale] ?? homeSeoContent.en;
  const labels = sectionLabels[locale] ?? sectionLabels.en;
  const visibleRoutes = content.routes
    .filter((route) => !retiredRouteHrefs.has(route.href))
    .sort(compareByRoutePopularity);
  const routePages = visibleRoutes.filter((route) => routePageHrefs.has(route.href));
  const primaryRoutes = routePages.slice(0, visibleRouteLimit);
  const collapsedRoutes = routePages.slice(visibleRouteLimit);
  const serviceRoutes = visibleRoutes.filter((route) => !routePageHrefs.has(route.href));

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="section-title">{content.routesTitle}</h2>
            <p className="section-subtitle">{content.routesSubtitle}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {primaryRoutes.map((route) => (
              <RouteCard key={route.title} locale={locale} route={route} />
            ))}
          </div>

          {collapsedRoutes.length > 0 ? (
            <details className="group mt-5">
              <summary className="inline-flex cursor-pointer select-none items-center rounded-full border border-clay/70 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ember/50 hover:text-ember">
                <span className="group-open:hidden">{labels.moreRoutes(collapsedRoutes.length)}</span>
                <span className="hidden group-open:inline">{labels.lessRoutes}</span>
              </summary>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {collapsedRoutes.map((route) => (
                  <RouteCard key={route.title} locale={locale} route={route} />
                ))}
              </div>
            </details>
          ) : null}

          {serviceRoutes.length > 0 ? (
            <div className="mt-14">
              <div className="max-w-3xl">
                <h2 className="section-title">{labels.servicesTitle}</h2>
                <p className="section-subtitle">{labels.servicesSubtitle}</p>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {serviceRoutes.map((route) => (
                  <RouteCard key={route.title} locale={locale} route={route} />
                ))}
              </div>
            </div>
          ) : null}

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
