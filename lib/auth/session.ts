import { isAuthConfigured } from "./config";

export type EnseignantSession = {
  email: string;
  name?: string;
};

/**
 * Stub V1 : retourne toujours `null` tant qu'aucun fournisseur d'auth
 * n'est branché. Ne lit ni cookie ni localStorage — pas de faux token.
 *
 * Quand un fournisseur (Auth.js, Supabase…) sera branché, cette fonction
 * sera remplacée par un appel à la session réelle du fournisseur.
 */
export async function getEnseignantSession(): Promise<EnseignantSession | null> {
  if (!isAuthConfigured()) {
    return null;
  }

  return null;
}
