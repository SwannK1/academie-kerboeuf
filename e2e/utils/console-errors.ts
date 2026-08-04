import type { Page } from "@playwright/test";

/** Collecte les erreurs console (et pageerror) pendant la durée du test. */
export function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  return errors;
}

// Codes d'erreur React minifiés correspondant à des ratés d'hydratation
// (texte/attribut serveur ≠ client, contenu généré uniquement côté client
// pendant le premier rendu serveur, etc.).
const HYDRATION_ERROR_PATTERNS = [
  /hydration failed/i,
  /hydrat(ed|ing|ion)/i,
  /did not match.*server-rendered/i,
  /text content does not match/i,
  /minified react error #41[0-9]/,
  /minified react error #42[0-9]/,
];

function isHydrationError(message: string): boolean {
  return HYDRATION_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

export type PageHealth = {
  /** Toutes les erreurs console + pageerror, telles que trackConsoleErrors(). */
  consoleErrors: string[];
  /** Sous-ensemble des erreurs console/pageerror identifiées comme des ratés d'hydratation React. */
  hydrationErrors: string[];
  /** Requêtes internes (même origine que la page) qui ont échoué au niveau réseau ou renvoyé un 5xx. */
  failedInternalRequests: string[];
};

/**
 * Étend trackConsoleErrors() avec une détection ciblée des erreurs
 * d'hydratation et des requêtes internes essentielles en échec (JS/CSS/
 * images/fonts servis par le site lui-même). Un test critique doit échouer
 * sur `hydrationErrors` ou `failedInternalRequests` non vides, pas
 * seulement sur `consoleErrors` (qui peut légitimement contenir du bruit
 * hors périmètre selon la page).
 */
export function trackPageHealth(page: Page): PageHealth {
  const consoleErrors: string[] = [];
  const hydrationErrors: string[] = [];
  const failedInternalRequests: string[] = [];

  const recordIfHydrationError = (message: string) => {
    if (isHydrationError(message)) {
      hydrationErrors.push(message);
    }
  };

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
      recordIfHydrationError(message.text());
    }
  });

  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
    recordIfHydrationError(error.message);
  });

  // La suite ne cible qu'une seule origine (baseURL de playwright.config.ts) :
  // comparer au nom d'hôte plutôt qu'à page.url() évite les faux négatifs
  // liés aux requêtes de sous-ressources émises avant que la navigation
  // principale n'ait mis à jour l'URL de la page.
  const isInternalUrl = (url: string) => {
    try {
      return new URL(url).hostname === "127.0.0.1";
    } catch {
      return false;
    }
  };

  page.on("requestfailed", (request) => {
    if (isInternalUrl(request.url())) {
      const reason = request.failure()?.errorText ?? "requête échouée";
      failedInternalRequests.push(`${request.url()} — ${reason}`);
    }
  });

  page.on("response", (response) => {
    if (response.status() >= 500 && isInternalUrl(response.url())) {
      failedInternalRequests.push(`${response.url()} — HTTP ${response.status()}`);
    }
  });

  return { consoleErrors, hydrationErrors, failedInternalRequests };
}

/** Assertion prête à l'emploi : échoue avec un message explicite si la page n'est pas saine. */
export function assertPageIsHealthy(health: PageHealth) {
  if (health.hydrationErrors.length > 0) {
    throw new Error(`Erreur(s) d'hydratation détectée(s) :\n${health.hydrationErrors.join("\n")}`);
  }
  if (health.failedInternalRequests.length > 0) {
    throw new Error(`Requête(s) interne(s) essentielle(s) en échec :\n${health.failedInternalRequests.join("\n")}`);
  }
}
