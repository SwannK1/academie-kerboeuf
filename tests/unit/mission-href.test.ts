import { test } from "node:test";
import assert from "node:assert/strict";
import { allMissions, getMissionHref, getMission } from "@/content/mission-registry";
import { getPublicStatusKey } from "@/content/public-status";
import { getClassroomResources } from "@/content/resources";
import { learningPaths, getLearningPathsWithSteps } from "@/content/learning-paths";

/**
 * Niveau 1 — getMissionHref() : règle centrale de génération d'URL de mission.
 * Objectif : ne jamais produire une URL vers une page de détail qui
 * répondrait notFound() (mission primaire non-CM2, collège, ou mission
 * publique non disponible).
 */

test("primaire non-CM2 : toujours renvoyé vers le listing du niveau, jamais vers une page de détail", () => {
  const primaireNonCm2 = allMissions.filter(
    (m) => m.stage === "primaire" && m.levelSlug !== "cm2",
  );
  assert.ok(primaireNonCm2.length > 0, "le jeu de données doit contenir des missions primaire non-CM2");

  for (const mission of primaireNonCm2) {
    const href = getMissionHref(mission);
    assert.equal(href, `/primaire/${mission.levelSlug}/missions`);
  }
});

test("collège : toujours renvoyé vers la page du niveau, jamais vers une page de détail par mission", () => {
  const collegeMissions = allMissions.filter((m) => m.stage === "college");
  assert.ok(collegeMissions.length > 0, "le jeu de données doit contenir des missions collège");

  for (const mission of collegeMissions) {
    const href = getMissionHref(mission);
    assert.equal(href, `/college/${mission.levelSlug}`);
    assert.ok(!href.endsWith(`/missions/${mission.slug}`));
  }
});

test("CM2 et lycée : mission non disponible => listing, jamais la page de détail", () => {
  const unavailable = allMissions
    .filter(
      (m) => (m.stage === "primaire" && m.levelSlug === "cm2") || m.stage === "lycee",
    )
    .filter((m) => getPublicStatusKey(m.status) !== "available");

  for (const mission of unavailable) {
    const href = getMissionHref(mission);
    assert.equal(href, `/${mission.stage}/${mission.levelSlug}/missions`);
  }
});

test("CM2 et lycée : mission disponible => page de détail par slug", () => {
  const available = allMissions
    .filter(
      (m) => (m.stage === "primaire" && m.levelSlug === "cm2") || m.stage === "lycee",
    )
    .filter((m) => getPublicStatusKey(m.status) === "available");

  assert.ok(available.length > 0, "le jeu de données doit contenir au moins une mission disponible en CM2 ou lycée");

  for (const mission of available) {
    const href = getMissionHref(mission);
    assert.equal(href, `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`);
  }
});

test("aucune mission du registre ne produit une URL de détail sans être disponible", () => {
  for (const mission of allMissions) {
    const href = getMissionHref(mission);
    const pointsToDetailPage = href === `/${mission.stage}/${mission.levelSlug}/missions/${mission.slug}`;
    if (pointsToDetailPage) {
      assert.equal(
        getPublicStatusKey(mission.status),
        "available",
        `mission ${mission.id} : lien de détail généré sans être disponible`,
      );
    }
  }
});

test("content/resources.ts consomme getMissionHref sans dupliquer sa règle", () => {
  const resources = getClassroomResources();
  assert.ok(resources.length > 0);

  for (const resource of resources) {
    const sourceMission = allMissions.find((m) => m.id === resource.id);
    assert.ok(sourceMission, `mission source introuvable pour la ressource ${resource.id}`);
    assert.equal(resource.href, getMissionHref(sourceMission!));
  }
});

test("content/learning-paths.ts consomme getMissionHref sans dupliquer sa règle", () => {
  const pathsWithSteps = getLearningPathsWithSteps();
  assert.ok(pathsWithSteps.length > 0);

  for (const path of pathsWithSteps) {
    const originalPath = learningPaths.find((p) => p.slug === path.slug)!;
    for (const [index, step] of path.steps.entries()) {
      const ref = originalPath.missions[index];
      const mission = getMission(ref.levelSlug, ref.missionSlug);
      assert.ok(mission, `mission ${ref.levelSlug}/${ref.missionSlug} introuvable`);
      assert.equal(step.href, getMissionHref(mission!));
    }
  }
});

test("learningPaths : chaque parcours déclaré a un statut normalisable", () => {
  assert.ok(learningPaths.length > 0);
  for (const path of learningPaths) {
    assert.doesNotThrow(() => getPublicStatusKey(path.status));
  }
});
