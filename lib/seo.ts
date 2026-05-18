import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";
import { whatsAppDisplayPhone, whatsAppPhoneNumber } from "./whatsapp";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jpairport.com").replace(/\/$/, "");
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Tokyo Airport Transfer";

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
  image = "/images/tokyo-airport-transfer.jpg"
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

export function serviceJsonLd(locale: Locale, title: string, description: string) {
  const currentUrl = `${siteUrl}${localizedPath(locale)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/images/icon.svg`,
        image: `${siteUrl}/images/tokyo-airport-transfer.jpg`,
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
        "@id": `${siteUrl}/#airport-transfer-service`,
        name: title,
        url: currentUrl,
        image: `${siteUrl}/images/tokyo-airport-transfer.jpg`,
        description,
        provider: {
          "@id": `${siteUrl}/#organization`
        },
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
          "Narita Airport transfer",
          "Haneda Airport transfer",
          "Tokyo private driver",
          "Toyota Alphard airport pickup"
        ],
        availableLanguage: ["English", "Chinese", "Japanese"],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `https://wa.me/${whatsAppPhoneNumber}`,
          servicePhone: {
            "@type": "ContactPoint",
            telephone: whatsAppDisplayPhone
          }
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Tokyo airport transfer services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Narita Airport to Tokyo private transfer"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Haneda Airport to Tokyo private transfer"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Tokyo hotel to airport drop-off"
              }
            }
          ]
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
