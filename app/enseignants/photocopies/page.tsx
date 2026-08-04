import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherPrintQueueClient } from "@/components/teacher-print-queue/TeacherPrintQueueClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Préparer mes photocopies",
  description:
    "Organisez vos demandes de photocopies : titre, nombre de pages et d'exemplaires, recto-verso, couleur, statut de préparation.",
  path: "/enseignants/photocopies",
});

export default function TeacherPrintQueuePage() {
  return (
    <main id="main-content" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Photocopies" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 break-words text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer mes photocopies
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Listez vos demandes d’impression et de photocopie, suivez leur
            statut de préparation et estimez le nombre de feuilles
            nécessaires. Vos demandes sont sauvegardées sur cet appareil.
          </p>
        </header>

        <TeacherPrintQueueClient />
      </div>
    </main>
  );
}
