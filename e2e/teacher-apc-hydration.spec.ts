import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

const STORAGE_KEY = "academie-kerboeuf-apc-v1";

const SAMPLE_SESSION = {
  id: "apc-hydration-e2e-session",
  title: "Séance hydratation E2E",
  level: "CE1",
  axis: "lecture",
  objective: "",
  period: "periode-1",
  duration: "",
  material: "",
  outline: "",
  collectiveSummary: "",
  status: "a-preparer",
  checklist: [],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

function expectNoHydrationErrors(errors: string[]) {
  expect(
    errors.filter((error) =>
      /hydration|hydrating|react error #418/i.test(error),
    ),
  ).toEqual([]);
}

test.describe("Préparer mes APC — hydratation", () => {
  test("affiche un stockage vide sans erreur d'hydratation", async ({ page }) => {
    const errors = trackConsoleErrors(page);

    await page.goto("/enseignants/apc");
    await expect(
      page.getByRole("heading", { name: "Mes séances et cycles d'APC" }),
    ).toBeVisible();
    await expect(
      page.getByText("Aucune séance ou cycle d'APC pour ces filtres"),
    ).toBeVisible();

    expectNoHydrationErrors(errors);
  });

  test("restaure une séance enregistrée sans erreur d'hydratation", async ({
    page,
    context,
  }) => {
    await context.addInitScript(
      ({ key, session }) => {
        window.localStorage.setItem(key, JSON.stringify([session]));
      },
      { key: STORAGE_KEY, session: SAMPLE_SESSION },
    );

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/apc");

    const session = page.getByText("Séance hydratation E2E");
    await expect(session).toBeVisible();
    expectNoHydrationErrors(errors);

    await page.reload();
    await expect(session).toBeVisible();
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
    await page.goto("/enseignants/apc");

    await expect(
      page.getByRole("heading", { name: "Mes séances et cycles d'APC" }),
    ).toBeVisible();
    await expect(
      page.getByText("Aucune séance ou cycle d'APC pour ces filtres"),
    ).toBeVisible();
    expectNoHydrationErrors(errors);
  });

  test("persiste une séance créée après rechargement", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/apc");

    await page.getByRole("button", { name: "+ Nouvelle séance ou cycle" }).click();
    await page.getByLabel("Titre").fill("Séance créée par le test");
    await page.getByRole("button", { name: "Terminer" }).click();

    const created = page.getByText("Séance créée par le test");
    await expect(created).toBeVisible();
    expectNoHydrationErrors(errors);

    await page.reload();
    await expect(created).toBeVisible();
    expectNoHydrationErrors(errors);
  });
});
