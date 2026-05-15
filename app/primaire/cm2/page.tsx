import type { Metadata } from "next";
import Link from "next/link";
import { LevelStudentSpotlight } from "@/components/academy/level-student-spotlight";
import { PedagogicalImageHero } from "@/components/academy/interactive-image-map";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Badge } from "@/components/cm2/badge";
import { BadgeGrid } from "@/components/cm2/badge-grid";
import { CharacterHero } from "@/components/cm2/character-hero";
import { Metric } from "@/components/cm2/metric";
import { PlaceCard } from "@/components/cm2/place-card";
import { SectionHeader } from "@/components/cm2/section-header";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm2Level, cm2Missions, type Cm2Mission } from "@/content/cm2";
import { getCurriculumLevel } from "@/content/curriculum";
import {
  courDesExplorateursHero,
  felixCharacter,
  felixPlaces,
  felixBadges,
} from "@/content/felix-character";
import { felixProjects } from "@/content/felix-missions";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import { sanitizePublicPedagogicalItems } from "@/content/public-sanitization";
import { getPublicStatusLabel } from "@/content/public-status";
import { getStudentForLevelSlug } from "@/content/students";

export const metadata: Metadata = {
  title: "CM2 — La Grande Classe des Explorateurs | Académie Kerboeuf",
  description:
    "Page niveau CM2 avec Félix : domaines travaillés, compétences, missions et parcours pédagogique.",
};

export default function Cm2Page() {
  const curriculum = getCurriculumLevel("cm2");
  const student = getStudentForLevelSlug("cm2");
  const cm2Path = getLearningPathsWithSteps().find(
    (path) => path.levelSlug === "cm2",
  );
  const linkedMissionHrefs = new Set(
    curriculum?.missionLinks.map((mission) => mission.href) ?? [],
  );

  return (
    <main className="cm2-catalog-print">
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2" },
            ]}
          />
        </div>
      </div>

      <section className="cm2-print-hero relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,196,91,0.17),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.12),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              {curriculum?.cycle ?? "Cycle 3"} · Professeur associé : Félix
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              CM2 — La Grande Classe des Explorateurs
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              {cm2Level.description} Le niveau consolide les méthodes du Cycle
              3 : lire avec précision, calculer avec stratégie, enquêter dans
              les documents et préparer l’entrée au collège.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/primaire/cm2/missions"
                className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
              >
                Voir les missions CM2
              </Link>
              <Link
                href="/primaire/cm2/parcours"
                className="rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
              >
                Parcours de l’année
              </Link>
              <Link
                href="/programmes"
                className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                Voir les programmes
              </Link>
              <Link
                href="/professeurs/felix"
                className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                Fiche de Félix
              </Link>
            </div>
          </div>

          <aside className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Repères CM2
            </p>
            <div className="mt-5 grid gap-3">
              <Metric value={cm2Missions.length} label="missions" />
              <Metric value={curriculum?.majorDomains.length ?? 0} label="domaines" />
              <Metric
                value={curriculum?.learningPathLinks.length ?? 0}
                label="parcours"
              />
            </div>
          </aside>
        </div>
      </section>

      {student ? (
        <div className="cm2-print-hide">
          <LevelStudentSpotlight student={student} />
        </div>
      ) : null}

      {curriculum ? (
        <>
          <section className="cm2-print-section px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionHeader
                eyebrow="Domaines travaillés"
                title="Les grands territoires du CM2"
                description="Les domaines ci-dessous proviennent de la structure pédagogique CM2 déjà définie dans le projet."
              />
              <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {sanitizePublicPedagogicalItems(curriculum.majorDomains).map((domain) => (
                  <InfoCard key={domain} text={domain} />
                ))}
              </div>
            </div>
          </section>

          <section className="cm2-print-section px-4 pb-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionHeader
                eyebrow="Compétences principales"
                title="Ce que l’élève apprend à maîtriser"
                description="Une lecture claire des compétences renforcées pour relier les missions aux gestes scolaires attendus."
              />
              <div className="mt-8 grid gap-3 lg:grid-cols-2">
                {sanitizePublicPedagogicalItems(curriculum.coreCompetencies).map((competency, index) => (
                  <NumberedCard
                    key={`${competency}-${index}`}
                    index={index + 1}
                    text={competency}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* Félix le lynx — section narrative */}
      <div className="cm2-print-hide border-t border-white/10">
        <CharacterHero character={felixCharacter} accentColor="jade" />
      </div>

      <PedagogicalImageHero {...courDesExplorateursHero} />

      {/* Badges */}
      <section className="cm2-print-hide px-4 pb-14 sm:px-6 lg:px-8" aria-labelledby="badges-title">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-jade">
              Les 8 gestes du lynx
            </p>
            <h2 id="badges-title" className="mt-3 text-3xl font-black text-foreground">
              Badges de compétences observables
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Chaque badge correspond à un geste intellectuel observable que Félix valorise dans ses missions. Un élève obtient un badge lorsqu&apos;il peut le démontrer concrètement.
            </p>
          </div>
          <BadgeGrid badges={felixBadges} />
        </div>
      </section>

      {/* Lieux narratifs */}
      <section className="cm2-print-hide px-4 pb-14 sm:px-6 lg:px-8" aria-labelledby="places-title">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">
              Géographie narrative
            </p>
            <h2 id="places-title" className="mt-3 text-3xl font-black text-foreground">
              Les lieux de l&apos;Académie
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Chaque mission de Félix se déroule dans un lieu spécifique de l&apos;Académie Kerboeuf. Ces lieux donnent un ancrage narratif aux apprentissages et renforcent la cohérence de l&apos;univers.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {felixPlaces.map((place) => (
              <PlaceCard key={place.slug} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* Projets CM2 enrichis */}
      <section className="cm2-print-section px-4 pb-14 sm:px-6 lg:px-8" aria-labelledby="projects-title">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
                Projets transversaux
              </p>
              <h2 id="projects-title" className="mt-3 text-3xl font-black text-foreground">
                Les 9 projets de Félix
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Projets enrichis avec compétences observables, critères de réussite, différenciation et restitution.
              </p>
            </div>
            <Link
              href="/primaire/cm2/missions"
              className="inline-flex rounded-md border border-ember/35 bg-ember/10 px-4 py-3 text-sm font-bold text-ember transition hover:bg-ember hover:text-ink"
            >
              Voir tous les projets
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {felixProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/primaire/cm2/missions/${project.slug}`}
                className={`group flex min-h-full flex-col rounded-md border bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07] ${project.theme.ringClass}`}
              >
                <div className={`mb-4 h-1 rounded-full ${project.theme.accentClass}`} aria-hidden="true" />
                <p className={`text-xs font-bold uppercase tracking-[0.18em] ${project.theme.textClass}`}>
                  {project.mainSubject}
                </p>
                <h3 className="mt-2 text-lg font-black text-foreground">{project.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-6 text-muted">{project.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <PublicStatusBadge status={project.status} />
                  <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-muted">
                    {project.duration}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cm2-print-section px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Missions CM2"
              title="Les dossiers de Félix"
              description="Chaque carte ouvre une mission réelle du catalogue CM2 existant."
            />
            <Link
              href="/primaire/cm2/missions"
              className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
            >
              Tableau complet
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cm2Missions.map((mission) => (
              <MissionCard
                key={mission.slug}
                mission={mission}
                isCurriculumLinked={linkedMissionHrefs.has(
                  `/primaire/cm2/missions/${mission.slug}`,
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {cm2Path ? (
        <section className="cm2-print-section px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-gold/20 bg-gold/[0.055] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Parcours pédagogique
              </p>
              <div className="mt-4 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <div>
                  <h2 className="text-3xl font-black text-foreground">
                    {cm2Path.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {cm2Path.globalObjective}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge>{cm2Path.estimatedDuration}</Badge>
                    <Badge>{cm2Path.subject}</Badge>
                    <PublicStatusBadge status={cm2Path.status} />
                  </div>
                  <Link
                    href={`/parcours/${cm2Path.slug}`}
                    className="mt-6 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
                  >
                    Ouvrir le parcours
                  </Link>
                </div>

                <div className="grid gap-3">
                  {cm2Path.steps.map((step, index) => (
                    <Link
                      key={step.href}
                      href={step.href}
                      className="grid gap-3 rounded border border-white/10 bg-ink/35 p-4 transition hover:border-gold/30 hover:bg-white/[0.06] sm:grid-cols-[auto_1fr]"
                    >
                      <span className="grid size-10 place-items-center rounded bg-gold/10 font-mono text-sm font-black text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-bold text-foreground">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-muted">
                          {step.objective}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {curriculum ? (
        <section className="cm2-print-hide px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                    Statut pédagogique
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-foreground">
                    Niveau {getPublicStatusLabel(curriculum.status)}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                    Le CM2 est structuré et relié aux missions, mais
                    l’alignement officiel reste à confirmer lorsque les textes
                    sources seront intégrés au projet.
                  </p>
                </div>
                <Link
                  href="/programmes"
                  className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
                >
                  Voir le bloc programmes
                </Link>
              </div>

              {sanitizePublicPedagogicalItems(curriculum.verificationNotes).length > 0 ? (
                <ul className="mt-6 grid gap-2 lg:grid-cols-2">
                  {sanitizePublicPedagogicalItems(curriculum.verificationNotes).map((note) => (
                    <li
                      key={note}
                      className="rounded border border-white/10 bg-ink/35 p-3 text-sm leading-6 text-muted"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}


function InfoCard({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm font-semibold leading-7 text-muted">{text}</p>
    </div>
  );
}

function NumberedCard({ index, text }: { index: number; text: string }) {
  return (
    <div className="grid gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-[auto_1fr]">
      <span className="grid size-10 place-items-center rounded bg-jade/10 font-mono text-sm font-black text-jade">
        {String(index).padStart(2, "0")}
      </span>
      <p className="text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}

function MissionCard({
  mission,
  isCurriculumLinked,
}: {
  mission: Cm2Mission;
  isCurriculumLinked: boolean;
}) {
  return (
    <Link
      href={`/primaire/cm2/missions/${mission.slug}`}
      className="group flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-[0.18em] ${mission.theme.textClass}`}
          >
            {mission.subject}
          </p>
          <h3 className="mt-3 text-2xl font-black text-foreground">
            {mission.title}
          </h3>
        </div>
        <PublicStatusBadge status={mission.status} />
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-muted">
        {mission.objective}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {isCurriculumLinked ? <Badge>Reliée au programme</Badge> : null}
        {mission.pedagogy.usage?.projection ? <Badge>À projeter</Badge> : null}
        {mission.pedagogy.usage?.printing ? <Badge>À imprimer</Badge> : null}
      </div>

      <span className="mt-6 text-sm font-bold text-gold transition group-hover:translate-x-1">
        Ouvrir la mission
      </span>
    </Link>
  );
}
