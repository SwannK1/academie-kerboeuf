import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubjectDetailPage } from "@/components/academy/SubjectMatterCatalog";
import { getCm2MissionBySlug } from "@/content/cm2";
import { cm2Subjects, getCm2SubjectBySlug } from "@/content/cm2-subjects";
import {
  getCm2SubjectTree,
  type Cm2SubjectNode,
} from "@/content/cm2-learning-tree";
import {
  getCm2SequencesBySubjectSlug,
  type Cm2Sequence,
} from "@/content/cm2-sequences";
import { CM2_ACCENT } from "@/lib/cm2-accent";
import {
  cm2FrancaisFiches,
  FICHE_DOMAIN_LABELS,
  SHEET_LABELS,
  type FicheDomain,
} from "@/content/cm2-francais-fiches";

const FRANCAIS_DOMAIN_ORDER: FicheDomain[] = [
  "conjugaison",
  "grammaire",
  "orthographe",
  "vocabulaire",
  "lecture-comprehension",
];

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cm2Subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCm2SubjectBySlug(slug);
  if (!subject) return { title: "Matière introuvable | Académie Kerboeuf" };
  return {
    title: `${subject.title} CM2 | Académie Kerboeuf`,
    description: subject.shortDescription,
  };
}

export default async function Cm2SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getCm2SubjectBySlug(slug);

  if (!subject) notFound();

  const tree = getCm2SubjectTree(slug);
  const linkedCards = (subject.missionSlugs ?? [])
    .map((missionSlug) => getCm2MissionBySlug(missionSlug))
    .filter((mission): mission is NonNullable<typeof mission> => mission !== undefined)
    .map((mission) => ({
      href: `/primaire/cm2/missions/${mission.slug}`,
      eyebrow: mission.subject,
      title: mission.title,
      description: mission.objective,
      accentText: mission.theme.textClass,
      accentBorder: mission.theme.ringClass ?? "border-white/10",
    }));

  return (
    <SubjectDetailPage
      levelLabel="CM2"
      levelHref="/primaire/cm2"
      subjectsHref="/primaire/cm2/matieres"
      subject={subject}
      tree={tree ? mapCm2Tree(tree) : undefined}
      accent={CM2_ACCENT}
      sequences={mapCm2Sequences(getCm2SequencesBySubjectSlug(slug))}
      cycleLabel="Cycle 3"
      linkedCards={linkedCards}
      extraSection={slug === "francais" ? <FrancaisFichesSection /> : undefined}
      footerLinks={[
        { href: "/primaire/cm2/missions", label: "Toutes les missions CM2", tone: "gold" },
        { href: "/primaire/cm2/parcours", label: "Parcours de l'année", tone: "jade" },
        ...(slug === "mathematiques"
          ? [{ href: "/primaire/cm2/fiches/mathematiques", label: "Compétences et fiches Mathématiques", tone: "jade" as const }]
          : []),
        ...(slug === "francais"
          ? [{ href: "/primaire/cm2/fiches/francais", label: "Voir le catalogue complet", tone: "jade" as const }]
          : []),
      ]}
    />
  );
}

function FrancaisFichesSection() {
  return (
    <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-white/10 pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Fiches Français
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Notions et fiches par domaine
          </h2>
        </div>
        <div className="space-y-6">
          {FRANCAIS_DOMAIN_ORDER.map((domain) => {
            const notions = cm2FrancaisFiches.filter((n) => n.domain === domain);
            if (notions.length === 0) return null;
            return (
              <div key={domain} className="rounded-md border border-white/10 bg-white/[0.025] p-5">
                <h3 className="text-lg font-black text-foreground">
                  {FICHE_DOMAIN_LABELS[domain]}
                </h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {notions.map((notion) => {
                    const sheetKeys = (["f1", "f2", "f3"] as const).filter(
                      (key) => notion.sheets[key],
                    );
                    return (
                      <li
                        key={notion.slug}
                        className="rounded border border-white/10 bg-white/[0.03] px-3 py-3"
                      >
                        <p className="text-sm font-semibold text-foreground">
                          {notion.title}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {sheetKeys.map((key) => (
                            <Link
                              key={key}
                              href={`/primaire/cm2/fiches/francais/${notion.slug}/${key}`}
                              className="rounded-md border border-white/15 bg-white/[0.05] px-2.5 py-1 text-xs font-bold text-foreground transition hover:border-white/30 hover:bg-white/10"
                            >
                              {SHEET_LABELS[key]}
                            </Link>
                          ))}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function mapCm2Tree(tree: Cm2SubjectNode) {
  return {
    place: tree.place,
    guides: tree.guides,
    domains: tree.domains.map((domain) => ({
      id: domain.id,
      title: domain.title,
      zone: domain.place?.zone,
      subdomains: domain.subdomains.map((subdomain) => ({
        id: subdomain.id,
        title: subdomain.title,
        items: subdomain.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          status: lesson.status,
          // Pas de page de détail leçon CM2 (app/primaire/cm2/matieres/[slug]/[domain]/[subdomain]/[lesson]
          // n'existe pas) : ne jamais générer de lien vers cette route absente.
          href: undefined,
        })),
      })),
    })),
  };
}

function mapCm2Sequences(sequences: Cm2Sequence[]) {
  return sequences.map((sequence) => ({
    id: sequence.slug,
    title: sequence.title,
    domain: sequence.domain,
    subdomain: sequence.subdomain,
    skill: sequence.skill,
    status: sequence.status,
  }));
}
