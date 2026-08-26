import { expect, test } from "@playwright/test";
import { publishedSubdomainPages } from "../content/levels/published-subdomain-pages";
import { trackConsoleErrors } from "./utils/console-errors";

const scopedCatalogs = publishedSubdomainPages.filter((page) =>
  ["cp", "ce2", "cm1"].includes(page.level) &&
  page.route !== "/primaire/cp/programmes/francais/lecture-comprehension",
);

test.describe("Catalogues PDF MS, CP, CE2 et CM1", () => {
  for (const catalog of scopedCatalogs) {
    test(`${catalog.label} expose uniquement des PDF valides`, async ({
      page,
      request,
    }) => {
      const consoleErrors = trackConsoleErrors(page);
      const response = await page.goto(catalog.route);

      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const pdfLinks = await page.locator('a[href$=".pdf"]').evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute("href")),
      );

      expect(pdfLinks.length).toBeGreaterThan(0);
      for (const href of pdfLinks) {
        expect(href).toBeTruthy();
        const pdfResponse = await request.get(href!);
        expect(pdfResponse.status(), href!).toBe(200);
        expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");
      }

      expect(consoleErrors).toEqual([]);
    });
  }

  test("le catalogue MS Langage expose les neuf PDF sans débordement", async ({
    page,
    request,
  }) => {
    const consoleErrors = trackConsoleErrors(page);
    await page.goto("/maternelle/ms/domaines/langage");

    const pdfLinks = await page.locator('a[href$=".pdf"]').evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href")),
    );

    expect(pdfLinks).toHaveLength(9);
    for (const href of pdfLinks) {
      const pdfResponse = await request.get(href!);
      expect(pdfResponse.status(), href!).toBe(200);
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });
});
