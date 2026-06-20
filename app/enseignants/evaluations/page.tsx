import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { AssessmentPlanner } from "@/components/teacher-assessment-planner/AssessmentPlanner";

export const metadata: Metadata = {
  title: "Préparer mes évaluations | Académie Kerboeuf",
  description:
    "Organisez vos évaluations de classe : titre, compétence, période, matériel et checklist de préparation, sans stocker de résultat d'élève.",
};

export default function TeacherAssessmentPlannerPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Évaluations" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer mes évaluations
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Planifiez vos évaluations de classe : objectif, période, matériel
            et checklist de préparation. Cet outil sert uniquement à organiser
            votre préparation — aucun résultat d&apos;élève n&apos;est
            enregistré. Vos données restent sauvegardées sur cet appareil.
          </p>
        </header>

        <div className="mt-10">
          <AssessmentPlanner />
        </div>
      </div>
    </main>
  );
}
