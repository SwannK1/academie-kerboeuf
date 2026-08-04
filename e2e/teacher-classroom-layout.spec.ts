import { test, expect } from "@playwright/test";
import { trackPageHealth, assertPageIsHealthy } from "./utils/console-errors";

/**
 * Plan de classe (/enseignants/organisation-classe) — échantillon représentatif
 * d'outil enseignant : rendu des tables, actions non liées au glisser-déposer
 * (rotation, redimensionnement, étiquettes), persistance après rechargement.
 *
 * Le placement d'étiquette sur une table utilise le drag-and-drop HTML5
 * natif (draggable + onDragStart/onDrop), notoirement instable à simuler de
 * façon fiable avec Playwright : cette suite ne teste donc que les actions
 * pilotables au clic, conformément à la consigne de stabilité (pas
 * d'interaction fragile).
 */

test.describe("Plan de classe", () => {
  test("affichage de la surface de plan, ajout d'une table et de ses contrôles", async ({
    page,
  }) => {
    const health = trackPageHealth(page);
    await page.goto("/enseignants/organisation-classe");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("button", { name: "Ajouter une table" }).click();

    const rotateButtons = page.getByRole("button", { name: "Pivoter la table" });
    await expect(rotateButtons.first()).toBeVisible();

    assertPageIsHealthy(health);
  });

  test("pivoter une table modifie son état et persiste après rechargement", async ({
    page,
  }) => {
    await page.goto("/enseignants/organisation-classe");
    await page.getByRole("button", { name: "Ajouter une table" }).click();

    const firstTable = page.locator('[style*="rotate"]').first();
    const initialTransform = await firstTable.evaluate(
      (el) => (el as HTMLElement).style.transform,
    );

    const health = trackPageHealth(page);
    await page.getByRole("button", { name: "Pivoter la table" }).first().click();

    await expect
      .poll(() => firstTable.evaluate((el) => (el as HTMLElement).style.transform))
      .not.toBe(initialTransform);

    const rotatedTransform = await firstTable.evaluate(
      (el) => (el as HTMLElement).style.transform,
    );

    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect
      .poll(() =>
        page.locator('[style*="rotate"]').first().evaluate((el) => (el as HTMLElement).style.transform),
      )
      .toBe(rotatedTransform);

    assertPageIsHealthy(health);
  });

  test("créer puis supprimer une étiquette", async ({ page }) => {
    const health = trackPageHealth(page);
    await page.goto("/enseignants/organisation-classe");

    const labelName = "Élève test E2E";
    await page.getByLabel("Prénom ou code").fill(labelName);
    await page.getByRole("button", { name: "Créer l'étiquette" }).click();

    const label = page.getByText(labelName, { exact: true });
    await expect(label).toBeVisible();

    await page
      .getByRole("button", { name: `Supprimer l'étiquette ${labelName}` })
      .click();
    await expect(label).toHaveCount(0);

    assertPageIsHealthy(health);
  });
});
