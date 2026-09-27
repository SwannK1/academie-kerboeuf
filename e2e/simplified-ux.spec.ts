import { expect, test } from "@playwright/test";

test.describe("parcours UX simplifiés", () => {
  test("l’accueil met en avant les actions du jour", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Préparer sa classe/);
    await expect(page.getByRole("link", { name: /Trouver une ressource/ })).toHaveAttribute("href", "/ressources");
    await expect(page.getByRole("link", { name: /Préparer ma journée/ })).toHaveAttribute("href", "/enseigner");
    await expect(page.getByRole("link", { name: /Construire une séance/ })).toHaveAttribute("href", "/enseigner/semaine");
    await expect(page.getByRole("link", { name: /Voir ma progression/ })).toHaveAttribute("href", "/enseigner/periode");
  });

  test("les niveaux mènent directement de CE1 à Français", async ({ page }) => {
    await page.goto("/primaire");
    await page.locator('main a[href="/primaire/ce1"]').first().click();
    await page.locator('main a[href="/primaire/ce1/matieres/francais"]').first().click();

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
      await page.goto("/primaire");
      await page.locator(`main a[href="/primaire/${journey.level}"]`).first().click();

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

  test("l’espace Enseigner expose ses vues de travail", async ({ page }) => {
    await page.goto("/enseigner");

    const nav = page.getByRole("navigation", { name: "Enseigner" });
    for (const tab of ["Aujourd'hui", "Ma semaine", "Ma période", "Mon année", "Ma classe"]) {
      await expect(nav.getByRole("link", { name: tab, exact: true })).toBeVisible();
    }
  });

  test("le parcours semaine mène au cahier journal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Préparer ma journée/ }).click();
    // Une seule question si le niveau n'est pas encore connu.
    await page.getByRole("radio", { name: "CE1" }).click();
    await page.getByRole("navigation", { name: "Enseigner" }).getByRole("link", { name: "Ma semaine" }).click();
    await page.getByRole("link", { name: /Cahier journal/ }).click();

    await expect(page).toHaveURL(/\/enseigner\/cahier-journal\?semaine=/);
  });

  test("les titres utilisent une seule fois le nom du site", async ({ page }) => {
    for (const route of ["/enseigner", "/enseigner/semaine", "/direction", "/primaire/ce1", "/primaire/ce1/matieres/francais"]) {
      await page.goto(route);
      expect((await page.title()).match(/Académie Kerboeuf/g)).toHaveLength(1);
    }
  });
});
