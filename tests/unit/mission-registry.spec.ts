import { test, expect } from "@playwright/test";
import {
  getMissionHref,
  isMissionDetailLinkable,
} from "@/content/mission-registry";
import type { Mission } from "@/content/types";

/**
 * getMissionHref / isMissionDetailLinkable : source unique de construction
 * d'URL de mission, réutilisée par /ressources, /missions-recentes et
 * /parcours. Un bug ici a déjà causé un lien mort réel
 * (/parcours/6e-entrer-au-college-avec-methode → 404) avant correction.
 */

function mission(overrides: Partial<Mission>): Mission {
  return {
    id: "test:mission",
    stage: "primaire",
    levelSlug: "cm2",
    levelLabel: "CM2",
    slug: "mission-test",
    title: "Mission de test",
    description: "Description de test",
    subject: "Français",
    status: "disponible",
    theme: "jade",
    professor: { name: "Test" },
    source: "cm2",
    ...overrides,
  };
}

test.describe("getMissionHref — route sûre pour toute mission", () => {
  test("CM2 pointe vers sa page de détail par slug", () => {
    const m = mission({ stage: "primaire", levelSlug: "cm2", slug: "mission-inference" });
    expect(getMissionHref(m)).toBe("/primaire/cm2/missions/mission-inference");
  });

  test("lycée pointe vers sa page de détail par slug", () => {
    const m = mission({ stage: "lycee", levelSlug: "seconde", slug: "atelier-lecture" });
    expect(getMissionHref(m)).toBe("/lycee/seconde/missions/atelier-lecture");
  });

  test("primaire hors CM2 retombe sur la liste du niveau (pas de page de détail)", () => {
    const m = mission({ stage: "primaire", levelSlug: "cp", slug: "mission-cp" });
    expect(getMissionHref(m)).toBe("/primaire/cp/missions");
  });

  test("collège retombe sur la page du niveau — jamais missions/[slug] (route inexistante)", () => {
    const m = mission({ stage: "college", levelSlug: "6e", slug: "lecture-de-carte" });
    const href = getMissionHref(m);
    expect(href).toBe("/college/6e");
    expect(href).not.toContain("/missions/");
  });

  test("CM2 non disponible retombe sur le listing — jamais un lien vers une page 404", () => {
    const m = mission({
      stage: "primaire",
      levelSlug: "cm2",
      slug: "mission-pas-encore-prete",
      status: "en préparation",
    });
    const href = getMissionHref(m);
    expect(href).toBe("/primaire/cm2/missions");
    expect(href).not.toContain(m.slug);
  });

  test("lycée non disponible retombe sur le listing du niveau — jamais un lien vers une page 404", () => {
    const m = mission({
      stage: "lycee",
      levelSlug: "terminale",
      slug: "mission-pas-encore-prete",
      status: "bientôt",
    });
    const href = getMissionHref(m);
    expect(href).toBe("/lycee/terminale/missions");
    expect(href).not.toContain(m.slug);
  });
});

test.describe("isMissionDetailLinkable — existence réelle d'une page de détail", () => {
  test("vrai uniquement pour CM2 et lycée", () => {
    expect(isMissionDetailLinkable(mission({ stage: "primaire", levelSlug: "cm2" }))).toBe(true);
    expect(isMissionDetailLinkable(mission({ stage: "lycee", levelSlug: "terminale" }))).toBe(true);
  });

  test("faux pour le collège et le primaire hors CM2 (pas de route missions/[slug])", () => {
    expect(isMissionDetailLinkable(mission({ stage: "college", levelSlug: "6e" }))).toBe(false);
    expect(isMissionDetailLinkable(mission({ stage: "primaire", levelSlug: "cp" }))).toBe(false);
  });
});
