import { expect, test } from "@playwright/test";

const representativeRoutes = [
  "/",
  "/maternelle",
  "/maternelle/ms",
  "/primaire",
  "/primaire/cp",
  "/primaire/ce1",
  "/primaire/ce2",
  "/primaire/cm1",
  "/primaire/cm2",
  "/college",
  "/college/6e",
  "/lycee",
  "/lycee/seconde",
  "/missions-recentes",
  "/programmation",
  "/personnages/professeurs",
  "/enseignants",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/contact",
] as const;

test.describe("audit public représentatif", () => {
  for (const route of representativeRoutes) {
    test(`${route} reste utilisable sans erreur runtime`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      const failedRequests: string[] = [];
      const httpErrors: string[] = [];

      page.on("console", (message) => {
        if (message.type() === "error") runtimeErrors.push(message.text());
      });
      page.on("pageerror", (error) => runtimeErrors.push(error.message));
      page.on("requestfailed", (request) => {
        const url = new URL(request.url());
        if (url.origin === new URL(page.url()).origin) {
          failedRequests.push(`${request.method()} ${url.pathname}`);
        }
      });
      page.on("response", (response) => {
        if (response.status() >= 400) {
          httpErrors.push(`${response.status()} ${new URL(response.url()).pathname}`);
        }
      });

      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("main#contenu-principal")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      ).toBe(true);
      expect(runtimeErrors).toEqual([]);
      expect(failedRequests).toEqual([]);
      expect(httpErrors).toEqual([]);
    });
  }

  test("une ressource PDF publique conserve son type MIME", async ({ page, request }) => {
    await page.goto("/primaire/ce1/programmes/francais/comprehension");
    const href = await page.locator('a[href$=".pdf"]').first().getAttribute("href");
    expect(href).toBeTruthy();

    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });
});
