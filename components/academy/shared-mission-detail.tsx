"use client";

import Link from "next/link";
import { useState } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getLevelMissionsPath, getLevelPath, stageLabels } from "@/content/academy";
import type {
  PublicAcademyLevel,
  PublicAcademyMission,
} from "@/content/public-academy";
import { CurriculumLinkPanel } from "@/components/missions/curriculum-link-panel";
import { AccentPanel } from "@/components/missions/accent-panel";
import { ModeButton } from "@/components/missions/mode-button";
import { MissionMeta } from "@/components/missions/mission-meta";
import { PrintBodyClass } from "@/components/print/print-body-class";

type SharedMissionDetailProps = {
  level: PublicAcademyLevel;
  mission: PublicAcademyMission;
  relatedPaths?: {
    slug: string;
    title: string;
    estimatedDuration: string;
  }[];
};

type DisplayMode = "standard" | "projection" | "print";

export function SharedMissionDetail({
  level,
  mission,
  relatedPaths = [],
}: SharedMissionDetailProps) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("standard");
  const [showCorrection, setShowCorrection] = useState(false);
  const missionsPath = getLevelMissionsPath(level);
  const professorSlug = mission.professorSlug ?? level.professor.slug;
  const professorName = mission.professorName ?? level.professor.name;
  const isProjectionMode = displayMode === "projection";
  const isPrintMode = displayMode === "print";
  const questions = mission.questions ?? [];
  const correction = mission.correction ?? [];
  const hasCorrection = correction.length > 0;
  const pageClass = [
    "mission-detail-page",
    isProjectionMode ? "mission-detail-page--projection" : "",
    isPrintMode ? "mission-detail-page--print" : "",
  ]
    .filter(Boolean)
    .join(" ");

  function selectMode(mode: DisplayMode) {
    setDisplayMode(mode);

    if (mode === "projection") {
      setShowCorrection(false);
    }
  }

  return (
    <main className={pageClass} data-mode={displayMode}>
      <PrintBodyClass className="print-mission-detail" />
      <div className="mission-detail-chrome px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: stageLabels[level.stage], href: `/${level.stage}` },
              { label: level.label, href: getLevelPath(level) },
              { label: "Missions", href: missionsPath },
              { label: mission.title },
            ]}
          />
        </div>
      </div>

      <section className="mission-detail-hero relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-detail-effects mission-grid absolute inset-0 -z-20 opacity-30" />
        <div className="mission-detail-effects absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.08),rgba(9,16,15,0.94))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p
              className={`inline-flex rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] ${mission.theme.surfaceClass} ${mission.theme.textClass} ${mission.theme.ringClass}`}
            >
              {level.label} · {mission.subject}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              {mission.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              {mission.description}
            </p>
            <div className="mission-detail-actions mt-8 flex flex-wrap gap-3">
              <ModeButton
                active={isProjectionMode}
                onClick={() => selectMode(isProjectionMode ? "standard" : "projection")}
              >
                Mode projection
              </ModeButton>
              <ModeButton
                active={isPrintMode}
                onClick={() => selectMode(isPrintMode ? "standard" : "print")}
              >
                Mode impression
              </ModeButton>
              {hasCorrection ? (
                <ModeButton
                  active={showCorrection}
                  onClick={() => setShowCorrection((visible) => !visible)}
                >
                  Correction
                </ModeButton>
              ) : null}
            </div>
          </div>

          <aside className="mission-detail-card rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Dossier mission
            </p>
            <div className="mt-5 grid gap-3">
              <MissionMeta label="Niveau" value={level.label} />
              <MissionMeta label="Matière" value={mission.subject} />
              <MissionMeta label="Statut" value={<PublicStatusBadge status={mission.status} />} />
              <MissionMeta label="Difficulté" value={mission.difficulty ?? level.cycle} />
              <MissionMeta label="Professeur" value={professorName} href={`/professeurs/${professorSlug}`} />
            </div>
          </aside>
        </div>
      </section>

      <section className="mission-detail-body px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-5">
            <AccentPanel title="Objectif" accentClass={mission.theme.textClass}>
              {mission.objective}
            </AccentPanel>
            <AccentPanel title="Compétence" accentClass={mission.theme.textClass}>
              {mission.skill}
            </AccentPanel>
            {mission.methodTip ? (
              <AccentPanel title="Méthode / conseil" accentClass="text-gold">
                {mission.methodTip}
              </AccentPanel>
            ) : null}
            {mission.projectionHint || mission.printHint ? (
              <div className="grid gap-3">
                {mission.projectionHint ? (
                  <AccentPanel title="Projection" accentClass="text-sky">
                    {mission.projectionHint}
                  </AccentPanel>
                ) : null}
                {mission.printHint ? (
                  <AccentPanel title="Impression" accentClass="text-jade">
                    {mission.printHint}
                  </AccentPanel>
                ) : null}
              </div>
            ) : null}
            <CurriculumLinkPanel {...mission} />
            {relatedPaths.length > 0 ? (
              <AccentPanel title="Parcours associés" accentClass="text-jade">
                <span className="grid gap-2">
                  {relatedPaths.map((path) => (
                    <Link
                      key={path.slug}
                      href={`/parcours/${path.slug}`}
                      className="block rounded border border-white/10 bg-ink/35 p-3 text-sm leading-6 text-muted transition hover:border-gold/30 hover:text-foreground"
                    >
                      {path.title} · {path.estimatedDuration}
                    </Link>
                  ))}
                </span>
              </AccentPanel>
            ) : null}
          </div>

          <div className="space-y-5">
            {mission.introduction ? (
              <AccentPanel title="Introduction narrative" accentClass={mission.theme.textClass}>
                {mission.introduction}
              </AccentPanel>
            ) : null}

            {mission.support ? (
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                  Activité élève
                </p>
                <h2 className="mt-3 text-2xl font-black text-foreground">
                  {mission.support.label}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {mission.support.content}
                </p>
              </div>
            ) : null}

            {questions.length > 0 ? (
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                  Questions progressives
                </h2>
                <div className="mt-5 grid gap-3">
                  {questions.map((question, index) => (
                    <div
                      key={question}
                      className="mission-question rounded border border-white/10 bg-ink/35 p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                        Question {index + 1}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-foreground">
                        {question}
                      </p>
                      {isPrintMode ? (
                        <div
                          className="mt-4 hidden h-20 rounded border border-dashed border-black/45 bg-white print:block"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {hasCorrection ? (
              <div
                className={`mission-correction rounded-md border border-white/10 bg-white/[0.04] p-6 ${
                  showCorrection ? "" : "mission-correction--hidden"
                }`}
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-ember">
                  Correction
                </h2>
                {showCorrection ? (
                  <div className="mt-5 grid gap-3">
                    {correction.map((answer, index) => (
                      <p
                        key={`${answer}-${index}`}
                        className="rounded border border-white/10 bg-ink/35 p-4 text-sm leading-7 text-muted"
                      >
                        {answer}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded border border-white/10 bg-ink/35 p-4 text-sm leading-7 text-muted">
                    Correction masquée. Utilise le bouton &ldquo;Correction&rdquo; pour
                    l&rsquo;afficher.
                  </p>
                )}
              </div>
            ) : null}

            <Link
              href={missionsPath}
              className="mission-detail-chrome inline-flex rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Retour aux missions {level.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
