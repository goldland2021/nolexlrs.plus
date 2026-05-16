import Hero from "@/components/Hero";
import Vehicles from "@/components/Vehicles";
import QuoteBookingSection from "@/components/QuoteBookingSection";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import SeoContent from "@/components/SeoContent";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { faqJsonLd, buildPageMetadata } from "@/lib/seo";
import { homeSeoContent } from "@/lib/seo-content";

type LocaleParams = Promise<{ locale: string }>;

const pageLabels = {
  en: {
    eyebrow: "Instant Quote",
    quoteTitle: "Book Your Transfer Now",
    quoteCopy: "Fill in your trip details and get an instant quote on WhatsApp.",
    directNote:
      "Opens in WhatsApp after submission to chat directly with the driver. Optional name-sign meet-and-greet at the arrival gate: +¥2,000—please mention it if you want this service.",
    waitTitle: "Free Waiting Time Policy",
    pickupNote: "Waiting time starts from flight landing for pickup, or scheduled time for drop-off.",
    delayNote: "No worries about flight delays. The driver adjusts based on the actual landing time.",
    promiseTitle: "Our Service Promise",
    promises: [
      ["On-time Arrival", "Driver arrives early and waits at the agreed meeting point."],
      ["Transparent Pricing", "Fixed pricing with no hidden fees."],
      ["English Driver", "Professional English-speaking driver for smooth communication."],
      ["Instant Reply", "Quick response on WhatsApp, 24/7 service."]
    ]
  },
  ja: {
    eyebrow: "すぐに見積もり",
    quoteTitle: "送迎を今すぐ予約",
    quoteCopy: "旅程情報を入力すると、WhatsAppですぐに見積もりできます。",
    directNote:
      "送信後、WhatsAppでドライバーと直接やり取りできます。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。ご希望の場合はメッセージでお知らせください。",
    waitTitle: "無料待機時間ポリシー",
    pickupNote: "お迎えは実際のフライト到着時刻から、お送りは予約時刻から待機時間を計算します。",
    delayNote: "フライト遅延時もご安心ください。到着時刻に合わせてドライバーが調整します。",
    promiseTitle: "サービスのお約束",
    promises: [
      ["時間厳守", "ドライバーが早めに到着し、指定場所でお待ちします。"],
      ["明朗料金", "固定料金で、隠れた追加費用はありません。"],
      ["英語対応", "英語対応ドライバーでスムーズに連絡できます。"],
      ["迅速返信", "WhatsAppで素早く返信、24時間対応します。"]
    ]
  },
  zh: {
    eyebrow: "快速报价",
    quoteTitle: "立即预约接送服务",
    quoteCopy: "填写行程信息，通过 WhatsApp 快速获取报价。",
    directNote:
      "提交后会打开 WhatsApp，方便直接和司机沟通。到达口举牌接机为可选服务，需要时另加 2,000 日元，请在沟通时说明。",
    waitTitle: "免费等待时间政策",
    pickupNote: "接机等待时间从航班实际落地算起，送机从预约时间算起。",
    delayNote: "航班延误不用担心，司机会根据实际落地时间调整接机。",
    promiseTitle: "我们的服务承诺",
    promises: [
      ["准时到达", "司机会提前到达，在约定地点等待。"],
      ["价格透明", "固定报价，无隐藏费用。"],
      ["英文司机", "专业英文司机，沟通顺畅。"],
      ["即时回复", "WhatsApp 快速响应，24小时服务。"]
    ]
  }
};

export async function generateMetadata({
  params
}: {
  params: LocaleParams;
}) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    keywords: dict.meta.keywords
  });
}

export default async function HomePage({ params }: { params: LocaleParams }) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);
  const labels = pageLabels[locale];
  const seoContent = homeSeoContent[locale] ?? homeSeoContent.en;

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(seoContent.faqs))
        }}
      />
      <Hero
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        features={dict.hero.features}
        imageSrc="/images/tokyo-airport-transfer.jpg"
        imageAlt={dict.hero.imageAlt}
        ctaLabel={dict.hero.cta}
      />

      <QuoteBookingSection
        locale={locale}
        title={labels.quoteTitle}
        subtitle={labels.quoteCopy}
        directNote={labels.directNote}
        booking={dict.booking}
      />

      <section className="section grid-dots">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <WaitingTimeBanner locale={locale} />
                <div className="mt-4 rounded-lg bg-white/80 p-4">
                  <p className="text-sm leading-6 text-ink/70">{labels.pickupNote}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{labels.delayNote}</p>
                </div>
              </div>

              <div className="rounded-lg border border-clay/60 bg-white/95 p-4 shadow-soft sm:p-6">
                <h3 className="mb-4 text-lg font-semibold">{labels.promiseTitle}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {labels.promises.map(([title, copy]) => (
                    <div key={title} className="rounded-lg border border-clay/40 bg-sand/50 p-4">
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-ink/60">{copy}</p>
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
