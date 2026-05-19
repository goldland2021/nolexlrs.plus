import type { CityAirport } from "./city-routes";
import type { Locale } from "./i18n";
import type { HomeSeoContent } from "./seo-content";
import type { ServiceJsonLdProfile } from "./seo";
import { AIRPORTS } from "./toll-routes";

export type RoutePageSlug =
  | "narita-airport-to-shinjuku"
  | "narita-airport-to-tokyo-disney-resort"
  | "haneda-airport-to-ginza"
  | "haneda-airport-to-shinjuku"
  | "haneda-airport-to-shinagawa";

export const routePageSlugs: RoutePageSlug[] = [
  "narita-airport-to-shinjuku",
  "narita-airport-to-tokyo-disney-resort",
  "haneda-airport-to-ginza",
  "haneda-airport-to-shinjuku",
  "haneda-airport-to-shinagawa"
];

export type RoutePageContent = {
  slug: RoutePageSlug;
  path: string;
  cityName: string;
  citySearchName: string;
  routeAirports: CityAirport[];
  defaultAirportId: string;
  serviceProfile: ServiceJsonLdProfile;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    image: string;
  };
  hero: {
    title: string;
    subtitle: string;
    features: string[];
    imageSrc: string;
    imageAlt: string;
  };
  overview: {
    title: string;
    subtitle: string;
    facts: {
      label: string;
      value: string;
      description: string;
    }[];
    notesTitle: string;
    notes: string[];
  };
  quote: {
    title: string;
    subtitle: string;
    directNote: string;
  };
  waiting: {
    pickupNote: string;
    delayNote: string;
    promiseTitle: string;
    promises: [string, string][];
  };
  booking: {
    title: string;
    subtitle: string;
    placeholders: {
      airport: string;
      flight: string;
      landingTime: string;
      hotel: string;
      passengers: string;
      luggage: string;
    };
    messageHeader: string;
  };
  seo: HomeSeoContent;
};

const naritaAirport: CityAirport = {
  id: "narita",
  name: AIRPORTS.narita.name as Record<Locale, string>,
  latlng: AIRPORTS.narita.latlng
};

const hanedaAirport: CityAirport = {
  id: "haneda",
  name: AIRPORTS.haneda.name as Record<Locale, string>,
  latlng: AIRPORTS.haneda.latlng
};

const routeServiceProfiles: Record<RoutePageSlug, ServiceJsonLdProfile> = {
  "narita-airport-to-shinjuku": {
    areaServed: ["Narita Airport", "Shinjuku", "Nishi-Shinjuku", "Kabukicho", "Tokyo"],
    serviceType: [
      "Narita Airport to Shinjuku transfer",
      "Narita Airport pickup",
      "Shinjuku hotel airport transfer",
      "Private car from Narita to Shinjuku"
    ],
    offerCatalogName: "Narita Airport to Shinjuku transfer services",
    offers: [
      "Narita Airport to Shinjuku hotel private transfer",
      "Narita Airport to Nishi-Shinjuku private car",
      "Shinjuku hotel to Narita Airport drop-off"
    ]
  },
  "narita-airport-to-tokyo-disney-resort": {
    areaServed: [
      "Narita Airport",
      "Tokyo Disney Resort",
      "Tokyo Disneyland",
      "Tokyo DisneySea",
      "Maihama",
      "Urayasu",
      "Chiba"
    ],
    serviceType: [
      "Narita Airport to Tokyo Disney Resort transfer",
      "Narita Airport pickup",
      "Tokyo Disneyland airport transfer",
      "Tokyo DisneySea private car"
    ],
    offerCatalogName: "Narita Airport to Tokyo Disney Resort transfer services",
    offers: [
      "Narita Airport to Tokyo Disneyland private transfer",
      "Narita Airport to Tokyo DisneySea private car",
      "Tokyo Disney Resort hotel to Narita Airport drop-off"
    ]
  },
  "haneda-airport-to-ginza": {
    areaServed: ["Haneda Airport", "Ginza", "Tsukiji", "Yurakucho", "Nihonbashi", "Tokyo"],
    serviceType: [
      "Haneda Airport to Ginza transfer",
      "Haneda Airport pickup",
      "Ginza hotel airport transfer",
      "Private car from Haneda to Ginza"
    ],
    offerCatalogName: "Haneda Airport to Ginza transfer services",
    offers: [
      "Haneda Airport to Ginza hotel private transfer",
      "Haneda Airport to Tsukiji private car",
      "Ginza hotel to Haneda Airport drop-off"
    ]
  },
  "haneda-airport-to-shinjuku": {
    areaServed: ["Haneda Airport", "Shinjuku", "Nishi-Shinjuku", "Kabukicho", "Tokyo"],
    serviceType: [
      "Haneda Airport to Shinjuku transfer",
      "Haneda Airport pickup",
      "Shinjuku hotel airport transfer",
      "Private car from Haneda to Shinjuku"
    ],
    offerCatalogName: "Haneda Airport to Shinjuku transfer services",
    offers: [
      "Haneda Airport to Shinjuku hotel private transfer",
      "Haneda Airport to Nishi-Shinjuku private car",
      "Shinjuku hotel to Haneda Airport drop-off"
    ]
  },
  "haneda-airport-to-shinagawa": {
    areaServed: ["Haneda Airport", "Shinagawa", "Takanawa", "Gotanda", "Tokyo"],
    serviceType: [
      "Haneda Airport to Shinagawa transfer",
      "Haneda Airport pickup",
      "Shinagawa hotel airport transfer",
      "Private car from Haneda to Shinagawa"
    ],
    offerCatalogName: "Haneda Airport to Shinagawa transfer services",
    offers: [
      "Haneda Airport to Shinagawa hotel private transfer",
      "Haneda Airport to Takanawa private car",
      "Shinagawa hotel to Haneda Airport drop-off"
    ]
  }
};

export function routePagePath(slug: RoutePageSlug) {
  return `/${slug}`;
}

export function isRoutePageSlug(value: string): value is RoutePageSlug {
  return (routePageSlugs as readonly string[]).includes(value);
}

type HanedaRouteSlug = Extract<
  RoutePageSlug,
  "haneda-airport-to-ginza" | "haneda-airport-to-shinjuku" | "haneda-airport-to-shinagawa"
>;

type HanedaRouteConfig = {
  title: string;
  destination: string;
  nearbyAreas: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  cityName: string;
  citySearchName: string;
  heroSubtitle: string;
  imageAlt: string;
  overviewSubtitle: string;
  driveTime: string;
  bestFor: string;
  bestForDescription: string;
  vehicleFit: string;
  vehicleDescription: string;
  notes: string[];
  quoteTitle: string;
  quoteSubtitle: string;
  bookingTitle: string;
  bookingSubtitle: string;
  hotelExample: string;
  passengersExample: string;
  luggageExample: string;
  messageHeader: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: { question: string; answer: string }[];
};

const hanedaLocaleCopy = {
  en: {
    airportPlaceholder: "Haneda Airport (HND)",
    flightPlaceholder: "JL123",
    landingTimePlaceholder: "May 3, 4:30 PM",
    notesTitle: "Before You Book",
    pickupNote: "For Haneda Airport pickup, waiting time starts from the actual flight landing time.",
    delayNote:
      "Haneda is close to central Tokyo, but late-night arrivals and busy city traffic can still affect pickup timing.",
    promiseTitle: "Why Book This Route",
    features: (destination: string) => [
      "Haneda pickup with flight tracking",
      `Direct transfer to ${destination}`,
      "Toyota Alphard or Hiace available",
      "90 min free airport waiting",
      "Optional name-sign meet-and-greet",
      "Fixed quote confirmed on WhatsApp"
    ],
    promises: (destination: string): [string, string][] => [
      ["Fast city access", `Travel directly from Haneda Airport to ${destination} without station transfers.`],
      ["Clear pickup support", "Driver timing follows your actual landing time and arrival progress."],
      ["Vehicle advice", "We confirm sedan, Alphard, or Hiace based on passengers, suitcases, and comfort needs."],
      ["Return route available", `${destination} hotel to Haneda Airport drop-off can also be arranged.`]
    ],
    directNote:
      "Opens in WhatsApp after submission. Arrival-gate name-sign meet-and-greet is optional and costs +2,000 JPY when requested.",
    routesTitle: "Related Haneda Airport Routes",
    routesSubtitle:
      "Private airport transfer pages for Haneda pickup, Tokyo hotels, Shinjuku, Ginza, Shinagawa, and return airport drop-off.",
    overviewTitle: (destination: string) => `Route Details for Haneda to ${destination}`,
    relatedRoutes: [
      {
        title: "Haneda Airport to Ginza",
        description: "Private airport pickup for Ginza, Tsukiji, Yurakucho, Nihonbashi, and central Tokyo hotels.",
        href: "/haneda-airport-to-ginza"
      },
      {
        title: "Haneda Airport to Shinjuku",
        description: "Door-to-door Haneda transfer for Shinjuku Station hotels, Nishi-Shinjuku, and Kabukicho.",
        href: "/haneda-airport-to-shinjuku"
      },
      {
        title: "Haneda Airport to Shinagawa",
        description: "Fast private transfer to Shinagawa Station, Takanawa hotels, and Shinkansen connections.",
        href: "/haneda-airport-to-shinagawa"
      },
      {
        title: "Haneda Airport to Tokyo",
        description: "General Haneda transfer page for central Tokyo hotels, apartments, and cruise terminals.",
        href: "/haneda-airport-transfer"
      },
      {
        title: "Tokyo private driver",
        description: "Hotel transfers, Shinkansen station pickup, Mt Fuji day trips, and hourly private car service.",
        href: "/tokyo-private-driver"
      }
    ]
  },
  ja: {
    airportPlaceholder: "羽田空港 (HND)",
    flightPlaceholder: "JL123",
    landingTimePlaceholder: "5月3日 16:30",
    notesTitle: "予約前の確認",
    pickupNote: "羽田空港お迎えの待機時間は、実際のフライト到着時刻から計算します。",
    delayNote: "羽田は都心に近い空港ですが、深夜到着や市内の混雑により所要時間が変わることがあります。",
    promiseTitle: "このルートのメリット",
    features: (destination: string) => [
      "羽田空港お迎えとフライト確認",
      `${destination}まで直行`,
      "アルファードまたはハイエース対応",
      "空港お迎え90分無料待機",
      "ネームプレートお迎えオプション",
      "WhatsAppで固定料金を確認"
    ],
    promises: (destination: string): [string, string][] => [
      ["都心へスムーズ", `羽田空港から${destination}まで、荷物を持って乗り換える必要がありません。`],
      ["お迎え時間を調整", "実際の到着時刻と入国状況に合わせてドライバーが待機します。"],
      ["車種相談", "人数、荷物、快適性に合わせてセダン、アルファード、ハイエースを確認します。"],
      ["復路も対応", `${destination}のホテルから羽田空港への送機も予約できます。`]
    ],
    directNote:
      "送信後、WhatsAppで直接やり取りできます。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。",
    routesTitle: "関連する羽田空港送迎ルート",
    routesSubtitle: "羽田空港から東京ホテル、新宿、銀座、品川、空港送迎に関連する専用車ルートです。",
    overviewTitle: (destination: string) => `羽田から${destination}へのルート詳細`,
    relatedRoutes: [
      {
        title: "羽田空港から銀座へ",
        description: "銀座、築地、有楽町、日本橋、東京中心部ホテルへの羽田空港送迎です。",
        href: "/haneda-airport-to-ginza"
      },
      {
        title: "羽田空港から新宿へ",
        description: "新宿駅周辺、西新宿、歌舞伎町エリアへのドアツードア送迎です。",
        href: "/haneda-airport-to-shinjuku"
      },
      {
        title: "羽田空港から品川へ",
        description: "品川駅、高輪ホテル、新幹線接続に便利な短距離送迎です。",
        href: "/haneda-airport-to-shinagawa"
      },
      {
        title: "羽田空港から東京へ",
        description: "東京中心部ホテル、民泊、クルーズターミナルへの羽田空港送迎ページです。",
        href: "/haneda-airport-transfer"
      },
      {
        title: "東京プライベートドライバー",
        description: "ホテル間移動、新幹線駅送迎、富士山日帰り、時間貸切に対応します。",
        href: "/tokyo-private-driver"
      }
    ]
  },
  zh: {
    airportPlaceholder: "羽田機場 (HND)",
    flightPlaceholder: "JL123",
    landingTimePlaceholder: "5月3日 16:30",
    notesTitle: "預約前建議",
    pickupNote: "羽田機場接機等待時間從航班實際落地時間開始計算。",
    delayNote: "羽田機場離東京市區較近，但深夜到達和市區路況仍可能影響實際車程。",
    promiseTitle: "這條路線的優點",
    features: (destination: string) => [
      "羽田機場接機與航班跟蹤",
      `直達${destination}`,
      "可選 Alphard 或 Hiace",
      "接機90分鐘免費等待",
      "可選到達口舉牌接機",
      "WhatsApp 確認固定報價"
    ],
    promises: (destination: string): [string, string][] => [
      ["快速進市區", `從羽田機場直達${destination}，不用拖著行李轉車。`],
      ["接機時間清楚", "司機會根據航班實際落地和入境進度安排等待。"],
      ["車型建議", "根據人數、行李和舒適度需求確認轎車、Alphard 或 Hiace。"],
      ["可安排回程", `也可以預約${destination}酒店到羽田機場送機。`]
    ],
    directNote:
      "提交後會打開 WhatsApp，方便直接和司機溝通。到達口舉牌接機為可選服務，需要時另加 2,000 日元。",
    routesTitle: "相關羽田機場接送路線",
    routesSubtitle: "羽田機場到東京酒店、新宿、銀座、品川和送機相關的私人專車路線。",
    overviewTitle: (destination: string) => `羽田到${destination}路線詳情`,
    relatedRoutes: [
      {
        title: "羽田機場到銀座",
        description: "適合銀座、築地、有樂町、日本橋和東京中心區酒店的羽田機場接送。",
        href: "/haneda-airport-to-ginza"
      },
      {
        title: "羽田機場到新宿",
        description: "羽田機場到新宿站周邊、西新宿和歌舞伎町區域的點對點接送。",
        href: "/haneda-airport-to-shinjuku"
      },
      {
        title: "羽田機場到品川",
        description: "羽田機場到品川站、高輪酒店和新幹線轉乘的快速私人接送。",
        href: "/haneda-airport-to-shinagawa"
      },
      {
        title: "羽田機場到東京",
        description: "覆蓋東京市區酒店、民宿和郵輪碼頭的羽田機場接送頁面。",
        href: "/haneda-airport-transfer"
      },
      {
        title: "東京包車司機",
        description: "酒店到酒店移動、新幹線接送、富士山一日遊和小時包車。",
        href: "/tokyo-private-driver"
      }
    ]
  }
} satisfies Record<
  Locale,
  {
    airportPlaceholder: string;
    flightPlaceholder: string;
    landingTimePlaceholder: string;
    notesTitle: string;
    pickupNote: string;
    delayNote: string;
    promiseTitle: string;
    features: (destination: string) => string[];
    promises: (destination: string) => [string, string][];
    directNote: string;
    routesTitle: string;
    routesSubtitle: string;
    overviewTitle: (destination: string) => string;
    relatedRoutes: { title: string; description: string; href: string }[];
  }
>;

const hanedaRouteConfigs: Record<Locale, Record<HanedaRouteSlug, HanedaRouteConfig>> = {
  en: {
    "haneda-airport-to-ginza": {
      title: "Haneda Airport to Ginza Transfer",
      destination: "Ginza",
      nearbyAreas: "Ginza, Tsukiji, Yurakucho, Nihonbashi, and central Tokyo hotels",
      metaTitle: "Haneda Airport to Ginza Transfer | Private Car to Tokyo Hotels",
      metaDescription:
        "Private Haneda Airport to Ginza transfer for Ginza hotels, Tsukiji, Yurakucho and Nihonbashi. English driver, fixed quote, Alphard and Hiace options.",
      keywords: [
        "Haneda Airport to Ginza transfer",
        "Haneda to Ginza private car",
        "Haneda Airport to Ginza hotel",
        "Ginza airport pickup",
        "Haneda Airport transfer English driver",
        "Haneda to Tsukiji transfer",
        "Ginza hotel to Haneda Airport"
      ],
      cityName: "Tokyo",
      citySearchName: "Ginza, Tokyo, Japan",
      heroSubtitle:
        "Private door-to-door airport pickup from Haneda Airport to Ginza hotels, Tsukiji, Yurakucho, and Nihonbashi.",
      imageAlt: "Private Haneda Airport to Ginza transfer",
      overviewSubtitle:
        "Ginza is a popular Haneda transfer destination for luxury hotels, shopping, dining, and business stays in central Tokyo.",
      driveTime: "20-40 min",
      bestFor: "Luxury hotels and shopping",
      bestForDescription: "Useful for Ginza hotels, Tsukiji stays, business meetings, dining, and shopping trips.",
      vehicleFit: "Sedan or Alphard",
      vehicleDescription: "A sedan works for light luggage; Alphard or Hiace is better for families and larger bags.",
      notes: [
        "Send your flight number so pickup timing follows the actual landing time.",
        "Share the exact hotel name because Ginza and Tsukiji have many narrow streets and one-way roads.",
        "Tell us if you are going to a hotel, restaurant, apartment, or office building."
      ],
      quoteTitle: "Get a Haneda to Ginza Quote",
      quoteSubtitle:
        "Search your Ginza hotel or address on the map, then send passenger count, luggage, and flight details on WhatsApp for the final fixed price.",
      bookingTitle: "Book Haneda to Ginza",
      bookingSubtitle: "Send your flight, landing time, Ginza address, passengers, and luggage details for a fast WhatsApp quote.",
      hotelExample: "Mitsui Garden Hotel Ginza Premier",
      passengersExample: "2",
      luggageExample: "2 suitcases",
      messageHeader: "Hello, I need a Haneda Airport to Ginza transfer quote.",
      faqTitle: "Haneda to Ginza FAQ",
      faqSubtitle: "Common questions before booking a private car from Haneda Airport to Ginza.",
      faqs: [
        {
          question: "How long does Haneda Airport to Ginza take by private car?",
          answer: "It usually takes about 20 to 40 minutes, depending on traffic and the exact hotel entrance in Ginza."
        },
        {
          question: "Can you drop off at Tsukiji or Yurakucho?",
          answer: "Yes. Ginza, Tsukiji, Yurakucho, Nihonbashi, and nearby central Tokyo hotels can be arranged."
        },
        {
          question: "Is a sedan enough for Haneda to Ginza?",
          answer: "A sedan can work for light luggage, while Alphard or Hiace is better for families, multiple suitcases, or child seats."
        },
        {
          question: "Can I book Ginza hotel to Haneda Airport drop-off?",
          answer: "Yes. The same route can be booked in reverse for Ginza hotel to Haneda Airport drop-off."
        }
      ]
    },
    "haneda-airport-to-shinjuku": {
      title: "Haneda Airport to Shinjuku Transfer",
      destination: "Shinjuku",
      nearbyAreas: "Shinjuku Station hotels, Nishi-Shinjuku, Kabukicho, and nearby apartments",
      metaTitle: "Haneda Airport to Shinjuku Transfer | Private Car to Tokyo Hotels",
      metaDescription:
        "Private Haneda Airport to Shinjuku transfer for hotels near Shinjuku Station, Nishi-Shinjuku and Kabukicho. English driver, fixed quote, Alphard and Hiace options.",
      keywords: [
        "Haneda Airport to Shinjuku transfer",
        "Haneda to Shinjuku private car",
        "Haneda Airport to Shinjuku hotel",
        "Shinjuku airport pickup",
        "Haneda Airport transfer English driver",
        "Toyota Alphard Haneda to Shinjuku",
        "Shinjuku hotel to Haneda Airport"
      ],
      cityName: "Tokyo",
      citySearchName: "Shinjuku, Tokyo, Japan",
      heroSubtitle:
        "Private door-to-door airport pickup from Haneda Airport to Shinjuku hotels, apartments, Nishi-Shinjuku, and Kabukicho.",
      imageAlt: "Private Haneda Airport to Shinjuku transfer",
      overviewSubtitle:
        "Shinjuku is a common Haneda transfer destination for first-time Tokyo visitors, families, and travelers staying on the west side of Tokyo.",
      driveTime: "35-60 min",
      bestFor: "Hotels and nightlife areas",
      bestForDescription: "Useful for Shinjuku Station hotels, Nishi-Shinjuku, Kabukicho, apartments, and family arrivals.",
      vehicleFit: "Alphard or Hiace",
      vehicleDescription: "Alphard works well for comfort; Hiace is better for groups with larger luggage.",
      notes: [
        "Send the flight number so pickup time follows the actual landing time.",
        "Share the hotel name or full address because Shinjuku has many entrances and one-way streets.",
        "Tell us suitcase count and stroller needs before choosing Alphard or Hiace."
      ],
      quoteTitle: "Get a Haneda to Shinjuku Quote",
      quoteSubtitle:
        "Search your Shinjuku hotel or address on the map, then send passenger count, luggage, and flight details on WhatsApp for the final fixed price.",
      bookingTitle: "Book Haneda to Shinjuku",
      bookingSubtitle:
        "Send your flight, landing time, Shinjuku address, passengers, and luggage details for a fast WhatsApp quote.",
      hotelExample: "Shinjuku Washington Hotel",
      passengersExample: "2",
      luggageExample: "3 suitcases",
      messageHeader: "Hello, I need a Haneda Airport to Shinjuku transfer quote.",
      faqTitle: "Haneda to Shinjuku FAQ",
      faqSubtitle: "Common questions before booking a private car from Haneda Airport to Shinjuku.",
      faqs: [
        {
          question: "How long does Haneda Airport to Shinjuku take by private car?",
          answer: "It usually takes about 35 to 60 minutes, depending on traffic and the exact hotel entrance in Shinjuku."
        },
        {
          question: "Can the driver wait if my flight is delayed?",
          answer: "Yes. Airport pickup includes flight tracking, and free waiting starts from the actual landing time."
        },
        {
          question: "Is Alphard enough for Haneda to Shinjuku?",
          answer: "Toyota Alphard is comfortable for smaller families with moderate luggage. For more passengers, large suitcases, strollers, or golf bags, Toyota Hiace may be better."
        },
        {
          question: "Can I book Shinjuku hotel to Haneda Airport drop-off too?",
          answer: "Yes. The same route can be booked in reverse for Shinjuku hotel to Haneda Airport drop-off."
        }
      ]
    },
    "haneda-airport-to-shinagawa": {
      title: "Haneda Airport to Shinagawa Transfer",
      destination: "Shinagawa",
      nearbyAreas: "Shinagawa Station, Takanawa hotels, Gotanda, and Shinkansen connections",
      metaTitle: "Haneda Airport to Shinagawa Transfer | Private Car to Station Hotels",
      metaDescription:
        "Private Haneda Airport to Shinagawa transfer for Shinagawa Station, Takanawa hotels and Shinkansen connections. English driver, fixed quote, Alphard and Hiace options.",
      keywords: [
        "Haneda Airport to Shinagawa transfer",
        "Haneda to Shinagawa private car",
        "Haneda Airport to Shinagawa Station",
        "Shinagawa airport pickup",
        "Haneda Airport transfer English driver",
        "Haneda to Takanawa hotel transfer",
        "Shinagawa hotel to Haneda Airport"
      ],
      cityName: "Tokyo",
      citySearchName: "Shinagawa, Tokyo, Japan",
      heroSubtitle:
        "Private door-to-door airport pickup from Haneda Airport to Shinagawa Station hotels, Takanawa, Gotanda, and nearby addresses.",
      imageAlt: "Private Haneda Airport to Shinagawa transfer",
      overviewSubtitle:
        "Shinagawa is one of the fastest Haneda transfer destinations and works well for Shinkansen travelers, station hotels, and business trips.",
      driveTime: "20-35 min",
      bestFor: "Station hotels and Shinkansen",
      bestForDescription: "Useful for Shinagawa Station hotels, Takanawa stays, business travelers, and Shinkansen connections.",
      vehicleFit: "Sedan or Alphard",
      vehicleDescription: "Sedan is good for light luggage; Alphard or Hiace is better for families and groups.",
      notes: [
        "Send your flight number and Shinkansen time if you have a same-day train connection.",
        "Share the exact hotel entrance because Shinagawa Station has east and west-side pickup points.",
        "Tell us luggage details so we can confirm the best vehicle size."
      ],
      quoteTitle: "Get a Haneda to Shinagawa Quote",
      quoteSubtitle:
        "Search your Shinagawa hotel or station-area address on the map, then send flight details and luggage on WhatsApp for the final fixed quote.",
      bookingTitle: "Book Haneda to Shinagawa",
      bookingSubtitle:
        "Send your flight, landing time, Shinagawa address, passengers, and luggage details for a fast WhatsApp quote.",
      hotelExample: "Shinagawa Prince Hotel",
      passengersExample: "2",
      luggageExample: "2 suitcases",
      messageHeader: "Hello, I need a Haneda Airport to Shinagawa transfer quote.",
      faqTitle: "Haneda to Shinagawa FAQ",
      faqSubtitle: "Common questions before booking a private car from Haneda Airport to Shinagawa.",
      faqs: [
        {
          question: "How long does Haneda Airport to Shinagawa take by private car?",
          answer: "It usually takes about 20 to 35 minutes, depending on traffic and whether you are going to the station or a nearby hotel."
        },
        {
          question: "Can you pick up or drop off near Shinagawa Station?",
          answer: "Yes. Shinagawa Station, Takanawa hotels, Gotanda, and nearby addresses can be arranged."
        },
        {
          question: "Is this route good for Shinkansen travelers?",
          answer: "Yes. Please share your train time if you have a Shinkansen connection so we can suggest a safe pickup time."
        },
        {
          question: "Can I book Shinagawa hotel to Haneda Airport drop-off?",
          answer: "Yes. The same route can be booked in reverse for Shinagawa hotel to Haneda Airport drop-off."
        }
      ]
    }
  },
  ja: {
    "haneda-airport-to-ginza": {
      title: "羽田空港から銀座への送迎",
      destination: "銀座",
      nearbyAreas: "銀座、築地、有楽町、日本橋、東京中心部ホテル",
      metaTitle: "羽田空港から銀座への送迎 | 東京ホテルまでのプライベートカー",
      metaDescription:
        "羽田空港から銀座ホテル、築地、有楽町、日本橋までのプライベート送迎。英語対応ドライバー、固定料金、アルファードとハイエース対応。",
      keywords: [
        "羽田空港 銀座 送迎",
        "羽田 銀座 ハイヤー",
        "羽田空港から銀座ホテル",
        "銀座 空港送迎",
        "羽田空港 英語ドライバー",
        "羽田 築地 送迎",
        "銀座ホテル 羽田空港"
      ],
      cityName: "東京",
      citySearchName: "銀座, 東京, 日本",
      heroSubtitle: "羽田空港から銀座ホテル、築地、有楽町、日本橋までのドアツードア専用車送迎。",
      imageAlt: "羽田空港から銀座へのプライベート送迎",
      overviewSubtitle: "銀座は高級ホテル、ショッピング、食事、ビジネス滞在で人気の羽田空港送迎先です。",
      driveTime: "20-40分",
      bestFor: "高級ホテル・買い物",
      bestForDescription: "銀座ホテル、築地、有楽町、日本橋、ビジネス、食事、ショッピングに便利です。",
      vehicleFit: "セダン / アルファード",
      vehicleDescription: "荷物が少ない場合はセダン、ご家族や荷物が多い場合はアルファードまたはハイエースがおすすめです。",
      notes: [
        "フライト番号を送ると、実際の到着時刻に合わせてお迎えできます。",
        "銀座や築地は細い道と一方通行が多いため、正確なホテル名をお知らせください。",
        "ホテル、レストラン、民泊、オフィスビルのどちらへ向かうか共有してください。"
      ],
      quoteTitle: "羽田から銀座の見積もり",
      quoteSubtitle: "地図で銀座のホテルや住所を検索し、人数、荷物、フライト情報をWhatsAppで送ると最終固定料金を確認できます。",
      bookingTitle: "羽田から銀座を予約",
      bookingSubtitle: "フライト、到着時刻、銀座の住所、人数、荷物情報を送ると、WhatsAppですぐに見積もりできます。",
      hotelExample: "三井ガーデンホテル銀座プレミア",
      passengersExample: "2名",
      luggageExample: "スーツケース2個",
      messageHeader: "こんにちは。羽田空港から銀座への送迎見積もりをお願いします。",
      faqTitle: "羽田から銀座 FAQ",
      faqSubtitle: "羽田空港から銀座まで専用車を予約する前によくある質問です。",
      faqs: [
        {
          question: "羽田空港から銀座まで車でどのくらいですか？",
          answer: "通常は20分から40分ほどです。交通状況と銀座のホテル入口により変わります。"
        },
        {
          question: "築地や有楽町でも降車できますか？",
          answer: "はい。銀座、築地、有楽町、日本橋、東京中心部ホテルに対応できます。"
        },
        {
          question: "羽田から銀座はセダンで大丈夫ですか？",
          answer: "荷物が少ない場合はセダンでも可能です。ご家族、複数のスーツケース、チャイルドシートがある場合はアルファードやハイエースがおすすめです。"
        },
        {
          question: "銀座ホテルから羽田空港への送機もできますか？",
          answer: "はい。銀座ホテルから羽田空港への逆方向の送迎も予約できます。"
        }
      ]
    },
    "haneda-airport-to-shinjuku": {
      title: "羽田空港から新宿への送迎",
      destination: "新宿",
      nearbyAreas: "新宿駅周辺ホテル、西新宿、歌舞伎町、周辺アパート",
      metaTitle: "羽田空港から新宿への送迎 | 東京ホテルまでのプライベートカー",
      metaDescription:
        "羽田空港から新宿駅周辺、西新宿、歌舞伎町エリアのホテルまでのプライベート送迎。英語対応ドライバー、固定料金、アルファードとハイエース対応。",
      keywords: [
        "羽田空港 新宿 送迎",
        "羽田 新宿 ハイヤー",
        "羽田空港から新宿ホテル",
        "新宿 空港送迎",
        "羽田空港 英語ドライバー",
        "アルファード 羽田 新宿",
        "新宿ホテル 羽田空港"
      ],
      cityName: "東京",
      citySearchName: "新宿, 東京, 日本",
      heroSubtitle: "羽田空港から新宿のホテル、民泊、西新宿、歌舞伎町エリアまでのドアツードア専用車送迎。",
      imageAlt: "羽田空港から新宿へのプライベート送迎",
      overviewSubtitle: "新宿は初めて東京に来る旅行者、ご家族、東京西側に滞在するお客様に多い羽田空港送迎先です。",
      driveTime: "35-60分",
      bestFor: "ホテル・繁華街エリア",
      bestForDescription: "新宿駅周辺ホテル、西新宿、歌舞伎町、民泊、ご家族の到着に便利です。",
      vehicleFit: "アルファード / ハイエース",
      vehicleDescription: "快適性重視はアルファード、人数や荷物が多い場合はハイエースがおすすめです。",
      notes: [
        "フライト番号を送ると、実際の到着時刻に合わせてお迎えできます。",
        "新宿は入口が多いため、ホテル名または住所を正確にお知らせください。",
        "スーツケース数、ベビーカー、チャイルドシートの有無を事前に共有してください。"
      ],
      quoteTitle: "羽田から新宿の見積もり",
      quoteSubtitle: "地図で新宿のホテルや住所を検索し、人数、荷物、フライト情報をWhatsAppで送ると最終固定料金を確認できます。",
      bookingTitle: "羽田から新宿を予約",
      bookingSubtitle: "フライト、到着時刻、新宿の住所、人数、荷物情報を送ると、WhatsAppですぐに見積もりできます。",
      hotelExample: "新宿ワシントンホテル",
      passengersExample: "2名",
      luggageExample: "スーツケース3個",
      messageHeader: "こんにちは。羽田空港から新宿への送迎見積もりをお願いします。",
      faqTitle: "羽田から新宿 FAQ",
      faqSubtitle: "羽田空港から新宿まで専用車を予約する前によくある質問です。",
      faqs: [
        {
          question: "羽田空港から新宿まで車でどのくらいですか？",
          answer: "通常は35分から60分ほどです。交通状況と新宿のホテル入口により変わります。"
        },
        {
          question: "フライトが遅れた場合も待ってもらえますか？",
          answer: "はい。空港お迎えはフライト情報を確認し、実際の到着時刻から無料待機時間を計算します。"
        },
        {
          question: "羽田から新宿はアルファードで大丈夫ですか？",
          answer: "少人数で荷物が通常量ならアルファードが快適です。人数、スーツケース、ベビーカーが多い場合はハイエースがおすすめです。"
        },
        {
          question: "新宿ホテルから羽田空港への送機もできますか？",
          answer: "はい。新宿ホテルから羽田空港への逆方向の送迎も予約できます。"
        }
      ]
    },
    "haneda-airport-to-shinagawa": {
      title: "羽田空港から品川への送迎",
      destination: "品川",
      nearbyAreas: "品川駅、高輪ホテル、五反田、新幹線接続",
      metaTitle: "羽田空港から品川への送迎 | 品川駅ホテルまでのプライベートカー",
      metaDescription:
        "羽田空港から品川駅、高輪ホテル、新幹線接続に便利なプライベート送迎。英語対応ドライバー、固定料金、アルファードとハイエース対応。",
      keywords: [
        "羽田空港 品川 送迎",
        "羽田 品川 ハイヤー",
        "羽田空港から品川駅",
        "品川 空港送迎",
        "羽田空港 英語ドライバー",
        "羽田 高輪ホテル 送迎",
        "品川ホテル 羽田空港"
      ],
      cityName: "東京",
      citySearchName: "品川, 東京, 日本",
      heroSubtitle: "羽田空港から品川駅周辺ホテル、高輪、五反田、周辺住所までのドアツードア専用車送迎。",
      imageAlt: "羽田空港から品川へのプライベート送迎",
      overviewSubtitle: "品川は羽田空港から近く、新幹線利用、駅周辺ホテル、ビジネス移動に便利なルートです。",
      driveTime: "20-35分",
      bestFor: "駅ホテル・新幹線",
      bestForDescription: "品川駅周辺ホテル、高輪エリア、ビジネス利用、新幹線接続に便利です。",
      vehicleFit: "セダン / アルファード",
      vehicleDescription: "荷物が少ない場合はセダン、ご家族やグループはアルファードまたはハイエースがおすすめです。",
      notes: [
        "当日新幹線に乗り継ぐ場合は、フライト番号と列車時刻をお知らせください。",
        "品川駅は高輪口・港南口など複数の乗降場所があるため、正確な目的地を共有してください。",
        "荷物数を共有いただくと、最適な車種を確認しやすくなります。"
      ],
      quoteTitle: "羽田から品川の見積もり",
      quoteSubtitle: "地図で品川のホテルや駅周辺住所を検索し、フライトと荷物情報をWhatsAppで送ると最終固定料金を確認できます。",
      bookingTitle: "羽田から品川を予約",
      bookingSubtitle: "フライト、到着時刻、品川の住所、人数、荷物情報を送ると、WhatsAppですぐに見積もりできます。",
      hotelExample: "品川プリンスホテル",
      passengersExample: "2名",
      luggageExample: "スーツケース2個",
      messageHeader: "こんにちは。羽田空港から品川への送迎見積もりをお願いします。",
      faqTitle: "羽田から品川 FAQ",
      faqSubtitle: "羽田空港から品川まで専用車を予約する前によくある質問です。",
      faqs: [
        {
          question: "羽田空港から品川まで車でどのくらいですか？",
          answer: "通常は20分から35分ほどです。駅周辺かホテルか、交通状況により変わります。"
        },
        {
          question: "品川駅周辺で乗降できますか？",
          answer: "はい。品川駅、高輪ホテル、五反田、周辺住所に対応できます。"
        },
        {
          question: "新幹線に乗り継ぐ場合にも使えますか？",
          answer: "はい。新幹線の時刻を共有いただくと、余裕を持った到着時間を提案できます。"
        },
        {
          question: "品川ホテルから羽田空港への送機もできますか？",
          answer: "はい。品川ホテルから羽田空港への逆方向の送迎も予約できます。"
        }
      ]
    }
  },
  zh: {
    "haneda-airport-to-ginza": {
      title: "羽田機場到銀座接送",
      destination: "銀座",
      nearbyAreas: "銀座、築地、有樂町、日本橋和東京中心區酒店",
      metaTitle: "羽田機場到銀座接送 | 東京酒店私人專車",
      metaDescription:
        "羽田機場到銀座酒店、築地、有樂町和日本橋的私人專車接送。可中文英文溝通，固定報價，Toyota Alphard 和 Hiace 可選。",
      keywords: [
        "羽田機場到銀座接送",
        "羽田到銀座包車",
        "羽田機場到銀座酒店",
        "銀座接機",
        "羽田機場英文司機",
        "羽田到築地接送",
        "銀座酒店到羽田機場"
      ],
      cityName: "東京",
      citySearchName: "銀座, 東京, 日本",
      heroSubtitle: "羽田機場到銀座酒店、築地、有樂町和日本橋的點對點私人專車接送。",
      imageAlt: "羽田機場到銀座私人專車接送",
      overviewSubtitle: "銀座是羽田機場到東京市區很常見的目的地，適合高級酒店、購物、美食和商務停留。",
      driveTime: "20-40分鐘",
      bestFor: "高級酒店和購物",
      bestForDescription: "適合銀座酒店、築地、有樂町、日本橋、商務會議、餐廳和購物行程。",
      vehicleFit: "轎車或 Alphard",
      vehicleDescription: "行李少可選轎車，親子家庭或行李多時建議 Alphard 或 Hiace。",
      notes: [
        "提供航班號，司機可以根據實際落地時間安排接機。",
        "銀座和築地周邊窄路與單行道多，請提供準確酒店名稱。",
        "請說明目的地是酒店、餐廳、民宿還是辦公樓。"
      ],
      quoteTitle: "獲取羽田到銀座報價",
      quoteSubtitle: "在地圖中搜尋銀座酒店或地址，再透過 WhatsApp 發送人數、行李和航班資訊，確認最終固定價格。",
      bookingTitle: "預約羽田到銀座",
      bookingSubtitle: "發送航班、落地時間、銀座地址、人數和行李資訊，即可透過 WhatsApp 快速報價。",
      hotelExample: "三井花園飯店銀座普米爾",
      passengersExample: "2人",
      luggageExample: "2個行李箱",
      messageHeader: "您好，我需要羽田機場到銀座接送報價。",
      faqTitle: "羽田到銀座常見問題",
      faqSubtitle: "預約羽田機場到銀座私人專車前常見的問題。",
      faqs: [
        {
          question: "羽田機場到銀座包車需要多久？",
          answer: "通常約20到40分鐘，具體取決於路況和銀座酒店入口位置。"
        },
        {
          question: "可以在築地或有樂町下車嗎？",
          answer: "可以。銀座、築地、有樂町、日本橋和東京中心區酒店都可以安排。"
        },
        {
          question: "羽田到銀座轎車夠用嗎？",
          answer: "行李少時轎車可以；如果是家庭、行李箱多或需要兒童座椅，建議 Alphard 或 Hiace。"
        },
        {
          question: "可以預約銀座酒店到羽田機場送機嗎？",
          answer: "可以，同一條路線也可以反向預約銀座酒店到羽田機場送機。"
        }
      ]
    },
    "haneda-airport-to-shinjuku": {
      title: "羽田機場到新宿接送",
      destination: "新宿",
      nearbyAreas: "新宿站周邊酒店、西新宿、歌舞伎町和附近公寓",
      metaTitle: "羽田機場到新宿接送 | 東京酒店私人專車",
      metaDescription:
        "羽田機場到新宿站周邊、西新宿、歌舞伎町酒店的私人專車接送。可中文英文溝通，固定報價，Toyota Alphard 和 Hiace 可選。",
      keywords: [
        "羽田機場到新宿接送",
        "羽田到新宿包車",
        "羽田機場到新宿酒店",
        "新宿接機",
        "羽田機場英文司機",
        "Alphard 羽田到新宿",
        "新宿酒店到羽田機場"
      ],
      cityName: "東京",
      citySearchName: "新宿, 東京, 日本",
      heroSubtitle: "羽田機場到新宿酒店、民宿、西新宿和歌舞伎町區域的點對點私人專車接送。",
      imageAlt: "羽田機場到新宿私人專車接送",
      overviewSubtitle: "新宿是第一次到東京旅客、家庭和入住東京西側旅客很常見的羽田機場接送目的地。",
      driveTime: "35-60分鐘",
      bestFor: "酒店和繁華區",
      bestForDescription: "適合新宿站周邊酒店、西新宿、歌舞伎町、民宿和親子家庭。",
      vehicleFit: "Alphard 或 Hiace",
      vehicleDescription: "Alphard 舒適度高，行李或人數較多時 Hiace 更合適。",
      notes: [
        "提供航班號，司機可以根據實際落地時間安排接機。",
        "新宿酒店入口多、單行道多，請提供準確酒店名稱或完整地址。",
        "請提前告訴我們行李箱數量、嬰兒車和兒童座椅需求。"
      ],
      quoteTitle: "獲取羽田到新宿報價",
      quoteSubtitle: "在地圖中搜尋新宿酒店或地址，再透過 WhatsApp 發送人數、行李和航班資訊，確認最終固定價格。",
      bookingTitle: "預約羽田到新宿",
      bookingSubtitle: "發送航班、落地時間、新宿地址、人數和行李資訊，即可透過 WhatsApp 快速報價。",
      hotelExample: "新宿華盛頓酒店",
      passengersExample: "2人",
      luggageExample: "3個行李箱",
      messageHeader: "您好，我需要羽田機場到新宿接送報價。",
      faqTitle: "羽田到新宿常見問題",
      faqSubtitle: "預約羽田機場到新宿私人專車前常見的問題。",
      faqs: [
        {
          question: "羽田機場到新宿包車需要多久？",
          answer: "通常約35到60分鐘，具體取決於路況和新宿酒店入口位置。"
        },
        {
          question: "航班延誤司機會等嗎？",
          answer: "會。接機會跟蹤航班，免費等待時間從航班實際落地開始計算。"
        },
        {
          question: "羽田到新宿 Alphard 夠用嗎？",
          answer: "少人且行李適中時 Alphard 很舒適；如果人數、行李箱、嬰兒車較多，建議選 Hiace。"
        },
        {
          question: "可以預約新宿酒店到羽田機場送機嗎？",
          answer: "可以，同一條路線也可以反向預約新宿酒店到羽田機場送機。"
        }
      ]
    },
    "haneda-airport-to-shinagawa": {
      title: "羽田機場到品川接送",
      destination: "品川",
      nearbyAreas: "品川站、高輪酒店、五反田和新幹線轉乘",
      metaTitle: "羽田機場到品川接送 | 品川站酒店私人專車",
      metaDescription:
        "羽田機場到品川站、高輪酒店和新幹線轉乘的私人專車接送。可中文英文溝通，固定報價，Toyota Alphard 和 Hiace 可選。",
      keywords: [
        "羽田機場到品川接送",
        "羽田到品川包車",
        "羽田機場到品川站",
        "品川接機",
        "羽田機場英文司機",
        "羽田到高輪酒店接送",
        "品川酒店到羽田機場"
      ],
      cityName: "東京",
      citySearchName: "品川, 東京, 日本",
      heroSubtitle: "羽田機場到品川站周邊酒店、高輪、五反田和附近地址的點對點私人專車接送。",
      imageAlt: "羽田機場到品川私人專車接送",
      overviewSubtitle: "品川是羽田機場進東京最快的常見路線之一，適合新幹線轉乘、站區酒店和商務旅客。",
      driveTime: "20-35分鐘",
      bestFor: "站區酒店和新幹線",
      bestForDescription: "適合品川站周邊酒店、高輪住宿、商務客人和新幹線轉乘。",
      vehicleFit: "轎車或 Alphard",
      vehicleDescription: "行李少可選轎車，親子家庭或多人團隊建議 Alphard 或 Hiace。",
      notes: [
        "如果當天要轉乘新幹線，請提供航班號和列車時間。",
        "品川站有高輪口、港南口等多個上下車點，請提供準確目的地。",
        "請提前告訴我們行李數量，方便確認合適車型。"
      ],
      quoteTitle: "獲取羽田到品川報價",
      quoteSubtitle: "搜尋品川酒店或車站周邊地址，再透過 WhatsApp 發送航班和行李資訊，確認最終固定報價。",
      bookingTitle: "預約羽田到品川",
      bookingSubtitle: "發送航班、落地時間、品川地址、人數和行李資訊，即可透過 WhatsApp 快速報價。",
      hotelExample: "品川王子大飯店",
      passengersExample: "2人",
      luggageExample: "2個行李箱",
      messageHeader: "您好，我需要羽田機場到品川接送報價。",
      faqTitle: "羽田到品川常見問題",
      faqSubtitle: "預約羽田機場到品川私人專車前常見的問題。",
      faqs: [
        {
          question: "羽田機場到品川包車需要多久？",
          answer: "通常約20到35分鐘，具體取決於路況和目的地是車站還是附近酒店。"
        },
        {
          question: "可以在品川站周邊上下車嗎？",
          answer: "可以。品川站、高輪酒店、五反田和附近地址都可以安排。"
        },
        {
          question: "這條路線適合轉新幹線嗎？",
          answer: "適合。請提供新幹線時間，我們可以建議更安全的接送時間。"
        },
        {
          question: "可以預約品川酒店到羽田機場送機嗎？",
          answer: "可以，同一條路線也可以反向預約品川酒店到羽田機場送機。"
        }
      ]
    }
  }
};

function buildHanedaRoutePage(locale: Locale, slug: HanedaRouteSlug): RoutePageContent {
  const config = hanedaRouteConfigs[locale][slug];
  const copy = hanedaLocaleCopy[locale];
  const path = routePagePath(slug);

  return {
    slug,
    path,
    cityName: config.cityName,
    citySearchName: config.citySearchName,
    routeAirports: [hanedaAirport],
    defaultAirportId: "haneda",
    serviceProfile: routeServiceProfiles[slug],
    meta: {
      title: config.metaTitle,
      description: config.metaDescription,
      keywords: config.keywords,
      image: "/images/haneda-airport.jpg"
    },
    hero: {
      title: config.title,
      subtitle: config.heroSubtitle,
      features: copy.features(config.destination),
      imageSrc: "/images/haneda-airport.jpg",
      imageAlt: config.imageAlt
    },
    overview: {
      title: copy.overviewTitle(config.destination),
      subtitle: config.overviewSubtitle,
      facts: [
        {
          label: locale === "en" ? "Typical drive time" : locale === "ja" ? "通常の所要時間" : "通常車程",
          value: config.driveTime,
          description:
            locale === "en"
              ? `Traffic and the exact entrance around ${config.destination} can change the final timing.`
              : locale === "ja"
                ? "道路状況と目的地の入口により実際の所要時間は変わります。"
                : "實際時間會依路況和目的地入口位置而變化。"
        },
        {
          label: locale === "en" ? "Best for" : locale === "ja" ? "おすすめ利用" : "適合場景",
          value: config.bestFor,
          description: config.bestForDescription
        },
        {
          label: locale === "en" ? "Vehicle fit" : locale === "ja" ? "車種の目安" : "車型建議",
          value: config.vehicleFit,
          description: config.vehicleDescription
        }
      ],
      notesTitle: copy.notesTitle,
      notes: config.notes
    },
    quote: {
      title: config.quoteTitle,
      subtitle: config.quoteSubtitle,
      directNote: copy.directNote
    },
    waiting: {
      pickupNote: copy.pickupNote,
      delayNote: copy.delayNote,
      promiseTitle: copy.promiseTitle,
      promises: copy.promises(config.destination)
    },
    booking: {
      title: config.bookingTitle,
      subtitle: config.bookingSubtitle,
      placeholders: {
        airport: copy.airportPlaceholder,
        flight: copy.flightPlaceholder,
        landingTime: copy.landingTimePlaceholder,
        hotel: config.hotelExample,
        passengers: config.passengersExample,
        luggage: config.luggageExample
      },
      messageHeader: config.messageHeader
    },
    seo: {
      routesTitle: copy.routesTitle,
      routesSubtitle: copy.routesSubtitle,
      routes: copy.relatedRoutes.filter((route) => route.href !== path).slice(0, 4),
      faqTitle: config.faqTitle,
      faqSubtitle: config.faqSubtitle,
      faqs: config.faqs
    }
  };
}

const routePageContent: Record<Locale, Record<RoutePageSlug, RoutePageContent>> = {
  en: {
    "narita-airport-to-shinjuku": {
      slug: "narita-airport-to-shinjuku",
      path: "/narita-airport-to-shinjuku",
      cityName: "Tokyo",
      citySearchName: "Shinjuku, Tokyo, Japan",
      routeAirports: [naritaAirport],
      defaultAirportId: "narita",
      serviceProfile: routeServiceProfiles["narita-airport-to-shinjuku"],
      meta: {
        title: "Narita Airport to Shinjuku Transfer | Private Car to Tokyo Hotels",
        description:
          "Private Narita Airport to Shinjuku transfer for hotels near Shinjuku Station, Nishi-Shinjuku and Kabukicho. English driver, fixed quote, Alphard and Hiace options.",
        keywords: [
          "Narita Airport to Shinjuku transfer",
          "Narita to Shinjuku private car",
          "Narita Airport to Shinjuku hotel",
          "Shinjuku airport pickup",
          "Narita Airport transfer English driver",
          "Toyota Alphard Narita to Shinjuku",
          "Shinjuku hotel to Narita Airport"
        ],
        image: "/images/narita-airport.jpg"
      },
      hero: {
        title: "Narita Airport to Shinjuku Transfer",
        subtitle:
          "Private door-to-door airport pickup from Narita Airport to Shinjuku hotels, apartments, Nishi-Shinjuku, and Kabukicho.",
        features: [
          "Narita pickup with flight tracking",
          "Shinjuku hotel and apartment drop-off",
          "Toyota Alphard or Hiace available",
          "90 min free airport waiting",
          "Optional name-sign meet-and-greet",
          "Fixed quote confirmed on WhatsApp"
        ],
        imageSrc: "/images/narita-airport.jpg",
        imageAlt: "Private Narita Airport to Shinjuku transfer"
      },
      overview: {
        title: "Route Details for Narita to Shinjuku",
        subtitle:
          "Shinjuku is one of the most common Narita transfer destinations for first-time Tokyo visitors, families, and business travelers staying near the west side of central Tokyo.",
        facts: [
          {
            label: "Typical drive time",
            value: "70-100 min",
            description: "Traffic on the expressway and around Shinjuku Station can change the final timing."
          },
          {
            label: "Best for",
            value: "Hotels and apartments",
            description: "Useful for Nishi-Shinjuku hotels, Kabukicho stays, serviced apartments, and family arrivals."
          },
          {
            label: "Vehicle fit",
            value: "Alphard or Hiace",
            description: "Alphard works well for comfort; Hiace is better for groups with larger luggage."
          }
        ],
        notesTitle: "Before You Book",
        notes: [
          "Send the flight number so pickup time follows the actual landing time.",
          "Share the hotel name or full address because Shinjuku has many entrances and one-way streets.",
          "Tell us suitcase count and stroller needs before choosing Alphard or Hiace."
        ]
      },
      quote: {
        title: "Get a Narita to Shinjuku Quote",
        subtitle:
          "Search your Shinjuku hotel or address on the map, then send passenger count, luggage, and flight details on WhatsApp for the final fixed price.",
        directNote:
          "Opens in WhatsApp after submission. Arrival-gate name-sign meet-and-greet is optional and costs +2,000 JPY when requested."
      },
      waiting: {
        pickupNote: "For Narita Airport pickup, waiting time starts from the actual flight landing time.",
        delayNote: "If the flight is delayed, the driver adjusts pickup timing based on the updated arrival information.",
        promiseTitle: "Why Book This Route",
        promises: [
          ["Direct to your door", "No train transfers with luggage after a long international flight."],
          ["Shinjuku area knowledge", "Driver can handle major hotel entrances, apartments, and busy station-area roads."],
          ["Clear vehicle advice", "We confirm Alphard or Hiace based on passengers, suitcases, and child seats."],
          ["WhatsApp support", "Route, pickup point, and timing can be confirmed before arrival."]
        ]
      },
      booking: {
        title: "Book Narita to Shinjuku",
        subtitle: "Send your flight, landing time, Shinjuku address, passengers, and luggage details for a fast WhatsApp quote.",
        placeholders: {
          airport: "Narita Airport (NRT)",
          flight: "JL123",
          landingTime: "May 3, 4:30 PM",
          hotel: "Shinjuku Washington Hotel",
          passengers: "2",
          luggage: "3 suitcases"
        },
        messageHeader: "Hello, I need a Narita Airport to Shinjuku transfer quote."
      },
      seo: {
        routesTitle: "Related Narita Airport Routes",
        routesSubtitle:
          "Other private airport transfer routes for Tokyo hotels, Tokyo Disney Resort, and onward travel after arrival at Narita.",
        routes: [
          {
            title: "Narita Airport to Tokyo Disney Resort",
            description: "Private family transfer to Tokyo Disneyland, DisneySea, Maihama hotels, and resort-area hotels.",
            href: "/narita-airport-to-tokyo-disney-resort"
          },
          {
            title: "Narita Airport to Tokyo hotels",
            description: "General Narita transfer page for Shibuya, Ginza, Asakusa, Shinagawa, and other Tokyo areas.",
            href: "/narita-airport-transfer"
          },
          {
            title: "Haneda Airport to Tokyo",
            description: "Fast private pickup from Haneda Airport to central Tokyo hotels and apartments.",
            href: "/haneda-airport-transfer"
          },
          {
            title: "Tokyo private driver",
            description: "Hotel-to-hotel transfer, Shinkansen station pickup, Mt Fuji day trips, and hourly charter.",
            href: "/tokyo-private-driver"
          }
        ],
        faqTitle: "Narita to Shinjuku FAQ",
        faqSubtitle: "Common questions before booking a private car from Narita Airport to Shinjuku.",
        faqs: [
          {
            question: "How long does Narita Airport to Shinjuku take by private car?",
            answer:
              "It usually takes about 70 to 100 minutes, depending on expressway traffic, arrival time, and the exact hotel entrance in Shinjuku."
          },
          {
            question: "Can the driver wait if my flight is delayed?",
            answer:
              "Yes. Airport pickup includes flight tracking, and free waiting starts from the actual landing time."
          },
          {
            question: "Is Alphard enough for Narita to Shinjuku?",
            answer:
              "Toyota Alphard is comfortable for smaller families with moderate luggage. For more passengers, large suitcases, strollers, or golf bags, Toyota Hiace may be better."
          },
          {
            question: "Can I book Shinjuku hotel to Narita Airport drop-off too?",
            answer:
              "Yes. The same route can be booked in reverse for Shinjuku hotel to Narita Airport drop-off."
          }
        ]
      }
    },
    "narita-airport-to-tokyo-disney-resort": {
      slug: "narita-airport-to-tokyo-disney-resort",
      path: "/narita-airport-to-tokyo-disney-resort",
      cityName: "Tokyo Disney Resort",
      citySearchName: "Tokyo Disney Resort, Urayasu, Chiba, Japan",
      routeAirports: [naritaAirport],
      defaultAirportId: "narita",
      serviceProfile: routeServiceProfiles["narita-airport-to-tokyo-disney-resort"],
      meta: {
        title: "Narita Airport to Tokyo Disney Resort Transfer | Disneyland & DisneySea",
        description:
          "Private Narita Airport to Tokyo Disney Resort transfer for Tokyo Disneyland, DisneySea, Maihama and Disney hotels. Family-friendly Alphard and Hiace options.",
        keywords: [
          "Narita Airport to Tokyo Disney Resort transfer",
          "Narita to Tokyo Disneyland private car",
          "Narita Airport to DisneySea transfer",
          "Narita to Maihama hotel transfer",
          "Tokyo Disney Resort airport transfer",
          "Narita airport pickup for family",
          "Tokyo Disney hotel to Narita Airport"
        ],
        image: "/images/narita-airport.jpg"
      },
      hero: {
        title: "Narita Airport to Tokyo Disney Resort Transfer",
        subtitle:
          "Private airport pickup from Narita Airport to Tokyo Disneyland, DisneySea, Maihama hotels, and Tokyo Disney Resort hotels.",
        features: [
          "Family-friendly airport pickup",
          "Direct to Disneyland, DisneySea, or Maihama",
          "Luggage and stroller support",
          "90 min free airport waiting",
          "Toyota Alphard or Hiace available",
          "Fixed quote confirmed on WhatsApp"
        ],
        imageSrc: "/images/narita-airport.jpg",
        imageAlt: "Private Narita Airport to Tokyo Disney Resort transfer"
      },
      overview: {
        title: "Route Details for Narita to Tokyo Disney Resort",
        subtitle:
          "This route is popular for families who want to go directly from the airport to Tokyo Disneyland, DisneySea, or a Maihama hotel without changing trains with luggage.",
        facts: [
          {
            label: "Typical drive time",
            value: "50-80 min",
            description: "Drive time depends on arrival time, expressway conditions, and the exact Disney hotel entrance."
          },
          {
            label: "Best for",
            value: "Families with luggage",
            description: "Useful for children, strollers, large suitcases, and late arrivals before a resort stay."
          },
          {
            label: "Drop-off areas",
            value: "Maihama and Disney hotels",
            description: "Tokyo Disneyland, Tokyo DisneySea, resort hotels, and nearby Maihama hotels can be arranged."
          }
        ],
        notesTitle: "Before You Book",
        notes: [
          "Send the exact hotel name because Disney Resort and Maihama have multiple hotel entrances.",
          "Tell us if you need child seats, stroller space, or a larger Hiace for family luggage.",
          "For the return trip, share the flight departure time so we can suggest a safe pickup time."
        ]
      },
      quote: {
        title: "Get a Narita to Tokyo Disney Resort Quote",
        subtitle:
          "Search your Disney Resort hotel or Maihama address, then send flight details, passengers, child seats, and luggage on WhatsApp for the final fixed quote.",
        directNote:
          "Opens in WhatsApp after submission. Arrival-gate name-sign meet-and-greet is optional and costs +2,000 JPY when requested."
      },
      waiting: {
        pickupNote: "For Narita Airport pickup, waiting time starts from the actual flight landing time.",
        delayNote: "Flight delays are monitored so the driver can adjust pickup timing before you reach the arrival lobby.",
        promiseTitle: "Why Book This Route",
        promises: [
          ["No train transfers", "Go directly to the resort area with children, strollers, and suitcases."],
          ["Family vehicle options", "Alphard and Hiace choices help match passengers and luggage."],
          ["Hotel entrance support", "We confirm the resort or Maihama hotel drop-off before the ride."],
          ["Return trip planning", "We can also arrange Disney hotel to Narita Airport drop-off."]
        ]
      },
      booking: {
        title: "Book Narita to Tokyo Disney Resort",
        subtitle:
          "Send flight, arrival time, Disney hotel, passengers, child seat needs, and luggage details for a fast WhatsApp quote.",
        placeholders: {
          airport: "Narita Airport (NRT)",
          flight: "JL123",
          landingTime: "May 3, 4:30 PM",
          hotel: "Tokyo Disneyland Hotel",
          passengers: "4",
          luggage: "4 suitcases and 1 stroller"
        },
        messageHeader: "Hello, I need a Narita Airport to Tokyo Disney Resort transfer quote."
      },
      seo: {
        routesTitle: "Related Disney and Tokyo Airport Routes",
        routesSubtitle:
          "Private transfers for Tokyo Disney Resort, Shinjuku, Tokyo hotels, and return airport drop-off routes.",
        routes: [
          {
            title: "Narita Airport to Shinjuku",
            description: "Private airport transfer to Shinjuku Station hotels, Nishi-Shinjuku, Kabukicho, and apartments.",
            href: "/narita-airport-to-shinjuku"
          },
          {
            title: "Narita Airport to Tokyo hotels",
            description: "General Narita transfer page for Ginza, Shibuya, Asakusa, Shinagawa, and central Tokyo hotels.",
            href: "/narita-airport-transfer"
          },
          {
            title: "Haneda Airport to Tokyo",
            description: "Private Haneda pickup for Ginza, Shinagawa, Shinjuku, Shibuya, and central Tokyo.",
            href: "/haneda-airport-transfer"
          },
          {
            title: "Tokyo private driver",
            description: "Hotel transfers, day trips, Shinkansen pickup, and hourly private car service in Tokyo.",
            href: "/tokyo-private-driver"
          }
        ],
        faqTitle: "Narita to Tokyo Disney Resort FAQ",
        faqSubtitle: "Common questions for families booking a private car from Narita Airport to the Disney resort area.",
        faqs: [
          {
            question: "How long does Narita Airport to Tokyo Disney Resort take?",
            answer:
              "It usually takes about 50 to 80 minutes, depending on traffic, arrival time, and the exact hotel or park drop-off point."
          },
          {
            question: "Can you drop off at Tokyo Disneyland or DisneySea?",
            answer:
              "Yes. We can arrange drop-off for Tokyo Disneyland, Tokyo DisneySea, Maihama Station area hotels, and Tokyo Disney Resort hotels."
          },
          {
            question: "Which vehicle is better for a family going to Disney?",
            answer:
              "Toyota Alphard is comfortable for many families, while Toyota Hiace is better when you have more passengers, strollers, and large suitcases."
          },
          {
            question: "Can I book Disney hotel to Narita Airport for departure?",
            answer:
              "Yes. We can arrange the return route from Tokyo Disney Resort hotels or Maihama hotels to Narita Airport."
          }
        ]
      }
    },
    "haneda-airport-to-ginza": buildHanedaRoutePage("en", "haneda-airport-to-ginza"),
    "haneda-airport-to-shinjuku": buildHanedaRoutePage("en", "haneda-airport-to-shinjuku"),
    "haneda-airport-to-shinagawa": buildHanedaRoutePage("en", "haneda-airport-to-shinagawa")
  },
  ja: {
    "narita-airport-to-shinjuku": {
      slug: "narita-airport-to-shinjuku",
      path: "/narita-airport-to-shinjuku",
      cityName: "東京",
      citySearchName: "新宿, 東京, 日本",
      routeAirports: [naritaAirport],
      defaultAirportId: "narita",
      serviceProfile: routeServiceProfiles["narita-airport-to-shinjuku"],
      meta: {
        title: "成田空港から新宿への送迎 | 東京ホテルまでのプライベートカー",
        description:
          "成田空港から新宿駅周辺、西新宿、歌舞伎町エリアのホテルまでのプライベート送迎。英語対応ドライバー、固定料金、アルファードとハイエース対応。",
        keywords: [
          "成田空港 新宿 送迎",
          "成田 新宿 ハイヤー",
          "成田空港から新宿ホテル",
          "新宿 空港送迎",
          "成田空港 英語ドライバー",
          "アルファード 成田 新宿",
          "新宿ホテル 成田空港"
        ],
        image: "/images/narita-airport.jpg"
      },
      hero: {
        title: "成田空港から新宿への送迎",
        subtitle: "成田空港から新宿のホテル、民泊、西新宿、歌舞伎町エリアまでのドアツードア専用車送迎。",
        features: [
          "成田空港お迎えとフライト確認",
          "新宿ホテル・住所まで直行",
          "アルファードまたはハイエース対応",
          "空港お迎え90分無料待機",
          "ネームプレートお迎えオプション",
          "WhatsAppで固定料金を確認"
        ],
        imageSrc: "/images/narita-airport.jpg",
        imageAlt: "成田空港から新宿へのプライベート送迎"
      },
      overview: {
        title: "成田から新宿へのルート詳細",
        subtitle: "新宿は初めて東京に来る旅行者、ご家族、ビジネス利用で特に多い成田空港送迎先です。",
        facts: [
          {
            label: "通常の所要時間",
            value: "70-100分",
            description: "高速道路と新宿駅周辺の交通状況により変わります。"
          },
          {
            label: "おすすめ利用",
            value: "ホテル・民泊",
            description: "西新宿の大型ホテル、歌舞伎町周辺、サービスアパートにも便利です。"
          },
          {
            label: "車種の目安",
            value: "アルファード / ハイエース",
            description: "快適性重視はアルファード、人数や荷物が多い場合はハイエースがおすすめです。"
          }
        ],
        notesTitle: "予約前の確認",
        notes: [
          "フライト番号を送ると、実際の到着時刻に合わせてお迎えできます。",
          "新宿は入口が多いため、ホテル名または住所を正確にお知らせください。",
          "スーツケース数、ベビーカー、チャイルドシートの有無を事前に共有してください。"
        ]
      },
      quote: {
        title: "成田から新宿の見積もり",
        subtitle:
          "地図で新宿のホテルや住所を検索し、人数、荷物、フライト情報をWhatsAppで送ると最終固定料金を確認できます。",
        directNote:
          "送信後、WhatsAppで直接やり取りできます。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。"
      },
      waiting: {
        pickupNote: "成田空港お迎えの待機時間は、実際のフライト到着時刻から計算します。",
        delayNote: "フライト遅延時も、最新の到着情報に合わせてドライバーが調整します。",
        promiseTitle: "このルートのメリット",
        promises: [
          ["ドアツードア", "長距離フライト後に荷物を持って電車を乗り換える必要がありません。"],
          ["新宿エリアに対応", "大型ホテル、民泊、駅周辺の道路事情に合わせて案内します。"],
          ["車種相談", "人数、荷物、チャイルドシートに合わせて車種を確認します。"],
          ["WhatsApp対応", "到着前にルート、待ち合わせ、時間を確認できます。"]
        ]
      },
      booking: {
        title: "成田から新宿を予約",
        subtitle: "フライト、到着時刻、新宿の住所、人数、荷物情報を送ると、WhatsAppですぐに見積もりできます。",
        placeholders: {
          airport: "成田空港 (NRT)",
          flight: "JL123",
          landingTime: "5月3日 16:30",
          hotel: "新宿ワシントンホテル",
          passengers: "2名",
          luggage: "スーツケース3個"
        },
        messageHeader: "こんにちは。成田空港から新宿への送迎見積もりをお願いします。"
      },
      seo: {
        routesTitle: "関連する成田空港送迎ルート",
        routesSubtitle: "東京ホテル、東京ディズニーリゾート、羽田空港、東京市内移動に関連する専用車ルートです。",
        routes: [
          {
            title: "成田空港から東京ディズニーリゾートへ",
            description: "東京ディズニーランド、ディズニーシー、舞浜ホテルへの家族向け送迎です。",
            href: "/narita-airport-to-tokyo-disney-resort"
          },
          {
            title: "成田空港から東京ホテルへ",
            description: "渋谷、銀座、浅草、品川など東京各地への成田空港送迎ページです。",
            href: "/narita-airport-transfer"
          },
          {
            title: "羽田空港から東京へ",
            description: "羽田空港から東京中心部ホテルまでのスムーズな専用車送迎です。",
            href: "/haneda-airport-transfer"
          },
          {
            title: "東京プライベートドライバー",
            description: "ホテル間移動、新幹線駅送迎、富士山日帰り、時間貸切に対応します。",
            href: "/tokyo-private-driver"
          }
        ],
        faqTitle: "成田から新宿 FAQ",
        faqSubtitle: "成田空港から新宿まで専用車を予約する前によくある質問です。",
        faqs: [
          {
            question: "成田空港から新宿まで車でどのくらいですか？",
            answer: "通常は70分から100分ほどです。高速道路の混雑、到着時間、新宿のホテル入口により変わります。"
          },
          {
            question: "フライトが遅れた場合も待ってもらえますか？",
            answer: "はい。空港お迎えはフライト情報を確認し、実際の到着時刻から無料待機時間を計算します。"
          },
          {
            question: "成田から新宿はアルファードで大丈夫ですか？",
            answer:
              "少人数で荷物が通常量ならアルファードが快適です。人数、スーツケース、ベビーカーが多い場合はハイエースがおすすめです。"
          },
          {
            question: "新宿ホテルから成田空港への送機もできますか？",
            answer: "はい。新宿ホテルから成田空港への逆方向の送迎も予約できます。"
          }
        ]
      }
    },
    "narita-airport-to-tokyo-disney-resort": {
      slug: "narita-airport-to-tokyo-disney-resort",
      path: "/narita-airport-to-tokyo-disney-resort",
      cityName: "東京ディズニーリゾート",
      citySearchName: "東京ディズニーリゾート, 舞浜, 千葉, 日本",
      routeAirports: [naritaAirport],
      defaultAirportId: "narita",
      serviceProfile: routeServiceProfiles["narita-airport-to-tokyo-disney-resort"],
      meta: {
        title: "成田空港から東京ディズニーリゾート送迎 | ランド・シー・舞浜ホテル",
        description:
          "成田空港から東京ディズニーランド、ディズニーシー、舞浜、ディズニーホテルへのプライベート送迎。家族旅行向けアルファード、ハイエース対応。",
        keywords: [
          "成田空港 ディズニー 送迎",
          "成田 東京ディズニーリゾート",
          "成田 ディズニーランド ハイヤー",
          "成田 ディズニーシー 送迎",
          "成田 舞浜ホテル 送迎",
          "東京ディズニー 空港送迎",
          "ディズニーホテル 成田空港"
        ],
        image: "/images/narita-airport.jpg"
      },
      hero: {
        title: "成田空港から東京ディズニーリゾート送迎",
        subtitle:
          "成田空港から東京ディズニーランド、ディズニーシー、舞浜ホテル、東京ディズニーリゾート周辺ホテルまでの専用車送迎。",
        features: [
          "家族旅行向け空港お迎え",
          "ランド・シー・舞浜へ直行",
          "荷物とベビーカーに対応",
          "空港お迎え90分無料待機",
          "アルファードまたはハイエース",
          "WhatsAppで固定料金を確認"
        ],
        imageSrc: "/images/narita-airport.jpg",
        imageAlt: "成田空港から東京ディズニーリゾートへのプライベート送迎"
      },
      overview: {
        title: "成田から東京ディズニーリゾートへのルート詳細",
        subtitle:
          "空港からディズニー周辺ホテルへ、荷物やベビーカーを持って電車を乗り換えずに移動したいご家族に人気のルートです。",
        facts: [
          {
            label: "通常の所要時間",
            value: "50-80分",
            description: "到着時間、高速道路、ホテル入口の場所により変わります。"
          },
          {
            label: "おすすめ利用",
            value: "家族と荷物",
            description: "お子様、ベビーカー、大きなスーツケースがある場合に便利です。"
          },
          {
            label: "対応エリア",
            value: "舞浜・ディズニーホテル",
            description: "ランド、シー、リゾートホテル、舞浜周辺ホテルに対応できます。"
          }
        ],
        notesTitle: "予約前の確認",
        notes: [
          "ホテル入口が複数あるため、正確なホテル名をお知らせください。",
          "チャイルドシート、ベビーカー、荷物量を事前に共有してください。",
          "帰国日の送機は、フライト出発時刻をもとに出発時間を提案します。"
        ]
      },
      quote: {
        title: "成田からディズニーの見積もり",
        subtitle:
          "ディズニーリゾート周辺ホテルや舞浜の住所を検索し、フライト、人数、チャイルドシート、荷物情報をWhatsAppで送ってください。",
        directNote:
          "送信後、WhatsAppで直接やり取りできます。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。"
      },
      waiting: {
        pickupNote: "成田空港お迎えの待機時間は、実際のフライト到着時刻から計算します。",
        delayNote: "フライト遅延時も、到着ロビーに出る前にドライバーが時間を調整します。",
        promiseTitle: "このルートのメリット",
        promises: [
          ["乗り換えなし", "お子様、ベビーカー、スーツケースと一緒にリゾートまで直行できます。"],
          ["家族向け車種", "人数と荷物に合わせてアルファードまたはハイエースを提案します。"],
          ["ホテル入口を確認", "舞浜やディズニーホテルの降車場所を事前に確認します。"],
          ["帰りも予約可能", "ディズニーホテルから成田空港への送機も手配できます。"]
        ]
      },
      booking: {
        title: "成田から東京ディズニーリゾートを予約",
        subtitle: "フライト、到着時刻、ホテル名、人数、チャイルドシート、荷物情報を送ると見積もりできます。",
        placeholders: {
          airport: "成田空港 (NRT)",
          flight: "JL123",
          landingTime: "5月3日 16:30",
          hotel: "東京ディズニーランドホテル",
          passengers: "4名",
          luggage: "スーツケース4個、ベビーカー1台"
        },
        messageHeader: "こんにちは。成田空港から東京ディズニーリゾートへの送迎見積もりをお願いします。"
      },
      seo: {
        routesTitle: "関連するディズニー・東京空港送迎ルート",
        routesSubtitle: "東京ディズニーリゾート、新宿、東京ホテル、空港送迎に関連する専用車ルートです。",
        routes: [
          {
            title: "成田空港から新宿へ",
            description: "新宿駅周辺、西新宿、歌舞伎町、ホテルへの成田空港送迎です。",
            href: "/narita-airport-to-shinjuku"
          },
          {
            title: "成田空港から東京ホテルへ",
            description: "銀座、渋谷、浅草、品川など東京各地への成田空港送迎ページです。",
            href: "/narita-airport-transfer"
          },
          {
            title: "羽田空港から東京へ",
            description: "羽田空港から東京中心部への専用車送迎です。",
            href: "/haneda-airport-transfer"
          },
          {
            title: "東京プライベートドライバー",
            description: "ホテル移動、日帰り観光、新幹線駅送迎、時間貸切に対応します。",
            href: "/tokyo-private-driver"
          }
        ],
        faqTitle: "成田から東京ディズニーリゾート FAQ",
        faqSubtitle: "成田空港からディズニー周辺へ専用車を予約するご家族向けの質問です。",
        faqs: [
          {
            question: "成田空港から東京ディズニーリゾートまで何分ですか？",
            answer: "通常は50分から80分ほどです。交通状況、到着時間、ホテルやパークの降車場所により変わります。"
          },
          {
            question: "東京ディズニーランドやディズニーシーで降車できますか？",
            answer: "はい。ランド、シー、舞浜駅周辺ホテル、東京ディズニーリゾートホテルに対応できます。"
          },
          {
            question: "家族旅行にはどの車種が向いていますか？",
            answer:
              "多くのご家族にはアルファードが快適です。人数、ベビーカー、大きなスーツケースが多い場合はハイエースがおすすめです。"
          },
          {
            question: "ディズニーホテルから成田空港への送機も予約できますか？",
            answer: "はい。東京ディズニーリゾートまたは舞浜ホテルから成田空港への送機も予約できます。"
          }
        ]
      }
    },
    "haneda-airport-to-ginza": buildHanedaRoutePage("ja", "haneda-airport-to-ginza"),
    "haneda-airport-to-shinjuku": buildHanedaRoutePage("ja", "haneda-airport-to-shinjuku"),
    "haneda-airport-to-shinagawa": buildHanedaRoutePage("ja", "haneda-airport-to-shinagawa")
  },
  zh: {
    "narita-airport-to-shinjuku": {
      slug: "narita-airport-to-shinjuku",
      path: "/narita-airport-to-shinjuku",
      cityName: "東京",
      citySearchName: "新宿, 東京, 日本",
      routeAirports: [naritaAirport],
      defaultAirportId: "narita",
      serviceProfile: routeServiceProfiles["narita-airport-to-shinjuku"],
      meta: {
        title: "成田機場到新宿接送 | 東京酒店私人專車",
        description:
          "成田機場到新宿站周邊、西新宿、歌舞伎町酒店的私人專車接送。可中文英文溝通，固定報價，Toyota Alphard 和 Hiace 可選。",
        keywords: [
          "成田機場到新宿接送",
          "成田到新宿包車",
          "成田機場到新宿酒店",
          "新宿接機",
          "成田機場英文司機",
          "Alphard 成田到新宿",
          "新宿酒店到成田機場"
        ],
        image: "/images/narita-airport.jpg"
      },
      hero: {
        title: "成田機場到新宿接送",
        subtitle: "成田機場到新宿酒店、民宿、西新宿和歌舞伎町區域的點對點私人專車接送。",
        features: [
          "成田機場接機與航班跟蹤",
          "直達新宿酒店或地址",
          "可選 Alphard 或 Hiace",
          "接機90分鐘免費等待",
          "可選到達口舉牌接機",
          "WhatsApp 確認固定報價"
        ],
        imageSrc: "/images/narita-airport.jpg",
        imageAlt: "成田機場到新宿私人專車接送"
      },
      overview: {
        title: "成田到新宿路線詳情",
        subtitle: "新宿是第一次到東京旅客、家庭和商務客人很常見的成田機場接送目的地。",
        facts: [
          {
            label: "通常車程",
            value: "70-100分鐘",
            description: "高速路況和新宿站周邊交通會影響實際時間。"
          },
          {
            label: "適合場景",
            value: "酒店和民宿",
            description: "適合西新宿酒店、歌舞伎町住宿、服務式公寓和親子家庭。"
          },
          {
            label: "車型建議",
            value: "Alphard 或 Hiace",
            description: "Alphard 舒適度高，行李或人數較多時 Hiace 更合適。"
          }
        ],
        notesTitle: "預約前建議",
        notes: [
          "提供航班號，司機可以根據實際落地時間安排接機。",
          "新宿酒店入口多、單行道多，請提供準確酒店名稱或完整地址。",
          "請提前告訴我們行李箱數量、嬰兒車和兒童座椅需求。"
        ]
      },
      quote: {
        title: "獲取成田到新宿報價",
        subtitle: "在地圖中搜尋新宿酒店或地址，再透過 WhatsApp 發送人數、行李和航班資訊，確認最終固定價格。",
        directNote:
          "提交後會打開 WhatsApp，方便直接和司機溝通。到達口舉牌接機為可選服務，需要時另加 2,000 日元。"
      },
      waiting: {
        pickupNote: "成田機場接機等待時間從航班實際落地時間開始計算。",
        delayNote: "航班延誤不用擔心，司機會根據最新到達資訊調整接機時間。",
        promiseTitle: "這條路線的優點",
        promises: [
          ["點對點直達", "長途飛行後不需要拖著行李轉電車。"],
          ["熟悉新宿區域", "可處理大型酒店入口、民宿地址和車站周邊道路。"],
          ["車型建議清楚", "根據人數、行李和兒童座椅需求確認 Alphard 或 Hiace。"],
          ["WhatsApp 溝通", "到達前可確認路線、接機點和時間。"]
        ]
      },
      booking: {
        title: "預約成田到新宿",
        subtitle: "發送航班、落地時間、新宿地址、人數和行李資訊，即可透過 WhatsApp 快速報價。",
        placeholders: {
          airport: "成田機場 (NRT)",
          flight: "JL123",
          landingTime: "5月3日 16:30",
          hotel: "新宿華盛頓酒店",
          passengers: "2人",
          luggage: "3個行李箱"
        },
        messageHeader: "您好，我需要成田機場到新宿接送報價。"
      },
      seo: {
        routesTitle: "相關成田機場接送路線",
        routesSubtitle: "東京酒店、東京迪士尼、羽田機場和東京市內移動相關的私人專車路線。",
        routes: [
          {
            title: "成田機場到東京迪士尼",
            description: "適合東京迪士尼樂園、迪士尼海洋、舞濱酒店和親子家庭的私人接送。",
            href: "/narita-airport-to-tokyo-disney-resort"
          },
          {
            title: "成田機場到東京酒店",
            description: "覆蓋澀谷、銀座、淺草、品川等東京市區的成田機場接送頁面。",
            href: "/narita-airport-transfer"
          },
          {
            title: "羽田機場到東京",
            description: "羽田機場到東京市區酒店、民宿和公寓的快速私人接送。",
            href: "/haneda-airport-transfer"
          },
          {
            title: "東京包車司機",
            description: "酒店到酒店移動、新幹線接送、富士山一日遊和小時包車。",
            href: "/tokyo-private-driver"
          }
        ],
        faqTitle: "成田到新宿常見問題",
        faqSubtitle: "預約成田機場到新宿私人專車前常見的問題。",
        faqs: [
          {
            question: "成田機場到新宿包車需要多久？",
            answer: "通常約70到100分鐘，具體取決於高速路況、到達時間和新宿酒店入口位置。"
          },
          {
            question: "航班延誤司機會等嗎？",
            answer: "會。接機會跟蹤航班，免費等待時間從航班實際落地開始計算。"
          },
          {
            question: "成田到新宿 Alphard 夠用嗎？",
            answer: "少人且行李適中時 Alphard 很舒適；如果人數、行李箱、嬰兒車較多，建議選 Hiace。"
          },
          {
            question: "可以預約新宿酒店到成田機場送機嗎？",
            answer: "可以，同一條路線也可以反向預約新宿酒店到成田機場送機。"
          }
        ]
      }
    },
    "narita-airport-to-tokyo-disney-resort": {
      slug: "narita-airport-to-tokyo-disney-resort",
      path: "/narita-airport-to-tokyo-disney-resort",
      cityName: "東京迪士尼",
      citySearchName: "東京迪士尼度假區, 舞濱, 千葉, 日本",
      routeAirports: [naritaAirport],
      defaultAirportId: "narita",
      serviceProfile: routeServiceProfiles["narita-airport-to-tokyo-disney-resort"],
      meta: {
        title: "成田機場到東京迪士尼接送 | 迪士尼樂園海洋舞濱酒店",
        description:
          "成田機場到東京迪士尼樂園、迪士尼海洋、舞濱和迪士尼酒店的私人專車接送。適合親子家庭，可安排 Alphard 或 Hiace。",
        keywords: [
          "成田機場到東京迪士尼接送",
          "成田到迪士尼包車",
          "成田機場到迪士尼樂園",
          "成田到迪士尼海洋接送",
          "成田到舞濱酒店",
          "東京迪士尼機場接送",
          "迪士尼酒店到成田機場"
        ],
        image: "/images/narita-airport.jpg"
      },
      hero: {
        title: "成田機場到東京迪士尼接送",
        subtitle: "成田機場到東京迪士尼樂園、迪士尼海洋、舞濱酒店和迪士尼周邊酒店的私人專車接送。",
        features: [
          "適合親子家庭接機",
          "直達迪士尼樂園、海洋或舞濱",
          "可放行李和嬰兒車",
          "接機90分鐘免費等待",
          "可選 Alphard 或 Hiace",
          "WhatsApp 確認固定報價"
        ],
        imageSrc: "/images/narita-airport.jpg",
        imageAlt: "成田機場到東京迪士尼私人專車接送"
      },
      overview: {
        title: "成田到東京迪士尼路線詳情",
        subtitle: "這條路線適合帶小孩和行李，想從機場直接到迪士尼或舞濱酒店、不想轉電車的家庭。",
        facts: [
          {
            label: "通常車程",
            value: "50-80分鐘",
            description: "實際時間取決於到達時間、高速路況和酒店入口位置。"
          },
          {
            label: "適合場景",
            value: "親子家庭和行李",
            description: "適合兒童、嬰兒車、大件行李和較晚抵達的迪士尼行程。"
          },
          {
            label: "下車區域",
            value: "舞濱和迪士尼酒店",
            description: "可安排迪士尼樂園、迪士尼海洋、度假區酒店和舞濱酒店。"
          }
        ],
        notesTitle: "預約前建議",
        notes: [
          "請提供準確酒店名稱，迪士尼和舞濱周邊酒店入口較多。",
          "如需兒童座椅、放嬰兒車或行李較多，請提前說明。",
          "如果需要回程送機，提供航班起飛時間後我們會建議出發時間。"
        ]
      },
      quote: {
        title: "獲取成田到東京迪士尼報價",
        subtitle: "搜尋迪士尼周邊酒店或舞濱地址，再透過 WhatsApp 發送航班、人數、兒童座椅和行李資訊。",
        directNote:
          "提交後會打開 WhatsApp，方便直接和司機溝通。到達口舉牌接機為可選服務，需要時另加 2,000 日元。"
      },
      waiting: {
        pickupNote: "成田機場接機等待時間從航班實際落地時間開始計算。",
        delayNote: "航班延誤不用擔心，司機會在您到達入境大廳前調整接機時間。",
        promiseTitle: "這條路線的優點",
        promises: [
          ["不用轉電車", "帶孩子、嬰兒車和行李可以直接到度假區。"],
          ["親子友好車型", "根據人數和行李選擇 Alphard 或 Hiace。"],
          ["確認酒店入口", "上車前確認舞濱或迪士尼酒店下車點。"],
          ["可安排回程", "也可以預約迪士尼酒店到成田機場送機。"]
        ]
      },
      booking: {
        title: "預約成田到東京迪士尼",
        subtitle: "發送航班、到達時間、迪士尼酒店、人數、兒童座椅和行李資訊，即可快速報價。",
        placeholders: {
          airport: "成田機場 (NRT)",
          flight: "JL123",
          landingTime: "5月3日 16:30",
          hotel: "東京迪士尼樂園酒店",
          passengers: "4人",
          luggage: "4個行李箱和1台嬰兒車"
        },
        messageHeader: "您好，我需要成田機場到東京迪士尼接送報價。"
      },
      seo: {
        routesTitle: "相關迪士尼與東京機場接送路線",
        routesSubtitle: "東京迪士尼、新宿、東京酒店和機場送機相關的私人專車路線。",
        routes: [
          {
            title: "成田機場到新宿",
            description: "成田機場到新宿站周邊、西新宿、歌舞伎町和酒店的私人接送。",
            href: "/narita-airport-to-shinjuku"
          },
          {
            title: "成田機場到東京酒店",
            description: "覆蓋銀座、澀谷、淺草、品川等東京市區的成田機場接送頁面。",
            href: "/narita-airport-transfer"
          },
          {
            title: "羽田機場到東京",
            description: "羽田機場到東京市區酒店的私人專車接送。",
            href: "/haneda-airport-transfer"
          },
          {
            title: "東京包車司機",
            description: "酒店移動、一日遊、新幹線接送和小時包車服務。",
            href: "/tokyo-private-driver"
          }
        ],
        faqTitle: "成田到東京迪士尼常見問題",
        faqSubtitle: "親子家庭預約成田機場到迪士尼周邊私人專車時常見的問題。",
        faqs: [
          {
            question: "成田機場到東京迪士尼需要多久？",
            answer: "通常約50到80分鐘，取決於路況、到達時間和酒店或園區下車點。"
          },
          {
            question: "可以在迪士尼樂園或迪士尼海洋下車嗎？",
            answer: "可以。可安排東京迪士尼樂園、迪士尼海洋、舞濱站周邊酒店和迪士尼度假區酒店。"
          },
          {
            question: "去迪士尼家庭出行選什麼車型？",
            answer: "多數家庭選 Alphard 會比較舒適；如果人數多、有嬰兒車和大件行李，Hiace 更合適。"
          },
          {
            question: "可以預約迪士尼酒店到成田機場送機嗎？",
            answer: "可以。東京迪士尼度假區酒店或舞濱酒店到成田機場的回程送機也可以安排。"
          }
        ]
      }
    },
    "haneda-airport-to-ginza": buildHanedaRoutePage("zh", "haneda-airport-to-ginza"),
    "haneda-airport-to-shinjuku": buildHanedaRoutePage("zh", "haneda-airport-to-shinjuku"),
    "haneda-airport-to-shinagawa": buildHanedaRoutePage("zh", "haneda-airport-to-shinagawa")
  }
};

export function getRoutePageContent(locale: Locale, slug: RoutePageSlug): RoutePageContent {
  const localizedContent = routePageContent[locale] ?? routePageContent.en;
  return localizedContent[slug] ?? routePageContent.en[slug];
}
