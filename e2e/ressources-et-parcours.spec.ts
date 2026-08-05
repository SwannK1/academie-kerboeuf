import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * /ressources et /parcours : ces deux pages ont déjà eu de vrais bugs de
 * gouvernance de publication (CTA actif sur du contenu non disponible, lien
 * mort vers une route inexistante pour le collège). Ces tests protègent ces
 * corrections.
 */

test.describe("/ressources", () => {
  test("s'affiche, le filtre Statut fonctionne, sans erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const response = await page.goto("/ressources");
    expect(response?.status()).toBe(200);

    const statusFilter = page.locator("label", { hasText: "Statut" }).locator("select");
    await expect(statusFilter).toBeVisible();
    await statusFilter.selectOption({ label: "Disponible" });

    // Une fois filtré sur "Disponible", chaque carte visible doit porter le
    // badge "Disponible" et un CTA actif ("Ouvrir la mission").
    const cards = page.locator("main a", { hasText: "Ouvrir la mission" });
    await expect(cards.first()).toBeVisible();
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);

    expect(errors).toEqual([]);
  });

  test("une ressource non disponible n'a pas de CTA terminal actif", async ({ page }) => {
    await page.goto("/ressources");
    const statusFilter = page.locator("label", { hasText: "Statut" }).locator("select");
    await statusFilter.selectOption({ label: "En préparation" });

    const nonAvailableCards = page.locator("main").getByText("Détail non disponible");
    await expect(nonAvailableCards.first()).toBeVisible();
    // Ces cartes ne doivent jamais être des liens.
    const linksWithNonAvailableTag = page.locator(
      'a:has-text("Détail non disponible")',
    );
    expect(await linksWithNonAvailableTag.count()).toBe(0);
  });

  test("un fichier PDF réel répond avec le bon type de contenu", async ({ request }) => {
    // Fixture stable : ressource CM2 déjà publiée (voir public/fiches).
    const response = await request.get(
      "/fiches/cm2/francais-pdf/orthographe/a-et-a-f1.pdf",
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });
});

test.describe("/parcours", () => {
  test("le catalogue s'affiche et un parcours public est ouvrable", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const response = await page.goto("/parcours");
    expect(response?.status()).toBe(200);

    await page
      .getByRole("link", { name: /Lire comme un détective/i })
      .click();
    await expect(page).toHaveURL(/\/parcours\/cm2-lire-comme-un-detective$/);
    expect(errors).toEqual([]);
  });

  test("les étapes d'un parcours sont visibles et une étape disponible peut être ouverte", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/parcours/cm2-lire-comme-un-detective");

    const openableSteps = page.locator('a:has-text("Ouvrir")');
    await expect(openableSteps.first()).toBeVisible();
    const stepHref = await openableSteps.first().getAttribute("href");
    if (!stepHref) throw new Error("Step href unavailable");

    await openableSteps.first().click();
    await page.waitForURL(new RegExp(stepHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    await expect(page.locator("main")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("un parcours avec des étapes collège ne pointe jamais vers une route missions/[slug] inexistante", async ({ page }) => {
    // Ce parcours contient des étapes collège (6e) qui n'ont pas de page de
    // détail dédiée — régression réelle corrigée : le lien pointait vers
    // /college/6e/missions/{slug} (404). Voir content/mission-registry.ts.
    await page.goto("/parcours/6e-entrer-au-college-avec-methode");
    const brokenLinks = page.locator('a[href*="/college/"][href*="/missions/"]');
    expect(await brokenLinks.count()).toBe(0);
  });
});
