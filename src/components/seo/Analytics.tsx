import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Google Analytics (gtag.js). Loaded once for the whole app via the root
 * layout. Renders nothing when no measurement ID is configured.
 */
export function Analytics() {
  const gaId = SITE.gaId;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
