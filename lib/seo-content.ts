import type { Locale } from "./i18n";

export type SeoRoute = {
  title: string;
  description: string;
  href: string;
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type HomeSeoContent = {
  routesTitle: string;
  routesSubtitle: string;
  routes: SeoRoute[];
  faqTitle: string;
  faqSubtitle: string;
  faqs: SeoFaq[];
};

type AirportGuideContent = {
  title: string;
  subtitle: string;
  destinationsTitle: string;
  destinations: { name: string; description: string; href?: string }[];
  tipsTitle: string;
  tips: string[];
};

export const homeSeoContent: Record<Locale, HomeSeoContent> = {
  en: {
    routesTitle: "Popular Tokyo Airport Routes",
    routesSubtitle:
      "Private airport pickup, Tokyo hotel transfers, Shinkansen station pickup, and Mt Fuji day trips for hotels, homes, apartments, and family travel. Quotes are based on route distance, vehicle size, luggage, and arrival time.",
    routes: [
      {
        title: "Narita Airport to Shinjuku",
        description:
          "Door-to-door Narita Airport transfer to Shinjuku Station hotels, Nishi-Shinjuku, Kabukicho, and nearby apartments.",
        href: "/narita-airport-to-shinjuku"
      },
      {
        title: "Haneda Airport to Ginza",
        description:
          "Fast Haneda Airport pickup for Ginza hotels, Tsukiji, Yurakucho, Nihonbashi, and central Tokyo stays.",
        href: "/haneda-airport-to-ginza"
      },
      {
        title: "Haneda Airport to Shinjuku",
        description:
          "Door-to-door Haneda transfer for Shinjuku Station hotels, Nishi-Shinjuku, Kabukicho, and apartments.",
        href: "/haneda-airport-to-shinjuku"
      },
      {
        title: "Haneda Airport to Shinagawa",
        description:
          "Quick private transfer from Haneda Airport to Shinagawa Station hotels, Takanawa, and Shinkansen connections.",
        href: "/haneda-airport-to-shinagawa"
      },
      {
        title: "Narita Airport to Tokyo Disney Resort",
        description:
          "Private airport transfer for families going to Tokyo Disneyland, DisneySea, Maihama hotels, and resort-area hotels with luggage.",
        href: "/narita-airport-to-tokyo-disney-resort"
      },
      {
        title: "Tokyo cruise terminal transfer",
        description:
          "Pickup and drop-off for Tokyo International Cruise Terminal, Harumi, hotels, and airport connections.",
        href: "/haneda-airport-transfer"
      },
      {
        title: "Yokohama port transfer",
        description:
          "Private transfer for Yokohama cruise passengers between Osanbashi, Daikoku Pier, Tokyo hotels, Haneda Airport, and Narita Airport.",
        href: "/yokohama-port-transfer"
      },
      {
        title: "Tokyo hotel to Narita or Haneda",
        description:
          "Reliable airport drop-off from Tokyo hotels with recommended departure time based on traffic and flight schedule.",
        href: "/narita-airport-transfer"
      },
      {
        title: "Tokyo hotel to hotel transfer",
        description:
          "Private hotel transfer for travelers moving between Tokyo hotels, apartments, Shinjuku, Ginza, Shibuya, Tokyo Station, or Shinagawa.",
        href: "/tokyo-private-driver"
      },
      {
        title: "Tokyo Station or Shinagawa Shinkansen pickup",
        description:
          "Door-to-door pickup and drop-off for Shinkansen travelers arriving at Tokyo Station, Shinagawa Station, or nearby hotels.",
        href: "/tokyo-private-driver"
      },
      {
        title: "Toyota Alphard airport transfer",
        description:
          "Comfortable private car service for couples, families with children, and travelers carrying multiple suitcases.",
        href: "/tokyo-private-driver"
      },
      {
        title: "Mt Fuji day trip with English driver",
        description:
          "Private Mt Fuji day trip from Tokyo with an English-speaking driver, flexible pickup from hotels, and comfortable Toyota Alphard or Hiace options.",
        href: "/tokyo-private-driver"
      }
    ],
    faqTitle: "Tokyo Airport Transfer FAQ",
    faqSubtitle:
      "Clear answers for travelers booking a private car from Narita Airport, Haneda Airport, or Tokyo hotels.",
    faqs: [
      {
        question: "Do you provide both Narita and Haneda airport pickup?",
        answer:
          "Yes. We provide private airport pickup and drop-off for Narita Airport, Haneda Airport, Tokyo hotels, apartments, and nearby destinations such as Tokyo Disney Resort."
      },
      {
        question: "How do I get an accurate quote?",
        answer:
          "Use the map quote tool to choose your airport and destination, then send the booking form on WhatsApp with your flight number, landing time, passenger count, and luggage."
      },
      {
        question: "Is meet-and-greet with a name sign available?",
        answer:
          "Yes. Arrival-gate name-sign meet-and-greet is optional and costs +¥2,000 when requested. Please mention it before confirming the booking."
      },
      {
        question: "How long is the free waiting time?",
        answer:
          "Airport pickup includes 90 minutes of free waiting from the actual flight landing time. Airport drop-off includes 30 minutes of free waiting from the scheduled pickup time."
      },
      {
        question: "Which vehicles can I book?",
        answer:
          "Common vehicles include luxury sedans, Toyota Alphard, and Toyota Hiace. We recommend the vehicle based on passenger count, luggage, child seats, and comfort needs."
      },
      {
        question: "Can I book hotel transfers, Shinkansen pickup, or a Mt Fuji day trip?",
        answer:
          "Yes. Besides Narita and Haneda airport transfers, we can arrange Tokyo hotel-to-hotel transfers, Tokyo Station or Shinagawa Shinkansen pickup, and private Mt Fuji day trips with English-speaking drivers."
      }
    ]
  },
  ja: {
    routesTitle: "東京の人気空港送迎ルート",
    routesSubtitle:
      "成田空港・羽田空港の送迎、東京ホテル間移動、新幹線駅送迎、富士山日帰り観光に対応するプライベート送迎です。料金は距離、車種、荷物、到着時間をもとに見積もります。",
    routes: [
      {
        title: "成田空港から新宿へ",
        description:
          "新宿駅周辺、西新宿、歌舞伎町、周辺ホテルへのドアツードア成田空港送迎です。",
        href: "/narita-airport-to-shinjuku"
      },
      {
        title: "羽田空港から銀座へ",
        description:
          "銀座ホテル、築地、有楽町、日本橋、東京中心部へのスムーズな羽田空港送迎です。",
        href: "/haneda-airport-to-ginza"
      },
      {
        title: "羽田空港から新宿へ",
        description:
          "新宿駅周辺、西新宿、歌舞伎町、周辺ホテルへのドアツードア羽田空港送迎です。",
        href: "/haneda-airport-to-shinjuku"
      },
      {
        title: "羽田空港から品川へ",
        description:
          "品川駅周辺ホテル、高輪、新幹線接続に便利な短距離羽田空港送迎です。",
        href: "/haneda-airport-to-shinagawa"
      },
      {
        title: "成田空港から東京ディズニーリゾートへ",
        description:
          "東京ディズニーランド、ディズニーシー、舞浜ホテル、リゾート周辺ホテルへ荷物付きで移動できます。",
        href: "/narita-airport-to-tokyo-disney-resort"
      },
      {
        title: "東京クルーズターミナル送迎",
        description:
          "東京国際クルーズターミナル、晴海、ホテル、空港接続に対応するプライベート送迎です。",
        href: "/haneda-airport-transfer"
      },
      {
        title: "横浜港送迎",
        description:
          "大さん橋、大黒ふ頭、東京ホテル、羽田空港、成田空港を結ぶクルーズ利用者向けの専用車送迎です。",
        href: "/yokohama-port-transfer"
      },
      {
        title: "東京ホテルから成田・羽田へ",
        description:
          "フライト時刻と交通状況をもとに出発時間を提案し、東京ホテルから空港までお送りします。",
        href: "/narita-airport-transfer"
      },
      {
        title: "東京ホテル間の移動",
        description:
          "新宿、銀座、渋谷、東京駅、品川周辺など、東京のホテル・民泊・アパート間のプライベート移動に対応します。",
        href: "/tokyo-private-driver"
      },
      {
        title: "東京駅・品川駅の新幹線送迎",
        description:
          "東京駅、品川駅、新幹線到着後のホテル送迎や、ホテルから駅までの移動に対応します。",
        href: "/tokyo-private-driver"
      },
      {
        title: "アルファード空港送迎",
        description:
          "カップル、お子様連れのご家族、スーツケースが多い旅行者に使いやすいプライベートカーです。",
        href: "/tokyo-private-driver"
      },
      {
        title: "英語ドライバーの富士山日帰り",
        description:
          "東京ホテル発着の富士山日帰りプライベートツアー。英語対応ドライバーとアルファード、ハイエースなどを手配できます。",
        href: "/tokyo-private-driver"
      }
    ],
    faqTitle: "東京空港送迎 FAQ",
    faqSubtitle: "成田空港、羽田空港、東京ホテルから専用車を予約する際のよくある質問です。",
    faqs: [
      {
        question: "成田空港と羽田空港の両方に対応していますか？",
        answer:
          "はい。成田空港、羽田空港、東京のホテル、民泊、東京ディズニーリゾート周辺などのプライベート送迎に対応しています。"
      },
      {
        question: "正確な見積もりはどうすれば確認できますか？",
        answer:
          "地図見積もりで空港と目的地を選び、WhatsAppでフライト番号、到着時刻、人数、荷物数を送ると確認できます。"
      },
      {
        question: "ネームプレートでのお迎えはできますか？",
        answer:
          "はい。到着ゲートでのネームプレートお迎えはオプションで、希望時は+2,000円です。予約確定前にお知らせください。"
      },
      {
        question: "無料待機時間はどのくらいですか？",
        answer:
          "空港お迎えは実際の着陸時刻から90分無料、お送りは予約時刻から30分無料で待機します。"
      },
      {
        question: "どの車種を予約できますか？",
        answer:
          "セダン、トヨタ アルファード、トヨタ ハイエースなどをご用意できます。人数、荷物、チャイルドシート、快適性に合わせて提案します。"
      },
      {
        question: "ホテル間移動、新幹線駅送迎、富士山日帰りも予約できますか？",
        answer:
          "はい。成田空港・羽田空港の送迎以外に、東京ホテル間移動、東京駅・品川駅の新幹線送迎、英語対応ドライバーによる富士山日帰りも相談できます。"
      }
    ]
  },
  zh: {
    routesTitle: "東京機場熱門路線接送",
    routesSubtitle:
      "提供成田機場、羽田機場、東京酒店移動、新幹線站接送和富士山一日遊之間的私人接送。報價會參考路線距離、車型、行李數量和到達時間。",
    routes: [
      {
        title: "成田機場到新宿",
        description:
          "成田機場到新宿站周邊、西新宿、歌舞伎町和附近酒店的點對點私人接送。",
        href: "/narita-airport-to-shinjuku"
      },
      {
        title: "羽田機場到銀座",
        description:
          "適合羽田機場到銀座酒店、築地、有樂町、日本橋和東京中心區住宿。",
        href: "/haneda-airport-to-ginza"
      },
      {
        title: "羽田機場到新宿",
        description:
          "羽田機場到新宿站周邊、西新宿、歌舞伎町和附近酒店的點對點私人接送。",
        href: "/haneda-airport-to-shinjuku"
      },
      {
        title: "羽田機場到品川",
        description:
          "羽田機場到品川站周邊酒店、高輪和新幹線轉乘的快速私人接送。",
        href: "/haneda-airport-to-shinagawa"
      },
      {
        title: "成田機場到東京迪士尼",
        description:
          "適合前往東京迪士尼樂園、迪士尼海洋、舞濱酒店和迪士尼周邊酒店的家庭旅客。",
        href: "/narita-airport-to-tokyo-disney-resort"
      },
      {
        title: "東京郵輪碼頭接送",
        description:
          "可安排東京國際郵輪碼頭、晴海、酒店與機場之間的點對點私人接送。",
        href: "/haneda-airport-transfer"
      },
      {
        title: "橫濱港接送",
        description:
          "適合大棧橋、大黑埠頭、東京酒店、羽田機場和成田機場之間移動的郵輪旅客私人專車接送。",
        href: "/yokohama-port-transfer"
      },
      {
        title: "東京酒店送機到成田或羽田",
        description:
          "根據航班時間和路況建議出發時間，適合從東京酒店、民宿或公寓前往機場。",
        href: "/narita-airport-transfer"
      },
      {
        title: "東京酒店到酒店移動",
        description:
          "適合新宿、銀座、澀谷、東京站、品川等區域之間的酒店換酒店、民宿、公寓點對點移動。",
        href: "/tokyo-private-driver"
      },
      {
        title: "東京站、品川站新幹線接送",
        description:
          "適合搭乘新幹線抵達東京站、品川站後的酒店接送，也可安排從東京酒店前往新幹線車站。",
        href: "/tokyo-private-driver"
      },
      {
        title: "Toyota Alphard 機場接送",
        description:
          "適合情侶、親子家庭和攜帶多件行李的旅客，也可根據人數和行李安排海獅等車型。",
        href: "/tokyo-private-driver"
      },
      {
        title: "富士山一日遊英文司機",
        description:
          "東京酒店出發的富士山一日遊包車，可安排中文或英文溝通，適合家庭、朋友和多人團隊。",
        href: "/tokyo-private-driver"
      }
    ],
    faqTitle: "東京機場接送常見問題",
    faqSubtitle: "幫助旅客在成田機場、羽田機場和東京酒店之間預約私人專車。",
    faqs: [
      {
        question: "成田機場和羽田機場都可以接送嗎？",
        answer:
          "可以。我們提供成田機場、羽田機場、東京酒店、民宿、公寓以及東京迪士尼周邊等目的地的私人接送。"
      },
      {
        question: "怎樣獲得更準確的報價？",
        answer:
          "先在地圖報價工具裡選擇機場和目的地，再透過 WhatsApp 發送航班號、落地時間、人數和行李數量。"
      },
      {
        question: "可以舉牌接機嗎？",
        answer:
          "可以。到達口舉牌接機是可選服務，需要時另加 2,000 日元，請在確認訂單前說明。"
      },
      {
        question: "免費等待時間多久？",
        answer:
          "接機從航班實際落地時間起免費等待90分鐘，送機從預約時間起免費等待30分鐘。"
      },
      {
        question: "可以安排哪些車型？",
        answer:
          "常用車型包括轎車、Toyota Alphard 和 Toyota Hiace。我們會根據人數、行李、兒童座椅和舒適度需求推薦車型。"
      },
      {
        question: "可以預約酒店移動、新幹線接送或富士山一日遊嗎？",
        answer:
          "可以。除了成田機場和羽田機場接送，也可以安排東京酒店到酒店移動、東京站或品川站新幹線接送，以及富士山一日遊包車，可英文和中文溝通。"
      }
    ]
  }
};

export const airportGuideContent: Record<Locale, Record<"narita" | "haneda", AirportGuideContent>> = {
  en: {
    narita: {
      title: "Narita Airport Transfer Guide",
      subtitle:
        "Narita is farther from central Tokyo than Haneda, so the fixed quote should account for traffic, passenger count, luggage, and whether it is airport pickup or hotel drop-off.",
      destinationsTitle: "Common Narita transfer destinations",
      destinations: [
        {
          name: "Narita to Shinjuku",
          description: "Popular for first-time visitors staying near major hotels, stations, and nightlife areas.",
          href: "/narita-airport-to-shinjuku"
        },
        {
          name: "Narita to Ginza, Tokyo Station, or Nihonbashi",
          description: "Convenient for business travelers and central Tokyo hotel stays."
        },
        {
          name: "Narita to Tokyo Disney Resort",
          description: "Good for families with luggage, strollers, and children after a long flight.",
          href: "/narita-airport-to-tokyo-disney-resort"
        }
      ],
      tipsTitle: "Before you book",
      tips: [
        "Send your flight number so the driver can check the actual landing time.",
        "Tell us if you need a name sign at the arrival gate.",
        "Share luggage details so we can confirm whether Alphard or Hiace is the better fit."
      ]
    },
    haneda: {
      title: "Haneda Airport Transfer Guide",
      subtitle:
        "Haneda is closer to central Tokyo, so transfers are usually faster. Late-night arrivals, child seats, and larger luggage can still change the best vehicle choice.",
      destinationsTitle: "Common Haneda transfer destinations",
      destinations: [
        {
          name: "Haneda to Ginza",
          description: "A short private transfer for Ginza, Tsukiji, Yurakucho, Nihonbashi, and business trips.",
          href: "/haneda-airport-to-ginza"
        },
        {
          name: "Haneda to Shinjuku",
          description: "Reliable door-to-door pickup for Shinjuku hotels, apartments, Nishi-Shinjuku, and Kabukicho.",
          href: "/haneda-airport-to-shinjuku"
        },
        {
          name: "Haneda to Shinagawa",
          description: "Useful for Shinagawa Station hotels, Takanawa, Shinkansen connections, and quick city access.",
          href: "/haneda-airport-to-shinagawa"
        }
      ],
      tipsTitle: "Before you book",
      tips: [
        "For airport pickup, waiting time starts from actual flight landing.",
        "Late-night or early-morning rides may need extra schedule confirmation.",
        "Tell us the number of suitcases and carry-ons before confirming the vehicle."
      ]
    }
  },
  ja: {
    narita: {
      title: "成田空港送迎ガイド",
      subtitle:
        "成田空港は都心から距離があるため、高速料金、交通状況、人数、荷物、空港お迎えかホテルお送りかを考慮して見積もります。",
      destinationsTitle: "よくある成田空港送迎先",
      destinations: [
        {
          name: "成田から新宿",
          description: "ホテル、駅、観光エリアに滞在する初めての旅行者に人気です。",
          href: "/narita-airport-to-shinjuku"
        },
        {
          name: "成田から銀座・東京駅・日本橋",
          description: "ビジネス利用や東京中心部のホテル滞在に便利です。"
        },
        {
          name: "成田から東京ディズニーリゾート",
          description: "長距離フライト後のご家族、荷物、ベビーカーがある場合に便利です。",
          href: "/narita-airport-to-tokyo-disney-resort"
        }
      ],
      tipsTitle: "予約前に確認すること",
      tips: [
        "フライト番号を送ると、実際の到着時刻を確認できます。",
        "到着ゲートでのネームプレートお迎えが必要かお知らせください。",
        "荷物数を共有いただくと、アルファードかハイエースか確認しやすくなります。"
      ]
    },
    haneda: {
      title: "羽田空港送迎ガイド",
      subtitle:
        "羽田空港は東京中心部に近く、移動時間が短いことが多いです。深夜到着、チャイルドシート、大きな荷物がある場合は車種確認が重要です。",
      destinationsTitle: "よくある羽田空港送迎先",
      destinations: [
        {
          name: "羽田から銀座",
          description: "銀座、築地、有楽町、日本橋、東京中心部ホテルに便利な短距離送迎です。",
          href: "/haneda-airport-to-ginza"
        },
        {
          name: "羽田から新宿",
          description: "新宿ホテル、民泊、西新宿、歌舞伎町まで安心のドアツードア送迎です。",
          href: "/haneda-airport-to-shinjuku"
        },
        {
          name: "羽田から品川",
          description: "品川駅周辺ホテル、高輪、新幹線接続に便利な短距離ルートです。",
          href: "/haneda-airport-to-shinagawa"
        }
      ],
      tipsTitle: "予約前に確認すること",
      tips: [
        "空港お迎えは実際の着陸時刻から待機時間を計算します。",
        "深夜・早朝便は事前にスケジュール確認をおすすめします。",
        "スーツケースと手荷物の数を予約前にお知らせください。"
      ]
    }
  },
  zh: {
    narita: {
      title: "成田機場接送指南",
      subtitle:
        "成田機場距離東京市區較遠，固定報價會根據路況、人數、行李，以及是接機還是酒店送機來確認。",
      destinationsTitle: "常見成田機場接送目的地",
      destinations: [
        {
          name: "成田到新宿",
          description: "適合入住熱門酒店、車站周邊和市區觀光區域的旅客。",
          href: "/narita-airport-to-shinjuku"
        },
        {
          name: "成田到銀座、東京站或日本橋",
          description: "適合商務客人和入住東京中心區域酒店的旅客。"
        },
        {
          name: "成田到東京迪士尼",
          description: "適合長途飛行後帶行李、嬰兒車和兒童的家庭。",
          href: "/narita-airport-to-tokyo-disney-resort"
        }
      ],
      tipsTitle: "預約前建議提供",
      tips: [
        "發送航班號，司機可以查看實際落地時間。",
        "提前說明是否需要到達口舉牌接機。",
        "告訴我們行李數量，方便確認 Alphard 或 Hiace 是否更合適。"
      ]
    },
    haneda: {
      title: "羽田機場接送指南",
      subtitle:
        "羽田機場離東京市區更近，接送通常更快。深夜到達、兒童座椅和大件行李仍會影響車型選擇。",
      destinationsTitle: "常見羽田機場接送目的地",
      destinations: [
        {
          name: "羽田到銀座",
          description: "適合銀座、築地、有樂町、日本橋和東京中心區酒店的短途私人接送。",
          href: "/haneda-airport-to-ginza"
        },
        {
          name: "羽田到新宿",
          description: "適合新宿酒店、公寓、西新宿和歌舞伎町區域的點對點接送。",
          href: "/haneda-airport-to-shinjuku"
        },
        {
          name: "羽田到品川",
          description: "適合品川站周邊酒店、高輪和新幹線轉乘的快速私人接送。",
          href: "/haneda-airport-to-shinagawa"
        }
      ],
      tipsTitle: "預約前建議提供",
      tips: [
        "接機等待時間從航班實際落地開始計算。",
        "深夜或清晨用車建議提前確認司機排班。",
        "確認訂單前請提供托運行李和隨身行李數量。"
      ]
    }
  }
};

export type ServiceSeoPage = "naritaAirportTransfer" | "hanedaAirportTransfer" | "tokyoPrivateDriver";

export const serviceSeoContent: Record<Locale, Record<ServiceSeoPage, HomeSeoContent>> = {
  en: {
    naritaAirportTransfer: {
      routesTitle: "Narita Airport Transfer Routes",
      routesSubtitle:
        "Private Narita Airport pickup and drop-off routes for Tokyo hotels, Shinjuku, Tokyo Disney Resort, Ginza, Shinagawa, and family travel with luggage.",
      routes: [
        {
          title: "Narita Airport to Shinjuku",
          description:
            "Door-to-door private transfer from Narita Airport to Shinjuku Station hotels, Nishi-Shinjuku, and Kabukicho.",
          href: "/narita-airport-to-shinjuku"
        },
        {
          title: "Narita Airport to Tokyo Disney Resort",
          description:
            "Private airport transfer for families going to Disneyland, DisneySea, Maihama hotels, and resort-area stays.",
          href: "/narita-airport-to-tokyo-disney-resort"
        },
        {
          title: "Narita Airport to Yokohama port",
          description:
            "Long-distance private transfer from Narita Airport to Osanbashi, Daikoku Pier, Yokohama hotels, and cruise terminal areas.",
          href: "/yokohama-port-transfer"
        },
        {
          title: "Narita Airport to Tokyo hotels",
          description:
            "Fixed-quote Narita pickup for Tokyo Station, Ginza, Shibuya, Shinagawa, Asakusa, and central Tokyo hotels.",
          href: "/narita-airport-transfer"
        },
        {
          title: "Tokyo hotel to Narita Airport",
          description:
            "Reliable airport drop-off from Tokyo hotels with recommended pickup time based on traffic and flight schedule.",
          href: "/narita-airport-transfer"
        }
      ],
      faqTitle: "Narita Airport Transfer FAQ",
      faqSubtitle: "Common questions before booking a private car from Narita Airport to Tokyo.",
      faqs: [
        {
          question: "How long does Narita Airport to central Tokyo take by private car?",
          answer:
            "It usually takes about 60 to 90 minutes, depending on expressway traffic and the exact Tokyo hotel or apartment location."
        },
        {
          question: "Can the driver meet me at the arrival gate?",
          answer:
            "Yes. Arrival-gate name-sign meet-and-greet is optional and costs +2,000 JPY when requested before confirmation."
        },
        {
          question: "What happens if my Narita flight is delayed?",
          answer:
            "Pickup timing follows the actual flight landing time, and airport pickup includes 90 minutes of free waiting from landing."
        },
        {
          question: "Which vehicle is best for Narita Airport transfer?",
          answer:
            "Toyota Alphard is comfortable for smaller groups, while Toyota Hiace is better for more passengers, strollers, and larger suitcase counts."
        }
      ]
    },
    hanedaAirportTransfer: {
      routesTitle: "Haneda Airport Transfer Routes",
      routesSubtitle:
        "Fast private Haneda Airport pickup and drop-off routes for Ginza, Shinjuku, Shinagawa, Tokyo hotels, cruise terminals, and business travel.",
      routes: [
        {
          title: "Haneda Airport to Ginza",
          description:
            "Fast private pickup from Haneda Airport to Ginza hotels, Tsukiji, Yurakucho, Nihonbashi, and central Tokyo.",
          href: "/haneda-airport-to-ginza"
        },
        {
          title: "Haneda Airport to Shinjuku",
          description:
            "Door-to-door Haneda transfer for Shinjuku Station hotels, Nishi-Shinjuku, Kabukicho, and nearby apartments.",
          href: "/haneda-airport-to-shinjuku"
        },
        {
          title: "Haneda Airport to Shinagawa",
          description:
            "Quick private transfer from Haneda Airport to Shinagawa Station hotels, Takanawa, and Shinkansen connections.",
          href: "/haneda-airport-to-shinagawa"
        },
        {
          title: "Haneda Airport to Yokohama port",
          description:
            "Private transfer from Haneda Airport to Osanbashi, Daikoku Pier, Yokohama hotels, and cruise terminal areas.",
          href: "/yokohama-port-transfer"
        },
        {
          title: "Tokyo hotel to Haneda Airport",
          description:
            "Reliable Haneda drop-off from Tokyo hotels with fixed quote, luggage support, and recommended pickup time.",
          href: "/haneda-airport-transfer"
        }
      ],
      faqTitle: "Haneda Airport Transfer FAQ",
      faqSubtitle: "Common questions before booking a private car from Haneda Airport to Tokyo.",
      faqs: [
        {
          question: "How long does Haneda Airport to central Tokyo take by private car?",
          answer:
            "It usually takes about 30 to 60 minutes, depending on traffic and whether you are going to Ginza, Shinagawa, Shinjuku, or another Tokyo area."
        },
        {
          question: "Can I book Haneda pickup late at night or early morning?",
          answer:
            "Yes. Haneda Airport pickup and drop-off can be arranged for late-night arrivals, early departures, and hotel transfers."
        },
        {
          question: "Is Haneda Airport pickup good for Shinkansen connections?",
          answer:
            "Yes. Shinagawa and Tokyo Station transfers can be arranged, and the driver can drop you near the appropriate station entrance."
        },
        {
          question: "Can I request a Toyota Alphard or Hiace?",
          answer:
            "Yes. Please send passenger count, luggage count, and child seat needs so we can confirm the best vehicle before booking."
        }
      ]
    },
    tokyoPrivateDriver: {
      routesTitle: "Tokyo Private Driver Routes",
      routesSubtitle:
        "Private driver services for Tokyo hotel transfers, Shinkansen station pickup, hourly charters, Mt Fuji day trips, and airport connections.",
      routes: [
        {
          title: "Tokyo hotel-to-hotel transfer",
          description:
            "Private movement between Tokyo hotels, apartments, Shinjuku, Ginza, Shibuya, Tokyo Station, and Shinagawa.",
          href: "/tokyo-private-driver"
        },
        {
          title: "Tokyo Station or Shinagawa pickup",
          description:
            "Door-to-door pickup for Shinkansen travelers arriving at Tokyo Station, Shinagawa Station, or nearby hotels.",
          href: "/tokyo-private-driver"
        },
        {
          title: "Mt Fuji day trip with English driver",
          description:
            "Flexible private day trip from Tokyo to Mt Fuji, Lake Kawaguchi, viewpoints, outlets, and hotel pickup points.",
          href: "/tokyo-private-driver"
        },
        {
          title: "Narita and Haneda airport transfer",
          description:
            "Private airport pickup and drop-off from Tokyo hotels with Toyota Alphard and Hiace options.",
          href: ""
        }
      ],
      faqTitle: "Tokyo Private Driver FAQ",
      faqSubtitle: "Common questions before hiring a private driver in Tokyo.",
      faqs: [
        {
          question: "Can I hire a private driver by the hour in Tokyo?",
          answer:
            "Yes. Hourly private car charter can be arranged for Tokyo city visits, shopping, hotel transfers, and flexible multi-stop plans."
        },
        {
          question: "Can the driver handle Shinkansen station pickup?",
          answer:
            "Yes. Tokyo Station and Shinagawa Station pickup or drop-off can be arranged, including hotel-to-station movement with luggage."
        },
        {
          question: "Can I book a Mt Fuji day trip from Tokyo?",
          answer:
            "Yes. Mt Fuji, Lake Kawaguchi, viewpoints, outlets, and flexible private day trips from Tokyo can be arranged."
        },
        {
          question: "Which vehicle should I choose for a Tokyo private driver?",
          answer:
            "Toyota Alphard is a comfortable choice for smaller groups, while Toyota Hiace is better for more passengers or larger luggage."
        }
      ]
    }
  },
  ja: {
    naritaAirportTransfer: {
      routesTitle: "成田空港送迎ルート",
      routesSubtitle:
        "成田空港から東京ホテル、新宿、東京ディズニーリゾート、銀座、品川、家族旅行の荷物付き移動に対応する専用車ルートです。",
      routes: [
        {
          title: "成田空港から新宿へ",
          description: "成田空港から新宿駅周辺ホテル、西新宿、歌舞伎町へのドアツードア専用車送迎です。",
          href: "/narita-airport-to-shinjuku"
        },
        {
          title: "成田空港から東京ディズニーリゾートへ",
          description: "東京ディズニーランド、ディズニーシー、舞浜ホテル、リゾート周辺ホテルへの家族向け空港送迎です。",
          href: "/narita-airport-to-tokyo-disney-resort"
        },
        {
          title: "成田空港から横浜港へ",
          description: "成田空港から大さん橋、大黒ふ頭、横浜ホテル、クルーズターミナル周辺へ向かう長距離専用車送迎です。",
          href: "/yokohama-port-transfer"
        },
        {
          title: "成田空港から東京ホテルへ",
          description: "東京駅、銀座、渋谷、品川、浅草、東京中心部ホテルへの固定料金の成田空港送迎です。",
          href: "/narita-airport-transfer"
        },
        {
          title: "東京ホテルから成田空港へ",
          description: "フライト時刻と交通状況に合わせて出発時間を提案する、東京ホテル発の空港送迎です。",
          href: "/narita-airport-transfer"
        }
      ],
      faqTitle: "成田空港送迎 FAQ",
      faqSubtitle: "成田空港から東京まで専用車を予約する前によくある質問です。",
      faqs: [
        {
          question: "成田空港から東京中心部まで車でどのくらいですか？",
          answer: "通常は60分から90分ほどです。高速道路の混雑と東京のホテルや住所により変わります。"
        },
        {
          question: "到着ゲートで迎えてもらえますか？",
          answer: "はい。到着ゲートでのネームプレートお迎えはオプションで、事前希望の場合は+2,000円です。"
        },
        {
          question: "成田到着便が遅れた場合はどうなりますか？",
          answer: "実際のフライト到着時刻に合わせてお迎えします。空港お迎えは着陸時刻から90分無料待機です。"
        },
        {
          question: "成田空港送迎はどの車種が良いですか？",
          answer: "少人数はアルファードが快適です。人数やスーツケースが多い場合はハイエースがおすすめです。"
        }
      ]
    },
    hanedaAirportTransfer: {
      routesTitle: "羽田空港送迎ルート",
      routesSubtitle:
        "羽田空港から銀座、新宿、品川、東京ホテル、クルーズターミナル、出張利用に対応する短距離空港送迎です。",
      routes: [
        {
          title: "羽田空港から銀座へ",
          description: "羽田空港から銀座ホテル、築地、有楽町、日本橋、東京中心部へのスムーズな送迎です。",
          href: "/haneda-airport-to-ginza"
        },
        {
          title: "羽田空港から新宿へ",
          description: "新宿駅周辺ホテル、西新宿、歌舞伎町、周辺アパートへのドアツードア羽田空港送迎です。",
          href: "/haneda-airport-to-shinjuku"
        },
        {
          title: "羽田空港から品川へ",
          description: "品川駅周辺ホテル、高輪、新幹線接続に便利な羽田空港から品川への短距離送迎です。",
          href: "/haneda-airport-to-shinagawa"
        },
        {
          title: "羽田空港から横浜港へ",
          description: "羽田空港から大さん橋、大黒ふ頭、横浜ホテル、クルーズターミナル周辺へ向かう専用車送迎です。",
          href: "/yokohama-port-transfer"
        },
        {
          title: "東京ホテルから羽田空港へ",
          description: "固定料金、荷物対応、推奨出発時刻付きの東京ホテル発羽田空港送迎です。",
          href: "/haneda-airport-transfer"
        }
      ],
      faqTitle: "羽田空港送迎 FAQ",
      faqSubtitle: "羽田空港から東京まで専用車を予約する前によくある質問です。",
      faqs: [
        {
          question: "羽田空港から東京中心部まで車でどのくらいですか？",
          answer: "通常は30分から60分ほどです。銀座、品川、新宿など目的地と道路状況により変わります。"
        },
        {
          question: "深夜や早朝の羽田空港送迎もできますか？",
          answer: "はい。深夜到着、早朝出発、ホテル送迎など羽田空港の送迎を手配できます。"
        },
        {
          question: "羽田空港から新幹線駅への移動にも使えますか？",
          answer: "はい。品川駅や東京駅への送迎に対応でき、駅入口近くまでご案内できます。"
        },
        {
          question: "アルファードやハイエースを指定できますか？",
          answer: "はい。人数、荷物数、チャイルドシートの有無を送っていただければ、最適な車種を確認します。"
        }
      ]
    },
    tokyoPrivateDriver: {
      routesTitle: "東京プライベートドライバールート",
      routesSubtitle:
        "東京ホテル間移動、新幹線駅送迎、時間貸切、富士山日帰り、空港接続に対応する専用車サービスです。",
      routes: [
        {
          title: "東京ホテル間の移動",
          description: "新宿、銀座、渋谷、東京駅、品川など、東京のホテルやアパート間の専用車移動です。",
          href: "/tokyo-private-driver"
        },
        {
          title: "東京駅・品川駅の送迎",
          description: "新幹線で到着する旅行者向けに、東京駅や品川駅からホテルまで送迎します。",
          href: "/tokyo-private-driver"
        },
        {
          title: "英語ドライバーの富士山日帰り",
          description: "東京発の富士山、河口湖、展望スポット、アウトレットなどを巡る日帰り専用車です。",
          href: "/tokyo-private-driver"
        },
        {
          title: "成田・羽田空港送迎",
          description: "東京ホテル発着の空港送迎を、アルファードやハイエースで手配できます。",
          href: ""
        }
      ],
      faqTitle: "東京プライベートドライバー FAQ",
      faqSubtitle: "東京で専用車ドライバーを予約する前によくある質問です。",
      faqs: [
        {
          question: "東京で時間貸切の専用車を予約できますか？",
          answer: "はい。東京観光、買い物、ホテル移動、複数立ち寄りの時間貸切チャーターに対応できます。"
        },
        {
          question: "新幹線駅での送迎もできますか？",
          answer: "はい。東京駅や品川駅での送迎、ホテルから駅までの荷物付き移動に対応できます。"
        },
        {
          question: "東京発の富士山日帰り旅行はできますか？",
          answer: "はい。富士山、河口湖、展望スポット、アウトレットなどのプライベート日帰り旅行を手配できます。"
        },
        {
          question: "東京プライベートドライバーはどの車種が良いですか？",
          answer: "少人数はアルファードが快適で、人数や荷物が多い場合はハイエースがおすすめです。"
        }
      ]
    }
  },
  zh: {
    naritaAirportTransfer: {
      routesTitle: "成田機場接送路線",
      routesSubtitle:
        "成田機場到東京酒店、新宿、東京迪士尼度假區、銀座、品川，以及親子家庭攜帶行李移動的私人專車路線。",
      routes: [
        {
          title: "成田機場到新宿",
          description: "成田機場到新宿站周邊酒店、西新宿、歌舞伎町的點對點私人專車接送。",
          href: "/narita-airport-to-shinjuku"
        },
        {
          title: "成田機場到東京迪士尼度假區",
          description: "適合前往東京迪士尼樂園、DisneySea、舞濱酒店和度假區酒店的親子家庭接送。",
          href: "/narita-airport-to-tokyo-disney-resort"
        },
        {
          title: "成田機場到橫濱港",
          description: "成田機場前往大棧橋、大黑埠頭、橫濱酒店和郵輪碼頭區域的長距離私人專車接送。",
          href: "/yokohama-port-transfer"
        },
        {
          title: "成田機場到東京酒店",
          description: "成田機場到東京站、銀座、澀谷、品川、淺草和東京市中心酒店的固定報價接送。",
          href: "/narita-airport-transfer"
        },
        {
          title: "東京酒店到成田機場",
          description: "根據航班時間和路況建議出發時間，安排東京酒店到成田機場送機。",
          href: "/narita-airport-transfer"
        }
      ],
      faqTitle: "成田機場接送常見問題",
      faqSubtitle: "預約成田機場到東京私人專車前常見的問題。",
      faqs: [
        {
          question: "成田機場到東京市中心包車需要多久？",
          answer: "通常約60到90分鐘，具體取決於高速路況和東京酒店或地址位置。"
        },
        {
          question: "可以在到達口舉牌接機嗎？",
          answer: "可以。到達口舉牌接機是可選服務，確認預約前提出需求時另加 2,000 日元。"
        },
        {
          question: "成田航班延誤怎麼辦？",
          answer: "接機時間會根據航班實際落地時間調整，機場接機包含從落地時間開始的90分鐘免費等待。"
        },
        {
          question: "成田機場接送選什麼車型？",
          answer: "少人時 Alphard 很舒適；如果人數、嬰兒車或行李箱較多，建議選 Hiace。"
        }
      ]
    },
    hanedaAirportTransfer: {
      routesTitle: "羽田機場接送路線",
      routesSubtitle:
        "羽田機場到銀座、新宿、品川、東京酒店、郵輪碼頭和商務出行相關的快速私人接送路線。",
      routes: [
        {
          title: "羽田機場到銀座",
          description: "羽田機場到銀座酒店、築地、有樂町、日本橋和東京市中心的快速私人接送。",
          href: "/haneda-airport-to-ginza"
        },
        {
          title: "羽田機場到新宿",
          description: "羽田機場到新宿站周邊酒店、西新宿、歌舞伎町和附近公寓的點對點接送。",
          href: "/haneda-airport-to-shinjuku"
        },
        {
          title: "羽田機場到品川",
          description: "羽田機場到品川站周邊酒店、高輪和新幹線轉乘的短途私人接送。",
          href: "/haneda-airport-to-shinagawa"
        },
        {
          title: "羽田機場到橫濱港",
          description: "羽田機場前往大棧橋、大黑埠頭、橫濱酒店和郵輪碼頭區域的私人專車接送。",
          href: "/yokohama-port-transfer"
        },
        {
          title: "東京酒店到羽田機場",
          description: "固定報價、行李協助和建議出發時間的東京酒店到羽田機場送機。",
          href: "/haneda-airport-transfer"
        }
      ],
      faqTitle: "羽田機場接送常見問題",
      faqSubtitle: "預約羽田機場到東京私人專車前常見的問題。",
      faqs: [
        {
          question: "羽田機場到東京市中心包車需要多久？",
          answer: "通常約30到60分鐘，具體取決於銀座、品川、新宿等目的地和當天路況。"
        },
        {
          question: "深夜或清晨也可以安排羽田接送嗎？",
          answer: "可以。羽田機場深夜到達、清晨出發和酒店接送都可以安排。"
        },
        {
          question: "羽田機場到新幹線站也適合嗎？",
          answer: "適合。可以安排到品川站或東京站，司機會盡量送到方便進站的位置。"
        },
        {
          question: "可以指定 Alphard 或 Hiace 嗎？",
          answer: "可以。請提供人數、行李箱數量和兒童座椅需求，我們會確認合適車型。"
        }
      ]
    },
    tokyoPrivateDriver: {
      routesTitle: "東京私人司機路線",
      routesSubtitle:
        "東京酒店移動、新幹線車站接送、時間包車、富士山一日遊和機場接送相關的私人司機服務。",
      routes: [
        {
          title: "東京酒店到酒店移動",
          description: "適合新宿、銀座、澀谷、東京站、品川等東京酒店或公寓之間的私人專車移動。",
          href: "/tokyo-private-driver"
        },
        {
          title: "東京站或品川站接送",
          description: "適合搭乘新幹線到達東京站、品川站後，帶行李前往酒店的接送。",
          href: "/tokyo-private-driver"
        },
        {
          title: "英文司機富士山一日遊",
          description: "從東京出發前往富士山、河口湖、觀景點、Outlet 等地的私人一日遊。",
          href: "/tokyo-private-driver"
        },
        {
          title: "成田和羽田機場接送",
          description: "東京酒店出發或到達的機場接送，可安排 Alphard 或 Hiace。",
          href: ""
        }
      ],
      faqTitle: "東京私人司機常見問題",
      faqSubtitle: "預約東京私人司機前常見的問題。",
      faqs: [
        {
          question: "東京可以按小時包車嗎？",
          answer: "可以。東京市區觀光、購物、酒店移動和多點停留都可以安排時間包車。"
        },
        {
          question: "可以在新幹線車站接送嗎？",
          answer: "可以。東京站、品川站接送，以及酒店到車站的行李移動都可以安排。"
        },
        {
          question: "可以預約東京出發的富士山一日遊嗎？",
          answer: "可以。富士山、河口湖、觀景點、Outlet 等私人一日遊路線都可以安排。"
        },
        {
          question: "東京私人司機選什麼車型？",
          answer: "少人時 Alphard 很舒適；如果人數或行李較多，建議選 Hiace。"
        }
      ]
    }
  }
};
