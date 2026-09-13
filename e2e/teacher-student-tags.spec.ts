import { expect, test } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

function expectNoHydrationErrors(errors: string[]) {
  expect(
    errors.filter((error) => /hydration|hydrating|react error #418/i.test(error)),
  ).toEqual([]);
}

test.describe("Repères élève — plan de classe", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("un élève sans repère n'affiche que le bouton d'ajout", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/organisation-classe");
    await page.getByLabel("Prénom ou code").fill("Lina Martin");
    await page.getByLabel("Prénom ou code").press("Enter");

    const card = page.getByLabel("Modifier Lina Martin").locator("../..");
    await expect(card.getByRole("button", { name: "Ajouter un repère à Lina Martin" })).toBeVisible();
    expectNoHydrationErrors(errors);
  });

  test("ajoute un repère, il s'affiche immédiatement, puis persiste après refresh", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/organisation-classe");
    await page.getByLabel("Prénom ou code").fill("Lina Martin");
    await page.getByLabel("Prénom ou code").press("Enter");

    const card = page.getByLabel("Modifier Lina Martin").locator("../..");
    await card.getByRole("button", { name: "Ajouter un repère à Lina Martin" }).click();
    await card.getByRole("button", { name: "+ Lecture" }).click();

    const removeLecture = card.getByRole("button", {
      name: "Retirer le repère Lecture de Lina Martin",
    });
    await expect(removeLecture).toBeVisible();
    expectNoHydrationErrors(errors);

    await page.reload();
    const cardAfterReload = page.getByLabel("Modifier Lina Martin").locator("../..");
    await expect(
      cardAfterReload.getByRole("button", {
        name: "Retirer le repère Lecture de Lina Martin",
      }),
    ).toBeVisible();
    expectNoHydrationErrors(errors);
  });

  test("ajoute plusieurs repères sans doublon possible", async ({ page }) => {
    await page.goto("/enseignants/organisation-classe");
    await page.getByLabel("Prénom ou code").fill("Lina Martin");
    await page.getByLabel("Prénom ou code").press("Enter");

    const card = page.getByLabel("Modifier Lina Martin").locator("../..");
    await card.getByRole("button", { name: "Ajouter un repère à Lina Martin" }).click();
    await card.getByRole("button", { name: "+ Lecture" }).click();
    await card.getByRole("button", { name: "Ajouter un repère à Lina Martin" }).click();
    await card.getByRole("button", { name: "+ À aider" }).click();

    await expect(
      card.getByRole("button", { name: "Retirer le repère Lecture de Lina Martin" }),
    ).toBeVisible();
    await expect(
      card.getByRole("button", { name: "Retirer le repère À aider de Lina Martin" }),
    ).toBeVisible();
    // Un repère déjà attribué ne doit plus apparaître dans le sélecteur.
    await card.getByRole("button", { name: "Ajouter un repère à Lina Martin" }).click();
    await expect(card.getByRole("button", { name: "+ Lecture" })).toHaveCount(0);
  });

  test("retire un repère", async ({ page }) => {
    await page.goto("/enseignants/organisation-classe");
    await page.getByLabel("Prénom ou code").fill("Lina Martin");
    await page.getByLabel("Prénom ou code").press("Enter");

    const card = page.getByLabel("Modifier Lina Martin").locator("../..");
    await card.getByRole("button", { name: "Ajouter un repère à Lina Martin" }).click();
    await card.getByRole("button", { name: "+ Maths" }).click();
    const removeMaths = card.getByRole("button", {
      name: "Retirer le repère Maths de Lina Martin",
    });
    await expect(removeMaths).toBeVisible();

    await removeMaths.click();
    await expect(
      card.getByRole("button", { name: "Retirer le repère Maths de Lina Martin" }),
    ).toHaveCount(0);

    await page.reload();
    const cardAfterReload = page.getByLabel("Modifier Lina Martin").locator("../..");
    await expect(
      cardAfterReload.getByRole("button", { name: "Retirer le repère Maths de Lina Martin" }),
    ).toHaveCount(0);
  });
});
