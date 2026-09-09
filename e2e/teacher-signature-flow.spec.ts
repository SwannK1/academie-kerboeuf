import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Parcours signature : COMPÉTENCE → PRÉPARER CETTE COMPÉTENCE → SÉANCE →
 * AJOUTER À MA SEMAINE → CAHIER JOURNAL.
 *
 * Scénarios auto-suffisants : les URL de pré-remplissage sont construites
 * directement plutôt que de dépendre d'une compétence ayant déjà des
 * ressources PDF liées en dur dans le contenu (aucune n'en a encore).
 */

test.describe("Parcours signature — préparer une compétence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("CTA depuis une page compétence pré-remplit la séance", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/primaire/ce1/competences");

    const cta = page.getByRole("link", { name: "Préparer cette compétence →" }).first();
    await expect(cta).toBeVisible();
    await cta.click();

    await expect(page).toHaveURL(/\/enseignants\/preparer-une-seance/);
    await expect(page.getByRole("heading", { name: "Préparer une séance" })).toBeVisible();
    await expect(page.getByLabel("Titre")).not.toHaveValue("");
    await expect(page.getByLabel("Niveau")).toHaveValue("ce1");
    expect(errors.filter((e) => !e.includes("access control checks"))).toEqual([]);
  });

  test("les ressources transmises apparaissent comme matériel avec lien, sans doublon au rechargement", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    const ressources = encodeURIComponent(
      JSON.stringify([
        { label: "Leçon PDF", href: "/primaire/ce1/programmes/francais/comprehension" },
        { label: "Exercices PDF", href: "/primaire/ce1/programmes/francais/orthographe" },
      ]),
    );
    await page.goto(
      `/enseignants/preparer-une-seance?competence=Comparer%20des%20nombres&level=ce1&matiere=Math%C3%A9matiques&domaine=Nombres&objectif=Comparer%20deux%20nombres&ressources=${ressources}`,
    );

    // URL nettoyée après consommation des paramètres.
    await expect(page).toHaveURL("/enseignants/preparer-une-seance");
    await expect(page.getByLabel("Titre")).toHaveValue("Comparer des nombres");

    const materialSection = page.locator("details", { has: page.getByText("Matériel et supports") });
    await expect(materialSection.locator('input[value="Leçon PDF"]')).toBeVisible();
    await expect(materialSection.locator('input[value="Exercices PDF"]')).toBeVisible();
    await expect(materialSection.getByRole("link", { name: "Ouvrir" }).first()).toBeVisible();

    // Un rechargement de l'URL nettoyée (sans "competence=") ne doit pas
    // recréer une séance : il ramène directement à la liste, avec une seule
    // occurrence de la séance déjà créée.
    await page.reload();
    await expect(page.getByRole("heading", { name: "Créer une séance" })).toBeVisible();
    await expect(page.getByText("Comparer des nombres")).toHaveCount(1);
    expect(errors.filter((e) => !e.includes("access control checks"))).toEqual([]);
  });

  test("ajouter au cahier journal conserve objectif, matériel et ressource, et survit au refresh", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    page.on("dialog", (dialog) => dialog.accept());

    const ressources = encodeURIComponent(
      JSON.stringify([{ label: "Leçon PDF", href: "/primaire/ce1/programmes/francais/comprehension" }]),
    );
    await page.goto(
      `/enseignants/preparer-une-seance?competence=Reconnaitre%20une%20phrase&level=ce1&matiere=Fran%C3%A7ais&domaine=Etude%20de%20la%20langue&objectif=Distinguer%20une%20phrase%20correcte&ressources=${ressources}`,
    );

    await page.getByRole("button", { name: "Ajouter au cahier journal" }).click();
    await page.getByRole("button", { name: "Confirmer l'ajout" }).click();
    await expect(page.getByText(/Séance ajoutée au cahier journal/)).toBeVisible();

    await page.goto("/enseignants/cahier-journal");
    await page.getByRole("button", { name: "Voir mon cahier journal (imprimable)" }).click();

    const journal = page.locator("section", { has: page.getByText("Cahier journal —") });
    await expect(journal.getByText("Reconnaitre une phrase")).toBeVisible();
    await expect(journal.getByText(/Objectif.*Distinguer une phrase correcte/)).toBeVisible();
    await expect(journal.getByText(/Matériel.*Leçon PDF/)).toBeVisible();
    await expect(journal.getByRole("link", { name: "/primaire/ce1/programmes/francais/comprehension" })).toBeVisible();

    await page.reload();
    await page.getByRole("button", { name: "Voir mon cahier journal (imprimable)" }).click();
    await expect(page.getByText("Reconnaitre une phrase")).toBeVisible();

    await page.emulateMedia({ media: "print" });
    await expect(page.getByText("Reconnaitre une phrase")).toBeVisible();
    expect(errors.filter((e) => !e.includes("access control checks"))).toEqual([]);
  });
});
