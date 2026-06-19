import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherFirstWeeksPlanner } from "@/components/academy/TeacherFirstWeeksPlanner";

export const metadata: Metadata = {
  title: "Préparer les premières semaines | Académie Kerboeuf",
  description:
    "Organisez vos priorités du premier jour, de la semaine 1 et des semaines 2 à 4 de la rentrée.",
};

export default function TeacherFirstWeeksPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Premières semaines" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants — rentrée
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer les premières semaines
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Organisez vos priorités du premier jour, de la semaine 1 et des
            semaines 2 à 4 : accueil, installation, rituels, organisation,
            diagnostic et lien avec les familles. Cet outil n&apos;écrit aucun
            contenu pédagogique à votre place ; vos tâches sont enregistrées
            sur cet appareil.
          </p>
        </header>

        <TeacherFirstWeeksPlanner />
      </div>
    </main>
  );
}
