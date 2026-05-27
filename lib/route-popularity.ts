export const routePopularityScores = {
  "/narita-airport-to-shinjuku": 361,
  "/haneda-airport-to-shinjuku": 333,
  "/narita-airport-to-roppongi-akasaka": 227,
  "/narita-airport-to-ginza": 178,
  "/haneda-airport-to-roppongi-akasaka": 173,
  "/narita-airport-to-asakusa-ueno": 170,
  "/haneda-airport-to-asakusa-ueno": 145,
  "/haneda-airport-to-ginza": 130,
  "/haneda-airport-to-tokyo-station": 116,
  "/narita-airport-to-shibuya": 107,
  "/narita-airport-to-tokyo-station": 96,
  "/haneda-airport-to-shibuya": 84,
  "/haneda-airport-to-ikebukuro": 74,
  "/narita-airport-to-odaiba-toyosu-ariake": 61,
  "/haneda-airport-to-sumida-skytree": 52,
  "/narita-airport-to-shinagawa": 46,
  "/narita-airport-to-ikebukuro": 45,
  "/narita-airport-to-setagaya": 33,
  "/haneda-airport-to-setagaya": 33,
  "/haneda-airport-to-shinagawa": 32,
  "/narita-airport-to-sumida-skytree": 31,
  "/haneda-airport-to-odaiba-toyosu-ariake": 29,
  "/yokohama-port-transfer": 12
} satisfies Record<string, number>;

export function routePopularityScore(href?: string) {
  if (!href) return 0;
  return routePopularityScores[href as keyof typeof routePopularityScores] ?? 0;
}

export function compareByRoutePopularity<T extends { href?: string }>(a: T, b: T) {
  return routePopularityScore(b.href) - routePopularityScore(a.href);
}
