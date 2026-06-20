import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherWorkshopsPlannerClient } from "@/components/teacher-workshops-planner/TeacherWorkshopsPlannerClient";

export function TeacherWorkshopsPlanner() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8 print:hidden">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Planifier mes ateliers" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold print:hidden">
            Outil enseignant
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Planifier mes ateliers
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted print:hidden">
            Préparez vos ateliers de classe : objectif, matériel, durée et
            tâches de préparation. Aucune liste d&apos;élèves n&apos;est
            stockée ici. Les ateliers sont enregistrés uniquement sur cet
            appareil.
          </p>

          <TeacherWorkshopsPlannerClient />
        </div>
      </section>
    </main>
  );
}
