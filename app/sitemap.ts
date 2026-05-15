import type { MetadataRoute } from "next";
import { cm2Missions } from "@/content/cm2";
import { felixProjects } from "@/content/felix-missions";
import { learningPaths } from "@/content/learning-paths";
import { getElementaryPedagogicalPlaces } from "@/content/pedagogical-places";

// TODO: remplacer par le domaine réel avant mise en production
const BASE_URL = "https://academie-kerboeuf.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const cm2MissionRoutes = [...cm2Missions, ...felixProjects].map((mission) => ({
    url: `${BASE_URL}/primaire/cm2/missions/${mission.slug}`,
    priority: 0.6,
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

  return [
    { url: `${BASE_URL}/`, priority: 1.0 },
    { url: `${BASE_URL}/univers`, priority: 0.9 },
    { url: `${BASE_URL}/professeurs`, priority: 0.8 },
    { url: `${BASE_URL}/maternelle`, priority: 0.8 },
    { url: `${BASE_URL}/primaire`, priority: 0.8 },
    { url: `${BASE_URL}/primaire/lieux`, priority: 0.7 },
    ...elementaryPlaceRoutes,
    { url: `${BASE_URL}/primaire/cm2`, priority: 0.8 },
    { url: `${BASE_URL}/primaire/cm2/missions`, priority: 0.7 },
    { url: `${BASE_URL}/primaire/cm2/parcours`, priority: 0.6 },
    ...cm2MissionRoutes,
    ...cm2LearningPathRoutes,
    { url: `${BASE_URL}/college`, priority: 0.8 },
    { url: `${BASE_URL}/lycee`, priority: 0.8 },
    { url: `${BASE_URL}/carte`, priority: 0.8 },
    { url: `${BASE_URL}/missions-recentes`, priority: 0.7 },
    { url: `${BASE_URL}/ressources`, priority: 0.7 },
    { url: `${BASE_URL}/parcours`, priority: 0.7 },
  ];
}
