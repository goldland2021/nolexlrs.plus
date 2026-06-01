import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactChannels from "@/components/ContactChannels";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { buildPageMetadata, localizedPath, siteName, siteUrl } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

type LocaleParams = Promise<{ locale: string }>;

const homestayHeroImage = "/images/nolexlrs/open-plan-kitchen-living.jpg";

const homestayPhotos = [
  { src: "/images/nolexlrs/open-plan-kitchen-living.jpg", alt: "Open-plan furnished homestay kitchen and living room" },
  { src: "/images/nolexlrs/living-room-kitchen-sofa.jpg", alt: "Furnished homestay living room with sofa and kitchen" },
  { src: "/images/nolexlrs/living-dining-tv.jpg", alt: "Homestay dining area and TV wall" },
  { src: "/images/nolexlrs/dining-area-curtains.jpg", alt: "Compact dining area with warm curtains" },
  { src: "/images/nolexlrs/sofa-living-room.jpg", alt: "Bright homestay sofa living room" },
  { src: "/images/nolexlrs/kitchen-sink-counter.jpg", alt: "Clean furnished homestay kitchen counter" },
  { src: "/images/nolexlrs/gas-stove-grill.jpg", alt: "Gas stove and grill in homestay kitchen" },
  { src: "/images/nolexlrs/wide-living-kitchen.jpg", alt: "Wide view of living room and kitchen" },
  { src: "/images/nolexlrs/living-dining-room-wide.jpg", alt: "Wide living and dining room view" },
  { src: "/images/nolexlrs/laundry-washer.jpg", alt: "In-room washing machine for homestay guests" },
  { src: "/images/nolexlrs/bedroom-double-bed.jpg", alt: "Simple double bedroom in Japanese homestay" },
  { src: "/images/nolexlrs/bedroom-closet-wall.jpg", alt: "Bedroom storage wall and bed" },
  { src: "/images/nolexlrs/bedroom-curtains.jpg", alt: "Bedroom with full curtains" },
  { src: "/images/nolexlrs/bedroom-shoji-entry.jpg", alt: "Bedroom entry with shoji-style door" },
  { src: "/images/nolexlrs/tatami-bedroom-shoji.jpg", alt: "Tatami bedroom with shoji doors" },
  { src: "/images/nolexlrs/bedroom-window-shoji.jpg", alt: "Bedroom window with shoji detail" },
  { src: "/images/nolexlrs/japanese-room-tatami-window.jpg", alt: "Japanese-style room with tatami and window" },
  { src: "/images/nolexlrs/japanese-room-shoji-window.jpg", alt: "Japanese room with shoji windows" },
  { src: "/images/nolexlrs/japanese-room-futon.jpg", alt: "Japanese-style futon room" },
  { src: "/images/nolexlrs/vanity-sink.jpg", alt: "Homestay vanity sink" },
  { src: "/images/nolexlrs/toilet-washlet.jpg", alt: "Private toilet with washlet" },
  { src: "/images/nolexlrs/shower-room-mirror.jpg", alt: "Shower room mirror and fixtures" },
  { src: "/images/nolexlrs/bathroom-shower.jpg", alt: "Compact bathroom shower area" },
  { src: "/images/nolexlrs/toilet-room.jpg", alt: "Separate toilet room" },
  { src: "/images/nolexlrs/shower-room-vanity.jpg", alt: "Shower room vanity and mirror" },
  { src: "/images/nolexlrs/residence-exterior.jpg", alt: "Japanese homestay residence exterior" }
];

const content = {
  en: {
    metaTitle: "Japan Homestay Support | nolexlrs",
    metaDescription:
      "nolexlrs Japan homestay support for furnished stays, family trips, longer visits, airport pickup coordination, and local arrival help.",
    keywords: ["Japan homestay", "Japan furnished stay", "Tokyo homestay", "Japan family stay", "nolexlrs homestay"],
    eyebrow: "Japan Homestay",
    title: "Stay like a local, arrive with support",
    subtitle:
      "nolexlrs is expanding beyond airport pickup into curated homestay support for travelers who want a furnished home base, local guidance, and a smoother arrival.",
    cta: "Ask about homestays",
    airportCta: "Add airport pickup",
    imageAlt: "Tokyo hotel arrival and private transfer support",
    highlights: [
      "Furnished rooms and private homes",
      "Family and small-group stays",
      "Airport pickup coordination",
      "Local check-in support",
      "Short stay and longer stay options"
    ],
    stayTypesTitle: "Homestay Options",
    stayTypesSubtitle: "A flexible structure for the new nolexlrs stay business.",
    galleryTitle: "Homestay Photo Preview",
    gallerySubtitle: "Real room, kitchen, bathroom, and exterior photos prepared for the nolexlrs stay service.",
    stayTypes: [
      {
        title: "City Apartments",
        copy: "Convenient furnished stays near stations, restaurants, shopping areas, and airport transfer routes."
      },
      {
        title: "Family Homes",
        copy: "Larger layouts for families and small groups who need luggage space, kitchen access, and quieter neighborhoods."
      },
      {
        title: "Longer Stays",
        copy: "Support for weekly or monthly stays where location, transport, and daily comfort matter more than hotel services."
      }
    ],
    processTitle: "Stay Support Flow",
    process: [
      ["Trip profile", "Share dates, city, group size, luggage, budget, and preferred area."],
      ["Stay matching", "We suggest suitable homestay styles and neighborhood options."],
      ["Arrival plan", "Airport pickup, check-in timing, and address details are coordinated together."]
    ],
    contactTitle: "Start with your dates",
    contactCopy:
      "Send your city, dates, number of guests, and whether you also need airport pickup. The current WhatsApp flow can already handle the first inquiry while the room database is added.",
    faqTitle: "Homestay FAQ",
    faqs: [
      ["Can I combine airport pickup and homestay?", "Yes. Airport pickup is the mature part of nolexlrs, so the arrival route can be coordinated with the stay address."],
      ["Are live room listings available yet?", "This page is the new service layer. The next expansion can add a structured property list, pricing, filters, photos, and availability."],
      ["Which cities can be supported first?", "The existing transfer project already covers Tokyo, Osaka, Hokkaido, Fukuoka, and Okinawa, so those are the natural first homestay regions."]
    ],
    whatsappMessage: "Hello, I want to ask about nolexlrs Japan homestay support."
  },
  ja: {
    metaTitle: "日本民泊サポート | nolexlrs",
    metaDescription:
      "nolexlrsの日本民泊サポート。家具付き滞在、家族旅行、長期滞在、空港送迎との連携、到着時の相談に対応します。",
    keywords: ["日本 民泊", "日本 滞在サポート", "東京 民泊", "家族旅行 民泊", "nolexlrs 民泊"],
    eyebrow: "日本民泊",
    title: "到着から滞在まで、まとめて相談",
    subtitle:
      "nolexlrsは空港送迎に加えて、家具付きの民泊、家族向け滞在、現地到着サポートへ拡張しています。",
    cta: "民泊を相談",
    airportCta: "空港送迎も追加",
    imageAlt: "東京到着と送迎サポート",
    highlights: [
      "家具付きの部屋・住まい",
      "家族・小グループ向け",
      "空港送迎との連携",
      "チェックイン相談",
      "短期・中長期滞在"
    ],
    stayTypesTitle: "民泊タイプ",
    stayTypesSubtitle: "nolexlrsの新しい滞在サービスとして拡張しやすい構成です。",
    galleryTitle: "民泊写真プレビュー",
    gallerySubtitle: "nolexlrsの滞在サービスで使う客室、キッチン、浴室、外観の写真です。",
    stayTypes: [
      {
        title: "都市型アパート",
        copy: "駅、飲食店、買い物エリア、送迎ルートにアクセスしやすい家具付き滞在。"
      },
      {
        title: "ファミリー向け住まい",
        copy: "荷物、キッチン、静かなエリアを重視する家族や小グループ向け。"
      },
      {
        title: "中長期滞在",
        copy: "ホテルサービスよりも立地、交通、日常の快適さを重視する週単位・月単位の滞在。"
      }
    ],
    processTitle: "滞在相談の流れ",
    process: [
      ["旅行条件", "日程、都市、人数、荷物、予算、希望エリアを共有します。"],
      ["滞在候補", "民泊タイプとエリア候補を提案します。"],
      ["到着調整", "空港送迎、チェックイン時間、住所情報をまとめて確認します。"]
    ],
    contactTitle: "日程から相談",
    contactCopy:
      "都市、日程、宿泊人数、空港送迎の有無を送ってください。房源データベース追加前でも、まずWhatsAppで相談できます。",
    faqTitle: "民泊FAQ",
    faqs: [
      ["空港送迎と民泊をまとめて相談できますか？", "はい。空港送迎は既存機能を活用できるため、滞在先住所に合わせて到着導線を調整できます。"],
      ["房源一覧はもうありますか？", "このページは新しい民泊サービス層です。次の拡張で房源一覧、料金、絞り込み、写真、空室状況を追加できます。"],
      ["最初に対応しやすい都市は？", "既存の送迎機能が東京、大阪、北海道、福岡、沖縄を扱うため、この地域から始めるのが自然です。"]
    ],
    whatsappMessage: "こんにちは。nolexlrsの日本民泊サポートについて相談したいです。"
  },
  zh: {
    metaTitle: "日本民宿服務 | nolexlrs",
    metaDescription:
      "nolexlrs 日本民宿服務，支援家具民宿、家庭出行、長住安排、接機銜接和到達協助。",
    keywords: ["日本民宿", "日本住宿支援", "東京民宿", "日本家庭住宿", "nolexlrs 民宿"],
    eyebrow: "日本民宿",
    title: "從接機到入住，一起安排",
    subtitle:
      "nolexlrs 會在現有日本接機基礎上擴展民宿服務，適合需要家具住宿、家庭出行、長住和本地入住協助的旅客。",
    cta: "諮詢民宿",
    airportCta: "加上接機",
    imageAlt: "東京到達與私人接送支援",
    highlights: [
      "家具民宿與整套住處",
      "家庭與小團體住宿",
      "可銜接機場接送",
      "入住與地址協助",
      "短住和中長住選項"
    ],
    stayTypesTitle: "民宿方向",
    stayTypesSubtitle: "作為 nolexlrs 新增住宿業務，先建立清晰的服務結構。",
    galleryTitle: "民宿照片預覽",
    gallerySubtitle: "已接入 nolexlrs 民宿使用的客廳、廚房、臥室、衛浴和外觀照片。",
    stayTypes: [
      {
        title: "城市公寓",
        copy: "靠近車站、餐飲、購物區和接送路線，適合自由行與短住。"
      },
      {
        title: "家庭民宿",
        copy: "適合家庭和小團體，重視行李空間、廚房、安靜街區和入住便利。"
      },
      {
        title: "中長期住宿",
        copy: "適合週租或月租，重點是位置、交通和日常生活舒適度。"
      }
    ],
    processTitle: "民宿服務流程",
    process: [
      ["需求整理", "提供日期、城市、人數、行李、預算和希望區域。"],
      ["房源方向", "根據旅程建議合適的民宿類型和住宿區域。"],
      ["到達安排", "接機、入住時間、地址和聯絡資訊一起確認。"]
    ],
    contactTitle: "先從日期開始",
    contactCopy:
      "發送城市、入住日期、人數，以及是否需要接機。房源資料庫接入前，也可以先用現有 WhatsApp 流程收集需求。",
    faqTitle: "民宿常見問題",
    faqs: [
      ["可以把接機和民宿一起安排嗎？", "可以。接機是 nolexlrs 已有成熟部分，可根據民宿地址銜接到達路線。"],
      ["現在有房源列表嗎？", "這個頁面先建立新民宿業務層。下一步可以加入房源列表、價格、篩選、照片和可訂日期。"],
      ["會先支援哪些城市？", "現有接送已覆蓋東京、大阪、北海道、福岡和沖繩，這些會是最自然的第一批民宿區域。"]
    ],
    whatsappMessage: "您好，我想諮詢 nolexlrs 日本民宿服務。"
  }
} satisfies Record<Locale, {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  airportCta: string;
  imageAlt: string;
  highlights: string[];
  stayTypesTitle: string;
  stayTypesSubtitle: string;
  galleryTitle: string;
  gallerySubtitle: string;
  stayTypes: { title: string; copy: string }[];
  processTitle: string;
  process: [string, string][];
  contactTitle: string;
  contactCopy: string;
  faqTitle: string;
  faqs: [string, string][];
  whatsappMessage: string;
}>;

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const copy = content[locale] ?? content.en;

  return buildPageMetadata({
    locale,
    path: "/japan-homestay",
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: copy.keywords,
    image: homestayHeroImage
  });
}

export default async function JapanHomestayPage({ params }: { params: LocaleParams }) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const copy = content[locale] ?? content.en;
  const whatsappHref = buildWhatsAppLink(copy.whatsappMessage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.metaTitle,
    description: copy.metaDescription,
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl
    },
    areaServed: ["Japan", "Tokyo", "Osaka", "Hokkaido", "Fukuoka", "Okinawa"],
    serviceType: ["Japan homestay support", "Furnished stay support", "Airport pickup coordination"],
    url: `${siteUrl}${localizedPath(locale, "/japan-homestay")}`
  };

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section stay-bg">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-champagne">{copy.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl lg:text-6xl">{copy.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{copy.subtitle}</p>
              <ul className="mt-7 grid gap-3 text-white/80 sm:grid-cols-2">
                {copy.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-champagne" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-md bg-champagne px-6 text-sm font-semibold text-ink shadow-lift transition hover:-translate-y-0.5 hover:bg-gold"
              >
                {copy.cta}
              </a>
                <Link
                  href={localizedPath(locale)}
                  className="inline-flex h-12 items-center justify-center rounded-md border border-champagne/50 bg-white/10 px-6 text-sm font-semibold text-white transition hover:border-champagne hover:bg-white/20"
                >
                  {copy.airportCta}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-lg border border-white/20 bg-ink shadow-soft">
                <Image
                  src={homestayHeroImage}
                  alt={copy.imageAlt}
                  width={720}
                  height={520}
                  className="h-[360px] w-full object-cover image-warm md:h-[430px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <h2 className="section-title">{copy.stayTypesTitle}</h2>
              <p className="section-subtitle">{copy.stayTypesSubtitle}</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.stayTypes.map((item) => (
                <article key={item.title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
                  <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <h2 className="section-title">{copy.galleryTitle}</h2>
              <p className="section-subtitle">{copy.gallerySubtitle}</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {homestayPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className={`overflow-hidden rounded-lg border border-ink/10 bg-white shadow-soft ${
                    index === 0 ? "sm:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={720}
                    height={540}
                    sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className={`w-full object-cover image-warm ${
                      index === 0 ? "h-[310px] sm:h-[420px] lg:h-full" : "h-44 sm:h-52"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section grid-dots">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <h2 className="section-title">{copy.processTitle}</h2>
              <p className="section-subtitle">{copy.contactCopy}</p>
            </div>
            <div className="grid gap-4">
              {copy.process.map(([title, description], index) => (
                <article key={title} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                  <p className="text-sm font-semibold text-champagne">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl rounded-lg border border-champagne/25 bg-stay-stone p-6 text-white shadow-soft md:p-8">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="text-2xl font-semibold">{copy.contactTitle}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">{copy.contactCopy}</p>
                  <div className="mt-5">
                    <ContactChannels dark message={copy.whatsappMessage} />
                  </div>
                </div>
                <a
                  href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-md bg-champagne px-6 text-sm font-semibold text-ink transition hover:bg-gold"
              >
                {copy.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sand/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="section-title">{copy.faqTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.faqs.map(([question, answer]) => (
                <article key={question} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                  <h3 className="font-semibold text-ink">{question}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
