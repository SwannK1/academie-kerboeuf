import { test, expect } from "@playwright/test";
import { cm2FichesMaths, isSheetClickable, getNotionCompleteness } from "@/content/cm2-fiches-maths";

/**
 * Règle de lien PDF (cf. AGENTS.md, "Règles de lien PDF") appliquée aux
 * fiches CM2 Mathématiques : une feuille n'est cliquable que si son statut
 * est "available" ET qu'elle a un imageHref réel. Non couvert ailleurs dans
 * la suite existante (isSheetClickable est spécifique à ce registre, distinct
 * du helper central isPubliclyAvailable déjà testé dans publication-guards.spec.ts).
 */

test.describe("isSheetClickable — protection des téléchargements PDF CM2 Maths", () => {
  test("jamais cliquable sans imageHref, même si le statut est available", () => {
    for (const notion of cm2FichesMaths) {
      for (const sheet of notion.sheets) {
        if (!sheet.imageHref) {
          expect(
            isSheetClickable(sheet),
            `feuille ${notion.notionSlug}/${sheet.id} sans imageHref ne doit pas être cliquable`,
          ).toBe(false);
        }
      }
    }
  });

  test("jamais cliquable si le statut n'est pas available, même avec un href", () => {
    for (const notion of cm2FichesMaths) {
      for (const sheet of notion.sheets) {
        if (sheet.status !== "available") {
          expect(
            isSheetClickable(sheet),
            `feuille ${notion.notionSlug}/${sheet.id} au statut "${sheet.status}" ne doit pas être cliquable`,
          ).toBe(false);
        }
      }
    }
  });

  test("aucune feuille ne référence un pdfHref sans imageHref (pas de PDF fictif)", () => {
    for (const notion of cm2FichesMaths) {
      for (const sheet of notion.sheets) {
        if (sheet.pdfHref) {
          expect(
            sheet.imageHref,
            `feuille ${notion.notionSlug}/${sheet.id} a un pdfHref mais pas d'imageHref`,
          ).toBeTruthy();
        }
      }
    }
  });
});

test.describe("getNotionCompleteness — reflète le nombre réel de feuilles disponibles", () => {
  test("cohérent avec le comptage direct des feuilles available", () => {
    for (const notion of cm2FichesMaths) {
      const availableCount = notion.sheets.filter((s) => s.status === "available").length;
      const completeness = getNotionCompleteness(notion);
      if (availableCount === 3) expect(completeness).toBe("complete");
      else if (availableCount > 0) expect(completeness).toBe("partial");
      else expect(completeness).toBe("upcoming");
    }
  });
});
