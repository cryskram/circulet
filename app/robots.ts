import { MetadataRoute } from "next";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/items", "/requests", "/about", "/guidelines"],
        disallow: [
          "/api",
          "/new",
          "/profile",
          "/onboarding",
          "/login",
          "/requests/new",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
