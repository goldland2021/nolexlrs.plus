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
  destinations: { name: string; description: string }[];
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
        title: "Narita Airport to Tokyo hotels",
        description:
          "Door-to-door Narita Airport transfer to Shinjuku, Shibuya, Ginza, Asakusa, Shinagawa, and other central Tokyo areas.",
        href: "/narita-airport-transfer"
      },
      {
        title: "Haneda Airport to central Tokyo",
        description:
          "Fast Haneda Airport pickup for Ginza, Tsukiji, Shinagawa, Shinjuku, Shibuya, and Tokyo cruise terminals.",
        href: "/haneda-airport-transfer"
      },
      {
        title: "Narita or Haneda to Tokyo Disney Resort",
        description:
          "Private airport transfer for families going to Tokyo Disneyland, DisneySea, Maihama hotels, and resort-area hotels with luggage.",
        href: "/narita-airport-transfer"
      },
      {
        title: "Tokyo cruise terminal transfer",
        description:
          "Pickup and drop-off for Tokyo International Cruise Terminal, Harumi, hotels, and airport connections.",
        href: "/haneda-airport-transfer"
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
    faqTitle: "JP Airport Transfer FAQ",
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
        title: "成田空港から東京のホテルへ",
        description:
          "新宿、渋谷、銀座、浅草、品川など、東京中心部へのドアツードア成田空港送迎です。",
        href: "/narita-airport-transfer"
      },
      {
        title: "羽田空港から東京中心部へ",
        description:
          "銀座、築地、品川、新宿、渋谷、東京のクルーズターミナルへのスムーズな羽田空港送迎です。",
        href: "/haneda-airport-transfer"
      },
      {
        title: "成田・羽田から東京ディズニーリゾートへ",
        description:
          "東京ディズニーランド、ディズニーシー、舞浜ホテル、リゾート周辺ホテルへ荷物付きで移動できます。",
        href: "/narita-airport-transfer"
      },
      {
        title: "東京クルーズターミナル送迎",
        description:
          "東京国際クルーズターミナル、晴海、ホテル、空港接続に対応するプライベート送迎です。",
        href: "/haneda-airport-transfer"
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
    routesTitle: "東京熱門機場接送路線",
    routesSubtitle:
      "提供成田機場、羽田機場、東京酒店移動、新幹線站接送和富士山一日遊之間的私人接送。報價會參考路線距離、車型、行李數量和到達時間。",
    routes: [
      {
        title: "成田機場到東京酒店",
        description:
          "成田機場到新宿、澀谷、銀座、淺草、品川等東京市區的點對點私人接送。",
        href: "/narita-airport-transfer"
      },
      {
        title: "羽田機場到東京市區",
        description:
          "適合羽田機場到銀座、築地、品川、新宿、澀谷、東京郵輪碼頭等目的地。",
        href: "/haneda-airport-transfer"
      },
      {
        title: "成田或羽田到東京迪士尼",
        description:
          "適合前往東京迪士尼樂園、迪士尼海洋、舞濱酒店和迪士尼周邊酒店的家庭旅客。",
        href: "/narita-airport-transfer"
      },
      {
        title: "東京郵輪碼頭接送",
        description:
          "可安排東京國際郵輪碼頭、晴海、酒店與機場之間的點對點私人接送。",
        href: "/haneda-airport-transfer"
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
          "可以。除了成田機場和羽田機場接送，也可以安排東京酒店到酒店移動、東京站或品川站新幹線接送，以及富士山一日遊包車，可中文和英文溝通。"
      }
    ]
  }
};

export const airportGuideContent: Record<Locale, Record<"narita" | "haneda", AirportGuideContent>> = {
  en: {
    narita: {
      title: "Narita Airport Transfer Guide",
      subtitle:
        "Narita is farther from central Tokyo than Haneda, so the best quote should account for tolls, traffic, passenger count, luggage, and whether it is airport pickup or hotel drop-off.",
      destinationsTitle: "Common Narita transfer destinations",
      destinations: [
        {
          name: "Narita to Shinjuku or Shibuya",
          description: "Popular for first-time visitors staying near major hotels, stations, and nightlife areas."
        },
        {
          name: "Narita to Ginza, Tokyo Station, or Nihonbashi",
          description: "Convenient for business travelers and central Tokyo hotel stays."
        },
        {
          name: "Narita to Shinagawa or Tokyo Disney Resort",
          description: "Good for families with luggage, strollers, and children after a long flight."
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
          name: "Haneda to Ginza, Tsukiji, or Tokyo Station",
          description: "A short private transfer for central Tokyo hotels and business trips."
        },
        {
          name: "Haneda to Shinjuku or Shibuya",
          description: "Reliable door-to-door pickup for popular hotel and apartment areas."
        },
        {
          name: "Haneda to Shinagawa or Yokohama",
          description: "Useful for early flights, cruise connections, and family travel."
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
          name: "成田から新宿・渋谷",
          description: "ホテル、駅、観光エリアに滞在する初めての旅行者に人気です。"
        },
        {
          name: "成田から銀座・東京駅・日本橋",
          description: "ビジネス利用や東京中心部のホテル滞在に便利です。"
        },
        {
          name: "成田から品川・東京ディズニーリゾート",
          description: "長距離フライト後のご家族、荷物、ベビーカーがある場合に便利です。"
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
          name: "羽田から銀座・築地・東京駅",
          description: "東京中心部のホテルやビジネス利用に便利な短距離送迎です。"
        },
        {
          name: "羽田から新宿・渋谷",
          description: "ホテルや民泊エリアまで安心のドアツードア送迎です。"
        },
        {
          name: "羽田から品川・横浜",
          description: "早朝便、クルーズ接続、家族旅行にも使いやすいルートです。"
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
        "成田機場距離東京市區較遠，合理報價需要考慮高速費、路況、人數、行李，以及是接機還是酒店送機。",
      destinationsTitle: "常見成田機場接送目的地",
      destinations: [
        {
          name: "成田到新宿或澀谷",
          description: "適合入住熱門酒店、車站周邊和市區觀光區域的旅客。"
        },
        {
          name: "成田到銀座、東京站或日本橋",
          description: "適合商務客人和入住東京中心區域酒店的旅客。"
        },
        {
          name: "成田到品川或東京迪士尼",
          description: "適合長途飛行後帶行李、嬰兒車和兒童的家庭。"
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
          name: "羽田到銀座、築地或東京站",
          description: "適合東京中心區域酒店和商務出行的短途私人接送。"
        },
        {
          name: "羽田到新宿或澀谷",
          description: "適合熱門酒店、公寓和民宿區域的點對點接送。"
        },
        {
          name: "羽田到品川或橫濱",
          description: "適合早班機、郵輪銜接和家庭出行。"
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
