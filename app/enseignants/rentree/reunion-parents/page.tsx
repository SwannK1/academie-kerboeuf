import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherParentMeetingPrep } from "@/components/academy/TeacherParentMeetingPrep";

export const metadata: Metadata = {
  title: "Préparer la réunion parents d'élèves | Académie Kerboeuf",
  description:
    "Préparez l'ordre du jour, les documents et les questions à anticiper pour la réunion de rentrée avec les familles. Données enregistrées uniquement sur cet appareil.",
};

export default function ParentMeetingPrepPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Rentrée", href: "/enseignants/rentree" },
            { label: "Réunion parents" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants — Rentrée
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer la réunion parents d’élèves
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Renseignez les informations pratiques, ajustez l’ordre du jour,
            préparez les documents et anticipez les questions des familles.
            Tout est sauvegardé sur cet appareil uniquement.
          </p>
          <p className="mt-4 text-sm text-muted">
            Voir aussi la{" "}
            <Link
              href="/enseignants/rentree"
              className="font-bold text-jade underline-offset-4 hover:underline"
            >
              page de préparation générale de la rentrée
            </Link>
            .
          </p>
        </header>

        <TeacherParentMeetingPrep />
      </div>
    </main>
  );
}
