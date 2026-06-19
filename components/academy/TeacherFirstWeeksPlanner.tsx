import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherFirstWeeksPlannerClient } from "@/components/academy/TeacherFirstWeeksPlannerClient";

export function TeacherFirstWeeksPlanner() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:pt-6">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Premières semaines" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold print:hidden">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer les premières semaines
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted print:hidden">
            Organisez ce que vous prévoyez pour le premier jour, la première
            semaine et la suite de la période 1 : cochez les tâches, classez-les
            par priorité et gardez un lien vers vos autres outils de
            préparation. Tout est sauvegardé uniquement sur cet appareil.
          </p>
        </header>

        <TeacherFirstWeeksPlannerClient />
      </div>
    </main>
  );
}
