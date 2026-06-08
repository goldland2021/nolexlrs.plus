import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import GoogleTags from "@/components/GoogleTags";
import { siteName, siteUrl } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description:
    "nolexlrs provides Japan airport pickup and curated homestay support for travelers, families, and small groups.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="notranslate" translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <GoogleTags />
      </head>
      <body className={inter.className}>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
