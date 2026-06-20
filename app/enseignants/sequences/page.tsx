import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherSequencePlanner } from "@/components/teacher-sequence-planner/TeacherSequencePlanner";

export const metadata: Metadata = {
  title: "Préparer mes séquences | Académie Kerboeuf",
  description:
    "Organisez vos séquences pédagogiques : une compétence, des étapes simples et une checklist de préparation, sauvegardées sur cet appareil.",
};

export default function TeacherSequencePlannerPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer mes séquences" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer mes séquences
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Créez vos séquences pédagogiques, une compétence à la fois.
            Ajoutez des étapes simples, une checklist de préparation et
            suivez leur statut. Vos séquences sont sauvegardées sur cet
            appareil.
          </p>
        </header>

        <TeacherSequencePlanner />
      </div>
    </main>
  );
}
