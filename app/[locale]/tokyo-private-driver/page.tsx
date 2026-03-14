import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Vehicles from "@/components/Vehicles";
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
    title: dict.meta.driverTitle,
    description: dict.meta.homeDescription,
    keywords: dict.meta.keywords
  };
}

export default function PrivateDriverPage({ params }: { params: { locale: Locale } }) {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero
        title={dict.driver.heroTitle}
        subtitle={dict.driver.heroSubtitle}
        imageSrc="/images/tokyo-driver.jpg"
        imageAlt="Tokyo private driver service"
        ctaLabel={dict.hero.cta}
      />
      <Services
        title={dict.driver.servicesTitle}
        subtitle={dict.services.subtitle}
        services={dict.driver.services}
        itemNote={dict.services.itemNote}
      />
      <Vehicles
        title={dict.vehicles.title}
        subtitle={dict.vehicles.subtitle}
        vehicles={dict.vehicles.items}
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