import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TokyoRoamingDemo from "@/components/TokyoRoamingDemo";
import { isLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type LocaleParams = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";

  return buildPageMetadata({
    locale,
    path: "/tokyo-roaming",
    title: "Tokyo Roaming VIP Pickup Credit | pickupjp.com",
    description:
      "Play a short Tokyo arrival preview and unlock a JPY 2,000 VIP pickup credit for private airport transfer.",
    keywords: [
      "Tokyo Roaming",
      "Tokyo airport pickup reward",
      "VIP pickup credit",
      "Tokyo airport transfer",
      "Toyota Alphard airport pickup"
    ],
    image: "/images/pickupjp/pickupjp-alphard-black-open-door-luxury-seat.jpg"
  });
}

export default async function TokyoRoamingPage({ params }: { params: LocaleParams }) {
  const { locale: requestedLocale } = await params;
  if (!isLocale(requestedLocale)) notFound();

  return <TokyoRoamingDemo locale={requestedLocale} />;
}
