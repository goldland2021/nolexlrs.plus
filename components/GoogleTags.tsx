import Script from "next/script";
import { googleTagIds, primaryGoogleTagId } from "@/lib/analytics";

export default function GoogleTags() {
  if (!primaryGoogleTagId) return null;

  const configLines = googleTagIds
    .map((id) => {
      const options = id.startsWith("G-") ? ", { send_page_view: false }" : "";

      return `gtag('config', ${JSON.stringify(id)}${options});`;
    })
    .join("\n");

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryGoogleTagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tags" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configLines}
        `}
      </Script>
    </>
  );
}
