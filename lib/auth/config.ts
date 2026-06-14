/**
 * Fondations pour l'authentification enseignant (Supabase Auth).
 *
 * Tant que `isAuthConfigured()` retourne `false`, les pages /connexion et
 * /enseignants/tableau-de-bord affichent un état "configuration manquante"
 * plutôt que de simuler une connexion.
 *
 * Variables d'environnement nécessaires pour activer l'authentification :
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * SUPABASE_SERVICE_ROLE_KEY n'est volontairement pas utilisée ici : la
 * session enseignant repose uniquement sur les cookies + la clé anonyme.
 */

export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
