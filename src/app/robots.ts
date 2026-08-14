import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt — open the whole site to search engines and to AI/LLM crawlers
 * (AIO), and point them at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  // Named AI/LLM user-agents we explicitly welcome, alongside the wildcard.
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "Google-Extended",
    "PerplexityBot",
    "Perplexity-User",
    "Applebot",
    "Applebot-Extended",
    "CCBot",
    "Amazonbot",
    "Bytespider",
    "cohere-ai",
    "Meta-ExternalAgent",
    "DuckAssistBot",
    "YouBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
