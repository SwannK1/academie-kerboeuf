import type { MetadataRoute } from "next";
import {
  getAcademyMission,
  getAcademyMissionParams,
  getLevelsByStage,
  isMissionPubliclyAvailable,
} from "@/content/academy";
import { cm2Missions } from "@/content/cm2";
import { cm2Subjects } from "@/content/cm2-subjects";
import { getAllCm2LessonPaths } from "@/content/cm2-learning-tree";
import { felixProjects } from "@/content/felix-missions";
import { learningPaths } from "@/content/learning-paths";
import { getElementaryPedagogicalPlaces } from "@/content/pedagogical-places";
import { ce1Subjects } from "@/content/ce1-subjects";
import { ce2Subjects } from "@/content/ce2-subjects";
import { cm1Subjects } from "@/content/cm1-subjects";
import { cpSubjects } from "@/content/cp-subjects";
import { getAllProfessorSlugs } from "@/content/professors";
import { getAllStudentSlugs } from "@/content/students";
import { publishedSubdomainPages } from "@/content/levels/published-subdomain-pages";
import { BASE_URL } from "@/lib/seo";

// Niveaux primaire desservis par la route générique app/primaire/[level] et non
// par une page dédiée (ce1 et cm2 ont leur propre app/primaire/{level}/page.tsx).
const PRIMARY_GENERIC_LEVEL_SLUGS = ["cp", "ce1", "ce2", "cm1"] as const;

const ENSEIGNANTS_ROUTES = [
  "affichages",
  "apc",
  "ateliers",
  "bibliotheque-classe",
  "cahier-journal",
  "calendrier",
  "communications",
  "conseil-ecole",
  "conseils-cycle",
  "dossier-remplacant",
  "emploi-du-temps",
  "evaluations",
  "fin-periode",
  "formations",
  "liaison-cm2-6e",
  "materiel-classe",
  "modeles",
  "organisation",
  "organisation-classe",
  "photocopies",
  "preparer-une-seance",
  "programmation",
  "programmation/annuelle",
  "progression",
  "projets-sorties",
  "rendez-vous",
  "rituels",
  "sauvegardes",
];

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
  const learningPathRoutes = learningPaths.map((path) => ({
    url: `${BASE_URL}/parcours/${path.slug}`,
    priority: path.levelSlug === "cm2" ? 0.6 : 0.55,
  }));
  const elementaryPlaceRoutes = getElementaryPedagogicalPlaces().map((place) => ({
    url: `${BASE_URL}/primaire/lieux/${place.slug}`,
    priority: 0.55,
  }));

  const ce1MatieresRoutes = ce1Subjects.map((s) => ({
    url: `${BASE_URL}/primaire/ce1/matieres/${s.slug}`,
    priority: 0.65,
  }));
  const ce2MatieresRoutes = ce2Subjects.map((s) => ({
    url: `${BASE_URL}/primaire/ce2/matieres/${s.slug}`,
    priority: 0.65,
  }));
  const cm1MatieresRoutes = cm1Subjects.map((s) => ({
    url: `${BASE_URL}/primaire/cm1/matieres/${s.slug}`,
    priority: 0.65,
  }));
  const cpMatieresRoutes = cpSubjects.map((s) => ({
    url: `${BASE_URL}/primaire/cp/matieres/${s.slug}`,
    priority: 0.65,
  }));

  const primaryGenericLevelRoutes = PRIMARY_GENERIC_LEVEL_SLUGS.flatMap((level) => [
    { url: `${BASE_URL}/primaire/${level}`, priority: 0.75 },
    { url: `${BASE_URL}/primaire/${level}/missions`, priority: 0.65 },
    { url: `${BASE_URL}/primaire/${level}/competences`, priority: 0.6 },
    { url: `${BASE_URL}/primaire/${level}/programme`, priority: 0.6 },
  ]);

  const publishedSubdomainRoutes = publishedSubdomainPages.map((page) => ({
    url: `${BASE_URL}/primaire/${page.level}/programmes/${page.domain}/${page.subdomain}`,
    priority: 0.55,
  }));

  const professorRoutes = getAllProfessorSlugs().map(({ slug }) => ({
    url: `${BASE_URL}/professeurs/${slug}`,
    priority: 0.55,
  }));
  const studentRoutes = getAllStudentSlugs().map(({ slug }) => ({
    url: `${BASE_URL}/eleves/${slug}`,
    priority: 0.55,
  }));

  const collegeLevelRoutes = getLevelsByStage("college").map((level) => ({
    url: `${BASE_URL}/college/${level.slug}`,
    priority: 0.7,
  }));

  const lyceeLevelRoutes = getLevelsByStage("lycee").map((level) => ({
    url: `${BASE_URL}/lycee/${level.slug}`,
    priority: 0.7,
  }));
  const lyceeMissionsHubRoutes = getLevelsByStage("lycee").map((level) => ({
    url: `${BASE_URL}/lycee/${level.slug}/missions`,
    priority: 0.6,
  }));
  const lyceeMissionRoutes = getAcademyMissionParams("lycee")
    .filter(({ level, slug }) => {
      const found = getAcademyMission("lycee", level, slug);
      return found ? isMissionPubliclyAvailable(found.mission) : false;
    })
    .map(({ level, slug }) => ({
      url: `${BASE_URL}/lycee/${level}/missions/${slug}`,
      priority: 0.55,
    }));

  const enseignantsRoutes = ENSEIGNANTS_ROUTES.map((route) => ({
    url: `${BASE_URL}/enseignants/${route}`,
    priority: 0.5,
  }));

  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, priority: 1.0 },
    { url: `${BASE_URL}/univers`, priority: 0.9 },
    { url: `${BASE_URL}/univers/cartotheque`, priority: 0.6 },
    { url: `${BASE_URL}/univers/lieux`, priority: 0.6 },
    { url: `${BASE_URL}/personnages`, priority: 0.85 },
    { url: `${BASE_URL}/personnages/eleves`, priority: 0.8 },
    { url: `${BASE_URL}/methode`, priority: 0.8 },
    { url: `${BASE_URL}/programmation`, priority: 0.85 },
    { url: `${BASE_URL}/enseignants`, priority: 0.75 },
    ...enseignantsRoutes,
    { url: `${BASE_URL}/professeurs`, priority: 0.8 },
    ...professorRoutes,
    { url: `${BASE_URL}/eleves`, priority: 0.6 },
    ...studentRoutes,
    { url: `${BASE_URL}/maternelle`, priority: 0.8 },
    { url: `${BASE_URL}/maternelle/ps`, priority: 0.65 },
    { url: `${BASE_URL}/maternelle/ms`, priority: 0.65 },
    { url: `${BASE_URL}/maternelle/gs`, priority: 0.65 },
    { url: `${BASE_URL}/maternelle/ressources`, priority: 0.6 },
    { url: `${BASE_URL}/primaire`, priority: 0.8 },
    { url: `${BASE_URL}/primaire/professeurs`, priority: 0.6 },
    { url: `${BASE_URL}/primaire/ressources`, priority: 0.6 },
    { url: `${BASE_URL}/primaire/lieux`, priority: 0.7 },
    ...elementaryPlaceRoutes,
    ...primaryGenericLevelRoutes,
    ...publishedSubdomainRoutes,
    { url: `${BASE_URL}/primaire/cp/matieres`, priority: 0.7 },
    ...cpMatieresRoutes,
    { url: `${BASE_URL}/primaire/ce1/matieres`, priority: 0.7 },
    ...ce1MatieresRoutes,
    { url: `${BASE_URL}/primaire/ce2/matieres`, priority: 0.7 },
    ...ce2MatieresRoutes,
    { url: `${BASE_URL}/primaire/cm1/matieres`, priority: 0.7 },
    ...cm1MatieresRoutes,
    { url: `${BASE_URL}/primaire/cm2`, priority: 0.8 },
    { url: `${BASE_URL}/primaire/cm2/missions`, priority: 0.7 },
    { url: `${BASE_URL}/primaire/cm2/matieres`, priority: 0.7 },
    ...cm2SubjectRoutes,
    ...cm2LessonRoutes,
    { url: `${BASE_URL}/primaire/cm2/parcours`, priority: 0.6 },
    { url: `${BASE_URL}/primaire/cm2/sequences`, priority: 0.55 },
    ...cm2MissionRoutes,
    { url: `${BASE_URL}/college`, priority: 0.8 },
    ...collegeLevelRoutes,
    { url: `${BASE_URL}/college/6e/methodes`, priority: 0.6 },
    { url: `${BASE_URL}/college/6e/ressources`, priority: 0.6 },
    { url: `${BASE_URL}/college/6e/reussir-son-entree-en-6e`, priority: 0.6 },
    { url: `${BASE_URL}/lycee`, priority: 0.8 },
    ...lyceeLevelRoutes,
    ...lyceeMissionsHubRoutes,
    ...lyceeMissionRoutes,
    { url: `${BASE_URL}/lycee/seconde/ressources`, priority: 0.6 },
    { url: `${BASE_URL}/carte`, priority: 0.8 },
    { url: `${BASE_URL}/missions-recentes`, priority: 0.7 },
    { url: `${BASE_URL}/ressources`, priority: 0.7 },
    { url: `${BASE_URL}/ressources/imprimables`, priority: 0.6 },
    { url: `${BASE_URL}/ressources/methodologie`, priority: 0.6 },
    { url: `${BASE_URL}/parcours`, priority: 0.7 },
    { url: `${BASE_URL}/parcours/methodes-pour-apprendre`, priority: 0.6 },
    { url: `${BASE_URL}/parcours/reussir-entree-sixieme`, priority: 0.6 },
    ...learningPathRoutes,
    { url: `${BASE_URL}/programmes`, priority: 0.7 },
    { url: `${BASE_URL}/programmes/progression-primaire`, priority: 0.6 },
  ];

  const seen = new Set<string>();
  return routes.filter((route) => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });
}
