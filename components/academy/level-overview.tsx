import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { LevelStudentSpotlight } from "@/components/academy/level-student-spotlight";
import { AnnualPathCard } from "@/components/academy/learning-architecture-cards";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { SubjectBadges } from "@/components/academy/subject-badges";
import { LevelHero } from "@/components/levels/level-hero";
import { MissionGrid } from "@/components/missions/mission-grid";
import { getAnnualPathsForLevel } from "@/content/annual-learning-paths";
import type { AcademyLevel } from "@/content/academy";
import { getLevelMissionsPath, stageLabels } from "@/content/academy";
import { getCompetenciesForLevel } from "@/content/competencies";
import { getStudentForLevelSlug } from "@/content/students";
import { getCurriculumLevel, type CurriculumLevelSlug } from "@/content/curriculum";
import { getCollegeMatiereCards } from "@/content/college-curriculum";
import { getCurriculumLevelMap } from "@/content/curriculum-map";
import { getClassroomResources } from "@/content/resources";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import { sanitizePublicPedagogicalItems } from "@/content/public-sanitization";
import {
  getPublicStatusDotClassName,
  getPublicStatusKey,
  getPublicStatusLabel,
} from "@/content/public-status";

type LevelOverviewProps = {
  level: AcademyLevel;
};

const modeBadge: Record<string, { label: string; classes: string }> = {
  projection: {
    label: "Projection",
    classes: "border-sky/30 bg-sky/10 text-sky",
  },
  impression: {
    label: "Impression",
    classes: "border-jade/30 bg-jade/10 text-jade",
  },
  correction: {
    label: "Correction",
    classes: "border-gold/30 bg-gold/10 text-gold",
  },
};

export function LevelOverview({ level }: LevelOverviewProps) {
  const missionsPath = getLevelMissionsPath(level);
  const student = getStudentForLevelSlug(level.slug);

  const curriculum = getCurriculumLevel(level.slug as CurriculumLevelSlug);
  const hasPrimaryProgramme = getCurriculumLevelMap(level.slug) !== undefined;
  const collegeMatiereCards = getCollegeMatiereCards(level.slug);
  const validDomains = sanitizePublicPedagogicalItems(curriculum?.majorDomains ?? []);
  const validCompetencies = sanitizePublicPedagogicalItems(curriculum?.coreCompetencies ?? []);

  const resources = getClassroomResources().filter(
    (r) => r.levelSlug === level.slug,
  );

  const paths = getLearningPathsWithSteps().filter(
    (p) => p.levelSlug === level.slug,
  );
  const observableCompetencies = getCompetenciesForLevel(level.slug);
  const annualPaths = getAnnualPathsForLevel(level.slug);

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: stageLabels[level.stage], href: `/${level.stage}` },
              { label: level.label },
            ]}
          />
        </div>
      </div>

      {/* ── Hero cinématique ── */}
      <LevelHero
        eyebrow={level.mood.name}
        title={level.heroTitle}
        description={level.description}
        character={level.professor.name}
        cycle={level.cycle}
        ctaHref={missionsPath}
        ctaLabel="Ouvrir les missions"
      >
        <div className="space-y-4">
          <p className="text-sm leading-7 text-muted">{level.mood.description}</p>
          <div className="rounded border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Professeur
            </p>
            <p className="mt-2 text-sm font-bold text-foreground">
              {level.professor.name} · {level.professor.role}
            </p>
          </div>
        </div>
      </LevelHero>

      {/* ── Élève emblématique ── */}
      {student ? <LevelStudentSpotlight student={student} /> : null}

      {/* ── Univers narratif + Professeur + Aperçu missions ── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04] p-6">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(243,196,91,0.12),transparent_38%)]" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Univers narratif
            </p>
            <h2 className="mt-3 text-2xl font-black text-foreground">
              {level.mood.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              {level.mood.description}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted/80">
              {level.professor.visualMood}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Link
              href={`/univers/personnages/${level.professor.slug}`}
              aria-label={`Voir la fiche du professeur ${level.professor.name}`}
              className="group rounded-md border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[0.07]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                Professeur associé
              </p>
              <div className="mt-5 flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-md border border-gold/35 bg-gold/10 text-lg font-black text-gold">
                  {level.professor.initial}
                </span>
                <div>
                  <h2 className="text-xl font-black text-foreground">
                    {level.professor.name}
                  </h2>
                  <p className="mt-1 text-sm font-bold text-gold">
                    {level.professor.role}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-muted">
                {level.professor.specialty}
              </p>
              <span className="mt-5 inline-flex text-sm font-bold text-gold transition group-hover:translate-x-1">
                Voir la fiche de {level.professor.name}
              </span>
            </Link>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
                Missions à venir
              </p>
              <div className="mt-5 grid gap-3">
                {level.missions.slice(0, 3).map((mission) => (
                  <div
                    key={mission.slug}
                    className="rounded border border-white/10 bg-ink/35 p-3"
                  >
                    <p className="text-sm font-bold text-foreground">
                      {mission.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {mission.subject} · {getPublicStatusLabel(mission.status)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Matières principales ── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
                Matières prévues
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground">
                Un socle complet, prêt à enrichir.
              </h2>
            </div>
            <SubjectBadges subjects={level.subjects} />
          </div>
        </div>
      </section>

      {collegeMatiereCards.length > 0 ? (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
                Programme {level.label}
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground">
                Matières du niveau
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collegeMatiereCards.map((matiere) => {
                const isLinked =
                  !!matiere.href &&
                  getPublicStatusKey(matiere.status) !== "upcoming";
                const card = (
                  <div
                    className={`group flex h-full flex-col rounded-md border p-5 transition ${
                      isLinked
                        ? "border-jade/30 bg-jade/[0.05] hover:-translate-y-0.5 hover:border-jade/45 hover:bg-jade/[0.08]"
                        : "border-white/10 bg-white/[0.025] opacity-60"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                      {matiere.label}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                      {matiere.description}
                    </p>
                    {isLinked ? (
                      <span className="mt-4 text-sm font-black text-jade transition group-hover:translate-x-1">
                        Accéder →
                      </span>
                    ) : (
                      <span className="mt-4 inline-flex w-fit rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-muted">
                        À venir
                      </span>
                    )}
                  </div>
                );

                if (isLinked) {
                  return (
                    <Link key={matiere.slug} href={matiere.href!}>
                      {card}
                    </Link>
                  );
                }
                return <div key={matiere.slug}>{card}</div>;
              })}
            </div>
          </div>
        </section>
      ) : null}

      {level.slug === "cp" ? (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
                Ressources CP par domaine
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground">
                Premiers portails PDF
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/primaire/cp/programmes/francais/lecture-comprehension"
                className="group flex min-h-full flex-col rounded-md border border-jade/25 bg-jade/[0.05] p-6 transition hover:-translate-y-0.5 hover:border-jade/45 hover:bg-jade/[0.08]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                  Français
                </p>
                <h3 className="mt-2 text-2xl font-black text-foreground">
                  Lecture compréhension
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                  Retrouver les leçons CP et les ressources PDF futures :
                  leçon, exercices, correction, projection et fiche parent.
                </p>
                <span className="mt-5 text-sm font-black text-jade transition group-hover:translate-x-1">
                  Voir les ressources →
                </span>
              </Link>
              <div className="flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.025] p-6 opacity-60">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                  Français
                </p>
                <h3 className="mt-2 text-2xl font-black text-foreground">
                  Écriture
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                  Préparer les futures ressources PDF pour écrire des mots et
                  des phrases courtes en CP.
                </p>
                <span className="mt-5 inline-flex w-fit rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-muted">
                  À venir
                </span>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <Link
                href={`/primaire/${level.slug}/programme-complet`}
                className="text-sm font-bold text-sky/70 transition hover:text-sky"
              >
                Programme complet CP →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Compétences du programme ── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
                Programme
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground">
                Compétences du niveau
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {curriculum?.status && (
                <PublicStatusBadge status={curriculum.status} className="self-start" />
              )}
              {hasPrimaryProgramme && (
                <Link
                  href={`/primaire/${level.slug}/programme`}
                  className="inline-flex self-start rounded-md border border-sky/30 bg-sky/[0.06] px-4 py-2 text-sm font-bold text-sky transition hover:bg-sky/[0.12]"
                >
                  Voir le programme complet
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Grands domaines */}
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
                Domaines principaux
              </p>
              {validDomains.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {validDomains.map((domain) => (
                    <span
                      key={domain}
                      className="rounded border border-sky/20 bg-sky/[0.07] px-3 py-1.5 text-xs font-bold text-sky/80"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted">
                  Domaines en cours de structuration.
                </p>
              )}
            </div>

            {/* Compétences clés */}
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
                Compétences clés
              </p>
              {validCompetencies.length > 0 ? (
                <ul className="mt-4 grid gap-2">
                  {validCompetencies.slice(0, 5).map((comp, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-muted">
                      <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sky/50" />
                      <span className="leading-6">{comp}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted">
                  Compétences à aligner avec le programme officiel.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Compétences observables ── */}
      {observableCompetencies.length > 0 ? (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
                  Compétences observables
                </p>
                <h2 className="mt-3 text-3xl font-black text-foreground">
                  Ce que l&apos;élève apprend à réussir
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted">
                Première couche de repérage : objectifs courts, critères de
                réussite et ressources associées quand elles existent.
              </p>
            </div>

            <div className="flex justify-start">
              <Link
                href={`/primaire/${level.slug}/competences`}
                className="inline-flex rounded-md border border-sky/30 bg-sky/10 px-4 py-3 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
              >
                Voir toutes les compétences
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Parcours annuels ── */}
      {annualPaths.length > 0 ? (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
                  Parcours annuels
                </p>
                <h2 className="mt-3 text-3xl font-black text-foreground">
                  Progressions à installer sur l&apos;année
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted">
                Aperçu léger des progressions prévues. Les semaines listées
                servent à organiser le travail, pas à porter les contenus complets.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {annualPaths.slice(0, 2).map((path) => (
                <AnnualPathCard key={path.id} path={path} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Missions recommandées ── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
                Missions recommandées
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground">
                Premiers dossiers pédagogiques
              </h2>
            </div>
            <Link
              href={missionsPath}
              className="inline-flex self-start rounded-md border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink sm:self-auto"
            >
              Voir le tableau complet
            </Link>
          </div>

          <div className="mt-8">
            <MissionGrid
              missions={level.missions.slice(0, 3)}
              linkBasePath={level.slug === "cm2" ? missionsPath : null}
            />
          </div>
        </div>
      </section>

      {/* ── Ressources à projeter / imprimer ── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-ember">
                Ressources classe
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground">
                À projeter ou imprimer
              </h2>
            </div>
            <Link
              href="/ressources"
              className="inline-flex self-start rounded-md border border-ember/30 bg-ember/10 px-4 py-3 text-sm font-bold text-ember transition hover:bg-ember hover:text-ink sm:self-auto"
            >
              Catalogue complet
            </Link>
          </div>

          {resources.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resources.slice(0, 6).map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.href}
                  className="group flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-ember/25 hover:bg-white/[0.07]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-foreground leading-snug">
                      {resource.title}
                    </p>
                    <span
                      role="img"
                      aria-label={getPublicStatusLabel(resource.status)}
                      className={`mt-0.5 size-2 shrink-0 rounded-full ${
                        getPublicStatusDotClassName(resource.status)
                      }`}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted">{resource.subject}</p>
                  {resource.modes.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {resource.modes.map((mode) => (
                        <span
                          key={mode}
                          className={`rounded border px-2 py-0.5 text-xs font-bold ${modeBadge[mode]?.classes ?? ""}`}
                        >
                          {modeBadge[mode]?.label ?? mode}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-8 text-center">
              <p className="text-sm font-bold text-muted">
                Ressources en construction pour ce niveau.
              </p>
              <Link
                href="/ressources"
                className="mt-4 inline-flex rounded-md border border-ember/30 bg-ember/10 px-4 py-2.5 text-sm font-bold text-ember transition hover:bg-ember hover:text-ink"
              >
                Voir les ressources disponibles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Parcours disponibles ── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
                Parcours
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground">
                Séquences guidées disponibles
              </h2>
            </div>
            <Link
              href="/parcours"
              className="inline-flex self-start rounded-md border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink sm:self-auto"
            >
              Tous les parcours
            </Link>
          </div>

          {paths.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {paths.map((path) => (
                <Link
                  key={path.slug}
                  href={`/parcours/${path.slug}`}
                  aria-label={`Ouvrir le parcours : ${path.title}`}
                  className="group relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/[0.07]"
                >
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_100%,rgba(243,196,91,0.08),transparent_50%)]" />
                  <div className="flex items-center justify-between gap-4">
                    <PublicStatusBadge status={path.status} />
                    <span className="text-xs text-muted">{path.estimatedDuration}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-foreground">
                    {path.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-gold">{path.subject}</p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {path.globalObjective}
                  </p>
                  {path.competencies.length > 0 && (
                    <ul className="mt-4 grid gap-1.5">
                      {path.competencies.slice(0, 3).map((c, i) => (
                        <li key={i} className="flex gap-2 text-xs text-muted">
                          <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-gold/50" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-5 inline-flex text-sm font-bold text-gold transition group-hover:translate-x-1">
                    Ouvrir le parcours
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-8 text-center">
              <p className="text-sm font-bold text-muted">
                Parcours en construction pour ce niveau.
              </p>
              <Link
                href="/parcours"
                className="mt-4 inline-flex rounded-md border border-gold/35 bg-gold/10 px-4 py-2.5 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
              >
                Voir les parcours disponibles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA navigation croisée ── */}
      <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-gold/20 bg-gold/[0.055] p-6">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Explorer l&apos;Académie
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Relier le niveau, les professeurs, les élèves et les ressources.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/professeurs"
                className="rounded-md bg-gold px-4 py-3 text-sm font-bold text-ink transition hover:bg-[#ffd778]"
              >
                Professeurs
              </Link>
              <Link
                href="/eleves"
                className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Élèves
              </Link>
              <Link
                href="/ressources"
                className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Ressources
              </Link>
              <Link
                href="/parcours"
                className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
              >
                Parcours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
