import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ChromeProvider } from "@/components/providers/ChromeProvider";
import { AdaptiveRoot } from "@/components/providers/AdaptiveRoot";
import { Loader } from "@/components/overlays/Loader";
import { MenuOverlay } from "@/components/overlays/MenuOverlay";
import { ContactModal } from "@/components/overlays/ContactModal";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE } from "@/lib/site";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "finance",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Payssenger — Pakistan's first offline bank",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: SITE.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={onest.variable}>
      <body>
        <StructuredData />
        <SmoothScroll>
          <ChromeProvider>
            <AdaptiveRoot />
            {children}
            <MenuOverlay />
            <ContactModal />
            <Loader />
          </ChromeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
