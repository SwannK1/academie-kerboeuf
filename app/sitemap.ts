import type { MetadataRoute } from "next";
import { cm2Subjects } from "@/content/cm2-subjects";
import { cpSubjects } from "@/content/cp-subjects";
import { ce1Subjects } from "@/content/ce1-subjects";
import { ce2Subjects } from "@/content/ce2-subjects";
import { cm1Subjects } from "@/content/cm1-subjects";
import { publishedSubdomainPages } from "@/content/levels/published-subdomain-pages";
import { PROCEDURES } from "@/content/direction/catalog";
import { getAbsoluteUrl } from "@/content/seo";

const legalRoutes = [
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/cookies",
  "/contact",
  "/plan-du-site",
];

/**
 * Seules les routes vivantes sont listées. Les routes archivées (univers,
 * personnages, lycée, anciens outils) redirigent : voir next.config.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const subjectRoutes = [
    ...cpSubjects.map((s) => `/primaire/cp/matieres/${s.slug}`),
    ...ce1Subjects.map((s) => `/primaire/ce1/matieres/${s.slug}`),
    ...ce2Subjects.map((s) => `/primaire/ce2/matieres/${s.slug}`),
    ...cm1Subjects.map((s) => `/primaire/cm1/matieres/${s.slug}`),
    ...cm2Subjects.map((s) => `/primaire/cm2/matieres/${s.slug}`),
  ].map((path) => ({ url: getAbsoluteUrl(path), priority: 0.6 }));

  return [
    { url: getAbsoluteUrl("/"), priority: 1.0 },
    { url: getAbsoluteUrl("/ressources"), priority: 0.95 },
    { url: getAbsoluteUrl("/enseigner"), priority: 0.9 },
    { url: getAbsoluteUrl("/enseigner/semaine"), priority: 0.85 },
    { url: getAbsoluteUrl("/enseigner/annee"), priority: 0.8 },
    { url: getAbsoluteUrl("/enseigner/classe"), priority: 0.75 },
    { url: getAbsoluteUrl("/direction"), priority: 0.9 },
    { url: getAbsoluteUrl("/direction/reunions"), priority: 0.8 },
    { url: getAbsoluteUrl("/direction/demarches"), priority: 0.8 },
    ...PROCEDURES.map((p) => ({ url: getAbsoluteUrl(`/direction/demarches/${p.id}`), priority: 0.7 })),
    { url: getAbsoluteUrl("/maternelle"), priority: 0.7 },
    { url: getAbsoluteUrl("/primaire"), priority: 0.7 },
    { url: getAbsoluteUrl("/college"), priority: 0.7 },
    { url: getAbsoluteUrl("/methode"), priority: 0.5 },
    ...subjectRoutes,
    ...publishedSubdomainPages.map((page) => ({ url: getAbsoluteUrl(page.route), priority: 0.55 })),
    ...legalRoutes.map((href) => ({ url: getAbsoluteUrl(href), priority: 0.3 })),
  ];
}
