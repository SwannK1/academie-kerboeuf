import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherProfessionalMeetings } from "@/components/teacher-professional-meetings/TeacherProfessionalMeetings";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Rendez-vous professionnels | Espace enseignants",
  description:
    "Préparez vos rendez-vous professionnels : objectif, ordre du jour, notes, décisions et suivi, sans enregistrer de coordonnées.",
  path: "/enseignants/rendez-vous",
});

export default function TeacherProfessionalMeetingsPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Rendez-vous professionnels" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer mes rendez-vous professionnels
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Organisez vos rendez-vous (direction, équipe pédagogique,
            inspection, partenaires…) : objectif, ordre du jour, notes,
            décisions et suivi. Les données restent uniquement sur votre
            appareil, sans nom de famille, ni mail, ni téléphone.
          </p>
        </header>

        <div className="mt-10">
          <TeacherProfessionalMeetings />
        </div>
      </div>
    </main>
  );
}
