import type { MetadataRoute } from "next";
import { cityPageSlugs, cityPath } from "@/lib/city-routes";
import { locales } from "@/lib/i18n";
import { routePagePath, routePageSlugs } from "@/lib/route-pages";
import { buildLanguageAlternates, localizedPath, siteUrl } from "@/lib/seo";

const routes = [
  "",
  "/japan-homestay",
  ...cityPageSlugs.map((slug) => cityPath(slug)),
  "/narita-airport-transfer",
  ...routePageSlugs.map((slug) => routePagePath(slug)),
  "/haneda-airport-transfer",
  "/tokyo-private-driver",
  "/tokyo-roaming"
];

// No lastModified here on purpose: stamping every URL with the build date
// teaches crawlers to distrust the value, which is worse than omitting it.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, route)}`,
      alternates: {
        languages: buildLanguageAlternates(route)
      },
      priority: route === "" ? 1 : 0.8
    }))
  );
}
