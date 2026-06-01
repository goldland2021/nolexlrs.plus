type WaitingTimeBannerProps = {
  locale?: string;
};

export default function WaitingTimeBanner({ locale = "en" }: WaitingTimeBannerProps) {
  const texts = {
    en: {
      title: "Free Waiting Time Policy",
      pickup: "Airport Pickup",
      pickupTime: "90 min free waiting",
      pickupNote: "from flight landing time",
      dropoff: "Airport Drop-off",
      dropoffTime: "30 min free waiting",
      note: "Transparent and fair service terms"
    },
    zh: {
      title: "免費等候時間政策",
      pickup: "機場接機",
      pickupTime: "90分鐘免費等候",
      pickupNote: "從飛機降落時間算起",
      dropoff: "機場送機",
      dropoffTime: "30分鐘免費等候",
      note: "透明公平的服務條款"
    },
    ja: {
      title: "無料待機時間ポリシー",
      pickup: "空港お迎え",
      pickupTime: "90分無料待機",
      pickupNote: "飛行機着陸時から",
      dropoff: "空港お見送り",
      dropoffTime: "30分無料待機",
      note: "透明で公平なサービス条件"
    }
  };

  const t = texts[locale as keyof typeof texts] || texts.en;

  return (
    <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-ink">{t.title}</h3>
          <p className="text-sm text-ink/60 mt-1">{t.note}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-ink">
              <span className="text-sm font-semibold text-champagne">90</span>
            </div>
            <div>
              <p className="font-medium text-sm">{t.pickup}</p>
              <p className="font-semibold text-celadon-deep">{t.pickupTime}</p>
              <p className="text-xs text-ink/50">{t.pickupNote}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-stay-stone">
              <span className="text-sm font-semibold text-champagne">30</span>
            </div>
            <div>
              <p className="font-medium text-sm">{t.dropoff}</p>
              <p className="font-semibold text-celadon-deep">{t.dropoffTime}</p>
              <p className="text-xs text-ink/50">{t.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
