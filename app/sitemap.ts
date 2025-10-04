import type { MetadataRoute } from "next";

export const runtime = "edge";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.patientia.com.tr";
  const currentDate = new Date();

  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
    alternates: {
      languages: {
        tr: `${baseUrl}${route}`,
        en: `${baseUrl}/en${route}`,
      },
    },
  })) as MetadataRoute.Sitemap;
}
