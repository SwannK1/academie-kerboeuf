import { expect, test } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

const STORAGE_KEY = "academie-kerboeuf-dossier-remplacant-v1";
const FIRST_TASK_LABEL = "Heure d'arrivée et modalités d'accueil du matin";

function expectNoHydrationErrors(errors: string[]) {
  expect(
    errors.filter((error) => /hydration|hydrating|react error #418/i.test(error)),
  ).toEqual([]);
}

test.describe("Dossier remplaçant — hydratation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("affiche un stockage vide sans erreur d'hydratation", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/dossier-remplacant");
    await expect(
      page.getByRole("heading", { name: "Préparer mon dossier remplaçant" }),
    ).toBeVisible();
    expectNoHydrationErrors(errors);
  });

  test("restaure un statut de tâche enregistré sans erreur d'hydratation", async ({
    page,
    context,
  }) => {
    await context.addInitScript(
      ({ key, taskId }) => {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            tasksBySection: {
              "horaires-recreations": [{ id: taskId, status: "termine" }],
            },
          }),
        );
      },
      { key: STORAGE_KEY, taskId: "horaires-recreations-default-0" },
    );

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/dossier-remplacant");

    const checkbox = page
      .getByText(FIRST_TASK_LABEL)
      .locator("..")
      .getByRole("checkbox");
    await expect(checkbox).toBeChecked();
    expectNoHydrationErrors(errors);

    await page.reload();
    await expect(checkbox).toBeChecked();
    expectNoHydrationErrors(errors);
  });

  test("ignore un stockage corrompu sans rendre la page inutilisable", async ({
    page,
    context,
  }) => {
    await context.addInitScript(({ key }) => {
      window.localStorage.setItem(key, "not-valid-json{{{");
    }, { key: STORAGE_KEY });

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/dossier-remplacant");
    await expect(
      page.getByRole("heading", { name: "Préparer mon dossier remplaçant" }),
    ).toBeVisible();
    const checkbox = page
      .getByText(FIRST_TASK_LABEL)
      .locator("..")
      .getByRole("checkbox");
    await expect(checkbox).not.toBeChecked();
    expectNoHydrationErrors(errors);
  });

  test("coche une tâche et la persiste après rechargement sans erreur d'hydratation", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/dossier-remplacant");

    const checkbox = page
      .getByText(FIRST_TASK_LABEL)
      .locator("..")
      .getByRole("checkbox");
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    expectNoHydrationErrors(errors);

    await page.reload();
    const persistedCheckbox = page
      .getByText(FIRST_TASK_LABEL)
      .locator("..")
      .getByRole("checkbox");
    await expect(persistedCheckbox).toBeChecked();
    expectNoHydrationErrors(errors);
  });
});
