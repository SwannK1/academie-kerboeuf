import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  getSecondaryLevelBase,
  getSecondaryResourceLabel,
  getSecondarySubjectLabel,
  humanizeSlug,
  type SecondaryCompetency,
  type SecondaryLevelSlug,
} from "@/content/secondary-resource-catalog";

export function SecondarySubjectPage({
  level,
  subject,
  competencies,
}: {
  level: SecondaryLevelSlug;
  subject: string;
  competencies: SecondaryCompetency[];
}) {
  const base = getSecondaryLevelBase(level);
  const label = getSecondarySubjectLabel(subject);
  return (
    <main id="contenu-principal" className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb items={[{ label: level === "seconde" ? "Lycée" : "Collège", href: level === "seconde" ? "/lycee" : "/college" }, { label: level === "seconde" ? "Seconde" : level, href: base }, { label }]} />
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-black text-foreground sm:text-5xl">{label} · {level === "seconde" ? "Seconde" : level}</h1>
          <PublicStatusBadge status="available" />
        </div>
        <p className="mt-4 max-w-2xl text-muted">{competencies.length} compétences disposent chacune d’une leçon, d’exercices et d’une évaluation.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((item) => (
            <Link key={item.competency} href={`${base}/${subject}/${item.competency}`} className="group rounded-md border border-jade/25 bg-jade/[0.05] p-5 transition hover:-translate-y-0.5 hover:border-jade/50">
              <h2 className="font-black text-foreground">{humanizeSlug(item.competency)}</h2>
              <p className="mt-3 text-sm text-muted">{item.resources.length} ressources PDF</p>
              <span className="mt-5 inline-flex text-sm font-black text-jade">Voir la compétence →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export function SecondaryCompetencyPage({ item }: { item: SecondaryCompetency }) {
  const base = getSecondaryLevelBase(item.level);
  const subjectLabel = getSecondarySubjectLabel(item.subject);
  const title = humanizeSlug(item.competency);
  return (
    <main id="contenu-principal" className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb items={[{ label: item.level === "seconde" ? "Lycée" : "Collège", href: item.level === "seconde" ? "/lycee" : "/college" }, { label: item.level === "seconde" ? "Seconde" : item.level, href: base }, { label: subjectLabel, href: `${base}/${item.subject}` }, { label: title }]} />
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-black text-foreground sm:text-5xl">{title}</h1>
          <PublicStatusBadge status="available" />
        </div>
        <p className="mt-4 text-muted">{subjectLabel} · {item.level === "seconde" ? "Seconde" : item.level}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {item.resources.map((resource) => (
            <a key={resource.type} href={resource.href} target="_blank" rel="noreferrer" className="group rounded-md border border-jade/30 bg-jade/[0.06] p-6 transition hover:-translate-y-0.5 hover:border-jade/60">
              <PublicStatusBadge status="available" />
              <h2 className="mt-4 text-xl font-black text-foreground">{getSecondaryResourceLabel(resource.type)}</h2>
              <span className="mt-5 inline-flex text-sm font-black text-jade">Ouvrir le PDF ↗</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
