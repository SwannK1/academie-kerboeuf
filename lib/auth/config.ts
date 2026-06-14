/**
 * Fondations pour l'authentification enseignant (V1).
 *
 * Aucun fournisseur n'est branché tant que les variables d'environnement
 * ne sont pas définies. Tant que `isAuthConfigured()` retourne `false`,
 * les pages /connexion et /enseignants/tableau-de-bord affichent un état
 * "configuration manquante" plutôt que de simuler une connexion.
 *
 * Variables attendues pour activer l'authentification (Auth.js) :
 * - AUTH_SECRET
 * - AUTH_URL (en production)
 * - + variables du fournisseur choisi (ex: AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET,
 *   ou identifiants email/magic link)
 */

export function isAuthConfigured(): boolean {
  return Boolean(process.env.AUTH_SECRET);
}
