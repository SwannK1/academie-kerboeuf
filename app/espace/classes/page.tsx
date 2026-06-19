import type { Metadata } from "next";
import Link from "next/link";
import { listTeacherClasses } from "@/lib/services/teacher-classes";
import { archiveClassAction } from "./actions";
import { CreateClassForm } from "./create-class-form";
import { DeleteClassButton } from "./delete-class-button";

export const metadata: Metadata = {
  title: "Mes classes | Académie Kerboeuf",
  description: "Créez et organisez vos classes.",
};

export default async function ClassesPage() {
  const classes = await listTeacherClasses();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/espace" className="text-sm font-bold text-sky hover:underline">
        ← Mon espace
      </Link>
      <h1 className="mt-3 text-2xl font-black text-foreground">Mes classes</h1>

      <section className="mt-6">
        {classes.length === 0 ? (
          <p className="text-sm text-muted">Aucune classe pour le moment.</p>
        ) : (
          <ul className="flex flex-col gap-3" role="list">
            {classes.map((klass) => (
              <li
                key={klass.id}
                className="rounded-lg border border-white/10 bg-background/45 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {klass.level}
                      {klass.className ? ` — ${klass.className}` : ""}
                      {klass.isArchived ? (
                        <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-xs font-bold text-muted">
                          Archivée
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Année {klass.schoolYear} · Période {klass.activePeriod}
                      {klass.studentCount !== null ? ` · ${klass.studentCount} élèves` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/espace/classes/${klass.id}`}
                      className="min-h-9 rounded-md border border-sky/35 bg-sky/10 px-3 py-1.5 text-xs font-black text-sky transition hover:bg-sky hover:text-ink"
                    >
                      Ouvrir
                    </Link>
                    <form action={archiveClassAction}>
                      <input type="hidden" name="classId" value={klass.id} />
                      <input
                        type="hidden"
                        name="isArchived"
                        value={klass.isArchived ? "true" : "false"}
                      />
                      <button
                        type="submit"
                        className="min-h-9 rounded-md border border-white/10 px-3 py-1.5 text-xs font-bold text-muted transition hover:border-sky/40 hover:text-foreground"
                      >
                        {klass.isArchived ? "Réactiver" : "Archiver"}
                      </button>
                    </form>
                    <DeleteClassButton classId={klass.id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-black text-foreground">Créer une classe</h2>
        <CreateClassForm />
      </section>
    </main>
  );
}
