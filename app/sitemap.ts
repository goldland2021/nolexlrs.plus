import type { MetadataRoute } from "next";
import { cityPageSlugs, cityPath } from "@/lib/city-routes";
import { locales } from "@/lib/i18n";
import { routePagePath, routePageSlugs } from "@/lib/route-pages";
import { buildLanguageAlternates, localizedPath, siteUrl } from "@/lib/seo";

const routes = [
  "",
  ...cityPageSlugs.map((slug) => cityPath(slug)),
  "/narita-airport-transfer",
  ...routePageSlugs.map((slug) => routePagePath(slug)),
  "/haneda-airport-transfer",
  "/tokyo-private-driver",
  "/tokyo-roaming"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, route)}`,
      alternates: {
        languages: buildLanguageAlternates(route)
      },
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    }))
  );
}
