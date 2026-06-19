import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherPeriodProgressionClient } from "@/components/academy/TeacherPeriodProgressionClient";

export function TeacherPeriodProgression() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
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
            Organisez l’ordre des séquences prévues pour une période donnée :
            choisissez un niveau, une période, filtrez par matière puis
            réordonnez avec les boutons. La progression est enregistrée
            uniquement sur cet appareil.
          </p>

          <TeacherPeriodProgressionClient />
        </div>
      </section>
    </main>
  );
}
