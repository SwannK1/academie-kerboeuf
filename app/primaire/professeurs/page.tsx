import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Professeurs du primaire — Académie Kerboeuf",
  description:
    "Découvrez les professeurs référents du primaire à l'Académie Kerboeuf : Français, Mathématiques, Sciences, Histoire-Géographie, Arts plastiques, Musique et EPS.",
};

type Professor = {
  name: string;
  subject: string;
  role: string;
  description: string;
};

const PROFESSORS: Professor[] = [
  {
    name: "Rosa",
    subject: "Français",
    role: "Référente lecture et écriture",
    description:
      "Rosa accompagne les élèves dans la découverte de la langue : déchiffrage, compréhension de textes et premières productions écrites.",
  },
  {
    name: "Hector",
    subject: "Mathématiques",
    role: "Référent calcul et logique",
    description:
      "Hector guide les élèves dans la construction des nombres, des opérations et du raisonnement mathématique.",
  },
  {
    name: "Mélina",
    subject: "Sciences",
    role: "Référente observation et expérimentation",
    description:
      "Mélina invite les élèves à observer le monde vivant et à formuler des hypothèses à partir d'expériences simples.",
  },
  {
    name: "Elian",
    subject: "Histoire-Géographie",
    role: "Référent repères dans le temps et l'espace",
    description:
      "Elian aide les élèves à se situer dans l'histoire et sur la carte, en reliant les documents aux grandes périodes.",
  },
  {
    name: "Pablo",
    subject: "Arts plastiques",
    role: "Référent expression visuelle",
    description:
      "Pablo encourage les élèves à explorer les matières, les couleurs et les formes pour exprimer leur sensibilité.",
  },
  {
    name: "Naïa",
    subject: "Musique",
    role: "Référente écoute et pratique vocale",
    description:
      "Naïa ouvre les oreilles des élèves à la diversité sonore et les accompagne dans le chant et le rythme.",
  },
  {
    name: "Max",
    subject: "EPS",
    role: "Référent motricité et coopération",
    description:
      "Max développe les habiletés motrices des élèves et cultive l'esprit d'équipe à travers les jeux et les sports.",
  },
];

function ProfessorCard({ professor }: { professor: Professor }) {
  const initial = professor.name[0];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-lg font-bold text-gold"
          aria-hidden="true"
        >
          {initial}
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{professor.name}</p>
          <p className="text-sm font-medium text-gold">{professor.subject}</p>
        </div>
      </div>
      <p className="text-sm font-medium text-muted">{professor.role}</p>
      <p className="text-sm leading-relaxed text-foreground/80">
        {professor.description}
      </p>
    </div>
  );
}

export default function ProfesseursPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Primaire", href: "/primaire" },
          { label: "Professeurs" },
        ]}
      />

      <section className="mt-8 mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Les professeurs du primaire
        </h1>
        <p className="mt-3 text-lg text-muted">
          Chaque matière a un référent pour guider les apprentissages.
        </p>
      </section>

      <section aria-label="Grille des professeurs">
        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {PROFESSORS.map((professor) => (
            <li key={professor.name}>
              <ProfessorCard professor={professor} />
            </li>
          ))}
        </ul>
      </section>

      <nav className="mt-12 flex flex-wrap gap-4" aria-label="Liens connexes">
        <Link
          href="/univers/personnages"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
        >
          Découvrir les personnages de l&apos;univers →
        </Link>
        <Link
          href="/primaire"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-muted transition hover:text-foreground"
        >
          ← Retour au primaire
        </Link>
      </nav>
    </main>
  );
}
