import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getLevelMissionsPath,
  getLevelPath,
  getLevelsByStage,
  type AcademyLevel,
} from "@/content/academy";

export const metadata: Metadata = {
  title: "Primaire — Les Lisières des Explorateurs | Académie Kerboeuf",
  description:
    "Homepage du cycle élémentaire de l'Académie Kerboeuf : niveaux, professeurs, élèves repères et zones pédagogiques des Lisières des Explorateurs.",
};

type ElementaryZone = {
  name: string;
  function: string;
  subject: string;
  professor: string;
  levels: string;
  status: "available" | "upcoming" | "in-progress";
  href?: string;
};

const studentCharacters = [
  { name: "Kiwi", level: "CP", focus: "oser entrer dans les premiers codes" },
  { name: "Gaston", level: "CE1", focus: "choisir une stratégie et l'expliquer" },
  { name: "Esteban", level: "CE2", focus: "observer, classer, garder une trace" },
  { name: "Noisette", level: "CM1", focus: "relier les documents et construire une réponse" },
  { name: "Félix", level: "CM2", focus: "justifier, transférer, préparer le collège" },
];

function buildElementaryZones(levels: AcademyLevel[]): ElementaryZone[] {
  const bySlug = new Map(levels.map((level) => [level.slug, level]));
  const cp = bySlug.get("cp");
  const ce1 = bySlug.get("ce1");
  const ce2 = bySlug.get("ce2");
  const cm1 = bySlug.get("cm1");
  const cm2 = bySlug.get("cm2");

  return [
    {
      name: "La Cour des Explorateurs",
      function: "Accueil des rituels, coopération orale et mise en projet.",
      subject: "Langage oral",
      professor: "Équipe primaire",
      levels: "CP à CM2",
      status: "available",
      href: "/primaire",
    },
    {
      name: "La Cartothèque des Lisières",
      function: "Lire des cartes, trier des indices et comprendre l'espace.",
      subject: "Géographie",
      professor: cm1?.professor.name ?? "Noisette",
      levels: "CM1 · CM2",
      status: "available",
      href: cm1 ? getLevelPath(cm1) : undefined,
    },
    {
      name: "La Bibliothèque des Explorateurs",
      function: "Lire, inférer, reformuler et prélever des informations.",
      subject: "Lecture",
      professor: cm2?.professor.name ?? "Félix",
      levels: "CP à CM2",
      status: "available",
      href: cm2 ? getLevelMissionsPath(cm2) : undefined,
    },
    {
      name: "L'Atelier des Mathématiques",
      function: "Manipuler, calculer, comparer des stratégies et vérifier.",
      subject: "Mathématiques",
      professor: ce1?.professor.name ?? "Gaston",
      levels: "CE1 · Cycle 2",
      status: "available",
      href: ce1 ? getLevelPath(ce1) : undefined,
    },
    {
      name: "L'Observatoire",
      function: "Observer une notion, la schématiser et garder une trace claire.",
      subject: "Étude de la langue",
      professor: ce2?.professor.name ?? "Esteban",
      levels: "CE2 · Cycle 2",
      status: "available",
      href: ce2 ? getLevelPath(ce2) : undefined,
    },
    {
      name: "Le Laboratoire",
      function: "Formuler une hypothèse, tester, conclure avec des mots précis.",
      subject: "Sciences",
      professor: "Esteban · Félix",
      levels: "CE2 à CM2",
      status: "upcoming",
    },
    {
      name: "La Salle Informatique",
      function: "Produire, chercher, organiser et adopter des gestes numériques sûrs.",
      subject: "Numérique",
      professor: "Équipe primaire",
      levels: "CE2 à CM2",
      status: "upcoming",
    },
    {
      name: "La Salle d'Arts",
      function: "Créer une trace visuelle, illustrer une notion, présenter un travail.",
      subject: "Arts plastiques",
      professor: "Zoé · Noisette",
      levels: "CP à CM2",
      status: "upcoming",
    },
    {
      name: "Le Gymnase",
      function: "Coopérer, respecter une règle et stabiliser des repères corporels.",
      subject: "EPS",
      professor: "Équipe primaire",
      levels: "CP à CM2",
      status: "upcoming",
    },
    {
      name: "La Salle de Danse et Expression",
      function: "Mettre en voix, en geste et en scène une compréhension.",
      subject: "Expression corporelle",
      professor: "Zoé · Esteban",
      levels: "CP à CE2",
      status: "upcoming",
    },
    {
      name: "La Salle de Musique",
      function: "Écouter, mémoriser, rythmer et coopérer par le son.",
      subject: "Éducation musicale",
      professor: "Équipe primaire",
      levels: "CP à CM2",
      status: "upcoming",
    },
    {
      name: "Le Voyage Découverte",
      function: "Relier plusieurs disciplines dans une mission longue et guidée.",
      subject: "Projet transversal",
      professor: cm2?.professor.name ?? "Félix",
      levels: "CM2",
      status: "available",
      href: cm2 ? getLevelPath(cm2) : undefined,
    },
    {
      name: "Le Jardin des Lisières",
      function: "Observer le vivant, décrire le proche et prendre soin du commun.",
      subject: "Questionner le monde",
      professor: cp?.professor.name ?? "Zoé",
      levels: "CP · CE1",
      status: "upcoming",
    },
    {
      name: "Le Réfectoire des Explorateurs",
      function: "Construire des routines de vie collective et de langage social.",
      subject: "Enseignement moral et civique",
      professor: "Équipe primaire",
      levels: "CP à CM2",
      status: "upcoming",
    },
    {
      name: "Les Couloirs des Traces",
      function: "Afficher les méthodes, conserver les essais et rendre les progrès lisibles.",
      subject: "Méthodologie",
      professor: "Équipe primaire",
      levels: "CP à CM2",
      status: "in-progress",
    },
  ];
}

export default function PrimairePage() {
  const levels = getLevelsByStage("primaire");
  const zones = buildElementaryZones(levels);
  const professors = levels.map((level) => level.professor);

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Primaire" }]} />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(80,200,164,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(243,196,91,0.14),transparent_30%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Cycle 2 · Cycle 3
            </p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              Les Lisières des Explorateurs
            </h1>
            <p className="mt-5 text-2xl font-black text-gold">
              Explorer, comprendre, créer, coopérer.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Le primaire devient une homepage de cycle : des niveaux repères,
              des professeurs associés et des zones pédagogiques qui aident à
              situer les apprentissages sans transformer l&apos;école en jeu.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/programmes"
                className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
              >
                Voir les programmes
              </Link>
              <Link
                href="/professeurs"
                className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
              >
                Professeurs associés
              </Link>
            </div>
          </div>

          <aside className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Repères du cycle
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <Metric value={String(levels.length)} label="niveaux" />
              <Metric value={String(professors.length)} label="professeurs" />
              <Metric value={String(zones.length)} label="zones pédagogiques" />
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="CP · CE1 · CE2 · CM1 · CM2"
            title="Cinq portes d'entrée, une même progression"
            description="Chaque niveau conserve sa fiche dédiée. Ici, l'élève et l'adulte voient d'abord la continuité du cycle."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {levels.map((level) => (
              <LevelGateway key={level.slug} level={level} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <SectionIntro
              eyebrow="Personnages élèves"
              title="Des repères, pas des profils personnels"
              description="Les personnages servent à mémoriser des postures d'apprentissage. Ils ne contiennent aucune donnée d'élève réelle."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {studentCharacters.map((student) => (
                <article
                  key={student.name}
                  className="rounded border border-white/10 bg-ink/30 p-4"
                >
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-gold">
                    {student.level}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    {student.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {student.focus}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <SectionIntro
              eyebrow="Professeurs associés"
              title="Une équipe de cycle identifiable"
              description="Chaque professeur garde un rôle lisible, relié à un niveau et à une dominante pédagogique."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {levels.map((level) => (
                <Link
                  key={level.professor.slug}
                  href={`/professeurs/${level.professor.slug}`}
                  className="group rounded border border-white/10 bg-ink/30 p-4 transition hover:border-gold/35 hover:bg-white/[0.06]"
                >
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-jade">
                    {level.label} · {level.professor.mainSubject}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    {level.professor.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {level.professor.role}
                  </p>
                  <span className="mt-3 inline-flex text-xs font-black uppercase tracking-[0.14em] text-gold transition group-hover:translate-x-1">
                    Fiche professeur
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Géographie pédagogique"
            title="Les lieux élémentaires"
            description="Les zones ci-dessous structurent les usages : fonction, discipline, professeur, niveaux et statut public."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {zones.map((zone) => (
              <ZoneCard key={zone.name} zone={zone} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-4">
      <p className="text-3xl font-black text-gold">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
    </div>
  );
}

function LevelGateway({ level }: { level: AcademyLevel }) {
  return (
    <Link
      href={getLevelPath(level)}
      className="group flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/70"
    >
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-jade">
        {level.cycle}
      </p>
      <h3 className="mt-4 text-3xl font-black text-foreground">{level.label}</h3>
      <p className="mt-2 text-sm font-bold text-gold">{level.mood.name}</p>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">
        {level.description}
      </p>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          {level.professor.name} · {level.professor.mainSubject}
        </p>
      </div>
    </Link>
  );
}

function ZoneCard({ zone }: { zone: ElementaryZone }) {
  const content = (
    <>
      <div className="mb-4 h-1 rounded-full bg-jade" aria-hidden="true" />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
          {zone.subject}
        </p>
        <PublicStatusBadge status={zone.status} />
      </div>
      <h3 className="mt-3 text-xl font-black text-foreground">{zone.name}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{zone.function}</p>
      <dl className="mt-5 grid gap-3 border-t border-white/10 pt-4 text-sm">
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Professeur associé
          </dt>
          <dd className="mt-1 font-bold text-foreground">{zone.professor}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Niveaux concernés
          </dt>
          <dd className="mt-1 text-muted">{zone.levels}</dd>
        </div>
      </dl>
      {zone.href ? (
        <span className="mt-5 inline-flex text-sm font-black text-gold transition group-hover:translate-x-1">
          Ouvrir la route disponible
        </span>
      ) : (
        <span className="mt-5 inline-flex text-sm font-bold text-muted">
          Route dédiée non créée
        </span>
      )}
    </>
  );

  if (zone.href) {
    return (
      <Link
        href={zone.href}
        className="group flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/70"
      >
        {content}
      </Link>
    );
  }

  return (
    <article className="flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.035] p-5">
      {content}
    </article>
  );
}
