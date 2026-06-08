import { Inter } from "next/font/google";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Footer from "@/components/Footer";
import GoogleTags from "@/components/GoogleTags";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ServiceTabs from "@/components/ServiceTabs";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata, htmlLanguages } from "@/lib/seo";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

type LocaleParams = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";

  return (
    <html lang={htmlLanguages[locale]} className="notranslate" translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <GoogleTags />
      </head>
      <body className={inter.className}>
        <AnalyticsTracker />
        <ServiceTabs />
        <div className="pt-14">{children}</div>
        <Footer locale={locale} />
        <WhatsAppButton />
        <LanguageSwitcher />
      </body>
    </html>
  );
}
