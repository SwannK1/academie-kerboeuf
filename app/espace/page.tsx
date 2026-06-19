import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listTeacherClasses } from "@/lib/services/teacher-classes";
import { signOut } from "@/app/connexion/actions";

export const metadata: Metadata = {
  title: "Mon espace enseignant | Académie Kerboeuf",
  description: "Votre tableau de bord privé : classes, programmation, progression et organisation.",
};

const QUICK_ACCESS = [
  { label: "Programmation", path: "programmation" },
  { label: "Progression", path: "progression" },
  { label: "Emploi du temps", path: "emploi-du-temps" },
  { label: "Séances", path: "seances" },
  { label: "Rentrée", path: "rentree" },
  { label: "Commandes", path: "commandes" },
  { label: "Réunion parents", path: "reunion-parents" },
] as const;

export default async function EspacePage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const classes = await listTeacherClasses();
  const activeClasses = classes.filter((klass) => !klass.isArchived);
  const activeClass = activeClasses[0] ?? null;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground">Mon espace enseignant</h1>
          <p className="mt-1 text-sm text-muted">{data.user?.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="min-h-11 rounded-md border border-white/10 px-4 text-sm font-bold text-muted transition hover:border-sky/40 hover:text-foreground"
          >
            Se déconnecter
          </button>
        </form>
      </div>

      <p className="mt-4 rounded-md border border-sky/25 bg-sky/[0.05] p-3 text-sm text-foreground">
        Vos données d&apos;organisation sont privées et accessibles uniquement depuis votre
        compte.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-black text-foreground">Ma classe active</h2>
        {activeClass ? (
          <div className="mt-3 rounded-lg border border-sky/25 bg-sky/[0.05] p-5">
            <p className="text-sm font-bold text-foreground">
              {activeClass.level}
              {activeClass.className ? ` — ${activeClass.className}` : ""}
            </p>
            <p className="mt-1 text-sm text-muted">
              Année {activeClass.schoolYear} · Période {activeClass.activePeriod}
              {activeClass.studentCount !== null ? ` · ${activeClass.studentCount} élèves` : ""}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">Aucune classe créée pour le moment.</p>
        )}

        <Link
          href="/espace/classes"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
        >
          {classes.length > 0 ? "Gérer mes classes" : "Créer une classe"}
        </Link>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-black text-foreground">Accès rapide</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {QUICK_ACCESS.map((item) =>
            activeClass ? (
              <Link
                key={item.path}
                href={`/espace/classes/${activeClass.id}/${item.path}`}
                className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:bg-sky/[0.08]"
              >
                {item.label}
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span
                key={item.path}
                aria-disabled="true"
                className="flex min-h-11 items-center justify-between rounded-md border border-white/5 bg-background/20 px-4 text-sm font-bold text-muted/60"
              >
                {item.label}
              </span>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
