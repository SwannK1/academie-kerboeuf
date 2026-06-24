import type { MetadataRoute } from "next";
import { cm2Missions } from "@/content/cm2";
import { cm2Subjects } from "@/content/cm2-subjects";
import { getAllCm2LessonPaths } from "@/content/cm2-learning-tree";
import { felixProjects } from "@/content/felix-missions";
import { learningPaths } from "@/content/learning-paths";
import { getElementaryPedagogicalPlaces } from "@/content/pedagogical-places";
import { ce1Subjects } from "@/content/ce1-subjects";
import { cm1Subjects } from "@/content/cm1-subjects";

const BASE_URL = "https://academie-kerboeuf.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const cm2SubjectRoutes = cm2Subjects.map((subject) => ({
    url: `${BASE_URL}/primaire/cm2/matieres/${subject.slug}`,
    priority: 0.65,
  }));
  const cm2MissionRoutes = [...cm2Missions, ...felixProjects].map((mission) => ({
    url: `${BASE_URL}/primaire/cm2/missions/${mission.slug}`,
    priority: 0.6,
  }));
  const cm2LessonRoutes = getAllCm2LessonPaths().map((p) => ({
    url: `${BASE_URL}/primaire/cm2/matieres/${p.subjectSlug}/${p.domainId}/${p.subdomainId}/${p.lessonId}`,
    priority: 0.55,
  }));
  const cm2LearningPathRoutes = learningPaths
    .filter((path) => path.levelSlug === "cm2")
    .map((path) => ({
      url: `${BASE_URL}/parcours/${path.slug}`,
      priority: 0.6,
    }));
  const elementaryPlaceRoutes = getElementaryPedagogicalPlaces().map((place) => ({
    url: `${BASE_URL}/primaire/lieux/${place.slug}`,
    priority: 0.55,
  }));

  const ce1MatieresRoutes = ce1Subjects.map((s) => ({
    url: `${BASE_URL}/primaire/ce1/matieres/${s.slug}`,
    priority: 0.65,
  }));

  const cm1MatieresRoutes = cm1Subjects.map((s) => ({
    url: `${BASE_URL}/primaire/cm1/matieres/${s.slug}`,
    priority: 0.65,
  }));

  return [
    { url: `${BASE_URL}/`, priority: 1.0 },
    { url: `${BASE_URL}/univers`, priority: 0.9 },
    { url: `${BASE_URL}/personnages`, priority: 0.85 },
    { url: `${BASE_URL}/personnages/eleves`, priority: 0.8 },
    { url: `${BASE_URL}/personnages/professeurs`, priority: 0.8 },
    { url: `${BASE_URL}/methode`, priority: 0.8 },
    { url: `${BASE_URL}/programmation`, priority: 0.85 },
    { url: `${BASE_URL}/enseignants`, priority: 0.75 },
    { url: `${BASE_URL}/professeurs`, priority: 0.8 },
    { url: `${BASE_URL}/maternelle`, priority: 0.8 },
    { url: `${BASE_URL}/primaire`, priority: 0.8 },
    { url: `${BASE_URL}/primaire/lieux`, priority: 0.7 },
    ...elementaryPlaceRoutes,
    { url: `${BASE_URL}/primaire/ce1/matieres`, priority: 0.7 },
    ...ce1MatieresRoutes,
    { url: `${BASE_URL}/primaire/ce1/programmes/francais/etude-de-la-langue`, priority: 0.55 },
    { url: `${BASE_URL}/primaire/ce2/programmes/mathematiques/nombres-calcul`, priority: 0.55 },
    { url: `${BASE_URL}/primaire/cm1/matieres`, priority: 0.7 },
    ...cm1MatieresRoutes,
    { url: `${BASE_URL}/primaire/cm2`, priority: 0.8 },
    { url: `${BASE_URL}/primaire/cm2/missions`, priority: 0.7 },
    { url: `${BASE_URL}/primaire/cm2/matieres`, priority: 0.7 },
    ...cm2SubjectRoutes,
    ...cm2LessonRoutes,
    { url: `${BASE_URL}/primaire/cm2/parcours`, priority: 0.6 },
    ...cm2MissionRoutes,
    ...cm2LearningPathRoutes,
    { url: `${BASE_URL}/college`, priority: 0.8 },
    { url: `${BASE_URL}/lycee`, priority: 0.8 },
    { url: `${BASE_URL}/carte`, priority: 0.8 },
    { url: `${BASE_URL}/missions-recentes`, priority: 0.7 },
    { url: `${BASE_URL}/ressources`, priority: 0.7 },
    { url: `${BASE_URL}/parcours`, priority: 0.7 },
    { url: `${BASE_URL}/programmes`, priority: 0.7 },
    { url: `${BASE_URL}/eleves`, priority: 0.6 },
  ];
}
