import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAuthConfigured } from "./config";

export type EnseignantSession = {
  email: string;
  name?: string;
};

/**
 * Point d'entrée unique pour récupérer l'enseignant connecté côté serveur.
 *
 * Retourne `null` :
 * - si Supabase n'est pas configuré (pas de variables d'env) ;
 * - si aucune session valide n'existe.
 *
 * Pas de token ni de mot de passe en localStorage : la session est
 * gérée par Supabase via les cookies.
 */
export async function getEnseignantSession(): Promise<EnseignantSession | null> {
  if (!isAuthConfigured()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user?.email) {
    return null;
  }

  return {
    email: data.user.email,
    name: data.user.user_metadata?.full_name as string | undefined,
  };
}
