import type { MetadataRoute } from "next";

// TODO: remplacer par le domaine réel avant mise en production
const BASE_URL = "https://academie-kerboeuf.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, priority: 1.0 },
    { url: `${BASE_URL}/univers`, priority: 0.9 },
    { url: `${BASE_URL}/professeurs`, priority: 0.8 },
    { url: `${BASE_URL}/maternelle`, priority: 0.8 },
    { url: `${BASE_URL}/primaire`, priority: 0.8 },
    { url: `${BASE_URL}/primaire/cm2`, priority: 0.8 },
    { url: `${BASE_URL}/primaire/cm2/missions`, priority: 0.7 },
    { url: `${BASE_URL}/college`, priority: 0.8 },
    { url: `${BASE_URL}/lycee`, priority: 0.8 },
    { url: `${BASE_URL}/missions-recentes`, priority: 0.7 },
    { url: `${BASE_URL}/ressources`, priority: 0.7 },
    { url: `${BASE_URL}/parcours`, priority: 0.7 },
  ];
}
