import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Préparer mes APC — non-régression hydratation.
 *
 * Avant correctif, `sessions` était initialisé via
 * `useState<ApcSession[]>(() => readStoredSessions())` — un initialiseur
 * paresseux exécuté pendant le rendu. `localStorage` n'existant pas côté
 * serveur, `readStoredSessions()` y renvoie toujours `[]` ; côté client, le
 * tout premier rendu lit le contenu réel du stockage. Tant qu'aucune séance
 * n'était enregistrée, les deux rendus coïncidaient (`[]` des deux côtés) et
 * aucune erreur n'apparaissait. Dès qu'au moins une séance était déjà
 * enregistrée, le HTML serveur (message « Aucune séance… ») divergeait du
 * DOM du premier rendu client (liste de séances) : erreur d'hydratation
 * React #418.
 *
 * Contrairement à `/enseignants/progression`, il n'existait pas de bannière
 * de disponibilité du stockage ici — la seule divergence possible porte sur
 * le contenu de la liste de séances elle-même.
 */

const STORAGE_KEY = "academie-kerboeuf-apc-v1";

const SAMPLE_SESSION = {
  id: "apc-hydration-e2e-session",
  title: "Séance hydratation E2E",
  level: "CE1",
  axis: "lecture",
  objective: "",
  period: "periode-1",
  duration: "",
  material: "",
  outline: "",
  collectiveSummary: "",
  status: "a-preparer",
  checklist: [],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

test.describe("Préparer mes APC — hydratation", () => {
  test("aucune erreur d'hydratation au chargement initial (stockage vide)", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);

    await page.goto("/enseignants/apc");
    await expect(
      page.getByRole("heading", { name: "Mes séances et cycles d'APC" }),
    ).toBeVisible();
    await expect(
      page.getByText("Aucune séance ou cycle d'APC pour ces filtres"),
    ).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("aucune erreur d'hydratation avec une séance déjà enregistrée, et restauration correcte après rechargement", async ({
    page,
    context,
  }) => {
    await context.addInitScript(
      ({ key, session }) => {
        window.localStorage.setItem(key, JSON.stringify([session]));
      },
      { key: STORAGE_KEY, session: SAMPLE_SESSION },
    );

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/apc");

    const session = page.getByText("Séance hydratation E2E");
    await expect(session).toBeVisible();
    expect(errors).toEqual([]);

    // Rechargement supplémentaire : vérifie qu'aucune écriture prématurée
    // (avant la fin du chargement initial) n'a effacé la séance enregistrée.
    const errorsAfterReload = trackConsoleErrors(page);
    await page.reload();
    await expect(session).toBeVisible();
    expect(errorsAfterReload).toEqual([]);
  });

  test("stockage corrompu : la page reste fonctionnelle sans écran blanc", async ({
    page,
    context,
  }) => {
    await context.addInitScript(({ key }) => {
      window.localStorage.setItem(key, "not-valid-json{{{");
    }, { key: STORAGE_KEY });

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/apc");

    await expect(
      page.getByRole("heading", { name: "Mes séances et cycles d'APC" }),
    ).toBeVisible();
    await expect(
      page.getByText("Aucune séance ou cycle d'APC pour ces filtres"),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("interaction essentielle : création d'une séance, persistée après rechargement", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/apc");

    await page.getByRole("button", { name: "+ Nouvelle séance ou cycle" }).click();
    await page.getByLabel("Titre").fill("Séance créée par le test");
    await page.getByRole("button", { name: "Terminer" }).click();

    const created = page.getByText("Séance créée par le test");
    await expect(created).toBeVisible();
    expect(errors).toEqual([]);

    await page.reload();
    await expect(created).toBeVisible();
  });

  test("modification d'une séance déjà chargée depuis le stockage, persistée après rechargement", async ({
    page,
  }) => {
    // Écrit le stockage via evaluate() (pas addInitScript, qui se
    // ré-exécuterait aussi au rechargement plus bas et effacerait la
    // modification testée en réinjectant la séance d'origine).
    await page.goto("/enseignants/apc");
    await page.evaluate(
      ({ key, session }) => {
        window.localStorage.setItem(key, JSON.stringify([session]));
      },
      { key: STORAGE_KEY, session: SAMPLE_SESSION },
    );
    await page.reload();

    const errors = trackConsoleErrors(page);
    await expect(page.getByText("Séance hydratation E2E")).toBeVisible();

    await page.getByRole("button", { name: "Modifier" }).click();
    await page.getByLabel("Titre").fill("Séance modifiée par le test");
    await page.getByRole("button", { name: "Terminer" }).click();

    const updated = page.getByText("Séance modifiée par le test");
    await expect(updated).toBeVisible();
    await expect(page.getByText("Séance hydratation E2E")).toHaveCount(0);
    expect(errors).toEqual([]);

    // La modification doit survivre au rechargement : ni écrasée par le
    // stockage d'origine, ni perdue par une écriture prématurée.
    await page.reload();
    await expect(updated).toBeVisible();
    await expect(page.getByText("Séance hydratation E2E")).toHaveCount(0);
  });
});
