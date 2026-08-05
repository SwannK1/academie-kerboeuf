import { test, expect } from "@playwright/test";
import { getProfessorBySlug, getAllProfessorSlugs, professorProfiles } from "@/content/professors";
import { elementaryPlaces } from "@/content/elementary-places";
import { getCm2SubjectBySlug, cm2Subjects } from "@/content/cm2-subjects";
import { getLevelsByStage, getLevelMissionsPath, getLevelPath } from "@/content/academy";

/**
 * Routes canoniques protégées, non couvertes ailleurs dans la suite
 * existante :
 * - Félix n'a pas de page /professeurs/felix générée (redirect uniquement) ;
 *   sa destination canonique est /eleves/felix partout où il est référencé.
 * - Le slug "sciences" (et non "sciences-technologie") est la référence CM2.
 * - Le collège n'a pas de page de détail par mission : getLevelMissionsPath
 *   retombe sur la page du niveau lui-même.
 */

test.describe("Félix — destination canonique /eleves/felix", () => {
  test("profileHref canonique est /eleves/felix", () => {
    const felix = getProfessorBySlug("felix");
    expect(felix).toBeTruthy();
    expect(felix?.profileHref).toBe("/eleves/felix");
  });

  test("exclu des slugs professeurs générant une page /professeurs/[slug]", () => {
    const slugs = getAllProfessorSlugs().map((s) => s.slug);
    expect(slugs).not.toContain("felix");
  });

  test("référencé avec /eleves/felix partout où un lieu élémentaire pointe vers lui", () => {
    const felixRefs = elementaryPlaces.flatMap((place) =>
      [...place.professors, ...place.students].filter((person) => person.name === "Félix"),
    );
    expect(felixRefs.length).toBeGreaterThan(0);
    for (const ref of felixRefs) {
      expect(ref.href).toBe("/eleves/felix");
    }
  });
});

test.describe("CM2 sciences — slug canonique 'sciences'", () => {
  test("la matière sciences CM2 existe sous le slug 'sciences'", () => {
    expect(getCm2SubjectBySlug("sciences")).toBeTruthy();
    expect(getCm2SubjectBySlug("sciences-technologie")).toBeUndefined();
  });

  test("un seul slug 'sciences' dans le catalogue des matières", () => {
    const matches = cm2Subjects.filter((s) => s.slug === "sciences");
    expect(matches.length).toBe(1);
  });
});

test.describe("Collège — pas de page de détail par mission", () => {
  test("getLevelMissionsPath ne produit jamais de route missions/[slug]", () => {
    const collegeLevels = getLevelsByStage("college");
    expect(collegeLevels.length).toBeGreaterThan(0);

    for (const level of collegeLevels) {
      const missionsPath = getLevelMissionsPath(level);
      const levelPath = getLevelPath(level);
      expect(missionsPath).toBe(levelPath);
      expect(missionsPath).not.toContain("/missions");
    }
  });

  test("chaque professeur référent de collège a un profil exploitable", () => {
    const collegeLevels = getLevelsByStage("college");
    for (const level of collegeLevels) {
      const profile = professorProfiles.find((p) => p.slug === level.professor.slug);
      expect(profile, `profil manquant pour ${level.professor.slug}`).toBeTruthy();
    }
  });
});
