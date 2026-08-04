import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherCycleMeetingsClient } from "@/components/teacher-cycle-meetings/TeacherCycleMeetingsClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Préparer mes conseils de cycle | Espace enseignants",
  description:
    "Préparez un conseil de cycle ou un conseil des maîtres : ordre du jour, décisions et tâches de suivi.",
  path: "/enseignants/conseils-cycle",
});

export default function TeacherCycleMeetingsPage() {
  return (
    <main id="main-content" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer mes conseils de cycle" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 break-words text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer mes conseils de cycle
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Créez une réunion, organisez l&apos;ordre du jour, notez les
            décisions et suivez les tâches qui en découlent. Tout est
            enregistré uniquement sur cet appareil.
          </p>
        </header>

        <div className="mt-10">
          <TeacherCycleMeetingsClient />
        </div>
      </div>
    </main>
  );
}
