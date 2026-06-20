import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherLessonPlanner } from "@/components/academy/TeacherLessonPlanner";
import { parseTeacherLessonPrefill } from "@/content/teacher-lesson-planner";

export const metadata: Metadata = {
  title: "Préparer une séance | Espace enseignants | Académie Kerboeuf",
  description:
    "Préparez une séance de classe : objectif, étapes, différenciation et notes, enregistrées sur cet appareil.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function TeacherLessonPlannerPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const prefill = parseTeacherLessonPrefill(resolvedSearchParams);

  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer une séance" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer une séance
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Décrivez l’objectif, les étapes et la différenciation d’une
            séance. Une séance porte un seul objectif principal. Aucun
            contenu pédagogique n’est généré automatiquement : vos séances
            sont enregistrées uniquement sur cet appareil.
          </p>
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/enseignants/plan-de-classe"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
          >
            Ouvrir le plan de classe
          </Link>
          <Link
            href="/enseignants/suivi-classe"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
          >
            Consulter le suivi de classe
          </Link>
        </div>

        <TeacherLessonPlanner prefill={prefill} />
      </div>
    </main>
  );
}
