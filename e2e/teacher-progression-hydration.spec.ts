import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Progression de période — non-régression hydratation.
 *
 * Avant correctif, `readStoredCardsChecked()` était appelé pendant le rendu
 * (via useMemo) pour initialiser `cards` et `storageNotice`. `localStorage`
 * n'existant pas côté serveur, le HTML serveur affichait toujours la
 * bannière "stockage local non disponible", alors que le premier rendu
 * client (où le stockage est réellement disponible) ne l'affichait pas :
 * erreur d'hydratation React #418 dès l'ouverture de la page, avant toute
 * interaction.
 *
 * Les scénarios avec données déjà enregistrées utilisent
 * `context.addInitScript` pour peupler `localStorage` avant le tout premier
 * chargement de page (comme un utilisateur qui revient sur l'outil), plutôt
 * qu'un `page.goto` (stockage vide) suivi d'une injection par
 * `page.evaluate` : cette dernière approche re-déclenche un premier montage
 * à vide puis une réécriture, ce qui ne représente pas un rechargement réel
 * et peut entrer en course avec l'injection de test elle-même.
 */

const STORAGE_KEY = "progression-periode-kanban-v3";

test.describe("Progression de période — hydratation", () => {
  test("aucune erreur d'hydratation au chargement initial (stockage vide)", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);

    await page.goto("/enseignants/progression");
    await expect(
      page.getByRole("heading", { name: "Tableau Kanban" }),
    ).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("aucune erreur d'hydratation avec des cartes déjà enregistrées, et restauration correcte après rechargement", async ({
    page,
    context,
  }) => {
    await context.addInitScript(
      ({ key }) => {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            cards: [
              {
                id: "hydration-e2e-card",
                niveau: "cp",
                periode: "periode-1",
                matiere: "francais",
                domaine: "lecture",
                competenceId: "comp-1",
                competenceLabel: "Carte hydratation E2E",
                dureeMinutes: 30,
                statut: "a-prevoir",
                imprimablesDisponibles: [],
                priority: "important",
              },
            ],
          }),
        );
      },
      { key: STORAGE_KEY },
    );

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/progression");

    const card = page.getByRole("button", {
      name: "Ouvrir la carte Carte hydratation E2E",
    });
    await expect(card).toBeVisible();
    expect(errors).toEqual([]);

    // Rechargement supplémentaire : vérifie qu'aucune écriture prématurée
    // (avant la fin du chargement initial) n'a effacé la carte enregistrée.
    const errorsAfterReload = trackConsoleErrors(page);
    await page.reload();
    await expect(card).toBeVisible();
    expect(errorsAfterReload).toEqual([]);
  });

  test("stockage corrompu : la page reste fonctionnelle et signale la donnée ignorée", async ({
    page,
    context,
  }) => {
    await context.addInitScript(
      ({ key }) => {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            cards: [
              {
                id: "valid-card",
                niveau: "cp",
                periode: "periode-1",
                matiere: "francais",
                domaine: "lecture",
                competenceId: "comp-1",
                competenceLabel: "Carte valide restante",
                dureeMinutes: 30,
                statut: "a-prevoir",
                imprimablesDisponibles: [],
                priority: "important",
              },
              "entrée-corrompue-non-objet",
            ],
          }),
        );
      },
      { key: STORAGE_KEY },
    );

    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/progression");

    await expect(
      page.getByText("Certaines cartes enregistrées étaient illisibles"),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Ouvrir la carte Carte valide restante" }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
});
