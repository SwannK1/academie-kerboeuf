import { expect, test } from "@playwright/test";

const primaryRoutes = [
  "/primaire",
  "/maternelle/ms",
  "/primaire/cp",
  "/primaire/ce1",
  "/primaire/ce2",
  "/primaire/cm1",
  "/primaire/cm2",
  "/maternelle/ms/domaines/langage",
  "/primaire/cp/matieres/francais",
  "/primaire/ce1/matieres/francais",
  "/primaire/ce2/matieres/mathematiques",
  "/primaire/cm1/matieres/francais",
  "/primaire/cm2/matieres/francais",
];

test.describe("Académie Primaire intégrée", () => {
  for (const route of primaryRoutes) {
    test(`${route} répond sans erreur ni débordement`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("body")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      ).toBe(true);
      expect(errors).toEqual([]);
    });
  }

  test("CE1 compréhension publie exactement les 25 tapuscrits valides", async ({
    page,
    request,
  }) => {
    await page.goto("/primaire/ce1/programmes/francais/comprehension");
    const hrefs = await page.locator('a[href$=".pdf"]').evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href")),
    );
    expect(hrefs).toHaveLength(25);
    for (const href of hrefs) {
      expect(href).toBeTruthy();
      const response = await request.get(href!);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/pdf");
    }
  });

  test("la navigation retour conserve le parcours matière vers ressources", async ({ page }) => {
    await page.goto("/primaire/ce1/matieres/francais");
    await page.goto("/primaire/ce1/programmes/francais/comprehension");
    await page.goBack();
    await expect(page).toHaveURL(/\/primaire\/ce1\/matieres\/francais$/);
  });

  test("une fiche CM2 et son PDF restent accessibles", async ({ page, request }) => {
    const route = "/primaire/cm2/fiches/francais/futur-simple/f1";
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const href = await page.locator('a[href$=".pdf"]').first().getAttribute("href");
    expect(href).toBeTruthy();
    const pdf = await request.get(href!);
    expect(pdf.status()).toBe(200);
    expect(pdf.headers()["content-type"]).toContain("application/pdf");
  });
});
