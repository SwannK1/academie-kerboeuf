import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Outils enseignants : périmètre interactif principal du site. Le
 * comportement des panneaux latéraux (ouverture/Échap/clic extérieur/focus)
 * est déjà couvert par teacher-progression-panel.spec.ts et
 * teacher-programmation-annuelle-panel.spec.ts — non dupliqué ici.
 * Ce fichier couvre les interactions spécifiques à chaque outil :
 * déplacement/disposition, persistance locale, impression.
 */

const CLASSROOM_STORAGE_KEY = "academie-kerboeuf-organisation-classe-plan-v1";

test.describe("Plan de classe — /enseignants/organisation-classe", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/enseignants/organisation-classe");
    await page.evaluate((key) => window.localStorage.removeItem(key), CLASSROOM_STORAGE_KEY);
    await page.reload();
  });

  test("ouverture, tables affichées, aucune erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await expect(page.getByRole("heading", { name: "Plan de classe et groupes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Surface de la salle" })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("déplacement d'une table par glisser (souris) et changement de disposition (rotation)", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.getByRole("button", { name: "+ Ajouter une table" }).click();

    const table = page.getByTestId("classroom-table").first();
    await table.scrollIntoViewIfNeeded();
    const before = await table.boundingBox();
    if (!before) throw new Error("Table bounding box unavailable");

    await table.hover({ position: { x: before.width / 2, y: before.height / 2 } });
    await page.mouse.down();
    await page.mouse.move(before.x + before.width / 2 + 80, before.y + before.height / 2 + 60, {
      steps: 10,
    });
    await page.mouse.up();

    const after = await table.boundingBox();
    if (!after) throw new Error("Table bounding box unavailable after drag");
    expect(Math.abs(after.x - before.x) + Math.abs(after.y - before.y)).toBeGreaterThan(20);

    await page.getByRole("button", { name: "Pivoter la table" }).first().click();
    expect(errors).toEqual([]);
  });

  test("liste d'étiquettes : ajout puis suppression", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const name = "Léo (test)";

    await page.getByLabel("Prénom ou code").fill(name);
    await page.getByRole("button", { name: "Créer l'étiquette" }).click();
    await expect(page.getByText(name, { exact: true })).toBeVisible();

    await page.getByRole("button", { name: `Supprimer l'étiquette ${name}` }).click();
    await expect(page.getByText(name, { exact: true })).toBeHidden();
    expect(errors).toEqual([]);
  });

  test("la disposition ajoutée est conservée après rechargement (persistance locale)", async ({ page }) => {
    await page.getByRole("button", { name: "+ Ajouter une table" }).click();
    await expect(page.getByRole("button", { name: "Pivoter la table" })).toHaveCount(1);

    const stored = await page.evaluate(
      (key) => window.localStorage.getItem(key),
      CLASSROOM_STORAGE_KEY,
    );
    expect(stored).toBeTruthy();

    await page.reload();
    await expect(page.getByRole("button", { name: "Pivoter la table" })).toHaveCount(1);
  });
});

test.describe("Emploi du temps — /enseignants/emploi-du-temps", () => {
  test("ouverture, grille visible, bouton d'impression déclenche l'aperçu, sans erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/emploi-du-temps");

    await expect(
      page.getByRole("region", { name: "Calendrier hebdomadaire" }).or(
        page.locator('[aria-label="Calendrier hebdomadaire"]'),
      ),
    ).toBeVisible();

    const printCalls: boolean[] = [];
    await page.exposeFunction("__reportPrintCall", () => printCalls.push(true));
    await page.evaluate(() => {
      window.print = () => {
        // @ts-expect-error — fonction exposée par le test
        window.__reportPrintCall();
      };
    });

    const printButton = page.getByRole("button", { name: "Imprimer (noir et blanc)" });
    await expect(printButton).toBeVisible();
    await printButton.click();
    expect(printCalls.length).toBe(1);

    expect(errors).toEqual([]);
  });
});

const LOGBOOK_STORAGE_KEY = "academie-kerboeuf-cahier-journal-v1";

test.describe("Cahier journal — /enseignants/cahier-journal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/enseignants/cahier-journal");
    await page.evaluate((key) => window.localStorage.removeItem(key), LOGBOOK_STORAGE_KEY);
    await page.reload();
  });

  test("ouverture, grille de la semaine visible, sans erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await expect(page.getByRole("heading", { name: "Vue de la semaine" })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("création d'une séance et conservation après rechargement", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const title = "Séance de test e2e";

    await page.getByRole("button", { name: "+ Ajouter une séance" }).first().click();

    const dialog = page.getByRole("dialog", { name: "Détail de la séance" });
    await expect(dialog).toBeVisible();
    await dialog.getByLabel("Titre court").fill(title);
    await dialog.getByRole("button", { name: "Enregistrer" }).click();
    await expect(dialog).toBeHidden();

    await expect(page.getByText(title, { exact: true })).toBeVisible();

    await page.reload();
    await expect(page.getByText(title, { exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
});
