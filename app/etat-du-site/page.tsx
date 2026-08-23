import { buildPageMetadata } from "@/content/seo";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { academyCharacters } from "@/content/academy-characters";
import { collegeLearningTree } from "@/content/college-curriculum";
import { cm1LearningTree } from "@/content/cm1-learning-tree";
import { cm2LearningTree } from "@/content/cm2-learning-tree";
import { gsDomains } from "@/content/levels/maternelle/gs-domains";
import { msDomains } from "@/content/levels/maternelle/ms-domains";
import { psDomains } from "@/content/levels/maternelle/ps-domains";
import { ce1LearningTree } from "@/content/levels/ce1-learning-tree";
import { ce2LearningTree } from "@/content/levels/ce2-learning-tree";
import { cpLearningTree } from "@/content/levels/cp-learning-tree";
import { lyceeCurriculumLevels } from "@/content/lycee-curriculum";
import {
  getPublicStatusKey,
  type PublicStatusKey,
} from "@/content/public-status";
import pdfCounts from "@/content/pdf-counts.generated.json";

export const metadata = buildPageMetadata({
  title: "État du site",
  description:
    "Suivi discret de l'avancement public de l'Académie Kerboeuf : niveaux, ressources, espace enseignant et univers.",
  path: "/etat-du-site",
  noIndex: true,
});

type StatusLike = {
  status: unknown;
};

type LeafItem = StatusLike & {
  title: string;
};

type SectionStatus = {
  title: string;
  status: unknown;
  availableFiles: number;
  preparingItems: number;
  availableSubjects: string[];
  visibleSubjects: string[];
  lastUpdated?: string;
  source: "dynamic" | "manual";
  note: string;
};

type TeacherTool = {
  title: string;
  status: unknown;
  href?: string;
};

const teacherToolsAvailable: TeacherTool[] = [
  { title: "Programmation annuelle", status: "available", href: "/enseignants/programmation" },
  { title: "Progression par période", status: "available", href: "/enseignants/progression" },
  { title: "Emploi du temps", status: "available", href: "/enseignants/emploi-du-temps" },
  { title: "Plan de classe et groupes", status: "available", href: "/enseignants/organisation-classe" },
  { title: "Préparer une séance", status: "available", href: "/enseignants/preparer-une-seance" },
];

const teacherToolsPreparing: TeacherTool[] = [
  { title: "Cahier journal synchronisé", status: "in-progress" },
];

const teacherToolsRetired: TeacherTool[] = [
  { title: "Aujourd'hui", status: "in-progress" },
  { title: "Cahier-journal par classe", status: "in-progress" },
];

function countItemsByStatus(items: LeafItem[], statusKey: PublicStatusKey) {
  return items.filter((item) => getPublicStatusKey(item.status) === statusKey)
    .length;
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function visibleSubjectLabels(subjects: Array<{ title?: string; label?: string; status: unknown }>) {
  return subjects
    .filter((subject) => getPublicStatusKey(subject.status) !== "upcoming")
    .map((subject) => subject.title ?? subject.label ?? "Sans libellé");
}

function availableSubjectLabels(subjects: Array<{ title?: string; label?: string; status: unknown }>) {
  return subjects
    .filter((subject) => getPublicStatusKey(subject.status) === "available")
    .map((subject) => subject.title ?? subject.label ?? "Sans libellé");
}

function flattenMaternelleItems(): LeafItem[] {
  return [psDomains, msDomains, gsDomains].flatMap((domains) =>
    domains.flatMap((domain) => [
      ...domain.observables.map((observable) => ({
        title: observable.title,
        status: observable.status,
      })),
      ...(domain.subdomains ?? []).flatMap((subdomain) =>
        subdomain.sequences.flatMap((sequence) => [
          { title: sequence.title, status: sequence.status },
          ...sequence.workshops.map((workshop) => ({
            title: workshop.title,
            status: workshop.status,
          })),
        ]),
      ),
    ]),
  );
}

function flattenPrimaryItems(): LeafItem[] {
  const cycle2Items = [cpLearningTree, ce1LearningTree, ce2LearningTree].flatMap(
    (level) =>
      level.domains.flatMap((domain) =>
        domain.subdomains.flatMap((subdomain) =>
          subdomain.lessons.map((lesson) => ({
            title: lesson.title,
            status: lesson.status,
          })),
        ),
      ),
  );

  const cm1Items = cm1LearningTree.flatMap((subject) =>
    subject.domains.flatMap((domain) =>
      domain.subdomains.flatMap((subdomain) =>
        subdomain.sequences.map((sequence) => ({
          title: sequence.title,
          status: sequence.status,
        })),
      ),
    ),
  );

  const cm2Items = cm2LearningTree.flatMap((subject) =>
    subject.domains.flatMap((domain) =>
      domain.subdomains.flatMap((subdomain) =>
        subdomain.lessons.map((lesson) => ({
          title: lesson.title,
          status: lesson.status,
        })),
      ),
    ),
  );

  return [...cycle2Items, ...cm1Items, ...cm2Items];
}

function flattenCollegeItems(): LeafItem[] {
  return collegeLearningTree.flatMap((level) =>
    level.subjects.flatMap((subject) =>
      subject.domains.flatMap((domain) =>
        domain.subdomains.flatMap((subdomain) =>
          subdomain.sequences.map((sequence) => ({
            title: sequence.title,
            status: sequence.status,
          })),
        ),
      ),
    ),
  );
}

function flattenLyceeItems(): LeafItem[] {
  return lyceeCurriculumLevels.flatMap((level) =>
    level.parcours.flatMap((parcours) =>
      parcours.subjects.flatMap((subject) =>
        subject.domains.flatMap((domain) =>
          domain.subdomains.flatMap((subdomain) =>
            subdomain.sequences.map((sequence) => ({
              title: sequence.title,
              status: sequence.status,
            })),
          ),
        ),
      ),
    ),
  );
}

function buildSections(): SectionStatus[] {
  const maternelleSubjects = [psDomains, msDomains, gsDomains].flatMap((domains) =>
    domains.map((domain) => ({ title: domain.shortLabel, status: domain.status })),
  );
  const primarySubjects = [
    ...[cpLearningTree, ce1LearningTree, ce2LearningTree].flatMap((level) =>
      level.domains.map((domain) => ({ title: domain.title, status: domain.status })),
    ),
    ...cm1LearningTree.map((subject) => ({
      title: subject.title,
      status: subject.status,
    })),
    ...cm2LearningTree.map((subject) => ({
      title: subject.title,
      status: subject.status,
    })),
  ];
  const collegeSubjects = collegeLearningTree.flatMap((level) =>
    level.subjects.map((subject) => ({ label: subject.label, status: subject.status })),
  );
  const lyceeSubjects = lyceeCurriculumLevels.flatMap((level) =>
    level.parcours.flatMap((parcours) =>
      parcours.subjects.map((subject) => ({
        title: subject.title,
        status: subject.status,
      })),
    ),
  );
  const universeItems = academyCharacters.map((character) => ({
    title: character.name,
    status: character.publicStatus,
  }));

  const maternelleItems = flattenMaternelleItems();
  const primaryItems = flattenPrimaryItems();
  const collegeItems = flattenCollegeItems();
  const lyceeItems = flattenLyceeItems();

  return [
    {
      title: "Maternelle",
      status: "in-progress",
      availableFiles: pdfCounts.maternelle,
      preparingItems: countItemsByStatus(maternelleItems, "in-progress"),
      availableSubjects: unique(availableSubjectLabels(maternelleSubjects)),
      visibleSubjects: unique(visibleSubjectLabels(maternelleSubjects)),
      source: "dynamic",
      note: "Domaines PS, MS et GS lus depuis les catalogues maternelle ; aucun PDF réel trouvé dans public/fiches pour ce niveau.",
    },
    {
      title: "Primaire",
      status: "available",
      availableFiles: pdfCounts.primaire,
      preparingItems: countItemsByStatus(primaryItems, "in-progress"),
      availableSubjects: unique(availableSubjectLabels(primarySubjects)),
      visibleSubjects: unique(visibleSubjectLabels(primarySubjects)),
      source: "dynamic",
      note: "PDF réels comptés depuis public/fiches ; contenus en préparation lus dans les arbres CP à CM2.",
    },
    {
      title: "Collège",
      status: "in-progress",
      availableFiles: pdfCounts.college,
      preparingItems: countItemsByStatus(collegeItems, "in-progress"),
      availableSubjects: unique(availableSubjectLabels(collegeSubjects)),
      visibleSubjects: unique(visibleSubjectLabels(collegeSubjects)),
      source: "dynamic",
      note: "Séquences 6e à 3e lues dans le registre collège ; les ressources visibles ne créent pas de lien PDF fictif.",
    },
    {
      title: "Lycée",
      status: "in-progress",
      availableFiles: pdfCounts.lycee,
      preparingItems: countItemsByStatus(lyceeItems, "in-progress"),
      availableSubjects: unique(availableSubjectLabels(lyceeSubjects)),
      visibleSubjects: unique(visibleSubjectLabels(lyceeSubjects)),
      source: "dynamic",
      note: "Séquences Seconde, Première et Terminale lues dans le curriculum lycée ; aucune date de mise à jour dédiée n'est fournie.",
    },
    {
      title: "Univers / personnages",
      status: "available",
      availableFiles: 0,
      preparingItems: 0,
      availableSubjects: unique(availableSubjectLabels(universeItems)),
      visibleSubjects: unique(visibleSubjectLabels(universeItems)),
      source: "dynamic",
      note: "Personnages publics lus depuis le registre d'univers ; les compteurs de fiches PDF ne s'appliquent pas à cette section.",
    },
  ];
}

export default function SiteStatusPage() {
  const sections = buildSections();
  const totals = sections.reduce(
    (accumulator, section) => ({
      availableFiles: accumulator.availableFiles + section.availableFiles,
      preparingItems: accumulator.preparingItems + section.preparingItems,
    }),
    { availableFiles: 0, preparingItems: 0 },
  );

  return (
    <main id="contenu-principal" className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "État du site" }]}
        />

        <header className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Suivi interne public
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
              État d&apos;avancement de l&apos;Académie Kerboeuf
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
              Cette page rassemble les données disponibles dans les catalogues
              du site. Les compteurs ne sont affichés que lorsqu&apos;ils peuvent
              être lus depuis les fichiers existants ou depuis une liste
              manuelle explicite.
            </p>
          </div>

          <div className="rounded-md border border-white/10 bg-panel/80 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Vue rapide
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Metric label="PDF réels" value={totals.availableFiles} />
              <Metric label="En préparation" value={totals.preparingItems} />
            </div>
          </div>
        </header>

        <section className="mt-10 rounded-md border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-jade">
            Méthode de comptage
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted">
            Les fiches disponibles correspondent aux PDF réellement présents
            dans <span className="font-mono text-foreground">public/fiches</span>.
            Les fiches en préparation correspondent aux unités de contenu dont
            le statut public normalisé est <PublicStatusBadge status="in-progress" className="mx-1 align-middle" />.
            Lorsqu&apos;une donnée n&apos;existe pas sous forme automatique, la page le
            signale dans la colonne source.
          </p>
        </section>

        <section className="mt-10 grid gap-4" aria-labelledby="levels-title">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Niveaux et univers
            </p>
            <h2 id="levels-title" className="mt-2 text-2xl font-black">
              Disponibilité par section
            </h2>
          </div>

          <div className="overflow-hidden rounded-md border border-white/10">
            <div className="grid min-w-[860px] grid-cols-[1.1fr_0.7fr_0.7fr_0.9fr_1.3fr_0.9fr] bg-white/[0.055] text-xs font-bold uppercase tracking-[0.16em] text-muted">
              <div className="p-4">Section</div>
              <div className="p-4">Statut</div>
              <div className="p-4">Fiches disponibles</div>
              <div className="p-4">Fiches en préparation</div>
              <div className="p-4">Matières disponibles</div>
              <div className="p-4">Mise à jour</div>
            </div>
            {sections.map((section) => (
              <StatusRow key={section.title} section={section} />
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 lg:grid-cols-3" aria-labelledby="teacher-title">
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Espace enseignant
            </p>
            <h2 id="teacher-title" className="mt-2 text-2xl font-black">
              Outils du portail
            </h2>
          </div>
          <ToolGroup title="Disponibles" tools={teacherToolsAvailable} />
          <ToolGroup title="En préparation" tools={teacherToolsPreparing} />
          <ToolGroup
            title="Retirés du portail"
            tools={teacherToolsRetired}
            note="Routes existantes ou accès contextuels, non remis en avant ici."
          />
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded border border-white/10 bg-background/45 p-4">
      <p className="font-mono text-3xl font-black text-gold">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
        {label}
      </p>
    </div>
  );
}

function StatusRow({ section }: { section: SectionStatus }) {
  const subjectLabel =
    section.availableSubjects.length > 0
      ? section.availableSubjects.join(", ")
      : section.visibleSubjects.length > 0
        ? `Visibles : ${section.visibleSubjects.join(", ")}`
        : "Statut manuel : aucune matière disponible déclarée";

  return (
    <div className="grid min-w-[860px] grid-cols-[1.1fr_0.7fr_0.7fr_0.9fr_1.3fr_0.9fr] border-t border-white/10 text-sm">
      <div className="p-4">
        <p className="font-black text-foreground">{section.title}</p>
        <p className="mt-2 text-xs leading-5 text-muted">{section.note}</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-sky">
          Données {section.source === "dynamic" ? "dynamiques" : "manuelles"}
        </p>
      </div>
      <div className="p-4">
        <PublicStatusBadge status={section.status} />
      </div>
      <div className="p-4 font-mono text-lg font-black text-gold">
        {section.availableFiles}
      </div>
      <div className="p-4 font-mono text-lg font-black text-jade">
        {section.preparingItems}
      </div>
      <div className="p-4 leading-6 text-muted">{subjectLabel}</div>
      <div className="p-4 text-muted">
        {section.lastUpdated ?? "Non renseignée"}
      </div>
    </div>
  );
}

function ToolGroup({
  title,
  tools,
  note,
}: {
  title: string;
  tools: TeacherTool[];
  note?: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
      <h3 className="text-lg font-black text-foreground">{title}</h3>
      {note ? <p className="mt-2 text-xs leading-5 text-muted">{note}</p> : null}
      <div className="mt-4 grid gap-2">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="flex min-h-12 items-center justify-between gap-3 rounded border border-white/10 bg-background/45 px-3 py-2"
          >
            {tool.href ? (
              <Link
                href={tool.href}
                className="text-sm font-bold text-foreground transition hover:text-gold"
              >
                {tool.title}
              </Link>
            ) : (
              <span className="text-sm font-bold text-foreground">
                {tool.title}
              </span>
            )}
            <PublicStatusBadge status={tool.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
