import { test, expect } from "@playwright/test";
import {
  getPublicStatus,
  getPublicStatusKey,
  getPublicStatusLabel,
  isPubliclyAvailable,
  isPubliclyLinkable,
} from "@/content/public-status";

/**
 * Référentiel central des statuts publics : available | partial | preparing
 * | coming-soon. Ces tests protègent les règles de gouvernance déjà
 * établies (voir AGENTS.md) — pas la structure interne du fichier.
 */

test.describe("getPublicStatusKey — normalisation", () => {
  test("reconnaît les 4 clés canoniques telles quelles", () => {
    expect(getPublicStatusKey("available")).toBe("available");
    expect(getPublicStatusKey("partial")).toBe("partial");
    expect(getPublicStatusKey("preparing")).toBe("preparing");
    expect(getPublicStatusKey("coming-soon")).toBe("coming-soon");
  });

  test("normalise les anciennes valeurs françaises", () => {
    expect(getPublicStatusKey("disponible")).toBe("available");
    expect(getPublicStatusKey("partiel")).toBe("partial");
    expect(getPublicStatusKey("en préparation")).toBe("preparing");
    expect(getPublicStatusKey("à venir")).toBe("coming-soon");
    expect(getPublicStatusKey("bientôt")).toBe("coming-soon");
  });

  test("continue de normaliser les anciennes clés anglaises 'upcoming' et 'in-progress'", () => {
    // Ces clés ont été renommées (coming-soon / preparing) mais restent
    // acceptées en entrée pour les producteurs de statuts non migrés
    // (ProgramStatus, MissionStatus, CurriculumStatus...).
    expect(getPublicStatusKey("upcoming")).toBe("coming-soon");
    expect(getPublicStatusKey("in-progress")).toBe("preparing");
  });

  test("normalise un objet PublicStatus déjà normalisé", () => {
    expect(getPublicStatusKey(getPublicStatus("disponible"))).toBe("available");
  });

  test("une valeur inconnue retombe sur le statut de repli (preparing), jamais 'available'", () => {
    expect(getPublicStatusKey("valeur-inexistante")).toBe("preparing");
    expect(getPublicStatusKey(undefined)).toBe("preparing");
    expect(getPublicStatusKey(null)).toBe("preparing");
    expect(getPublicStatusKey(42)).toBe("preparing");
  });

  test("insensible à la casse et aux espaces superflus", () => {
    expect(getPublicStatusKey("  Disponible  ")).toBe("available");
    expect(getPublicStatusKey("PARTIEL")).toBe("partial");
  });
});

test.describe("getPublicStatusLabel — libellés du référentiel central", () => {
  test("chaque clé canonique a un libellé distinct et non vide", () => {
    const labels = new Set(
      ["available", "partial", "preparing", "coming-soon"].map((key) =>
        getPublicStatusLabel(key),
      ),
    );
    expect(labels.size).toBe(4);
    for (const label of labels) {
      expect(label.trim().length).toBeGreaterThan(0);
    }
  });
});

test.describe("isPubliclyAvailable — décision stricte (CTA terminal)", () => {
  test("nécessite un href réel ET le statut strict 'available'", () => {
    expect(isPubliclyAvailable("available", "/ressources/x")).toBe(true);
    expect(isPubliclyAvailable("disponible", "/ressources/x")).toBe(true);
  });

  test("refuse un contenu sans destination réelle même si disponible", () => {
    expect(isPubliclyAvailable("available", undefined)).toBe(false);
    expect(isPubliclyAvailable("available", null)).toBe(false);
    expect(isPubliclyAvailable("available", "")).toBe(false);
  });

  test("refuse les statuts partiel/en préparation/à venir — une ressource partielle n'est pas complète", () => {
    expect(isPubliclyAvailable("partial", "/ressources/x")).toBe(false);
    expect(isPubliclyAvailable("preparing", "/ressources/x")).toBe(false);
    expect(isPubliclyAvailable("coming-soon", "/ressources/x")).toBe(false);
  });
});

test.describe("isPubliclyLinkable — décision souple (carte de navigation hub)", () => {
  test("autorise available, partial et preparing dès qu'un href existe", () => {
    expect(isPubliclyLinkable("available", "/college/6e")).toBe(true);
    expect(isPubliclyLinkable("partial", "/college/6e")).toBe(true);
    expect(isPubliclyLinkable("preparing", "/college/6e")).toBe(true);
  });

  test("refuse uniquement 'coming-soon' — rien n'existe encore", () => {
    expect(isPubliclyLinkable("coming-soon", "/college/6e")).toBe(false);
  });

  test("refuse toujours l'absence de destination réelle", () => {
    expect(isPubliclyLinkable("available", undefined)).toBe(false);
    expect(isPubliclyLinkable("partial", "")).toBe(false);
  });

  test("isPubliclyLinkable est strictement plus permissif que isPubliclyAvailable", () => {
    // Toute ressource "available" est linkable, l'inverse n'est pas vrai.
    for (const status of ["available", "partial", "preparing", "coming-soon"]) {
      if (isPubliclyAvailable(status, "/x")) {
        expect(isPubliclyLinkable(status, "/x")).toBe(true);
      }
    }
  });
});
