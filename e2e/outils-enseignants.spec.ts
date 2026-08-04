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

    // Le centre géométrique de la table (petite table par défaut, 90×56)
    // tombe à proximité immédiate de la barre de boutons d'action, centrée
    // dans le conteneur (items-center/justify-center) : on démarre le
    // glisser depuis un coin, hors de toute zone cliquable interne.
    await table.hover({ position: { x: 6, y: 6 } });
    await page.mouse.down();
    await page.mouse.move(before.x + before.width / 2 + 80, before.y + before.height / 2 + 60, {
      steps: 10,
    });
    await page.mouse.up();

    const after = await table.boundingBox();
    if (!after) throw new Error("Table bounding box unavailable after drag");
    expect(Math.abs(after.x - before.x) + Math.abs(after.y - before.y)).toBeGreaterThan(20);

    // Régression : le conteneur de table capturait le pointeur dès
    // pointerdown, y compris quand celui-ci démarrait sur un bouton
    // d'action imbriqué (Pivoter/Agrandir/Réduire/Dupliquer/Supprimer) — le
    // clic navigateur était alors retargeté vers le conteneur et le bouton
    // ne recevait jamais son onClick, en silence (aucune erreur console).
    const transformBefore = await table.evaluate((el) => (el as HTMLElement).style.transform);
    await page.getByRole("button", { name: "Pivoter la table" }).first().click();
    await expect
      .poll(() => table.evaluate((el) => (el as HTMLElement).style.transform))
      .not.toBe(transformBefore);
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

  test("glisser-déposer d'une étiquette sur une table, et affectation conservée après rechargement", async ({
    page,
  }) => {
    // locator.dragTo() (glisser-déposer piloté par la souris) ne déclenche
    // pas de façon fiable le drag HTML5 natif ici — on envoie donc
    // directement la séquence d'événements DragEvent (dragstart → dragover
    // → drop), l'alternative documentée par Playwright :
    // https://playwright.dev/docs/input#dragging-manually
    // bubbles: true est indispensable : React délègue ses écouteurs
    // (onDragStart/onDrop) à la racine du DOM et ne les reçoit qu'en phase
    // de bouillonnement.
    const errors = trackConsoleErrors(page);
    const labelText = "Léo (test e2e)";

    await page.getByRole("button", { name: "+ Ajouter une table" }).click();
    const table = page.getByTestId("classroom-table").first();
    await expect(table).toBeVisible();

    const labelsSection = page.locator('section[aria-labelledby="etiquettes"]');
    const unassignedList = labelsSection.locator("ul").first();

    await labelsSection.getByLabel("Prénom ou code").fill(labelText);
    await labelsSection.getByRole("button", { name: "Créer l'étiquette" }).click();

    const unplacedLabel = unassignedList.locator("li", { hasText: labelText });
    await expect(unplacedLabel).toBeVisible();

    const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
    await unplacedLabel.dispatchEvent("dragstart", { dataTransfer, bubbles: true, cancelable: true });
    await table.dispatchEvent("dragover", { dataTransfer, bubbles: true, cancelable: true });
    await table.dispatchEvent("drop", { dataTransfer, bubbles: true, cancelable: true });

    // La liste "non placée" retombe sur son message d'état vide.
    await expect(unassignedList.getByText("Toutes les étiquettes sont placées.")).toBeVisible();
    await expect(unassignedList.locator("li", { hasText: labelText })).toHaveCount(0);

    const retireButton = labelsSection.getByRole("button", {
      name: `Retirer ${labelText} de la table`,
    });
    await expect(retireButton).toBeVisible();

    await page.reload();
    await expect(
      page
        .locator('section[aria-labelledby="etiquettes"]')
        .getByRole("button", { name: `Retirer ${labelText} de la table` }),
    ).toBeVisible();

    expect(errors).toEqual([]);
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
