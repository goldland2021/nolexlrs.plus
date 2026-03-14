type ServicesProps = {
  title?: string;
  subtitle?: string;
  services: string[];
  itemNote?: string;
  locale?: string;
};

export default function Services({
  title = "Airport Transfer Services",
  subtitle = "Reliable, private transport with fixed pricing and meet-and-greet service.",
  services,
  itemNote = "Door-to-door, on time, and stress free.",
  locale = "en"
}: ServicesProps) {
  // 根据服务类型返回相应的等候时间说明
  const getWaitingTimeNote = (service: string) => {
    if (locale === "zh") {
      if (service.includes("机场 →") || service.includes("→ 机场")) {
        return "送机服务：免费等候30分钟";
      }
      if (service.includes("→ 酒店") || service.includes("酒店 →")) {
        return "接机服务：免费等候90分钟（从飞机降落算起）";
      }
    } else if (locale === "ja") {
      if (service.includes("空港 →") || service.includes("→ 空港")) {
        return "空港お見送り：30分無料待機";
      }
      if (service.includes("→ ホテル") || service.includes("ホテル →")) {
        return "空港お迎え：90分無料待機（飛行機着陸時から）";
      }
    } else {
      // English
      if (service.includes("Airport →") || service.includes("→ Airport")) {
        return "Drop-off service: 30 min free waiting";
      }
      if (service.includes("→ Hotel") || service.includes("Hotel →")) {
        return "Pickup service: 90 min free waiting (from flight landing)";
      }
    }
    return itemNote;
  };

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="card p-6">
              <p className="text-lg font-medium">{service}</p>
              <p className="mt-2 text-sm text-ink/60">{itemNote}</p>
              <p className="mt-1 text-xs text-ember font-medium">
                {getWaitingTimeNote(service)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}