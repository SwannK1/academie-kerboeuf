import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PrintBodyClass } from "@/components/print/print-body-class";
import { TeacherPeriodProgressionClient } from "@/components/academy/TeacherPeriodProgressionClient";

export function TeacherPeriodProgression() {
  return (
    <main>
      <PrintBodyClass className="print-teacher-tool" />
      <div className="px-4 pt-24 sm:px-6 lg:px-8 print:px-0 print:pt-4">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Progression de période" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Outil enseignant
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Progression de période
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Suivez l&apos;avancement des séquences d&apos;une période en Kanban :
            choisissez un niveau et une période, ajoutez des cartes depuis la
            programmation annuelle ou librement, puis glissez-les entre les
            colonnes À prévoir, Prêt, En cours, Terminé et À reprendre. Tout
            est enregistré uniquement sur cet appareil.
          </p>

          <TeacherPeriodProgressionClient />
        </div>
      </section>
    </main>
  );
}
