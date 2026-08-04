import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getProfessorBySlug,
  getAllProfessorSlugs,
  professorProfiles,
} from "@/content/professors";
import { elementaryPlaces } from "@/content/elementary-places";
import { getCm2SubjectBySlug, cm2Subjects } from "@/content/cm2-subjects";
import { getLevelsByStage, getLevelMissionsPath, getLevelPath } from "@/content/academy";

/**
 * Niveau 1 — routes canoniques protégées :
 * - Félix n'a pas de page /professeurs/felix générée (redirect uniquement) ;
 *   sa destination canonique est /eleves/felix partout où il est référencé.
 * - Le slug "sciences" (et non "sciences-technologie") est la référence CM2.
 * - Le collège n'a pas de page de détail par mission : toute URL de mission
 *   collège doit retomber sur la page listing du niveau.
 */

test("Félix : profileHref canonique est /eleves/felix", () => {
  const felix = getProfessorBySlug("felix");
  assert.ok(felix, "le profil de Félix doit exister dans professorProfiles");
  assert.equal(felix!.profileHref, "/eleves/felix");
});

test("Félix : exclu des slugs professeurs générant une page /professeurs/[slug]", () => {
  const slugs = getAllProfessorSlugs().map((s) => s.slug);
  assert.ok(!slugs.includes("felix"), "felix ne doit pas générer /professeurs/felix");
});

test("Félix : référencé avec /eleves/felix partout où un lieu élémentaire pointe vers lui", () => {
  const places = elementaryPlaces;
  const felixRefs = places.flatMap((place) =>
    [...place.professors, ...place.students].filter((person) => person.name === "Félix"),
  );
  assert.ok(felixRefs.length > 0, "Félix doit être référencé par au moins un lieu");
  for (const ref of felixRefs) {
    assert.equal(ref.href, "/eleves/felix");
  }
});

test("CM2 sciences : le slug canonique est 'sciences', pas 'sciences-technologie'", () => {
  const sciences = getCm2SubjectBySlug("sciences");
  assert.ok(sciences, "la matière sciences CM2 doit exister sous le slug 'sciences'");
  assert.equal(getCm2SubjectBySlug("sciences-technologie"), undefined);
});

test("CM2 sciences : un seul slug 'sciences' dans le catalogue des matières", () => {
  const matches = cm2Subjects.filter((s) => s.slug === "sciences");
  assert.equal(matches.length, 1);
});

test("Collège : getLevelMissionsPath ne produit jamais de page de détail par mission", () => {
  const collegeLevels = getLevelsByStage("college");
  assert.ok(collegeLevels.length > 0);

  for (const level of collegeLevels) {
    const missionsPath = getLevelMissionsPath(level);
    const levelPath = getLevelPath(level);
    // Pour le collège, la page "missions" EST la page du niveau : il n'existe
    // pas de route /college/[slug]/missions/[slug] à générer ni à lier.
    assert.equal(missionsPath, levelPath);
    assert.ok(!missionsPath.includes("/missions"));
  }
});

test("Collège : chaque professeur référent a un profil professeur exploitable", () => {
  const collegeLevels = getLevelsByStage("college");
  for (const level of collegeLevels) {
    const profile = professorProfiles.find((p) => p.slug === level.professor.slug);
    assert.ok(profile, `profil manquant pour ${level.professor.slug} (niveau ${level.slug})`);
  }
});
