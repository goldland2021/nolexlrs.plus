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
      title: "免费等候时间政策",
      pickup: "机场接机",
      pickupTime: "90分钟免费等候",
      pickupNote: "从飞机降落时间算起",
      dropoff: "机场送机",
      dropoffTime: "30分钟免费等候",
      note: "透明公平的服务条款"
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
    <div className="bg-gradient-to-r from-ember/5 to-dusk/30 border border-clay/40 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-ink">{t.title}</h3>
          <p className="text-sm text-ink/60 mt-1">{t.note}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center">
              <span className="text-ember text-lg">🛬</span>
            </div>
            <div>
              <p className="font-medium text-sm">{t.pickup}</p>
              <p className="text-ember font-semibold">{t.pickupTime}</p>
              <p className="text-xs text-ink/50">{t.pickupNote}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center">
              <span className="text-ember text-lg">🛫</span>
            </div>
            <div>
              <p className="font-medium text-sm">{t.dropoff}</p>
              <p className="text-ember font-semibold">{t.dropoffTime}</p>
              <p className="text-xs text-ink/50">{t.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}