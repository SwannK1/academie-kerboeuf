import { test } from "node:test";
import assert from "node:assert/strict";
import { missionRegistryValidation, allMissions } from "@/content/mission-registry";

/**
 * Niveau 1 — protection des missions non publiées : le registre unifié ne
 * doit jamais contenir deux missions avec le même id, ni deux missions du
 * même niveau partageant le même slug (ce qui casserait getMission()).
 */

test("aucun id de mission dupliqué dans le registre unifié", () => {
  assert.deepEqual(missionRegistryValidation.duplicateIds, []);
});

test("aucun slug dupliqué au sein d'un même niveau", () => {
  assert.deepEqual(missionRegistryValidation.duplicateSlugsByLevel, []);
});

test("chaque mission du registre a un id, un slug et un levelSlug non vides", () => {
  assert.ok(allMissions.length > 0);
  for (const mission of allMissions) {
    assert.ok(mission.id.trim().length > 0);
    assert.ok(mission.slug.trim().length > 0);
    assert.ok(mission.levelSlug.trim().length > 0);
  }
});
