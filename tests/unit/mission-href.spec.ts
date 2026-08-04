import { test, expect } from "@playwright/test";
import {
  allMissions,
  getMission,
  getMissionHref,
} from "@/content/mission-registry";
import { getClassroomResources } from "@/content/resources";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import { getPublicStatusKey } from "@/content/public-status";
import type { Mission } from "@/content/types";

/**
 * getMissionHref (content/mission-registry.ts) est le seul générateur d'URL
 * de mission autorisé (cf. commit 4f19692 : centralisation après 20 liens
 * cassés causés par 3 implémentations locales dupliquées et incohérentes
 * avec le statut public). Ces tests figent son comportement et vérifient
 * que les trois consommateurs (resources, learning-paths, et — par lecture
 * de code, cf. docs/rapport-tests-non-regression.md — missions-recentes)
 * ne le contournent jamais.
 */

function makeMission(overrides: Partial<Mission>): Mission {
  return {
    id: "test-mission",
    stage: "primaire",
    levelSlug: "cm2",
    levelLabel: "CM2",
    slug: "mission-test",
    title: "Mission de test",
    description: "Description de test.",
    subject: "Français",
    status: "disponible",
    theme: "jade",
    professor: { name: "Test" },
    source: "cm2",
    ...overrides,
  };
}

test.describe("getMissionHref — cas obligatoires", () => {
  test("mission primaire non-CM2 : toujours la page de listing du niveau, quel que soit le statut", () => {
    const disponible = makeMission({ stage: "primaire", levelSlug: "ce1", status: "disponible" });
    const aVenir = makeMission({ stage: "primaire", levelSlug: "ce1", status: "bientôt" });
    expect(getMissionHref(disponible)).toBe("/primaire/ce1/missions");
    expect(getMissionHref(aVenir)).toBe("/primaire/ce1/missions");
  });

  test("mission collège : toujours la page de niveau (aucune route de détail collège n'existe)", () => {
    const disponible = makeMission({ stage: "college", levelSlug: "6e", status: "disponible" });
    const aVenir = makeMission({ stage: "college", levelSlug: "6e", status: "en préparation" });
    expect(getMissionHref(disponible)).toBe("/college/6e");
    expect(getMissionHref(aVenir)).toBe("/college/6e");
    // Jamais de route /college/{niveau}/missions/{slug} : elle n'existe pas.
    expect(getMissionHref(disponible)).not.toContain("/missions/");
  });

  test("mission lycée disponible : lien direct vers la page de détail", () => {
    const mission = makeMission({ stage: "lycee", levelSlug: "seconde", slug: "methode-lycee", status: "disponible" });
    expect(getMissionHref(mission)).toBe("/lycee/seconde/missions/methode-lycee");
  });

  test("mission lycée à venir : repli vers la page de listing, jamais vers une page de détail qui répondrait 404", () => {
    const mission = makeMission({ stage: "lycee", levelSlug: "seconde", slug: "lecture-analytique", status: "à venir" });
    const href = getMissionHref(mission);
    expect(href).toBe("/lycee/seconde/missions");
    expect(href).not.toContain(mission.slug);
  });

  test("mission CM2 disponible : lien direct vers la page de détail", () => {
    const mission = makeMission({ stage: "primaire", levelSlug: "cm2", slug: "mission-inference", status: "disponible" });
    expect(getMissionHref(mission)).toBe("/primaire/cm2/missions/mission-inference");
  });

  test("mission CM2 non disponible : repli vers la page de listing", () => {
    const mission = makeMission({ stage: "primaire", levelSlug: "cm2", slug: "future-mission", status: "en préparation" });
    expect(getMissionHref(mission)).toBe("/primaire/cm2/missions");
  });
});

test.describe("getMissionHref — cohérence entre les consommateurs", () => {
  test("resources.ts n'a plus de générateur local : chaque ressource dérivée d'une mission utilise exactement getMissionHref", () => {
    const resources = getClassroomResources();
    expect(resources.length).toBeGreaterThan(0);

    for (const resource of resources) {
      const mission = allMissions.find((m) => m.id === resource.id);
      expect(mission, `mission source introuvable pour la ressource ${resource.id}`).toBeTruthy();
      expect(resource.href).toBe(getMissionHref(mission as Mission));
    }
  });

  test("learning-paths.ts n'a plus de générateur local : chaque étape de parcours utilise exactement getMissionHref", () => {
    const paths = getLearningPathsWithSteps();
    expect(paths.length).toBeGreaterThan(0);

    let checkedSteps = 0;
    for (const path of paths) {
      // Même filtre que resolveLearningPath() : les missions introuvables
      // sont exclues, ce qui garde l'alignement par index avec path.steps.
      const resolvedMissions = path.missions
        .map((ref) => getMission(ref.levelSlug, ref.missionSlug))
        .filter((mission): mission is Mission => Boolean(mission));

      expect(resolvedMissions.length).toBe(path.steps.length);

      resolvedMissions.forEach((mission, index) => {
        expect(path.steps[index].href).toBe(getMissionHref(mission));
        checkedSteps += 1;
      });
    }
    expect(checkedSteps).toBeGreaterThan(0);
  });

  test("aucune étape de parcours ne pointe vers une page de détail non disponible (jamais de lien mort via /parcours)", () => {
    const paths = getLearningPathsWithSteps();
    for (const path of paths) {
      for (const step of path.steps) {
        const isDetailUrl = /\/missions\/[^/]+$/.test(step.href);
        if (isDetailUrl) {
          expect(step.status, `${step.href} pointe vers une page de détail mais son statut n'est pas "disponible"`).toBe(
            "disponible",
          );
        }
      }
    }
  });
});

test.describe("getMissionHref — régression : slug matière sciences", () => {
  test("le référentiel de matières CM2 expose 'sciences', jamais 'sciences-technologie'", async () => {
    const { cm2Subjects } = await import("@/content/cm2-subjects");
    const slugs = cm2Subjects.map((s) => s.slug);
    expect(slugs).toContain("sciences");
    expect(slugs).not.toContain("sciences-technologie");
  });
});

test.describe("getMissionHref — intégrité globale du référentiel", () => {
  test("toute mission disponible de stage lycée/CM2 a une URL de détail correspondant exactement à /{stage}/{niveau}/missions/{slug}", () => {
    const availableDetailMissions = allMissions.filter(
      (m) =>
        getPublicStatusKey(m.status) === "available" &&
        (m.stage === "lycee" || m.levelSlug === "cm2"),
    );
    expect(availableDetailMissions.length).toBeGreaterThan(0);

    for (const mission of availableDetailMissions) {
      expect(getMissionHref(mission)).toBe(
        `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`,
      );
    }
  });

  test("aucune mission (quel que soit le statut) ne produit une URL /college/{niveau}/missions/{slug}", () => {
    for (const mission of allMissions.filter((m) => m.stage === "college")) {
      expect(getMissionHref(mission)).not.toMatch(/\/missions\//);
    }
  });
});
