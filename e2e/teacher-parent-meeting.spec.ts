import { expect, test } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

const STORAGE_KEY = "academie-kerboeuf-reunion-parents-v1";

function expectNoHydrationErrors(errors: string[]) {
  expect(
    errors.filter((error) => /hydration|hydrating|react error #418/i.test(error)),
  ).toEqual([]);
}

test.describe("Réunion parents", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("affiche un état vide sans erreur d'hydratation", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/reunion-parents");
    await expect(
      page.getByRole("heading", { name: "Préparer la réunion parents" }),
    ).toBeVisible();
    await expect(page.getByLabel("Date", { exact: true })).toHaveValue("");
    await expect(page.getByText("0 / 4 tâches terminées")).toBeVisible();
    expectNoHydrationErrors(errors);
  });

  test("crée, sauvegarde et persiste une réunion après refresh", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/reunion-parents");

    await page.getByLabel("Date", { exact: true }).fill("2026-10-05");
    await page.getByLabel("Ordre du jour", { exact: true }).fill("Présentation du programme de la période");
    await page.getByLabel("Documents à distribuer", { exact: true }).fill("Livret scolaire");
    await page.getByLabel("Questions à anticiper", { exact: true }).fill("Modalités des devoirs");
    await page.getByLabel("Ajouter une tâche", { exact: true }).fill("Réserver la salle");
    await page.getByRole("button", { name: "Ajouter" }).click();

    await expect(page.getByText("Réserver la salle")).toBeVisible();
    await expect(page.getByText("0 / 5 tâches terminées")).toBeVisible();
    expectNoHydrationErrors(errors);

    await page.reload();
    await expect(page.getByLabel("Date", { exact: true })).toHaveValue("2026-10-05");
    await expect(page.getByLabel("Ordre du jour", { exact: true })).toHaveValue(
      "Présentation du programme de la période",
    );
    await expect(page.getByLabel("Documents à distribuer", { exact: true })).toHaveValue("Livret scolaire");
    await expect(page.getByLabel("Questions à anticiper", { exact: true })).toHaveValue(
      "Modalités des devoirs",
    );
    await expect(page.getByText("Réserver la salle")).toBeVisible();
    expectNoHydrationErrors(errors);
  });

  test("modifie une réunion existante et la persiste après refresh", async ({ page }) => {
    await page.goto("/enseignants/reunion-parents");
    await page.getByLabel("Ordre du jour", { exact: true }).fill("Premier ordre du jour");
    await page.reload();

    await page.getByLabel("Ordre du jour", { exact: true }).fill("Ordre du jour modifié");
    await page.reload();
    await expect(page.getByLabel("Ordre du jour", { exact: true })).toHaveValue("Ordre du jour modifié");
  });

  test("coche puis supprime une tâche, l'état survit au refresh", async ({ page }) => {
    await page.goto("/enseignants/reunion-parents");

    const firstTask = page.getByText("Date arrêtée").locator("..");
    await firstTask.getByRole("checkbox").check();
    await page.reload();
    await expect(
      page.getByText("Date arrêtée").locator("..").getByRole("checkbox"),
    ).toBeChecked();

    await page
      .getByRole("button", { name: "Supprimer la tâche : Date arrêtée" })
      .click();
    await expect(page.getByText("Date arrêtée")).toHaveCount(0);
    await page.reload();
    await expect(page.getByText("Date arrêtée")).toHaveCount(0);
  });

  test("ignore un stockage corrompu sans rendre la page inutilisable", async ({
    page,
    context,
  }) => {
    await context.addInitScript(({ key }) => {
      window.localStorage.setItem(key, "not-valid-json{{{");
    }, { key: STORAGE_KEY });

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/reunion-parents");
    await expect(
      page.getByRole("heading", { name: "Préparer la réunion parents" }),
    ).toBeVisible();
    await expect(page.getByText("0 / 4 tâches terminées")).toBeVisible();
    expectNoHydrationErrors(errors);
  });

  test("restaure une réunion déjà enregistrée sans erreur d'hydratation", async ({
    page,
    context,
  }) => {
    await context.addInitScript(
      ({ key }) => {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            tasks: [{ id: "reunion-parents-default-0", label: "Date arrêtée", isDone: true }],
            meeting: { date: "2026-11-12", agenda: "", documents: "", questions: "" },
          }),
        );
      },
      { key: STORAGE_KEY },
    );

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/reunion-parents");
    await expect(page.getByLabel("Date", { exact: true })).toHaveValue("2026-11-12");
    expectNoHydrationErrors(errors);
  });

  test("isole les données entre deux navigateurs distincts", async ({ browser }) => {
    const contextA = await browser.newContext();
    const pageA = await contextA.newPage();
    await pageA.goto("/enseignants/reunion-parents");
    await pageA.getByLabel("Ordre du jour", { exact: true }).fill("Ordre du jour de l'enseignant A");
    await pageA.waitForFunction(
      (key) => (localStorage.getItem(key) ?? "").includes("Ordre du jour de l'enseignant A"),
      STORAGE_KEY,
    );

    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();
    await pageB.goto("/enseignants/reunion-parents");
    await expect(pageB.getByLabel("Ordre du jour", { exact: true })).toHaveValue("");
    await expect(pageB.getByText("Ordre du jour de l'enseignant A")).toHaveCount(0);

    await contextA.close();
    await contextB.close();
  });
});
