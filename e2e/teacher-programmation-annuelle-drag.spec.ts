import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Programmation annuelle — déplacement d'une carte entre périodes (glisser-
 * déposer HTML5 natif). Complète teacher-programmation-annuelle-panel.spec.ts
 * (qui couvre le panneau latéral, pas le déplacement).
 */

const CARD_TITLE = "Atelier de test glisser-déposer";

test.describe("Programmation annuelle — déplacement d'une carte entre périodes", () => {
  test("une carte créée en Période 1 se retrouve en Période 2 après glisser-déposer, et le reste après rechargement", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/programmation/annuelle");

    await expect(page.getByRole("heading", { name: "Programmation par période" })).toBeVisible();

    const freeCardSection = page.locator("section", {
      has: page.getByRole("heading", { name: "Carte libre" }),
    });
    await freeCardSection.getByRole("button", { name: "Ajouter une carte" }).click();
    await freeCardSection.getByLabel("Titre").fill(CARD_TITLE);
    await freeCardSection.getByLabel("Matière").selectOption({ index: 1 });

    const submit = page.getByRole("button", { name: "Ajouter la carte" });
    await expect(submit).toBeEnabled();
    await submit.click();

    const periodOne = page.locator('section[aria-labelledby="periode-1-titre"]');
    const periodTwo = page.locator('section[aria-labelledby="periode-2-titre"]');

    const card = periodOne.locator("li", { hasText: CARD_TITLE });
    await expect(card).toBeVisible();
    await expect(periodTwo.locator("li", { hasText: CARD_TITLE })).toHaveCount(0);

    await card.dragTo(periodTwo);

    await expect(periodTwo.locator("li", { hasText: CARD_TITLE })).toBeVisible();
    await expect(periodOne.locator("li", { hasText: CARD_TITLE })).toHaveCount(0);

    await page.reload();
    await expect(
      page.locator('section[aria-labelledby="periode-2-titre"]').locator("li", { hasText: CARD_TITLE }),
    ).toBeVisible();
    await expect(
      page.locator('section[aria-labelledby="periode-1-titre"]').locator("li", { hasText: CARD_TITLE }),
    ).toHaveCount(0);

    expect(errors).toEqual([]);
  });
});
