import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherStudentList } from "@/components/teacher-student-list/TeacherStudentList";

export const metadata: Metadata = {
  title: "Liste des élèves | Académie Kerboeuf",
  description:
    "Créez et gérez la liste de votre classe : prénom, nom, groupe, remarque et étiquette de couleur. Stockage local uniquement.",
};

export default function TeacherStudentListPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Liste des élèves" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Liste des élèves
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Une liste de classe centrale, réutilisable par vos autres outils :
            prénom, nom facultatif, groupe, remarque et étiquette de couleur.
            Ajoutez, modifiez, réordonnez et imprimez votre liste. Données
            enregistrées uniquement sur cet appareil.
          </p>
        </header>

        <TeacherStudentList />
      </div>
    </main>
  );
}
