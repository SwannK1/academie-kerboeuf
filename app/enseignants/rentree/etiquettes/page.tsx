import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherBackToSchoolLabels } from "@/components/academy/TeacherBackToSchoolLabels";

export const metadata: Metadata = {
  title: "Étiquettes et documents de rentrée | Académie Kerboeuf",
  description:
    "Préparez des étiquettes élèves, des repères de classe et une checklist de documents de rentrée, à imprimer directement depuis le navigateur.",
};

export default function TeacherBackToSchoolLabelsPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:px-0 print:pb-0 print:pt-0">
      <div className="mx-auto max-w-5xl">
        <div className="print:hidden">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Rentrée", href: "/enseignants/rentree" },
              { label: "Étiquettes" },
            ]}
          />
        </div>

        <header className="mt-6 max-w-3xl print:mt-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade print:hidden">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl print:mt-0 print:text-2xl print:text-black">
            Étiquettes et documents de rentrée
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted print:hidden">
            Préparez des étiquettes pour les cahiers, le porte-manteau, les
            casiers et les boîtes, organisez des repères de classe et suivez
            une checklist de documents de rentrée. Aucun fichier n’est généré
            par le site : l’impression se fait avec la fonction d’impression
            du navigateur. Les prénoms peuvent être remplacés par des
            initiales et rien n’est sauvegardé ailleurs que sur cet appareil.
          </p>
        </header>

        <TeacherBackToSchoolLabels />
      </div>
    </main>
  );
}
