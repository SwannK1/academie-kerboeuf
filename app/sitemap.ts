import type { MetadataRoute } from "next";

const staticRoutes: Array<{ path: string; priority: number }> = [
  { path: "/",            priority: 1.0 },
  { path: "/maternelle",  priority: 0.9 },
  { path: "/primaire",    priority: 0.9 },
  { path: "/college",     priority: 0.9 },
  { path: "/lycee",       priority: 0.9 },
  { path: "/professeurs", priority: 0.8 },
  { path: "/ressources",  priority: 0.8 },
  { path: "/programmes",  priority: 0.7 },
  { path: "/parcours",    priority: 0.7 },
  { path: "/univers",     priority: 0.6 },
  { path: "/contact",     priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `https://academie-kerboeuf.fr${route.path}`,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
