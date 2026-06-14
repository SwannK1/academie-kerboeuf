import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export default function EnseignantsPage() {
  return (
    <main className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Enseignants" }]}
        />

        <h1 className="mt-6 text-3xl font-bold">Espace enseignant</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Des outils simples pour préparer, organiser et utiliser les
          ressources de l&apos;Académie Kerboeuf dans votre classe.
        </p>

        <section className="mt-8 border-t border-[var(--border)] pt-6">
          <h2 className="text-xl font-semibold">Créer sa programmation et sa progression</h2>
          <p className="mt-3 text-sm leading-relaxed">
            La programmation répartit les compétences sur l&apos;année,
            période par période. La progression organise l&apos;ordre
            logique des apprentissages dans une matière.
          </p>
          <Link
            href="/primaire/programmation"
            className="mt-4 inline-block text-sm font-semibold text-[var(--primary)] underline"
          >
            Programmation et progression CM2 →
          </Link>
        </section>

        <section className="mt-8 border-t border-[var(--border)] pt-6">
          <h2 className="text-xl font-semibold">Préparer une séance</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Chaque fiche de leçon présente l&apos;objectif, le déroulé et le
            matériel nécessaire. Repérez la compétence travaillée puis
            ouvrez les ressources associées avant la séance.
          </p>
        </section>

        <section className="mt-8 border-t border-[var(--border)] pt-6">
          <h2 className="text-xl font-semibold">Comprendre le format des fiches</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Chaque compétence peut proposer plusieurs ressources : une fiche
            de leçon, des exercices, une correction, un support de
            projection et une fiche parent. Toutes ne sont pas encore
            disponibles pour chaque compétence.
          </p>
        </section>

        <section className="mt-8 border-t border-[var(--border)] pt-6">
          <h2 className="text-xl font-semibold">Différencier</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Les fiches de chaque compétence permettent d&apos;adapter le
            niveau d&apos;exigence : utilisez les exercices et les supports
            associés pour ajuster le travail selon les besoins des élèves.
          </p>
        </section>

        <section className="mt-8 border-t border-[var(--border)] pt-6">
          <h2 className="text-xl font-semibold">
            Vérifier la disponibilité des ressources
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Chaque ressource affiche un statut. Seules les ressources
            marquées <PublicStatusBadge status="disponible" /> proposent un
            lien actif vers un PDF.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PublicStatusBadge status="disponible" />
            <PublicStatusBadge status="bientôt" />
            <PublicStatusBadge status="in-progress" />
          </div>
        </section>

        <section className="mt-8 border-t border-[var(--border)] pt-6">
          <h2 className="text-xl font-semibold">Trouver une fiche</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Les fiches sont organisées par matière, directement sur la page
            de chaque matière.
          </p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Logique de navigation : Niveau → Matière → Domaine →
            Sous-domaine → Compétence → Fiches/PDF.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/primaire/cm2/matieres/mathematiques" className="text-[var(--primary)] underline">
              Mathématiques CM2 →
            </Link>
            <Link href="/primaire/cm2/matieres/francais" className="text-[var(--primary)] underline">
              Français CM2 →
            </Link>
            <Link href="/primaire/cm2/matieres/sciences" className="text-[var(--primary)] underline">
              Sciences CM2 →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
