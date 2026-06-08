import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";
import { whatsAppDisplayPhone } from "./whatsapp";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nolexlrs.com").replace(/\/$/, "");
export const siteName = "nolexlrs";

export const localeNames: Record<Locale, string> = {
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_TW"
};

export const htmlLanguages: Record<Locale, string> = {
  en: "en",
  ja: "ja",
  zh: "zh-TW"
};

export function localizedPath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function buildLanguageAlternates(path = "") {
  return {
    ...Object.fromEntries(
      locales.map((entryLocale) => [
        htmlLanguages[entryLocale],
        `${siteUrl}${localizedPath(entryLocale, path)}`
      ])
    ),
    "x-default": `${siteUrl}${localizedPath("en", path)}`
  };
}

export function buildAlternates(locale: Locale, path = "") {
  return {
    canonical: `${siteUrl}${localizedPath(locale, path)}`,
    languages: buildLanguageAlternates(path)
  };
}

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
  image = "/images/pickupjp/pickupjp-alphard-white-airport-pickup-curbside.jpg"
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords: string[];
  image?: string;
}): Metadata {
  const url = `${siteUrl}${localizedPath(locale, path)}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      absolute: title
    },
    description,
    keywords,
    alternates: buildAlternates(locale, path),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    other: {
      "content-language": htmlLanguages[locale]
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: localeNames[locale],
      alternateLocale: locales
        .filter((entryLocale) => entryLocale !== locale)
        .map((entryLocale) => localeNames[entryLocale]),
      type: "website",
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${image}`]
    }
  };
}

export type ServiceJsonLdProfile = {
  areaServed: string[];
  serviceType: string[];
  offerCatalogName: string;
  offers: string[];
};

export const serviceJsonLdProfiles = {
  tokyo: {
    areaServed: [
      "Tokyo",
      "Narita Airport",
      "Haneda Airport",
      "Shinjuku",
      "Shibuya",
      "Ginza",
      "Shinagawa",
      "Asakusa",
      "Tokyo Disney Resort"
    ],
    serviceType: [
      "Tokyo airport transfer",
      "Narita Airport transfer",
      "Haneda Airport transfer",
      "Tokyo private driver",
      "Toyota Alphard airport pickup"
    ],
    offerCatalogName: "Tokyo airport transfer services",
    offers: [
      "Narita Airport to Tokyo private transfer",
      "Haneda Airport to Tokyo private transfer",
      "Tokyo hotel to airport drop-off"
    ]
  },
  narita: {
    areaServed: [
      "Narita Airport",
      "Tokyo",
      "Shinjuku",
      "Shibuya",
      "Ginza",
      "Shinagawa",
      "Asakusa",
      "Tokyo Disney Resort",
      "Chiba"
    ],
    serviceType: [
      "Narita Airport transfer",
      "Narita Airport pickup",
      "Narita to Tokyo private car",
      "Narita Airport to hotel transfer"
    ],
    offerCatalogName: "Narita Airport transfer services",
    offers: [
      "Narita Airport to Tokyo hotel private transfer",
      "Narita Airport to Shinjuku private car",
      "Narita Airport to Tokyo Disney Resort transfer"
    ]
  },
  haneda: {
    areaServed: [
      "Haneda Airport",
      "Tokyo",
      "Ginza",
      "Shinagawa",
      "Shinjuku",
      "Shibuya",
      "Tokyo Station",
      "Tokyo Cruise Terminal",
      "Yokohama"
    ],
    serviceType: [
      "Haneda Airport transfer",
      "Haneda Airport pickup",
      "Haneda to Tokyo private car",
      "Haneda Airport to hotel transfer"
    ],
    offerCatalogName: "Haneda Airport transfer services",
    offers: [
      "Haneda Airport to Tokyo hotel private transfer",
      "Haneda Airport to Ginza private car",
      "Haneda Airport to Shinagawa transfer"
    ]
  },
  tokyoPrivateDriver: {
    areaServed: [
      "Tokyo",
      "Shinjuku",
      "Shibuya",
      "Ginza",
      "Tokyo Station",
      "Shinagawa",
      "Mt Fuji",
      "Hakone",
      "Kamakura",
      "Yokohama"
    ],
    serviceType: [
      "Tokyo private driver",
      "Tokyo hourly charter",
      "Tokyo hotel transfer",
      "Mt Fuji private day trip",
      "Shinkansen station transfer"
    ],
    offerCatalogName: "Tokyo private driver services",
    offers: [
      "Tokyo hotel to hotel private transfer",
      "Tokyo Station or Shinagawa Shinkansen pickup",
      "Mt Fuji day trip with English driver"
    ]
  },
  osaka: {
    areaServed: [
      "Osaka",
      "Kansai International Airport",
      "Osaka Itami Airport",
      "Namba",
      "Umeda",
      "Kyoto",
      "Nara",
      "Kobe",
      "Universal Studios Japan"
    ],
    serviceType: [
      "Osaka airport transfer",
      "Kansai Airport transfer",
      "Itami Airport transfer",
      "Osaka to Kyoto private car",
      "Osaka private driver"
    ],
    offerCatalogName: "Osaka airport transfer services",
    offers: [
      "Kansai Airport to Osaka private transfer",
      "Kansai Airport to Kyoto private car",
      "Osaka hotel to Universal Studios Japan transfer"
    ]
  },
  hokkaido: {
    areaServed: [
      "Hokkaido",
      "New Chitose Airport",
      "Sapporo",
      "Niseko",
      "Otaru",
      "Furano",
      "Biei",
      "Noboribetsu",
      "Lake Toya"
    ],
    serviceType: [
      "Hokkaido airport transfer",
      "New Chitose Airport transfer",
      "Sapporo private driver",
      "Niseko ski transfer",
      "Hokkaido sightseeing charter"
    ],
    offerCatalogName: "Hokkaido airport transfer services",
    offers: [
      "New Chitose Airport to Sapporo transfer",
      "New Chitose Airport to Niseko ski transfer",
      "Sapporo to Furano and Biei private car"
    ]
  },
  fukuoka: {
    areaServed: [
      "Fukuoka",
      "Fukuoka Airport",
      "Hakata",
      "Tenjin",
      "Hakata Port",
      "Fukuoka Cruise Terminal",
      "Dazaifu",
      "Itoshima",
      "Yufuin",
      "Beppu"
    ],
    serviceType: [
      "Fukuoka airport transfer",
      "Fukuoka Airport pickup",
      "Fukuoka cruise terminal transfer",
      "Fukuoka private driver",
      "Kyushu private car"
    ],
    offerCatalogName: "Fukuoka airport transfer services",
    offers: [
      "Fukuoka Airport to Hakata transfer",
      "Fukuoka Airport to Tenjin private car",
      "Fukuoka cruise terminal transfer"
    ]
  },
  okinawa: {
    areaServed: [
      "Okinawa",
      "Naha Airport",
      "Naha",
      "Kokusai Street",
      "Chatan",
      "American Village",
      "Onna Village",
      "Motobu",
      "Churaumi Aquarium"
    ],
    serviceType: [
      "Okinawa airport transfer",
      "Naha Airport transfer",
      "Okinawa private driver",
      "Okinawa hotel transfer",
      "Okinawa sightseeing charter"
    ],
    offerCatalogName: "Okinawa airport transfer services",
    offers: [
      "Naha Airport to Naha hotel transfer",
      "Naha Airport to Onna Village private car",
      "Okinawa Churaumi Aquarium private driver"
    ]
  }
} satisfies Record<string, ServiceJsonLdProfile>;

export function serviceJsonLd(
  locale: Locale,
  title: string,
  description: string,
  path?: string,
  profile: ServiceJsonLdProfile = serviceJsonLdProfiles.tokyo
) {
  const currentUrl = path ? `${siteUrl}${localizedPath(locale, path)}` : `${siteUrl}${localizedPath(locale)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
        image: `${siteUrl}/images/pickupjp/pickupjp-alphard-white-airport-pickup-curbside.jpg`,
        telephone: whatsAppDisplayPhone,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: whatsAppDisplayPhone,
          contactType: "customer support",
          areaServed: "JP",
          availableLanguage: ["English", "Chinese", "Japanese"]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        inLanguage: Object.values(htmlLanguages),
        publisher: {
          "@id": `${siteUrl}/#organization`
        }
      },
      {
        "@type": "TaxiService",
        "@id": `${currentUrl}#airport-transfer-service`,
        name: title,
        url: currentUrl,
        image: `${siteUrl}/images/pickupjp/pickupjp-alphard-white-airport-pickup-curbside.jpg`,
        description,
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: profile.areaServed,
        serviceType: profile.serviceType,
        priceRange: "¥¥",
        availableLanguage: ["English", "Chinese", "Japanese"],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${siteUrl}/api/whatsapp`,
          servicePhone: {
            "@type": "ContactPoint",
            telephone: whatsAppDisplayPhone
          }
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: profile.offerCatalogName,
          itemListElement: profile.offers.map((offerName) => ({
            "@type": "Offer",
            priceCurrency: "JPY",
            itemOffered: {
              "@type": "Service",
              name: offerName
            }
          }))
        }
      }
    ]
  };
}

export type FaqJsonLdItem = {
  question: string;
  answer: string;
};

export function faqJsonLd(items: FaqJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export type BreadcrumbJsonLdItem = {
  name: string;
  path?: string;
};

const breadcrumbHomeNames: Record<Locale, string> = {
  en: siteName,
  ja: siteName,
  zh: siteName
};

export function breadcrumbHomeName(locale: Locale) {
  return breadcrumbHomeNames[locale] ?? breadcrumbHomeNames.en;
}

export function breadcrumbJsonLd(locale: Locale, items: BreadcrumbJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${localizedPath(locale, item.path ?? "")}`
    }))
  };
}
