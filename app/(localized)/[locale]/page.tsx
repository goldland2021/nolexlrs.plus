import Hero from "@/components/Hero";
import Vehicles from "@/components/Vehicles";
import QuoteBookingSection from "@/components/QuoteBookingSection";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import SeoContent from "@/components/SeoContent";
import { getDictionary, isLocale, type Dictionary, type Locale } from "@/lib/i18n";
import {
  breadcrumbHomeName,
  breadcrumbJsonLd,
  faqJsonLd,
  buildPageMetadata,
  serviceJsonLd,
  serviceJsonLdProfiles
} from "@/lib/seo";
import { homeSeoContent } from "@/lib/seo-content";

type LocaleParams = Promise<{ locale: string }>;

const tokyoPageCopy = {
  en: {
    metaTitle: "Tokyo Airport Transfer | nolexlrs",
    metaDescription:
      "Private Tokyo airport transfer for Narita Airport, Haneda Airport, Tokyo hotels, stations, Disney Resort, cruise terminals, and Mt Fuji day trips.",
    keywords: [
      "Tokyo airport transfer",
      "Tokyo airport pickup",
      "Narita Airport transfer",
      "Haneda Airport transfer",
      "Tokyo private driver",
      "Tokyo hotel transfer",
      "Tokyo English driver",
      "Tokyo Disney airport transfer",
      "Tokyo to Mt Fuji private driver"
    ],
    title: "Tokyo Airport Transfer",
    subtitle:
      "Private transfer between Narita Airport, Haneda Airport, Tokyo hotels, stations, Disney Resort, cruise terminals, and day-trip routes.",
    features: [
      "24 hour airport transfer service",
      "English-speaking driver",
      "Hotel-to-hotel transfer",
      "Fixed transparent pricing",
      "Mt Fuji day trip private car",
      "WhatsApp booking"
    ],
    imageAlt: "Tokyo airport transfer private car",
    quoteTitle: "Book Your Tokyo Transfer Now",
    quoteCopy:
      "Search your Tokyo hotel or address, review the route estimate, then send the details on WhatsApp for a confirmed fixed quote.",
    directNote:
      "Opens in WhatsApp after submission to chat directly with the driver. Optional name-sign meet-and-greet at the arrival gate: +2,000 JPY when requested.",
    pickupNote: "Waiting time starts from flight landing for airport pickup, or scheduled time for hotel pickup.",
    delayNote: "No worries about flight delays. The driver adjusts based on the actual landing time.",
    promiseTitle: "Our Service Promise",
    promises: [
      ["On-time Arrival", "Driver arrives early and waits at the agreed meeting point."],
      ["Transparent Pricing", "Fixed pricing with no hidden fees."],
      ["English Driver", "Professional English-speaking driver for smooth communication."],
      ["Flexible Routes", "Airport, hotel, station, and day-trip routes can be arranged."]
    ],
    booking: {
      title: "Book Your Tokyo Transfer",
      subtitle: "Send your flight, pickup time, hotel, passenger count, and luggage details to get a fast quote on WhatsApp.",
      placeholders: {
        airport: "Narita or Haneda",
        flight: "JL123",
        landingTime: "May 3, 4:30 PM",
        hotel: "Shinjuku hotel",
        passengers: "2",
        luggage: "3 suitcases"
      },
      messageHeader: "Hello, I need a Tokyo airport transfer quote."
    }
  },
  ja: {
    metaTitle: "東京空港送迎 | nolexlrs",
    metaDescription:
      "成田空港、羽田空港、東京ホテル、駅、ディズニー、クルーズターミナル、富士山日帰りに対応する東京のプライベート空港送迎。",
    keywords: [
      "東京 空港送迎",
      "東京 空港ピックアップ",
      "成田空港 送迎",
      "羽田空港 送迎",
      "東京 プライベートドライバー",
      "東京 ホテル送迎",
      "東京 英語ドライバー",
      "東京ディズニー 空港送迎",
      "東京 富士山 チャーター"
    ],
    title: "東京空港送迎",
    subtitle:
      "成田空港、羽田空港、東京ホテル、駅、ディズニー、クルーズターミナル、日帰りルートまで対応するプライベート送迎。",
    features: [
      "24時間空港送迎",
      "英語対応ドライバー",
      "ホテル間移動",
      "明朗な固定料金",
      "富士山日帰りチャーター",
      "WhatsAppで予約"
    ],
    imageAlt: "東京空港送迎のプライベート車両",
    quoteTitle: "東京送迎を今すぐ予約",
    quoteCopy:
      "東京のホテル名や住所を検索し、ルート目安を確認してからWhatsAppで固定料金を相談できます。",
    directNote:
      "送信後、WhatsAppでドライバーと直接やり取りできます。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。",
    pickupNote: "空港お迎えは実際のフライト到着時刻から、ホテルお迎えは予約時刻から待機時間を計算します。",
    delayNote: "フライト遅延時も到着時刻に合わせてドライバーが調整します。",
    promiseTitle: "サービスのお約束",
    promises: [
      ["時間厳守", "ドライバーが早めに到着し、指定場所でお待ちします。"],
      ["明朗料金", "固定料金で、隠れた追加費用はありません。"],
      ["英語対応", "英語対応ドライバーでスムーズに連絡できます。"],
      ["柔軟なルート", "空港、ホテル、駅、日帰り観光に対応できます。"]
    ],
    booking: {
      title: "東京送迎を予約",
      subtitle: "フライト、到着時刻、ホテル、ご利用人数、荷物情報を送ると、WhatsAppですぐに見積もりできます。",
      placeholders: {
        airport: "成田空港 / 羽田空港",
        flight: "JL123",
        landingTime: "5月3日 16:30",
        hotel: "新宿のホテル",
        passengers: "2名",
        luggage: "スーツケース3個"
      },
      messageHeader: "こんにちは。東京空港送迎の見積もりをお願いします。"
    }
  },
  zh: {
    metaTitle: "東京機場接送 | nolexlrs",
    metaDescription:
      "東京私人機場接送服務，支援成田機場、羽田機場、東京酒店、車站、迪士尼、郵輪碼頭與富士山一日遊包車。",
    keywords: [
      "東京機場接送",
      "東京接機",
      "成田機場接送",
      "羽田機場接送",
      "東京包車",
      "東京酒店接送",
      "東京英文司機",
      "東京迪士尼機場接送",
      "東京到富士山包車"
    ],
    title: "東京機場接送",
    subtitle:
      "提供成田機場、羽田機場、東京酒店、車站、迪士尼、郵輪碼頭與一日遊路線的私人專車接送。",
    features: [
      "24小時機場接送",
      "可英文和中文溝通",
      "酒店到酒店移動",
      "固定透明報價",
      "富士山一日遊包車",
      "WhatsApp 快速預約"
    ],
    imageAlt: "東京機場接送私人專車",
    quoteTitle: "立即預約東京接送服務",
    quoteCopy:
      "搜尋東京酒店或地址，查看路線參考價格，再透過 WhatsApp 獲取最終固定報價。",
    directNote:
      "提交後會打開 WhatsApp，方便直接和司機溝通。到達口舉牌接機為可選服務，需要時另加 2,000 日元。",
    pickupNote: "接機等待時間從航班實際落地算起，酒店接送從預約時間算起。",
    delayNote: "航班延誤不用擔心，司機會根據實際落地時間調整接機。",
    promiseTitle: "我們的服務承諾",
    promises: [
      ["準時到達", "司機會提前到達，在約定地點等待。"],
      ["價格透明", "固定報價，無隱藏費用。"],
      ["英文司機", "專業英文司機，溝通順暢。"],
      ["路線靈活", "機場、酒店、車站和一日遊都可以安排。"]
    ],
    booking: {
      title: "預約東京接送",
      subtitle: "發送航班、落地時間、酒店、乘客人數和行李資訊，我們會透過 WhatsApp 快速報價。",
      placeholders: {
        airport: "成田機場 / 羽田機場",
        flight: "JL123",
        landingTime: "5月3日 16:30",
        hotel: "新宿酒店",
        passengers: "2人",
        luggage: "3個行李箱"
      },
      messageHeader: "您好，我需要東京機場接送報價。"
    }
  }
} satisfies Record<Locale, {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  title: string;
  subtitle: string;
  features: string[];
  imageAlt: string;
  quoteTitle: string;
  quoteCopy: string;
  directNote: string;
  pickupNote: string;
  delayNote: string;
  promiseTitle: string;
  promises: [string, string][];
  booking: {
    title: string;
    subtitle: string;
    placeholders: Dictionary["booking"]["placeholders"];
    messageHeader: string;
  };
}>;

export async function generateMetadata({
  params
}: {
  params: LocaleParams;
}) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const copy = tokyoPageCopy[locale] ?? tokyoPageCopy.en;

  return buildPageMetadata({
    locale,
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: copy.keywords,
    image: "/images/tokyo-airport-transfer.jpg"
  });
}

export default async function HomePage({ params }: { params: LocaleParams }) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);
  const copy = tokyoPageCopy[locale] ?? tokyoPageCopy.en;
  const seoContent = homeSeoContent[locale] ?? homeSeoContent.en;
  const booking = {
    ...dict.booking,
    title: copy.booking.title,
    subtitle: copy.booking.subtitle,
    placeholders: {
      ...dict.booking.placeholders,
      ...copy.booking.placeholders
    },
    messageHeader: copy.booking.messageHeader
  };

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(seoContent.faqs))
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(locale, [{ name: breadcrumbHomeName(locale) }]))
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(locale, copy.title, copy.metaDescription, undefined, serviceJsonLdProfiles.tokyo)
          )
        }}
      />
      <Hero
        title={copy.title}
        subtitle={copy.subtitle}
        features={copy.features}
        imageSrc="/images/tokyo-airport-transfer.jpg"
        imageAlt={copy.imageAlt}
        ctaLabel={dict.hero.cta}
        locale={locale}
        citySlug="tokyo"
        showRoamingButton
      />

      <QuoteBookingSection
        locale={locale}
        title={copy.quoteTitle}
        subtitle={copy.quoteCopy}
        directNote={copy.directNote}
        booking={booking}
      />

      <section className="section grid-dots">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <WaitingTimeBanner locale={locale} />
                <div className="mt-4 rounded-lg border border-ink/10 bg-white p-4">
                  <p className="text-sm leading-6 text-ink/70">{copy.pickupNote}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{copy.delayNote}</p>
                </div>
              </div>

              <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft sm:p-6">
                <h3 className="mb-4 text-lg font-semibold">{copy.promiseTitle}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {copy.promises.map(([title, text]) => (
                    <div key={title} className="rounded-lg border border-ink/10 bg-[#f7f3ec] p-4">
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-ink/60">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SeoContent locale={locale} />

      <Vehicles
        title={dict.vehicles.title}
        subtitle={dict.vehicles.subtitle}
        vehicles={dict.vehicles.items}
      />
    </main>
  );
}
