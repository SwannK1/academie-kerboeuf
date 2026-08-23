import type { MetadataRoute } from "next";
import { cm2Missions } from "@/content/cm2";
import { cm2Subjects } from "@/content/cm2-subjects";
import { felixProjects } from "@/content/felix-missions";
import { learningPaths } from "@/content/learning-paths";
import { getElementaryPedagogicalPlaces } from "@/content/pedagogical-places";
import { cpSubjects } from "@/content/cp-subjects";
import { ce1Subjects } from "@/content/ce1-subjects";
import { ce2Subjects } from "@/content/ce2-subjects";
import { cm1Subjects } from "@/content/cm1-subjects";
import { publishedSubdomainPages } from "@/content/levels/published-subdomain-pages";
import { getAbsoluteUrl } from "@/content/seo";

const legalRoutes = [
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/cookies",
  "/contact",
  "/plan-du-site",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const cpMatieresRoutes = cpSubjects.map((subject) => ({
    url: getAbsoluteUrl(`/primaire/cp/matieres/${subject.slug}`),
    priority: 0.65,
  }));
  const ce1MatieresRoutes = ce1Subjects.map((subject) => ({
    url: getAbsoluteUrl(`/primaire/ce1/matieres/${subject.slug}`),
    priority: 0.65,
  }));
  const ce2MatieresRoutes = ce2Subjects.map((subject) => ({
    url: getAbsoluteUrl(`/primaire/ce2/matieres/${subject.slug}`),
    priority: 0.65,
  }));
  const cm1MatieresRoutes = cm1Subjects.map((subject) => ({
    url: getAbsoluteUrl(`/primaire/cm1/matieres/${subject.slug}`),
    priority: 0.65,
  }));
  const cm2SubjectRoutes = cm2Subjects.map((subject) => ({
    url: getAbsoluteUrl(`/primaire/cm2/matieres/${subject.slug}`),
    priority: 0.65,
  }));
  const cm2MissionRoutes = [...cm2Missions, ...felixProjects].map((mission) => ({
    url: getAbsoluteUrl(`/primaire/cm2/missions/${mission.slug}`),
    priority: 0.6,
  }));
  const cm2LearningPathRoutes = learningPaths
    .filter((path) => path.levelSlug === "cm2")
    .map((path) => ({
      url: getAbsoluteUrl(`/parcours/${path.slug}`),
      priority: 0.6,
    }));
  const elementaryPlaceRoutes = getElementaryPedagogicalPlaces().map((place) => ({
    url: getAbsoluteUrl(`/primaire/lieux/${place.slug}`),
    priority: 0.55,
  }));
  const publishedSubdomainRoutes = publishedSubdomainPages.map((page) => ({
    url: getAbsoluteUrl(page.route),
    priority: 0.55,
  }));
  const legalSitemapRoutes = legalRoutes.map((href) => ({
    url: getAbsoluteUrl(href),
    priority: 0.35,
  }));
  return [
    { url: getAbsoluteUrl("/"), priority: 1.0 },
    { url: getAbsoluteUrl("/univers"), priority: 0.9 },
    { url: getAbsoluteUrl("/personnages"), priority: 0.85 },
    { url: getAbsoluteUrl("/personnages/eleves"), priority: 0.8 },
    { url: getAbsoluteUrl("/personnages/professeurs"), priority: 0.8 },
    { url: getAbsoluteUrl("/methode"), priority: 0.8 },
    { url: getAbsoluteUrl("/programmation"), priority: 0.85 },
    { url: getAbsoluteUrl("/enseignants"), priority: 0.75 },
    { url: getAbsoluteUrl("/professeurs"), priority: 0.8 },
    { url: getAbsoluteUrl("/maternelle"), priority: 0.8 },
    { url: getAbsoluteUrl("/primaire"), priority: 0.8 },
    { url: getAbsoluteUrl("/primaire/lieux"), priority: 0.7 },
    ...elementaryPlaceRoutes,
    { url: getAbsoluteUrl("/primaire/cp/matieres"), priority: 0.7 },
    ...cpMatieresRoutes,
    { url: getAbsoluteUrl("/primaire/ce1/matieres"), priority: 0.7 },
    ...ce1MatieresRoutes,
    { url: getAbsoluteUrl("/primaire/ce2/matieres"), priority: 0.7 },
    ...ce2MatieresRoutes,
    { url: getAbsoluteUrl("/primaire/cm1/matieres"), priority: 0.7 },
    ...cm1MatieresRoutes,
    { url: getAbsoluteUrl("/primaire/cm2"), priority: 0.8 },
    { url: getAbsoluteUrl("/primaire/cm2/missions"), priority: 0.7 },
    { url: getAbsoluteUrl("/primaire/cm2/matieres"), priority: 0.7 },
    ...cm2SubjectRoutes,
    { url: getAbsoluteUrl("/primaire/cm2/parcours"), priority: 0.6 },
    ...cm2MissionRoutes,
    ...cm2LearningPathRoutes,
    ...publishedSubdomainRoutes,
    { url: getAbsoluteUrl("/college"), priority: 0.8 },
    { url: getAbsoluteUrl("/lycee"), priority: 0.8 },
    { url: getAbsoluteUrl("/carte"), priority: 0.8 },
    { url: getAbsoluteUrl("/missions-recentes"), priority: 0.7 },
    { url: getAbsoluteUrl("/ressources"), priority: 0.7 },
    { url: getAbsoluteUrl("/parcours"), priority: 0.7 },
    { url: getAbsoluteUrl("/programmes"), priority: 0.7 },
    { url: getAbsoluteUrl("/eleves"), priority: 0.6 },
    ...legalSitemapRoutes,
  ];
}
