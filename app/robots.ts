import type { MetadataRoute } from "next";

// TODO: remplacer par le domaine réel avant mise en production
const BASE_URL = "https://academie-kerboeuf.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
