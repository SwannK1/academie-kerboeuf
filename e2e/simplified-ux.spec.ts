import { expect, test } from "@playwright/test";

test.describe("parcours UX simplifiés", () => {
  test("l’accueil présente deux décisions dominantes", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Que voulez-vous faire aujourd’hui|Que voulez-vous faire aujourd'hui/,
    );
    await expect(page.getByRole("link", { name: /Je cherche une ressource/ })).toHaveAttribute(
      "href",
      "/ressources",
    );
    await expect(page.getByRole("link", { name: /Je prépare ma classe/ })).toHaveAttribute(
      "href",
      "/enseignants",
    );
  });

  test("Ressources mène directement de CE1 à Français", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Je cherche une ressource/ }).click();
    await page.locator('main a[href="/primaire/ce1"]').click();
    await page.locator('main a[href="/primaire/ce1/matieres/francais"]').click();

    await expect(page).toHaveURL("/primaire/ce1/matieres/francais");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Français");
    await expect(page.getByText("CE1 · Cycle 2")).toBeVisible();
    await expect(page.getByText("CE1 · Cycle 3")).toHaveCount(0);
  });

  test("CE1 et CM2 partagent le même modèle matière", async ({ page }) => {
    for (const route of ["/primaire/ce1", "/primaire/cm2"]) {
      await page.goto(route);
      await expect(page.getByRole("link", { name: /Français/ }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Mathématiques/ }).first()).toBeVisible();
    }
  });

  for (const journey of [
    {
      level: "cp",
      levelLabel: "CP",
      subject: "francais",
      subjectLabel: "Français",
      resource: "/primaire/cp/programmes/francais/lecture-comprehension",
    },
    {
      level: "ce2",
      levelLabel: "CE2",
      subject: "francais",
      subjectLabel: "Français",
      resource: "/primaire/ce2/programmes/francais/lecture-comprehension",
    },
    {
      level: "cm1",
      levelLabel: "CM1",
      subject: "mathematiques",
      subjectLabel: "Mathématiques",
      resource: "/primaire/cm1/programmes/mathematiques/calcul-pose",
    },
  ]) {
    test(`${journey.levelLabel} suit le parcours niveau → matière → ressource`, async ({
      page,
    }) => {
      await page.goto("/ressources");
      await page.locator(`main a[href="/primaire/${journey.level}"]`).click();

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        `Ressources ${journey.levelLabel}`,
      );
      await page
        .locator(
          `main a[href="/primaire/${journey.level}/matieres/${journey.subject}"]`,
        )
        .click();

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        journey.subjectLabel,
      );
      await expect(page.getByText("Voir le programme détaillé")).toHaveCount(0);
      await page.locator(`main a[href="${journey.resource}"]`).click();

      await expect(page).toHaveURL(journey.resource);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("les cinq niveaux présentent des matières explicites", async ({ page }) => {
    for (const level of ["cp", "ce1", "ce2", "cm1", "cm2"]) {
      await page.goto(`/primaire/${level}`);
      await expect(page.getByRole("link", { name: /Français/ }).first()).toBeVisible();
      await expect(
        page.getByRole("link", { name: /Mathématiques/ }).first(),
      ).toBeVisible();
    }
  });

  test("l’espace enseignants expose quatre entrées principales", async ({ page }) => {
    await page.goto("/enseignants");

    const hubs = ["Mon année", "Ma semaine", "Ma classe", "Tous les outils"];
    for (const hub of hubs) {
      await expect(page.getByRole("link", { name: new RegExp(hub) })).toBeVisible();
    }
    await expect(page.locator("main h2")).toHaveCount(4);
  });

  test("le parcours semaine conserve le cahier journal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Je prépare ma classe/ }).click();
    await page.getByRole("link", { name: /Ma semaine/ }).click();
    await page.getByRole("link", { name: /Cahier journal/ }).click();

    await expect(page).toHaveURL("/enseignants/cahier-journal");
  });

  test("les titres utilisent une seule fois le nom du site", async ({ page }) => {
    for (const route of ["/enseignants", "/primaire/ce1", "/primaire/ce1/matieres/francais"]) {
      await page.goto(route);
      expect((await page.title()).match(/Académie Kerboeuf/g)).toHaveLength(1);
    }
  });
});
