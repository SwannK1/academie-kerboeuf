import type { Metadata } from "next";
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
import type { MatterFicheDomain } from "@/components/academy/SubjectMatterCatalog";
import {
  cm2FrancaisFiches,
  FICHE_DOMAIN_LABELS,
  SHEET_LABELS as FRANCAIS_SHEET_LABELS,
} from "@/content/cm2-francais-fiches";
import {
  cm2FichesMaths,
  SHEET_LABELS as MATH_SHEET_LABELS,
  SHEET_IDS as MATH_SHEET_IDS,
} from "@/content/cm2-fiches-maths";

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
      fichesGroups={getFichesGroups(slug)}
      footerLinks={[
        { href: "/primaire/cm2/missions", label: "Toutes les missions CM2", tone: "gold" },
        { href: "/primaire/cm2/parcours", label: "Parcours de l'année", tone: "jade" },
        ...(slug === "mathematiques"
          ? [{ href: "/primaire/cm2/fiches/mathematiques", label: "Compétences et fiches Mathématiques", tone: "jade" as const }]
          : []),
      ]}
    />
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

function getFichesGroups(slug: string): MatterFicheDomain[] {
  if (slug === "francais") return mapFrancaisFiches();
  if (slug === "mathematiques") return mapMathFiches();
  return [];
}

function mapFrancaisFiches(): MatterFicheDomain[] {
  const byDomain = new Map<string, MatterFicheDomain["fiches"]>();

  for (const notion of cm2FrancaisFiches) {
    const sheets = (["f1", "f2", "f3"] as const)
      .filter((id) => notion.sheets[id])
      .map((id) => ({
        id,
        label: FRANCAIS_SHEET_LABELS[id],
        href: notion.sheets[id]?.pdfHref,
      }));

    const list = byDomain.get(notion.domain) ?? [];
    list.push({ slug: notion.slug, title: notion.title, sheets });
    byDomain.set(notion.domain, list);
  }

  return Array.from(byDomain.entries()).map(([domain, fiches]) => ({
    domain: FICHE_DOMAIN_LABELS[domain as keyof typeof FICHE_DOMAIN_LABELS],
    fiches,
  }));
}

function mapMathFiches(): MatterFicheDomain[] {
  const byDomain = new Map<string, MatterFicheDomain["fiches"]>();

  for (const notion of cm2FichesMaths) {
    const sheets = MATH_SHEET_IDS.map((id) => {
      const sheet = notion.sheets.find((s) => s.id === id);
      return {
        id,
        label: MATH_SHEET_LABELS[id],
        href: sheet?.status === "available" ? sheet.pdfHref : undefined,
      };
    });

    const list = byDomain.get(notion.domain) ?? [];
    list.push({ slug: notion.notionSlug, title: notion.title, skill: notion.skill, sheets });
    byDomain.set(notion.domain, list);
  }

  return Array.from(byDomain.entries()).map(([domain, fiches]) => ({ domain, fiches }));
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
