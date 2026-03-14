import Image from "next/image";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";

type HeroProps = {
  title: string;
  subtitle: string;
  features?: string[];
  imageSrc: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaMessage?: string;
};

export default function Hero({
  title,
  subtitle,
  features = [],
  imageSrc,
  imageAlt,
  ctaLabel = "Get Quote on WhatsApp",
  ctaMessage = defaultWhatsAppMessage
}: HeroProps) {
  const href = buildWhatsAppLink(ctaMessage);

  return (
    <section className="section fancy-bg">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="badge">Tokyo Airport Transfer</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl">
              {subtitle}
            </p>
            {features.length > 0 && (
              <ul className="grid gap-3 md:grid-cols-2 text-ink/80">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-4">
              <a
                href={href}
                className="inline-flex items-center justify-center rounded-full bg-ember px-6 py-3 text-white shadow-lift transition hover:translate-y-[-2px]"
                target="_blank"
                rel="noreferrer"
              >
                {ctaLabel}
              </a>
              <span className="badge">Instant response on WhatsApp</span>
            </div>
          </div>
          <div className="relative reveal">
            <div className="absolute -inset-6 rounded-[32px] bg-dusk/70 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-clay/60 shadow-soft">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={720}
                height={520}
                className="h-[360px] w-full object-cover md:h-[420px] image-warm"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
