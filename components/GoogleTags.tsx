import Script from "next/script";
import { gaMeasurementId } from "@/lib/analytics";

export default function GoogleTags() {
  if (!gaMeasurementId) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tags" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(gaMeasurementId)}, { send_page_view: false });
        `}
      </Script>
    </>
  );
}
