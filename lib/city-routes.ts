import type { Locale } from "./i18n";
import type { LatLng } from "./toll-routes";

export type CitySlug = "tokyo" | "osaka" | "hokkaido" | "fukuoka" | "okinawa";

export type CityAirport = {
  id: string;
  name: Record<Locale, string>;
  latlng: LatLng;
};

export const citySlugs: CitySlug[] = ["tokyo", "osaka", "hokkaido", "fukuoka", "okinawa"];
export const cityPageSlugs: Exclude<CitySlug, "tokyo">[] = ["osaka", "hokkaido", "fukuoka", "okinawa"];

export const cityLabels: Record<Locale, Record<CitySlug, string>> = {
  en: {
    tokyo: "Tokyo",
    osaka: "Osaka",
    hokkaido: "Hokkaido",
    fukuoka: "Fukuoka",
    okinawa: "Okinawa"
  },
  ja: {
    tokyo: "東京",
    osaka: "大阪",
    hokkaido: "北海道",
    fukuoka: "福岡",
    okinawa: "沖縄"
  },
  zh: {
    tokyo: "東京",
    osaka: "大阪",
    hokkaido: "北海道",
    fukuoka: "福岡",
    okinawa: "沖繩"
  }
};

export function cityPath(slug: CitySlug) {
  return slug === "tokyo" ? "" : `/${slug}`;
}

export function localizedCityPath(locale: Locale, slug: CitySlug) {
  const path = cityPath(slug);
  return `/${locale}${path}`;
}

export function isCitySlug(value: string): value is CitySlug {
  return (citySlugs as readonly string[]).includes(value);
}
