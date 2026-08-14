import { SITE, SOCIAL_LINKS } from "@/lib/site";

/**
 * JSON-LD structured data: Organization + WebSite + the offline-banking
 * service, so search engines and AI crawlers understand what Payssenger is.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/icon-512.png`,
        image: `${SITE.url}${SITE.ogImage}`,
        description: SITE.description,
        email: SITE.email,
        telephone: SITE.phone,
        areaServed: { "@type": "Country", name: "Pakistan" },
        sameAs: SOCIAL_LINKS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en",
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/#service`,
        serviceType: "Offline digital banking",
        name: "Payssenger offline banking",
        description:
          "Send money, pay bills and buy airtime anywhere in Pakistan — even with no internet or signal.",
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: { "@type": "Country", name: "Pakistan" },
        audience: { "@type": "Audience", audienceType: "Bank customers" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, static content generated from SITE config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
