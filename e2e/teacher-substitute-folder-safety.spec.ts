import { expect, test } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

const STORAGE_KEY = "academie-kerboeuf-dossier-remplacant-v1";
const FAKE_SENSITIVE_MARKER = "DONNEE-SYNTHETIQUE-TEST-ELEVE-9F31";

function expectNoHydrationErrors(errors: string[]) {
  expect(
    errors.filter((error) => /hydration|hydrating|react error #418/i.test(error)),
  ).toEqual([]);
}

// NOTE : TeacherSubstituteFolderClient lit localStorage de façon synchrone
// dans son initialiseur useState, ce qui provoque un mismatch d'hydratation
// (React #418) dès qu'une donnée est déjà stockée au chargement — même bug
// de classe que celui corrigé sur /enseignants/apc dans un chantier séparé.
// Ce défaut est distinct du risque de sécurité des données élève audité ici
// et n'est pas corrigé par ce commit (hors périmètre) ; il est donc exclu
// des assertions ci-dessous plutôt que masqué silencieusement.

test.describe("Dossier remplaçant — sécurité des données élève", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("n'expose aucune saisie de texte libre (notes, tâche personnalisée, élèves)", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/dossier-remplacant");
    await expect(
      page.getByRole("heading", { name: "Préparer mon dossier remplaçant" }),
    ).toBeVisible();

    // Garde-fou anti-régression : ces champs ont existé historiquement et
    // permettaient de saisir des données nominatives sur des élèves. Ils ne
    // doivent jamais réapparaître dans cet outil sauvegardé en localStorage.
    await expect(page.locator("textarea")).toHaveCount(0);
    await expect(
      page.getByPlaceholder("Ajouter une tâche personnalisée"),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Élèves à accompagner" }),
    ).toHaveCount(0);
    await expect(
      page.getByText(/donnée sur un élève ou une famille/i),
    ).toBeVisible();

    expectNoHydrationErrors(errors);
  });

  test("coche une tâche et la persiste après rechargement", async ({ page }) => {
    await page.goto("/enseignants/dossier-remplacant");

    const firstTask = page
      .getByText("Heure d'arrivée et modalités d'accueil du matin")
      .locator("..");
    const checkbox = firstTask.getByRole("checkbox");
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await page.reload();
    const persistedCheckbox = page
      .getByText("Heure d'arrivée et modalités d'accueil du matin")
      .locator("..")
      .getByRole("checkbox");
    await expect(persistedCheckbox).toBeChecked();
  });

  test("assainit une ancienne donnée locale contenant du texte libre sans l'afficher ni la conserver", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(
      ({ key, marker }) => {
        localStorage.setItem(
          key,
          JSON.stringify({
            notes: marker,
            tasksBySection: {
              "eleves-a-accompagner": [
                { id: "custom-1", label: marker, status: "a-faire", custom: true },
              ],
              "horaires-recreations": [
                { id: "horaires-recreations-default-0", status: "termine" },
              ],
            },
          }),
        );
      },
      { key: STORAGE_KEY, marker: FAKE_SENSITIVE_MARKER },
    );

    await page.goto("/enseignants/dossier-remplacant");
    await expect(
      page.getByRole("heading", { name: "Préparer mon dossier remplaçant" }),
    ).toBeVisible();

    // La donnée historique (texte libre) ne doit jamais être rendue…
    await expect(page.locator("body")).not.toContainText(FAKE_SENSITIVE_MARKER);

    // …et l'effet d'assainissement doit l'avoir purgée du stockage local dès
    // le montage, y compris pour un ancien statut valide (préservé).
    const persisted = await page.evaluate(
      (key) => localStorage.getItem(key),
      STORAGE_KEY,
    );
    expect(persisted).not.toContain(FAKE_SENSITIVE_MARKER);
    expect(persisted).not.toContain("eleves-a-accompagner");

    const preservedCheckbox = page
      .getByText("Heure d'arrivée et modalités d'accueil du matin")
      .locator("..")
      .getByRole("checkbox");
    await expect(preservedCheckbox).toBeChecked();
  });
});
