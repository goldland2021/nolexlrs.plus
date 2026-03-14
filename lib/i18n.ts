export type Locale = "en" | "ja" | "zh";

export const locales: Locale[] = ["en", "ja", "zh"];

type Dictionary = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    keywords: string[];
    naritaTitle: string;
    hanedaTitle: string;
    driverTitle: string;
  };
  hero: {
    title: string;
    subtitle: string;
    features: string[];
    cta: string;
    imageAlt: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: string[];
    itemNote: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    items: { route: string; price: string }[];
    itemNote: string;
  };
  vehicles: {
    title: string;
    subtitle: string;
    items: { name: string; passengers: string; alt: string; image: string }[];
  };
  reviews: {
    title: string;
    subtitle: string;
    items: string[];
  };
  booking: {
    title: string;
    subtitle: string;
    fields: {
      airport: string;
      flight: string;
      hotel: string;
      passengers: string;
      luggage: string;
    };
    placeholders: {
      airport: string;
      flight: string;
      hotel: string;
      passengers: string;
      luggage: string;
    };
    button: string;
    messageHeader: string;
  };
  narita: {
    heroTitle: string;
    heroSubtitle: string;
    sectionTitle: string;
    travelTime: string;
  };
  haneda: {
    heroTitle: string;
    heroSubtitle: string;
    sectionTitle: string;
    travelTime: string;
  };
  driver: {
    heroTitle: string;
    heroSubtitle: string;
    servicesTitle: string;
    services: string[];
  };
};

const commonVehicles = [
  {
    name: "Luxury Sedan",
    passengers: "3 passengers",
    image: "/images/sedan.jpg",
    alt: "Luxury sedan airport transfer"
  },
  {
    name: "Toyota Alphard",
    passengers: "5 passengers",
    image: "/images/alphard.jpg",
    alt: "Toyota Alphard airport transfer"
  },
  {
    name: "Toyota Hiace",
    passengers: "8 passengers",
    image: "/images/hiace.jpg",
    alt: "Toyota Hiace airport transfer"
  }
];

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      homeTitle: "Tokyo Airport Transfer | Narita & Haneda Private Pickup",
      homeDescription:
        "Private airport transfer service in Tokyo. Pickup from Narita and Haneda airport with English speaking drivers.",
      keywords: [
        "tokyo airport transfer",
        "narita airport transfer",
        "haneda airport transfer",
        "tokyo private driver"
      ],
      naritaTitle: "Narita Airport Transfer to Tokyo | Private Pickup",
      hanedaTitle: "Haneda Airport Transfer to Tokyo | Private Car",
      driverTitle: "Tokyo Private Driver Service"
    },
    hero: {
      title: "Tokyo Airport Transfer",
      subtitle: "Private airport pickup from Narita Airport and Haneda Airport.",
      features: [
        "24 hour service",
        "English speaking driver",
        "Meet and greet at arrival gate",
        "Fixed transparent pricing"
      ],
      cta: "Get Quote on WhatsApp",
      imageAlt: "Tokyo airport transfer luxury pickup"
    },
    services: {
      title: "Airport Transfer Services",
      subtitle: "Reliable, private transport with fixed pricing and meet-and-greet service.",
      items: [
        "Narita Airport → Tokyo Hotel",
        "Haneda Airport → Tokyo Hotel",
        "Tokyo → Narita Airport",
        "Tokyo → Haneda Airport"
      ],
      itemNote: "Door-to-door, on time, and stress free."
    },
    pricing: {
      title: "Price Guide",
      subtitle: "Fixed transparent pricing with no surprise fees.",
      items: [
        { route: "Narita → Tokyo", price: "from $120+" },
        { route: "Haneda → Tokyo", price: "from $80+" }
      ],
      itemNote: "Includes meet and greet."
    },
    vehicles: {
      title: "Vehicles",
      subtitle: "Spacious, clean vehicles suited for solo travelers, families, and groups.",
      items: commonVehicles
    },
    reviews: {
      title: "Traveler Reviews",
      subtitle: "Consistent five-star feedback from international travelers.",
      items: [
        "Driver was waiting with a name sign.",
        "Very smooth airport pickup.",
        "Clean car and professional driver."
      ]
    },
    booking: {
      title: "Book Your Transfer",
      subtitle: "Send your trip details and get a fast quote on WhatsApp.",
      fields: {
        airport: "Airport",
        flight: "Flight number",
        hotel: "Hotel",
        passengers: "Passengers",
        luggage: "Luggage"
      },
      placeholders: {
        airport: "Narita or Haneda",
        flight: "JL123",
        hotel: "Shinjuku Hotel",
        passengers: "2",
        luggage: "3 suitcases"
      },
      button: "Send on WhatsApp",
      messageHeader: "Hello I need airport transfer"
    },
    narita: {
      heroTitle: "Narita Airport Transfer to Tokyo",
      heroSubtitle: "Private pickup from Narita Airport with fixed pricing and English speaking drivers.",
      sectionTitle: "Narita Airport transfer",
      travelTime: "Travel time from Narita to Tokyo is typically 60–90 minutes depending on traffic."
    },
    haneda: {
      heroTitle: "Haneda Airport Transfer to Tokyo",
      heroSubtitle: "Fast private pickup from Haneda Airport with meet and greet service.",
      sectionTitle: "Haneda airport pickup",
      travelTime: "Travel time from Haneda to Tokyo is typically 30–40 minutes."
    },
    driver: {
      heroTitle: "Tokyo Private Driver Service",
      heroSubtitle: "Flexible private car service for tours, day trips, and hourly charters.",
      servicesTitle: "Private Driver Services",
      services: ["Tokyo city tour", "Mt Fuji day trip", "Hourly private car charter"]
    }
  },
  ja: {
    meta: {
      homeTitle: "東京空港送迎 | 成田・羽田プライベート送迎",
      homeDescription:
        "東京の空港送迎サービス。成田・羽田空港から英語対応ドライバーが送迎します。",
      keywords: [
        "東京 空港送迎",
        "成田 空港送迎",
        "羽田 空港送迎",
        "東京 プライベートドライバー"
      ],
      naritaTitle: "成田空港から東京への送迎 | プライベートピックアップ",
      hanedaTitle: "羽田空港から東京への送迎 | プライベートカー",
      driverTitle: "東京プライベートドライバーサービス"
    },
    hero: {
      title: "東京空港送迎",
      subtitle: "成田空港・羽田空港からのプライベート送迎。",
      features: [
        "24時間対応",
        "英語対応ドライバー",
        "到着ゲートでお出迎え",
        "明朗な固定料金"
      ],
      cta: "WhatsAppで見積もり",
      imageAlt: "東京 空港送迎のプライベートピックアップ"
    },
    services: {
      title: "空港送迎サービス",
      subtitle: "固定料金とミート＆グリート付きの安心プライベート送迎。",
      items: [
        "成田空港 → 東京ホテル",
        "羽田空港 → 東京ホテル",
        "東京 → 成田空港",
        "東京 → 羽田空港"
      ],
      itemNote: "ドアツードアで安心してご利用いただけます。"
    },
    pricing: {
      title: "料金目安",
      subtitle: "追加料金なしの明朗価格。",
      items: [
        { route: "成田 → 東京", price: "$120 から" },
        { route: "羽田 → 東京", price: "$80 から" }
      ],
      itemNote: "ミート＆グリート込み。"
    },
    vehicles: {
      title: "車両",
      subtitle: "お一人からグループまで快適にご利用いただけます。",
      items: commonVehicles
    },
    reviews: {
      title: "お客様の声",
      subtitle: "海外からのお客様にも高評価をいただいています。",
      items: [
        "名前入りの看板を持って待っていてくれました。",
        "空港送迎がとてもスムーズでした。",
        "車内が清潔でプロのドライバーでした。"
      ]
    },
    booking: {
      title: "送迎を予約する",
      subtitle: "詳細を送って、WhatsAppで素早く見積もりを受け取れます。",
      fields: {
        airport: "空港",
        flight: "便名",
        hotel: "ホテル",
        passengers: "人数",
        luggage: "荷物"
      },
      placeholders: {
        airport: "成田 or 羽田",
        flight: "JL123",
        hotel: "新宿のホテル",
        passengers: "2",
        luggage: "スーツケース3個"
      },
      button: "WhatsAppで送信",
      messageHeader: "空港送迎をお願いします"
    },
    narita: {
      heroTitle: "成田空港から東京への送迎",
      heroSubtitle: "成田空港からのプライベート送迎。固定料金と英語対応ドライバー。",
      sectionTitle: "成田空港送迎",
      travelTime: "成田から東京までは通常 60〜90 分程度です。"
    },
    haneda: {
      heroTitle: "羽田空港から東京への送迎",
      heroSubtitle: "羽田空港からの迅速なプライベート送迎。到着ゲートでお出迎え。",
      sectionTitle: "羽田空港送迎",
      travelTime: "羽田から東京までは通常 30〜40 分程度です。"
    },
    driver: {
      heroTitle: "東京プライベートドライバーサービス",
      heroSubtitle: "観光や日帰り旅行、時間貸しに対応するプライベートカー。",
      servicesTitle: "プライベートドライバーサービス",
      services: ["東京市内ツアー", "富士山日帰り旅行", "時間貸しチャーター"]
    }
  },
  zh: {
    meta: {
      homeTitle: "东京机场接送 | 成田与羽田专车",
      homeDescription:
        "东京机场接送服务。成田与羽田机场专车接送，英文司机服务。",
      keywords: [
        "东京 机场接送",
        "成田 机场接送",
        "羽田 机场接送",
        "东京 私人司机"
      ],
      naritaTitle: "成田机场到东京接送 | 专车接机",
      hanedaTitle: "羽田机场到东京接送 | 私人包车",
      driverTitle: "东京私人司机服务"
    },
    hero: {
      title: "东京机场接送",
      subtitle: "成田机场与羽田机场专车接送。",
      features: [
        "24小时服务",
        "英文司机",
        "到达口举牌接机",
        "透明固定价格"
      ],
      cta: "WhatsApp 获取报价",
      imageAlt: "东京机场接送专车服务"
    },
    services: {
      title: "机场接送服务",
      subtitle: "固定价格，举牌接机，安心省心。",
      items: [
        "成田机场 → 东京酒店",
        "羽田机场 → 东京酒店",
        "东京 → 成田机场",
        "东京 → 羽田机场"
      ],
      itemNote: "点对点直达，准时安心。"
    },
    pricing: {
      title: "价格参考",
      subtitle: "透明固定价格，无隐藏费用。",
      items: [
        { route: "成田 → 东京", price: "$120 起" },
        { route: "羽田 → 东京", price: "$80 起" }
      ],
      itemNote: "包含接机举牌服务。"
    },
    vehicles: {
      title: "车型",
      subtitle: "适合个人、家庭与多人出行。",
      items: commonVehicles
    },
    reviews: {
      title: "用户评价",
      subtitle: "海外旅客一致好评。",
      items: [
        "司机举着姓名牌在出口等候。",
        "接机过程非常顺畅。",
        "车辆干净，司机专业。"
      ]
    },
    booking: {
      title: "预约接送",
      subtitle: "发送行程信息，WhatsApp 迅速报价。",
      fields: {
        airport: "机场",
        flight: "航班号",
        hotel: "酒店",
        passengers: "人数",
        luggage: "行李"
      },
      placeholders: {
        airport: "成田 或 羽田",
        flight: "JL123",
        hotel: "新宿酒店",
        passengers: "2",
        luggage: "3 个行李箱"
      },
      button: "通过 WhatsApp 发送",
      messageHeader: "您好，我需要机场接送"
    },
    narita: {
      heroTitle: "成田机场到东京接送",
      heroSubtitle: "成田机场专车接机，固定价格，英文司机。",
      sectionTitle: "成田机场接送",
      travelTime: "成田到东京通常 60–90 分钟，视路况而定。"
    },
    haneda: {
      heroTitle: "羽田机场到东京接送",
      heroSubtitle: "羽田机场快速接机，举牌迎接服务。",
      sectionTitle: "羽田机场接送",
      travelTime: "羽田到东京通常 30–40 分钟。"
    },
    driver: {
      heroTitle: "东京私人司机服务",
      heroSubtitle: "适合城市游、富士山一日游与小时包车。",
      servicesTitle: "私人司机服务",
      services: ["东京市内游", "富士山一日游", "小时包车"]
    }
  }
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}