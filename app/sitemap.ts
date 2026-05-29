import type { MetadataRoute } from "next";
import { cm2Missions } from "@/content/cm2";
import { cm2Subjects } from "@/content/cm2-subjects";
import { getAllCm2LessonPaths } from "@/content/cm2-learning-tree";
import { felixProjects } from "@/content/felix-missions";
import { learningPaths } from "@/content/learning-paths";
import { getElementaryPedagogicalPlaces } from "@/content/pedagogical-places";
import { ce1Level } from "@/content/levels/ce1";
import { ce2Level } from "@/content/levels/ce2";
import { cm1Level } from "@/content/levels/cm1";
import { getPublicStatusKey } from "@/content/public-status";
import { SITE_URL } from "@/content/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const cm2SubjectRoutes = cm2Subjects.map((subject) => ({
    url: `${SITE_URL}/primaire/cm2/matieres/${subject.slug}`,
    priority: 0.65,
  }));
  const cm2MissionRoutes = [...cm2Missions, ...felixProjects].map((mission) => ({
    url: `${SITE_URL}/primaire/cm2/missions/${mission.slug}`,
    priority: 0.6,
  }));
  const cm2LessonRoutes = getAllCm2LessonPaths().map((p) => ({
    url: `${SITE_URL}/primaire/cm2/matieres/${p.subjectSlug}/${p.domainId}/${p.subdomainId}/${p.lessonId}`,
    priority: 0.55,
  }));
  const cm2LearningPathRoutes = learningPaths
    .filter((path) => path.levelSlug === "cm2")
    .map((path) => ({
      url: `${SITE_URL}/parcours/${path.slug}`,
      priority: 0.6,
    }));
  const elementaryPlaceRoutes = getElementaryPedagogicalPlaces().map((place) => ({
    url: `${SITE_URL}/primaire/lieux/${place.slug}`,
    priority: 0.55,
  }));

  const ce1LessonRoutes = ce1Level.domains
    .flatMap((d) => d.subdomains)
    .flatMap((s) => s.lessons)
    .filter((l) => getPublicStatusKey(l.status) === "available")
    .map((l) => ({ url: `${SITE_URL}/primaire/ce1/lecons/${l.slug}`, priority: 0.55 }));

  const ce2LessonRoutes = ce2Level.domains
    .flatMap((d) => d.subdomains)
    .flatMap((s) => s.lessons)
    .filter((l) => getPublicStatusKey(l.status) === "available")
    .map((l) => ({ url: `${SITE_URL}/primaire/ce2/lecons/${l.slug}`, priority: 0.55 }));

  const cm1LessonRoutes = cm1Level.domains
    .flatMap((d) => d.subdomains)
    .flatMap((s) => s.lessons)
    .filter((l) => getPublicStatusKey(l.status) === "available")
    .map((l) => ({ url: `${SITE_URL}/primaire/cm1/lecons/${l.slug}`, priority: 0.55 }));

  return [
    { url: `${SITE_URL}/`, priority: 1.0 },
    { url: `${SITE_URL}/univers`, priority: 0.9 },
    { url: `${SITE_URL}/professeurs`, priority: 0.8 },
    { url: `${SITE_URL}/maternelle`, priority: 0.8 },
    { url: `${SITE_URL}/primaire`, priority: 0.8 },
    { url: `${SITE_URL}/primaire/lieux`, priority: 0.7 },
    ...elementaryPlaceRoutes,
    { url: `${SITE_URL}/primaire/ce1/lecons`, priority: 0.65 },
    ...ce1LessonRoutes,
    { url: `${SITE_URL}/primaire/ce2/lecons`, priority: 0.65 },
    ...ce2LessonRoutes,
    { url: `${SITE_URL}/primaire/cm1/lecons`, priority: 0.65 },
    ...cm1LessonRoutes,
    { url: `${SITE_URL}/primaire/cm2`, priority: 0.8 },
    { url: `${SITE_URL}/primaire/cm2/missions`, priority: 0.7 },
    { url: `${SITE_URL}/primaire/cm2/matieres`, priority: 0.7 },
    ...cm2SubjectRoutes,
    ...cm2LessonRoutes,
    { url: `${SITE_URL}/primaire/cm2/parcours`, priority: 0.6 },
    ...cm2MissionRoutes,
    ...cm2LearningPathRoutes,
    { url: `${SITE_URL}/college`, priority: 0.8 },
    { url: `${SITE_URL}/lycee`, priority: 0.8 },
    { url: `${SITE_URL}/carte`, priority: 0.8 },
    { url: `${SITE_URL}/missions-recentes`, priority: 0.7 },
    { url: `${SITE_URL}/ressources`, priority: 0.7 },
    { url: `${SITE_URL}/parcours`, priority: 0.7 },
  ];
}
