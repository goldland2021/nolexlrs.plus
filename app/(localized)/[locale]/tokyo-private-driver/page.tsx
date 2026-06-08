import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Vehicles from "@/components/Vehicles";
import Booking from "@/components/Booking";
import SeoContent from "@/components/SeoContent";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import {
  breadcrumbHomeName,
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
  serviceJsonLd,
  serviceJsonLdProfiles
} from "@/lib/seo";
import { serviceSeoContent } from "@/lib/seo-content";

type LocaleParams = Promise<{ locale: string }>;

export async function generateMetadata({
  params
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/tokyo-private-driver",
    title: dict.meta.driverTitle,
    description: dict.meta.driverDescription,
    keywords: dict.meta.keywords,
    image: "/images/pickupjp/pickupjp-alphard-black-coastal-road-day-trip.jpg"
  });
}

export default async function PrivateDriverPage({ params }: { params: LocaleParams }) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);
  const seoContent = serviceSeoContent[locale].tokyoPrivateDriver;

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
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: breadcrumbHomeName(locale) },
              { name: dict.driver.heroTitle, path: "/tokyo-private-driver" }
            ])
          )
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(
              locale,
              dict.driver.heroTitle,
              dict.meta.driverDescription,
              "/tokyo-private-driver",
              serviceJsonLdProfiles.tokyoPrivateDriver
            )
          )
        }}
      />
      <Hero
        title={dict.driver.heroTitle}
        subtitle={dict.driver.heroSubtitle}
        imageSrc="/images/pickupjp/pickupjp-alphard-black-coastal-road-day-trip.jpg"
        imageAlt="Tokyo private driver service"
        ctaLabel={dict.hero.cta}
        locale={locale}
        citySlug="tokyo"
      />
      <Services
        title={dict.driver.servicesTitle}
        subtitle={dict.services.subtitle}
        services={dict.driver.services}
        itemNote={dict.services.itemNote}
        locale={locale}
      />
      <SeoContent locale={locale} content={seoContent} />
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
