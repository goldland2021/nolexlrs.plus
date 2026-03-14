import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Vehicles from "@/components/Vehicles";
import Reviews from "@/components/Reviews";
import Booking from "@/components/Booking";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    keywords: dict.meta.keywords
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        features={dict.hero.features}
        imageSrc="/images/tokyo-airport-transfer.jpg"
        imageAlt={dict.hero.imageAlt}
        ctaLabel={dict.hero.cta}
      />
      <Services
        title={dict.services.title}
        subtitle={dict.services.subtitle}
        services={dict.services.items}
        itemNote={dict.services.itemNote}
      />
      <Pricing
        title={dict.pricing.title}
        subtitle={dict.pricing.subtitle}
        items={dict.pricing.items}
        itemNote={dict.pricing.itemNote}
      />
      <Vehicles
        title={dict.vehicles.title}
        subtitle={dict.vehicles.subtitle}
        vehicles={dict.vehicles.items}
      />
      <Reviews
        title={dict.reviews.title}
        subtitle={dict.reviews.subtitle}
        reviews={dict.reviews.items}
      />
      <Booking
        title={dict.booking.title}
        subtitle={dict.booking.subtitle}
        fields={dict.booking.fields}
        placeholders={dict.booking.placeholders}
        buttonLabel={dict.booking.button}
        messageHeader={dict.booking.messageHeader}
      />
    </main>
  );
}