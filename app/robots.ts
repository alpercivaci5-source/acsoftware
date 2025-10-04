import type { MetadataRoute } from "next";

export const runtime = "edge";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: "https://www.patientia.com.tr/sitemap.xml",
    host: "https://www.patientia.com.tr",
  };
}
