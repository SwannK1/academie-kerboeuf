import { test } from "node:test";
import assert from "node:assert/strict";
import { cm2FichesMaths, isSheetClickable, getNotionCompleteness } from "@/content/cm2-fiches-maths";

/**
 * Niveau 1 — règle de lien PDF (AGENTS.md, "Règles de lien PDF") appliquée
 * aux fiches CM2 Mathématiques : une feuille n'est cliquable que si son
 * statut est "available" ET qu'elle a un imageHref réel.
 */

test("isSheetClickable : jamais cliquable sans imageHref, même si le statut est available", () => {
  for (const notion of cm2FichesMaths) {
    for (const sheet of notion.sheets) {
      if (!sheet.imageHref) {
        assert.equal(
          isSheetClickable(sheet),
          false,
          `feuille ${notion.notionSlug}/${sheet.id} sans imageHref ne doit pas être cliquable`,
        );
      }
    }
  }
});

test("isSheetClickable : jamais cliquable si le statut n'est pas available, même avec un href", () => {
  for (const notion of cm2FichesMaths) {
    for (const sheet of notion.sheets) {
      if (sheet.status !== "available") {
        assert.equal(
          isSheetClickable(sheet),
          false,
          `feuille ${notion.notionSlug}/${sheet.id} au statut "${sheet.status}" ne doit pas être cliquable`,
        );
      }
    }
  }
});

test("aucune feuille cliquable ne référence un pdfHref sans imageHref", () => {
  for (const notion of cm2FichesMaths) {
    for (const sheet of notion.sheets) {
      if (sheet.pdfHref) {
        assert.ok(
          sheet.imageHref,
          `feuille ${notion.notionSlug}/${sheet.id} a un pdfHref mais pas d'imageHref`,
        );
      }
    }
  }
});

test("getNotionCompleteness reflète fidèlement le nombre de feuilles disponibles", () => {
  for (const notion of cm2FichesMaths) {
    const availableCount = notion.sheets.filter((s) => s.status === "available").length;
    const completeness = getNotionCompleteness(notion);
    if (availableCount === 3) assert.equal(completeness, "complete");
    else if (availableCount > 0) assert.equal(completeness, "partial");
    else assert.equal(completeness, "upcoming");
  }
});
