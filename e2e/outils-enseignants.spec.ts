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

// L'en-tête du site est fixe (position: fixed, z-50) et reste au-dessus du
// contenu quel que soit le défilement. locator.click() refait son propre
// scroll "nearest" juste avant de cliquer (vérification d'actionabilité
// Playwright), ce qui peut réaligner l'élément pile sous le bord de l'en-tête
// et faire intercepter le clic — même après un scrollIntoView manuel
// préalable. On centre l'élément puis on clique directement aux coordonnées
// obtenues (souris), qui ne redéclenche pas de scroll automatique.
async function clickCentered(
  page: import("@playwright/test").Page,
  locator: import("@playwright/test").Locator,
) {
  // behavior: "instant" est indispensable — le <html> du site a la classe
  // Tailwind "scroll-smooth" (scroll-behavior: smooth), donc un scrollIntoView
  // sans behavior explicite s'anime et la position lue juste après serait
  // celle du milieu de l'animation, pas la position finale.
  await locator.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
  const box = await locator.boundingBox();
  if (!box) throw new Error("Élément introuvable pour le clic centré");
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

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
    // Ciblée par son nom accessible plutôt que par position structurelle
    // (l'ordre des listes de la section n'est pas un contrat d'API stable).
    const unassignedList = labelsSection.getByRole("list", { name: "Étiquettes non placées" });

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

  test("agrandir, réduire, dupliquer et supprimer une table", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.getByRole("button", { name: "+ Ajouter une table" }).click();
    const table = page.getByTestId("classroom-table").first();

    const widthBefore = await table.evaluate((el) => (el as HTMLElement).style.width);
    await clickCentered(page, page.getByRole("button", { name: "Agrandir la table" }));
    await expect
      .poll(() => table.evaluate((el) => (el as HTMLElement).style.width))
      .not.toBe(widthBefore);

    const widthAfterGrow = await table.evaluate((el) => (el as HTMLElement).style.width);
    await clickCentered(page, page.getByRole("button", { name: "Réduire la table" }));
    await expect
      .poll(() => table.evaluate((el) => (el as HTMLElement).style.width))
      .not.toBe(widthAfterGrow);

    await clickCentered(page, page.getByRole("button", { name: "Dupliquer la table" }));
    await expect(page.getByTestId("classroom-table")).toHaveCount(2);

    // La copie (décalée de +20/+20 par duplicateTable) chevauche l'original
    // et se retrouve visuellement au-dessus (ajoutée après dans le DOM) :
    // on cible celle-ci (.last()), directement cliquable à ses coordonnées,
    // plutôt que l'original partiellement recouvert.
    await clickCentered(page, page.getByRole("button", { name: "Supprimer la table" }).last());
    await expect(page.getByTestId("classroom-table")).toHaveCount(1);

    expect(errors).toEqual([]);
  });

  test("les boutons d'action d'une table restent activables au clavier (focus + Entrée)", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.getByRole("button", { name: "+ Ajouter une table" }).click();
    const table = page.getByTestId("classroom-table").first();

    const rotateButton = page.getByRole("button", { name: "Pivoter la table" });
    const transformBefore = await table.evaluate((el) => (el as HTMLElement).style.transform);
    await rotateButton.focus();
    await expect(rotateButton).toBeFocused();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => table.evaluate((el) => (el as HTMLElement).style.transform))
      .not.toBe(transformBefore);

    expect(errors).toEqual([]);
  });

  test("déplacer un élève d'une table vers une autre (retirer puis replacer), persisté après rechargement", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    const labelText = "Léo (déplacement e2e)";

    await page.getByRole("button", { name: "+ Ajouter une table" }).click();
    await page.getByRole("button", { name: "+ Ajouter une table" }).click();
    const tables = page.getByTestId("classroom-table");
    const firstTable = tables.nth(0);
    const secondTable = tables.nth(1);

    // Les deux tables par défaut (90×56, décalées de 20px) se chevauchent :
    // on écarte la seconde avant toute interaction pour que chaque bouton
    // "Placer ici" reste cliquable sans ambiguïté de superposition. La
    // dépose vise un point calculé à l'intérieur de la surface (70%/60%
    // plutôt que des coordonnées écran arbitraires) pour garder assez de
    // marge : trop près d'un bord, le bouton "Placer ici" (qui déborde du
    // cadre visuel de la table) serait rogné par le overflow-hidden de la
    // surface et donc non cliquable malgré des coordonnées DOM valides.
    const canvasBox = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="classroom-table"]')!.parentElement!;
      const rect = el.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    });
    await secondTable.scrollIntoViewIfNeeded();
    await secondTable.hover({ position: { x: 6, y: 6 } });
    await page.mouse.down();
    await page.mouse.move(
      canvasBox.x + canvasBox.width * 0.7,
      canvasBox.y + canvasBox.height * 0.6,
      { steps: 10 },
    );
    await page.mouse.up();

    const labelsSection = page.locator('section[aria-labelledby="etiquettes"]');
    await labelsSection.getByLabel("Prénom ou code").fill(labelText);
    await labelsSection.getByRole("button", { name: "Créer l'étiquette" }).click();

    // Placement initial sur la première table, par sélection puis "Placer ici"
    // (chemin clavier/pointeur, sans glisser-déposer natif).
    await labelsSection.getByRole("button", { name: labelText, exact: true }).click();
    await clickCentered(
      page,
      firstTable.getByRole("button", { name: /Placer l'étiquette sélectionnée/ }),
    );
    await expect(firstTable.getByText(labelText, { exact: true })).toBeVisible();
    await expect(secondTable.getByText(labelText, { exact: true })).toHaveCount(0);

    // Déplacement vers la seconde table : retirer puis replacer ailleurs.
    await clickCentered(
      page,
      labelsSection.getByRole("button", { name: `Retirer ${labelText} de la table` }),
    );
    await labelsSection.getByRole("button", { name: labelText, exact: true }).click();
    await clickCentered(
      page,
      secondTable.getByRole("button", { name: /Placer l'étiquette sélectionnée/ }),
    );

    await expect(secondTable.getByText(labelText, { exact: true })).toBeVisible();
    await expect(firstTable.getByText(labelText, { exact: true })).toHaveCount(0);

    await page.reload();
    const tablesAfterReload = page.getByTestId("classroom-table");
    await expect(tablesAfterReload.nth(1).getByText(labelText, { exact: true })).toBeVisible();
    await expect(tablesAfterReload.nth(0).getByText(labelText, { exact: true })).toHaveCount(0);

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
