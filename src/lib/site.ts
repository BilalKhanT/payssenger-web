/**
 * Canonical site configuration used across metadata, sitemap, robots,
 * manifest and structured data. Override the URL with NEXT_PUBLIC_SITE_URL.
 */
export const SITE = {
  name: "Payssenger",
  shortName: "Payssenger",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://payssenger.com").replace(
    /\/$/,
    ""
  ),
  title: "Payssenger — Pakistan's first offline bank",
  description:
    "Payssenger is Pakistan's first offline bank. Send money, pay bills and top up anywhere — even with no internet or signal. Banking that reaches everyone.",
  tagline: "Banking that works anywhere — even with no internet or signal.",
  locale: "en_PK",
  email: "hello@payssenger.com",
  phone: "+92 21 111 00 00 00",
  ogImage: "/og.jpg",
  themeColor: "#0f2f63",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-ZG54DCHWEV",
  social: {
    instagram: "https://instagram.com/payssenger",
    x: "https://x.com/payssenger",
    youtube: "https://youtube.com/@payssenger",
    linkedin: "https://linkedin.com/company/payssenger",
  },
  keywords: [
    "offline banking",
    "offline bank Pakistan",
    "Pakistan's first offline bank",
    "banking without internet",
    "banking without signal",
    "send money offline",
    "pay bills offline",
    "mobile banking Pakistan",
    "Payssenger",
    "fintech Pakistan",
    "financial inclusion",
  ],
} as const;

export const SOCIAL_LINKS = Object.values(SITE.social);
