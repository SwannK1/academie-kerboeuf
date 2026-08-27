import { expect, test } from "@playwright/test";
import catalog from "../content/secondary-resource-catalog.generated.json";
import { trackConsoleErrors } from "./utils/console-errors";

const levelRoutes = ["/college", "/college/6e", "/college/5e", "/college/4e", "/college/3e", "/lycee", "/lycee/seconde"];
const baseFor = (level: string) => level === "seconde" ? "/lycee/seconde" : `/college/${level}`;
const representativeCompetencies = [...new Map(
  catalog.map((item) => [`${item.level}/${item.subject}`, item]),
).values()];

test.describe("Catalogue PDF secondaire", () => {
  for (const route of levelRoutes) {
    test(`${route} est navigable sans erreur ni débordement`, async ({ page }) => {
      const consoleErrors = trackConsoleErrors(page);
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
      expect(consoleErrors).toEqual([]);
    });
  }

  for (const item of representativeCompetencies) {
    test(`${item.level}/${item.subject}/${item.competency} expose son triplet PDF`, async ({ page }) => {
      const consoleErrors = trackConsoleErrors(page);
      const response = await page.goto(`${baseFor(item.level)}/${item.subject}/${item.competency}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator('a[href$=".pdf"]')).toHaveCount(3);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
      expect(consoleErrors).toEqual([]);
    });
  }

  test("chaque PDF catalogué répond en application/pdf", async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "Audit HTTP exhaustif exécuté une seule fois");
    const hrefs = catalog.flatMap((item) => item.resources.map((resource) => resource.href));
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
      expect(response.headers()["content-type"], href).toContain("application/pdf");
    }
  });

  test("les routes secondaires inconnues répondent 404", async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "Audit 404 exécuté une seule fois");
    for (const route of ["/college/inconnu", "/college/6e/inconnue", "/college/6e/francais/inconnue", "/lycee/inconnu", "/lycee/seconde/inconnue", "/lycee/seconde/francais/inconnue"]) {
      expect((await request.get(route)).status(), route).toBe(404);
    }
  });
});
