import { test, expect, type Page } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Programmation annuelle — comportement du panneau latéral "Modifier la carte".
 * Scénario auto-suffisant : on crée une carte libre via l'UI plutôt que de
 * dépendre de données de démonstration externes.
 */

const CARD_TITLE = "Atelier de test panneau latéral";

async function createFreeCardAndOpenPanel(page: Page) {
  await page.goto("/enseignants/programmation/annuelle");

  const freeCardSection = page.locator("section", {
    has: page.getByRole("heading", { name: "Carte libre" }),
  });
  await freeCardSection.getByRole("button", { name: "Ajouter une carte" }).click();
  await freeCardSection.getByLabel("Titre").fill(CARD_TITLE);
  await freeCardSection.getByLabel("Matière").selectOption({ index: 1 });

  const submit = page.getByRole("button", { name: "Ajouter la carte" });
  await expect(submit).toBeEnabled();
  await submit.click();

  const cardRow = page.locator("li", { hasText: CARD_TITLE }).first();
  await expect(cardRow).toBeVisible();
  await cardRow.getByRole("button", { name: "Modifier" }).click();

  const panel = page.getByRole("dialog", {
    name: `Modifier la carte ${CARD_TITLE}`,
  });
  await expect(panel).toBeVisible();
  return panel;
}

test.describe("Programmation annuelle — panneau latéral", () => {
  test("ouverture du panneau au clic sur Modifier", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const panel = await createFreeCardAndOpenPanel(page);
    await expect(panel.getByText("Modifier la carte")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("fermeture avec la touche Échap", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const panel = await createFreeCardAndOpenPanel(page);

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    expect(errors).toEqual([]);
  });

  test("fermeture par clic extérieur", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const panel = await createFreeCardAndOpenPanel(page);

    const box = await panel.boundingBox();
    if (!box) throw new Error("Panel bounding box unavailable");
    await page.mouse.click(Math.max(2, box.x - 10), box.y + box.height / 2);
    await expect(panel).toBeHidden();
    expect(errors).toEqual([]);
  });

  test("un clic intérieur ne ferme pas le panneau", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const panel = await createFreeCardAndOpenPanel(page);

    await panel.getByText("Modifier la carte").click();
    await expect(panel).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("le bouton ✕ ferme le panneau", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const panel = await createFreeCardAndOpenPanel(page);

    await panel.getByRole("button", { name: "Fermer le panneau" }).click();
    await expect(panel).toBeHidden();
    expect(errors).toEqual([]);
  });
});
