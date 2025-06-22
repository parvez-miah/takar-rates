import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ajkertakarrate.com"

  const currencyPairs = [
    "usd-to-bdt",
    "eur-to-bdt",
    "gbp-to-bdt",
    "inr-to-bdt",
    "sar-to-bdt",
    "aed-to-bdt",
    "jpy-to-bdt",
    "cad-to-bdt",
    "aud-to-bdt",
    "chf-to-bdt",
  ]

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]

  const currencyPages = currencyPairs.map((pair) => ({
    url: `${baseUrl}/${pair}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.9,
  }))

  return [...staticPages, ...currencyPages]
}
