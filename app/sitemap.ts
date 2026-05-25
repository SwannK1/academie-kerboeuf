import type { MetadataRoute } from "next";
import { publicPages, siteUrl } from "@/content/restaurant-info";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map((page) => ({
    url: `${siteUrl}${page.path === "/" ? "" : page.path}`,
    changeFrequency: "weekly",
    priority: page.priority,
  }));
}
