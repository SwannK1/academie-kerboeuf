import { test, expect } from "@playwright/test";
import {
  getPublicStatus,
  getPublicStatusKey,
  getPublicStatusLabel,
  getPublicStatusVariant,
  getPublicStatusAriaLabel,
  getPublicStatusClassName,
} from "@/content/public-status";

/**
 * Référentiel central des statuts publics (content/public-status*.ts).
 * Ces tests importent uniquement la façade publique — jamais les modules
 * .domain / .ui directement — pour rester alignés sur la règle de
 * gouvernance documentée dans AGENTS.md (seule la façade est un point
 * d'entrée autorisé).
 */

test.describe("Statuts publics — normalisation", () => {
  const availableSynonyms = ["available", "disponible", "validé", "valide", "validated", "DISPONIBLE", "  disponible  "];
  const upcomingSynonyms = [
    "upcoming",
    "à venir",
    "a venir",
    "a-venir",
    "bientôt",
    "bientot",
    "coming soon",
    "planned",
    "missing",
  ];
  const inProgressSynonyms = [
    "in-progress",
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
  ];

  for (const raw of availableSynonyms) {
    test(`"${raw}" se normalise en "available"`, () => {
      expect(getPublicStatusKey(raw)).toBe("available");
    });
  }

  for (const raw of upcomingSynonyms) {
    test(`"${raw}" se normalise en "upcoming"`, () => {
      expect(getPublicStatusKey(raw)).toBe("upcoming");
    });
  }

  for (const raw of inProgressSynonyms) {
    test(`"${raw}" se normalise en "in-progress"`, () => {
      expect(getPublicStatusKey(raw)).toBe("in-progress");
    });
  }

  test("un statut inconnu retombe sur in-progress (fail-safe, jamais 'disponible' par défaut)", () => {
    expect(getPublicStatusKey("statut-qui-nexiste-pas")).toBe("in-progress");
  });

  test("une valeur non-string (undefined, null, nombre, objet arbitraire) retombe sur in-progress", () => {
    expect(getPublicStatusKey(undefined)).toBe("in-progress");
    expect(getPublicStatusKey(null)).toBe("in-progress");
    expect(getPublicStatusKey(42)).toBe("in-progress");
    expect(getPublicStatusKey({})).toBe("in-progress");
  });

  test("normaliser un PublicStatus déjà normalisé est idempotent", () => {
    const once = getPublicStatus("disponible");
    const twice = getPublicStatus(once);
    expect(twice.key).toBe("available");
    expect(twice).toEqual(once);
  });

  test("getPublicStatusVariant (wrapper rétrocompatible déprécié) renvoie exactement la même clé que getPublicStatusKey", () => {
    for (const raw of [...availableSynonyms, ...upcomingSynonyms, ...inProgressSynonyms, "inconnu"]) {
      expect(getPublicStatusVariant(raw)).toBe(getPublicStatusKey(raw));
    }
  });
});

test.describe("Statuts publics — libellés et UI", () => {
  test("les 3 libellés publics sont exactement ceux documentés dans AGENTS.md", () => {
    expect(getPublicStatusLabel("disponible")).toBe("Disponible");
    expect(getPublicStatusLabel("à venir")).toBe("À venir");
    expect(getPublicStatusLabel("en préparation")).toBe("En préparation");
  });

  test("aucun libellé n'est vide et chacun est distinct des deux autres", () => {
    const labels = new Set([
      getPublicStatusLabel("disponible"),
      getPublicStatusLabel("à venir"),
      getPublicStatusLabel("en préparation"),
    ]);
    expect(labels.size).toBe(3);
    for (const label of labels) {
      expect(label.trim().length).toBeGreaterThan(0);
    }
  });

  test("l'ariaLabel et la className restent définis pour chaque statut (pas de badge muet ou sans style)", () => {
    for (const raw of ["disponible", "à venir", "en préparation"]) {
      expect(getPublicStatusAriaLabel(raw).length).toBeGreaterThan(0);
      expect(getPublicStatusClassName(raw).length).toBeGreaterThan(0);
    }
  });
});
