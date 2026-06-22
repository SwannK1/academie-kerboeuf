"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth/config";
import { createUser } from "@/lib/auth/users";
import { isSelfServiceRole } from "@/lib/auth/roles";

export async function signUpAction(
  _previousState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  if (typeof email !== "string" || typeof password !== "string") {
    return "Email et mot de passe requis.";
  }
  if (typeof role !== "string" || !isSelfServiceRole(role)) {
    return "Type de compte invalide.";
  }
  if (password.length < 8) {
    return "Le mot de passe doit contenir au moins 8 caractères.";
  }

  try {
    await createUser(email, password, role);
  } catch {
    return "Cet email est déjà utilisé.";
  }

  await signIn("credentials", { email, password, redirectTo: "/" });
  redirect("/");
}
