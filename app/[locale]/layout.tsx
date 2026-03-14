import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.meta.homeTitle,
      template: "%s | Tokyo Airport Transfer"
    },
    description: dict.meta.homeDescription,
    keywords: dict.meta.keywords
  };
}

export default function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
      <WhatsAppButton />
      <LanguageSwitcher />
    </>
  );
}