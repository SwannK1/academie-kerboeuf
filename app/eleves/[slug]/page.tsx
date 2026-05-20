import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getAllStudentSlugs,
  getStudentBySlug,
  studentAccents,
  type EmblematicStudent,
} from "@/content/students";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import { getClassroomResources } from "@/content/resources";
import { getPublicStatusLabel } from "@/content/public-status";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllStudentSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const student = getStudentBySlug(slug);

  if (!student) {
    return { title: "Élève introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${student.name} | Élèves emblématiques`,
    description: student.shortDescription,
  };
}

function StudentHeroImage({ student }: { student: EmblematicStudent }) {
  const accent = studentAccents[student.dominantColor];

  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden rounded-md border ${accent.borderClass}`}
      style={{
        background: `linear-gradient(135deg, rgba(${accent.glowRgb},0.22), rgba(${accent.glowRgb},0.06))`,
      }}
    >
      {student.image ? (
        <Image
          src={student.image}
          alt={student.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 38vw"
          className="object-cover"
        />
      ) : (
        <div className="grid h-full place-items-center">
          <span className={`text-7xl font-black ${accent.textClass}`}>
            {student.name.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}

export default async function EleveDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const student = getStudentBySlug(slug);

  if (!student) {
    notFound();
  }

  const accent = studentAccents[student.dominantColor];
  const associatedMissions = getClassroomResources().filter(
    (resource) => resource.levelSlug === student.levelSlug,
  );
  const associatedPaths = getLearningPathsWithSteps().filter(
    (path) => path.levelSlug === student.levelSlug,
  );

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Élèves", href: "/eleves" },
              { label: student.name },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 55% 70% at 0% 45%, rgba(${accent.glowRgb},0.13), transparent 70%)`,
          }}
        />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <StudentHeroImage student={student} />

          <div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${accent.badgeClass}`}
              >
                {student.level}
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                {student.cycle}
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              {student.name}
            </h1>
            <p className={`mt-4 text-xl font-bold ${accent.textClass}`}>
              {student.animal} · {student.universe}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {student.shortDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={student.levelHref}
                className={`rounded-md border px-5 py-3 text-sm font-black transition hover:opacity-90 ${accent.badgeClass}`}
              >
                Voir le niveau
              </Link>
              {student.missionsHref ? (
                <Link
                  href={student.missionsHref}
                  className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
                >
                  Voir les missions
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          <article className="rounded-md border border-white/10 bg-white/[0.045] p-6">
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accent.textClass}`}>
              Univers
            </p>
            <h2 className="mt-3 text-2xl font-black text-foreground">
              {student.universe}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              {student.personality}
            </p>
          </article>

          <article className="rounded-md border border-white/10 bg-white/[0.045] p-6 lg:col-span-2">
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accent.textClass}`}>
              Manière d’apprendre
            </p>
            <p className="mt-4 text-lg leading-8 text-foreground">
              {student.learningStyle}
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className={`rounded-md border p-6 ${accent.borderSoftClass}`}
            style={{
              background: `linear-gradient(135deg, rgba(${accent.glowRgb},0.07), rgba(${accent.glowRgb},0.02))`,
            }}
          >
            <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accent.textClass}`}>
              Personnalité
            </p>
            <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-black text-foreground">
                  Ce que {student.name.split(" ")[0]} incarne
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {student.personalityProfile.represents}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {student.personalityProfile.dominantTraits.map((trait) => (
                    <span
                      key={trait}
                      className={`rounded border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] ${accent.badgeClass}`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <PersonalityItem label="Forces" value={student.personalityProfile.strengths.join(" · ")} />
                <PersonalityItem label="Énergie" value={student.personalityProfile.energy} />
                <PersonalityItem label="Posture" value={student.personalityProfile.posture} />
                <PersonalityItem label="Interaction" value={student.personalityProfile.interaction} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-md border border-white/10 bg-white/[0.045] p-6">
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accent.textClass}`}>
              Ce que tu peux travailler avec ce personnage
            </p>
            <ul className="mt-5 grid gap-3">
              {student.progression.map((item) => (
                <li
                  key={item}
                  className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article
            className={`rounded-md border p-6 ${accent.borderSoftClass}`}
            style={{
              background: `linear-gradient(135deg, rgba(${accent.glowRgb},0.07), rgba(${accent.glowRgb},0.02))`,
            }}
          >
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accent.textClass}`}>
              Prochaine mission recommandée
            </p>
            <h2 className="mt-4 text-2xl font-black text-foreground">
              {student.recommendedMission?.title ?? "Mission à venir"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              {student.recommendedMission?.description ??
                "Les missions de ce niveau seront connectées ici lorsqu’elles seront structurées."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {student.recommendedMission?.href ? (
                <Link
                  href={student.recommendedMission.href}
                  className={`rounded-md border px-4 py-2 text-sm font-bold transition hover:opacity-90 ${accent.badgeClass}`}
                >
                  Ouvrir la mission
                </Link>
              ) : null}
              <Link
                href={student.levelHref}
                className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Niveau {student.level}
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <article className="rounded-md border border-white/10 bg-white/[0.045] p-6">
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accent.textClass}`}>
              Missions associées
            </p>
            {associatedMissions.length > 0 ? (
              <div className="mt-5 grid gap-3">
                {associatedMissions.slice(0, 5).map((mission) => (
                  <Link
                    key={mission.id}
                    href={mission.href}
                    className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted transition hover:border-gold/30 hover:text-foreground"
                  >
                    <span className="font-bold text-foreground">{mission.title}</span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-muted">
                      {mission.subject} · {getPublicStatusLabel(mission.status)}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-muted">
                Les missions de ce personnage seront reliées ici quand elles seront prêtes.
              </p>
            )}
          </article>

          <article className="rounded-md border border-white/10 bg-white/[0.045] p-6">
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accent.textClass}`}>
              Parcours associés
            </p>
            {associatedPaths.length > 0 ? (
              <div className="mt-5 grid gap-3">
                {associatedPaths.map((path) => (
                  <Link
                    key={path.slug}
                    href={`/parcours/${path.slug}`}
                    className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted transition hover:border-gold/30 hover:text-foreground"
                  >
                    <span className="font-bold text-foreground">{path.title}</span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-muted">
                      {path.estimatedDuration} · {getPublicStatusLabel(path.status)}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-muted">
                Aucun parcours officiel n’est encore relié à ce niveau.
              </p>
            )}
          </article>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accent.textClass}`}>
                Progression pédagogique
              </p>
              <h2 className="mt-2 text-3xl font-black text-foreground">
                Ce que ce profil aide à travailler
              </h2>
            </div>
            <Link
              href="/eleves"
              className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Retour à la galerie
            </Link>
            <Link
              href="/ressources"
              className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Ressources
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/[0.06] md:grid-cols-2 lg:grid-cols-4">
            {student.progression.map((step, index) => (
              <div key={step} className="bg-ink/82 p-6">
                <span
                  className="text-4xl font-black leading-none"
                  style={{ color: `rgba(${accent.glowRgb},0.32)` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-sm font-semibold leading-7 text-muted">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PersonalityItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-white/10 bg-ink/35 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-foreground">{value}</p>
    </div>
  );
}
