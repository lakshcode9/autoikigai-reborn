import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://autoikigai.space";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-05-18"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: new Date("2026-05-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offer`,
      lastModified: new Date("2026-05-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
