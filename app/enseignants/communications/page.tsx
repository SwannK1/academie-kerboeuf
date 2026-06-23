import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherCommunicationsLibrary } from "@/components/teacher-communications-library/TeacherCommunicationsLibrary";

export const metadata: Metadata = {
  title: "Préparer mes communications | Académie Kerboeuf",
  description:
    "Préparez et organisez des messages réutilisables pour votre classe : informations, sorties, matériel, réunions, rappels, projets et remerciements.",
};

export default function TeacherCommunicationsPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer mes communications" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer mes communications
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Rédigez et organisez des modèles de messages pour votre classe :
            informations générales, sorties, matériel, réunions, rappels, projets
            ou remerciements. Cet outil ne contient aucune liste de familles et
            n’envoie aucun message : il vous aide seulement à préparer vos
            contenus, sauvegardés sur cet appareil.
          </p>
        </header>

        <TeacherCommunicationsLibrary />
      </div>
    </main>
  );
}
