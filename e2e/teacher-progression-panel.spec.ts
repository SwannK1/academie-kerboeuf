import { test, expect, type Page } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Progression de période — comportement du panneau latéral "Détails de la carte".
 * Scénario auto-suffisant : on crée une carte libre via l'UI plutôt que de
 * dépendre de données de démonstration externes.
 */

const COMPETENCE_LABEL = "Carte de test panneau latéral";

async function createFreeCardAndOpenPanel(page: Page) {
  await page.goto("/enseignants/progression");

  await page.getByRole("button", { name: "Carte libre" }).click();
  await page
    .getByLabel("Compétence (texte libre)")
    .fill(COMPETENCE_LABEL);
  await page.getByRole("button", { name: "Ajouter la carte" }).click();

  const card = page.getByRole("button", {
    name: `Ouvrir la carte ${COMPETENCE_LABEL}`,
  });
  await expect(card).toBeVisible();
  await card.click();

  const panel = page.getByRole("dialog", {
    name: `Détails de la carte ${COMPETENCE_LABEL}`,
  });
  await expect(panel).toBeVisible();
  return panel;
}

test.describe("Progression de période — panneau latéral", () => {
  test("ouverture du panneau au clic sur une carte", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const panel = await createFreeCardAndOpenPanel(page);
    await expect(panel.getByText(COMPETENCE_LABEL)).toBeVisible();
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

    await panel.getByText(COMPETENCE_LABEL).click();
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
