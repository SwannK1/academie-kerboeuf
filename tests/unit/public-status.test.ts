import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getPublicStatus,
  getPublicStatusKey,
  getPublicStatusLabel,
  getPublicStatusVariant,
} from "@/content/public-status";
import { sanitizePublicPedagogicalItems } from "@/content/public-sanitization";

/**
 * Niveau 1 — domaine pur : normalisation des statuts publics.
 * Importe uniquement la façade `@/content/public-status`, jamais
 * `public-status.domain` / `public-status.ui` (cf. AGENTS.md).
 */

test("statuts réels : chaque famille se normalise sur la bonne clé publique", () => {
  const available = ["disponible", "available", "validé", "valide", "validated"];
  const upcoming = [
    "à venir",
    "a venir",
    "a-venir",
    "bientôt",
    "bientot",
    "coming soon",
    "planned",
    "missing",
  ];
  const inProgress = [
    "en construction",
    "en préparation",
    "en preparation",
    "en-cours",
    "à vérifier",
    "a verifier",
    "draft",
    "brouillon",
    "partial",
    "partiel",
    "in-progress",
  ];

  for (const raw of available) {
    assert.equal(getPublicStatusKey(raw), "available", `attendu "available" pour ${raw}`);
  }
  for (const raw of upcoming) {
    assert.equal(getPublicStatusKey(raw), "upcoming", `attendu "upcoming" pour ${raw}`);
  }
  for (const raw of inProgress) {
    assert.equal(getPublicStatusKey(raw), "in-progress", `attendu "in-progress" pour ${raw}`);
  }
});

test("statut brut inconnu : repli sur in-progress plutôt qu'une exception", () => {
  assert.equal(getPublicStatusKey("statut-jamais-vu"), "in-progress");
  assert.equal(getPublicStatusKey(undefined), "in-progress");
  assert.equal(getPublicStatusKey(null), "in-progress");
  assert.equal(getPublicStatusKey(42), "in-progress");
});

test("insensible à la casse et aux espaces superflus", () => {
  assert.equal(getPublicStatusKey("  Disponible  "), "available");
  assert.equal(getPublicStatusKey("À VENIR"), "upcoming");
});

test("getPublicStatusVariant (déprécié) reste cohérent avec getPublicStatusKey", () => {
  for (const raw of ["disponible", "bientôt", "en préparation"]) {
    assert.equal(getPublicStatusVariant(raw), getPublicStatusKey(raw));
  }
});

test("getPublicStatus() retourne un objet dont la clé redonne le même statut normalisé", () => {
  const status = getPublicStatus("disponible");
  assert.equal(status.key, "available");
  // Idempotence : renormaliser un PublicStatus déjà normalisé ne le modifie pas.
  assert.equal(getPublicStatusKey(status), "available");
});

test("les labels visibles ne sont jamais vides et sont propres à chaque clé", () => {
  const labels = new Set([
    getPublicStatusLabel("disponible"),
    getPublicStatusLabel("bientôt"),
    getPublicStatusLabel("en préparation"),
  ]);
  assert.equal(labels.size, 3, "chaque statut doit avoir un libellé distinct");
  for (const label of labels) {
    assert.ok(label.trim().length > 0);
  }
});

test("sanitizePublicPedagogicalItems filtre les entrées à vérifier et laisse le reste intact", () => {
  const result = sanitizePublicPedagogicalItems([
    "Contenu validé",
    "à vérifier",
    "À vérifier",
    "  ",
    "Autre contenu réel",
  ]);
  assert.deepEqual(result, ["Contenu validé", "Autre contenu réel"]);
});
