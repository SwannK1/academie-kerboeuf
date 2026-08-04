import { test, expect, type Locator, type Page } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * `locator.dragTo()` (glisser-déposer piloté par la souris) ne déclenche pas
 * de façon fiable le drag HTML5 natif ici — on envoie donc directement la
 * séquence d'événements `DragEvent` (dragstart → dragover → drop → dragend),
 * l'alternative documentée par Playwright : https://playwright.dev/docs/input#dragging-manually
 * `bubbles: true` est indispensable : par défaut `dispatchEvent` crée un
 * événement qui ne bouillonne pas, or React délègue ses écouteurs
 * (`onDragStart`/`onDrop`) à la racine du DOM et ne les reçoit qu'en phase
 * de bouillonnement — sans ce flag, aucun des deux handlers ne s'exécute.
 */
async function nativeDragAndDrop(page: Page, source: Locator, target: Locator) {
  // Pas de "dragend" : ce composant n'a pas de onDragEnd, et une fois le
  // drop traité, `source` (locator relatif à la liste "non placée") ne
  // résout plus rien puisque l'étiquette a changé de liste.
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
  await source.dispatchEvent("dragstart", { dataTransfer, bubbles: true, cancelable: true });
  await target.dispatchEvent("dragover", { dataTransfer, bubbles: true, cancelable: true });
  await target.dispatchEvent("drop", { dataTransfer, bubbles: true, cancelable: true });
}

/**
 * Plan de classe et groupes — table + étiquette, glisser-déposer d'une
 * étiquette sur une table, conservation de l'affectation, persistance
 * (sauvegarde automatique locale à chaque changement, cf.
 * TeacherClassroomLayoutClient.tsx — useEffect sur [tables, labels, ...]).
 *
 * La section "Étiquettes" rend la même étiquette dans jusqu'à 3 listes
 * (non placée ; placée ; bouton "Supprimer"), chacune avec "Léo" comme
 * texte direct du <li> — la liste "non placée" est donc ciblée par ordre
 * structurel (premier <ul> de la section, toujours présent en premier dans
 * le DOM), pas par son texte.
 */

const LABEL_TEXT = "Léo (test e2e)";

test.describe("Plan de classe et groupes", () => {
  test("ajouter une table, glisser une étiquette dessus, et retrouver l'affectation après rechargement", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/organisation-classe");

    await expect(page.getByRole("heading", { name: "Surface de la salle" })).toBeVisible();

    await page.getByRole("button", { name: "+ Ajouter une table" }).click();
    const table = page.getByRole("button", { name: "Pivoter la table" }).locator("xpath=../..");
    await expect(table).toBeVisible();

    const labelsSection = page.locator('section[aria-labelledby="etiquettes"]');
    const unassignedList = labelsSection.locator("ul").first();

    await labelsSection.getByLabel("Prénom ou code").fill(LABEL_TEXT);
    await labelsSection.getByRole("button", { name: "Créer l'étiquette" }).click();

    const unplacedLabel = unassignedList.locator("li", { hasText: LABEL_TEXT });
    await expect(unplacedLabel).toBeVisible();

    await nativeDragAndDrop(page, unplacedLabel, table);

    // La liste "non placée" retombe sur son message d'état vide : plus aucun
    // <li> pour cette étiquette.
    await expect(unassignedList.getByText("Toutes les étiquettes sont placées.")).toBeVisible();
    await expect(unassignedList.locator("li", { hasText: LABEL_TEXT })).toHaveCount(0);

    await expect(labelsSection.getByText("Étiquettes placées")).toBeVisible();
    const retireButton = labelsSection.getByRole("button", {
      name: `Retirer ${LABEL_TEXT} de la table`,
    });
    await expect(retireButton).toBeVisible();

    await page.reload();
    await expect(page.getByRole("button", { name: "Pivoter la table" })).toBeVisible();
    await expect(
      page
        .locator('section[aria-labelledby="etiquettes"]')
        .getByRole("button", { name: `Retirer ${LABEL_TEXT} de la table` }),
    ).toBeVisible();

    expect(errors).toEqual([]);
  });
});
