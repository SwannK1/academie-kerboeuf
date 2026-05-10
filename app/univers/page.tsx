import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { UniversHero } from "@/components/academy/univers-hero";
import { academyLevels, academySubjects } from "@/content/academy";
import { cm2Missions } from "@/content/cm2";
import { maternelleWorld, emblematicStudents } from "@/content/students";
import { professorProfiles } from "@/content/professors";
import { learningPaths } from "@/content/learning-paths";
import { getPublicStatusKey } from "@/content/public-status";
import {
  historyChapters,
  educationalValues,
  missionThemes,
  mainPlaces,
  academyCycles,
  universePathways,
  type AccentKey,
} from "@/content/universe";

export const metadata: Metadata = {
  title: "Univers | Académie Kerboeuf",
  description:
    "La bible narrative et pédagogique de l'Académie Kerboeuf — histoire, cycles, lieux, professeurs, élèves emblématiques et valeurs.",
};

// Helpers de style selon couleur d'accent ─────────────────────────────────────

const accentText: Record<AccentKey, string> = {
  gold: "text-gold",
  jade: "text-jade",
  sky: "text-sky",
  ember: "text-ember",
};
const accentBorder: Record<AccentKey, string> = {
  gold: "border-gold/35",
  jade: "border-jade/35",
  sky: "border-sky/35",
  ember: "border-ember/35",
};
const accentBg: Record<AccentKey, string> = {
  gold: "bg-gold/10",
  jade: "bg-jade/10",
  sky: "bg-sky/10",
  ember: "bg-ember/10",
};
const accentBgSolid: Record<AccentKey, string> = {
  gold: "bg-gold",
  jade: "bg-jade",
  sky: "bg-sky",
  ember: "bg-ember",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UniversPage() {
  const missionCount = academyLevels.reduce(
    (total, level) => total + level.missions.length,
    0,
  );

  const referentProfessors = professorProfiles.filter(
    (p) => p.characterType === "professeur référent",
  );

  const officialPersonalities = professorProfiles.filter(
    (p) => p.characterType === "personnalité officielle",
  );

  const availableCm2Missions = cm2Missions.filter(
    (mission) => getPublicStatusKey(mission.status) === "available",
  );

  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Univers" }]}
          />
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <UniversHero
        cyclesCount={academyCycles.length}
        levelsCount={academyLevels.length + 3}
        referentProfessorsCount={referentProfessors.length}
        personalitiesCount={officialPersonalities.length}
        studentsCount={emblematicStudents.length}
        missionsCount={missionCount}
        subjectsCount={academySubjects.length}
        pathsCount={learningPaths.length}
      />

      {/* ── 1. HISTOIRE ─────────────────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre I"
        title="L'histoire de l'Académie"
        text="D'où vient l'Académie Kerboeuf, pourquoi elle existe et ce qui la distingue."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {historyChapters.map((chapter, i) => (
            <article
              key={chapter.title}
              className={`rounded-md border p-6 ${accentBorder[chapter.accentColor]} bg-white/[0.04]`}
            >
              <span
                className={`font-mono text-xs font-black uppercase tracking-[0.2em] ${accentText[chapter.accentColor]}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-black text-foreground">
                {chapter.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{chapter.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── 2. CYCLES ────────────────────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre II"
        title="Les cycles de l'Académie"
        text="Du Cycle 1 au lycée, cinq grandes étapes qui structurent la progression des élèves."
        band
      >
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <PivotLink
            href="/maternelle"
            label="Maternelle"
            detail="PS · MS · GS"
            color="jade"
          />
          <PivotLink
            href="/primaire"
            label="Primaire"
            detail="CP · CE1 · CE2 · CM1 · CM2"
            color="gold"
          />
          <PivotLink
            href="/college"
            label="Collège"
            detail="6e · 5e · 4e · 3e"
            color="sky"
          />
          <PivotLink
            href="/lycee"
            label="Lycée"
            detail="Seconde · Première · Terminale"
            color="ember"
          />
          <PivotLink
            href="/programmes"
            label="Programmes"
            detail="Repères pédagogiques"
            color="gold"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {academyCycles.map((cycle) => (
            <article
              key={cycle.id}
              className={`rounded-md border p-5 ${accentBorder[cycle.accentColor]} bg-white/[0.04]`}
            >
              <p
                className={`font-mono text-xs font-black uppercase tracking-[0.2em] ${accentText[cycle.accentColor]}`}
              >
                {cycle.name}
              </p>
              <h3 className="mt-2 text-base font-black text-foreground">
                {cycle.fullName}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1">
                {cycle.levelLabels.map((label) => (
                  <span
                    key={label}
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${accentBg[cycle.accentColor]} ${accentText[cycle.accentColor]}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs leading-6 text-muted">
                {cycle.description}
              </p>
              <p
                className={`mt-3 text-xs font-semibold italic ${accentText[cycle.accentColor]}`}
              >
                {cycle.theme}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── 3. LIEUX ─────────────────────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre III"
        title="Les lieux de l'Académie"
        text="Chaque territoire a son ambiance, son guide et son architecture pédagogique propre."
      >
        {/* Maternelle — introduction séparée */}
        <div className="mb-8 rounded-md border border-jade/25 bg-jade/[0.06] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
            Maternelle · Cycle 1
          </p>
          <h3 className="mt-2 text-xl font-black text-foreground">
            {maternelleWorld.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            {maternelleWorld.description}
          </p>
        </div>

        {/* Catégories de lieux */}
        {(["primaire", "college", "lycee"] as const).map((cat) => {
          const places = mainPlaces.filter((p) => p.category === cat);
          const label =
            cat === "primaire"
              ? "Primaire — Cycles 2 & 3"
              : cat === "college"
                ? "Collège — Cycles 3 & 4"
                : "Lycée";
          return (
            <div key={cat} className="mb-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                {label}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {places.map((place) => (
                  <article
                    key={place.name}
                    className={`rounded-md border p-5 ${accentBorder[place.accentColor]} bg-white/[0.04]`}
                  >
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.16em] ${accentText[place.accentColor]}`}
                    >
                      {place.inhabitant}
                    </p>
                    <h3 className="mt-2 text-base font-black text-foreground">
                      {place.name}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-muted">
                      {place.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      {/* ── 4. PROFESSEURS RÉFÉRENTS ─────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre IV"
        title="Les professeurs référents"
        text="Neuf guides qui donnent une identité claire aux grands paliers de l'Académie."
        band
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {referentProfessors.map((prof) => {
            const color = (prof.accentColor ?? "gold") as AccentKey;
            return (
              <Link
                key={prof.slug}
                href={prof.profileHref}
                className={`rounded-md border p-5 transition hover:-translate-y-1 hover:bg-white/[0.06] ${accentBorder[color]} bg-white/[0.04]`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-black ${accentBorder[color]} ${accentBg[color]} ${accentText[color]}`}
                  >
                    {prof.initial}
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${accentBg[color]} ${accentText[color]}`}
                  >
                    {prof.levelLabel}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-black text-foreground">
                  {prof.name}
                </h3>
                <p className={`mt-1 text-xs font-bold ${accentText[color]}`}>
                  {prof.role}
                </p>
                <p className="mt-3 text-xs leading-6 text-muted line-clamp-3">
                  {prof.bio}
                </p>
                {prof.quote && (
                  <p
                    className={`mt-3 border-l-2 pl-3 text-xs italic leading-6 ${accentBorder[color]} text-muted`}
                  >
                    « {prof.quote} »
                  </p>
                )}
                <p className={`mt-4 text-xs font-bold ${accentText[color]}`}>
                  Voir le profil →
                </p>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── 5. ÉLÈVES EMBLÉMATIQUES ──────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre V"
        title="Les élèves emblématiques"
        text="Douze personnages qui incarnent une posture d'apprentissage, du Jardin des Petits à la Terminale."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {emblematicStudents.map((student) => {
            const color = student.dominantColor as AccentKey;
            return (
              <Link
                key={student.slug}
                href={`/eleves/${student.slug}`}
                className={`rounded-md border p-5 transition hover:-translate-y-1 hover:bg-white/[0.06] ${accentBorder[color]} bg-white/[0.04]`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-[0.16em] ${accentText[color]}`}
                >
                  {student.level} · {student.cycle}
                </p>
                <h3 className="mt-2 text-lg font-black text-foreground">
                  {student.name}
                </h3>
                <p
                  className={`mt-1 text-xs font-semibold italic ${accentText[color]}`}
                >
                  {student.universe}
                </p>
                <p className="mt-3 text-xs leading-6 text-muted">
                  {student.shortDescription}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {student.personalityProfile.dominantTraits
                    .slice(0, 3)
                    .map((trait) => (
                      <span
                        key={trait}
                        className={`rounded px-2 py-0.5 text-xs font-semibold ${accentBg[color]} ${accentText[color]}`}
                      >
                        {trait}
                      </span>
                    ))}
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── 6. VALEURS PÉDAGOGIQUES ──────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre VI"
        title="Les valeurs pédagogiques"
        text="Les principes qui traversent tous les niveaux et toutes les missions de l'Académie."
        band
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {educationalValues.map((value) => (
            <article
              key={value.name}
              className={`rounded-md border p-5 ${accentBorder[value.accentColor]} bg-white/[0.04]`}
            >
              <div
                className={`inline-flex rounded px-2 py-0.5 text-xs font-bold ${accentBg[value.accentColor]} ${accentText[value.accentColor]}`}
              >
                {value.source}
              </div>
              <h3 className="mt-3 text-base font-black text-foreground">
                {value.name}
              </h3>
              <p className="mt-3 text-xs leading-6 text-muted">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── 7. TYPES DE MISSIONS ─────────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre VII"
        title="Les types de missions"
        text="Les missions associent une couleur d'univers, une matière et un geste scolaire clair."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {missionThemes.map((theme) => (
            <article
              key={theme.id}
              className={`rounded-md border p-6 ${accentBorder[theme.accentColor]} bg-white/[0.04]`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${accentBgSolid[theme.accentColor]} ring-2 ${accentBorder[theme.accentColor]}`}
                />
                <h3
                  className={`font-mono text-xs font-black uppercase tracking-[0.2em] ${accentText[theme.accentColor]}`}
                >
                  {theme.name}
                </h3>
              </div>
              <p
                className={`mt-1 text-xs font-semibold italic ${accentText[theme.accentColor]}`}
              >
                {theme.tagline}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {theme.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {theme.examples.map((ex) => (
                  <span
                    key={ex}
                    className={`rounded-md border px-3 py-1 text-xs font-semibold ${accentBorder[theme.accentColor]} ${accentText[theme.accentColor]}`}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-md border border-white/10 bg-white/[0.035] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Matières déjà structurées
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {academySubjects.map((subject) => (
              <span
                key={subject}
                className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
        {availableCm2Missions.length > 0 && (
          <div className="mt-8 rounded-md border border-gold/25 bg-gold/[0.055] p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  Missions disponibles
                </p>
                <h3 className="mt-2 text-xl font-black text-foreground">
                  Entrer directement dans les séances CM2
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  Les cartes ci-dessous renvoient vers des missions déjà
                  prêtes à consulter dans le catalogue CM2 de Félix.
                </p>
              </div>
              <Link
                href="/primaire/cm2/missions"
                className="inline-flex h-11 items-center justify-center rounded-md border border-gold/35 bg-gold/10 px-5 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
              >
                Toutes les missions CM2
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {availableCm2Missions.map((mission) => (
                <Link
                  key={mission.slug}
                  href={`/primaire/cm2/missions/${mission.slug}`}
                  className={`rounded-md border bg-ink/35 p-4 transition hover:-translate-y-1 hover:bg-white/[0.06] ${mission.theme.ringClass}`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.16em] ${mission.theme.textClass}`}
                  >
                    {mission.subject}
                  </p>
                  <h4 className="mt-2 text-base font-black text-foreground">
                    {mission.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-xs leading-6 text-muted">
                    {mission.description}
                  </p>
                  <p className="mt-3 text-xs font-bold text-gold">
                    Ouvrir la mission →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* ── 8. PARCOURS ──────────────────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre VIII"
        title="Les parcours"
        text="Les parcours relient les missions en progression lisible : découvrir, s'entraîner, agir, corriger et stabiliser."
        band
      >
        <div className="mb-8 grid gap-4 md:grid-cols-5">
          {universePathways.map((step) => (
            <article
              key={step.step}
              className={`rounded-md border p-4 ${accentBorder[step.accentColor]} bg-white/[0.04]`}
            >
              <p
                className={`font-mono text-xs font-black uppercase tracking-[0.2em] ${accentText[step.accentColor]}`}
              >
                {step.step}
              </p>
              <h3 className="mt-2 text-base font-black text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-xs leading-6 text-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {learningPaths.map((path) => (
            <Link
              key={path.slug}
              href={`/parcours/${path.slug}`}
              className="rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-gold/35 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded bg-gold/10 px-2 py-0.5 font-mono text-xs font-bold text-gold">
                  {path.level}
                </span>
                <span className="text-xs text-muted">{path.estimatedDuration}</span>
              </div>
              <h3 className="mt-3 text-lg font-black text-foreground">
                {path.title}
              </h3>
              <p className="mt-1 text-xs font-semibold text-gold">
                {path.subject}
              </p>
              <p className="mt-3 text-xs leading-6 text-muted">
                {path.globalObjective}
              </p>
              <div className="mt-4 flex flex-wrap gap-1">
                {path.competencies.slice(0, 2).map((c) => (
                  <span
                    key={c}
                    className="rounded bg-white/[0.05] px-2 py-0.5 text-xs font-medium text-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-bold text-gold">
                Voir le parcours →
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── 9. PERSONNAGES SPÉCIAUX ──────────────────────────────────────────── */}
      <Section
        eyebrow="Chapitre IX"
        title="Les personnages spéciaux"
        text="Les personnalités officielles de l'Académie — guides transversaux, gardiens de disciplines et voix de l'exigence."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {officialPersonalities.map((char) => {
            const color = (char.accentColor ?? "gold") as AccentKey;

            return (
              <Link
                key={char.slug}
                href={char.profileHref}
                className={`rounded-md border p-4 transition hover:-translate-y-1 hover:bg-white/[0.06] ${accentBorder[color]} bg-white/[0.04]`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-sm font-black ${accentBorder[color]} ${accentBg[color]} ${accentText[color]}`}
                >
                  {char.initial}
                </div>
                <h3 className="mt-3 text-sm font-black text-foreground">
                  {char.name}
                </h3>
                <p className={`mt-1 text-xs font-bold ${accentText[color]}`}>
                  {char.role}
                </p>
                <p className="mt-2 text-xs italic text-muted">
                  {char.headquarters ?? char.moodName}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {char.personalityProfile?.represents ?? char.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            href="/professeurs"
            className="inline-flex items-center gap-2 text-sm font-bold text-gold transition hover:text-foreground"
          >
            Voir tous les professeurs →
          </Link>
        </div>
      </Section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/12 bg-[linear-gradient(135deg,rgba(243,196,91,0.1),rgba(80,200,164,0.07),rgba(255,255,255,0.03))] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
                Entrer dans l&apos;univers
              </p>
              <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
                Choisis une porte de l&apos;Académie.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                Les niveaux, les missions et les parcours sont cartographiés,
                avec des statuts qui distinguent ce qui est prêt, à venir ou en
                préparation.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-64 lg:grid-cols-1">
              <CtaLink href="/primaire" color="gold">Primaire</CtaLink>
              <CtaLink href="/primaire/cm2" color="gold">CM2 avec Félix</CtaLink>
              <CtaLink href="/primaire/cm2/missions" color="gold">Missions CM2</CtaLink>
              <CtaLink href="/college" color="sky">Collège</CtaLink>
              <CtaLink href="/lycee" color="ember">Lycée</CtaLink>
              <CtaLink href="/professeurs" color="ember">Professeurs</CtaLink>
              <CtaLink href="/eleves" color="jade">Élèves</CtaLink>
              <CtaLink href="/parcours" color="jade">Parcours</CtaLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Composants locaux ────────────────────────────────────────────────────────

function Section({
  eyebrow,
  title,
  text,
  children,
  band = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: React.ReactNode;
  band?: boolean;
}) {
  return (
    <section
      className={`px-4 py-20 sm:px-6 lg:px-8 ${
        band ? "border-y border-white/10 bg-panel/40" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">{text}</p>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function PivotLink({
  href,
  label,
  detail,
  color,
}: {
  href: string;
  label: string;
  detail: string;
  color: AccentKey;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-md border p-4 transition hover:-translate-y-1 hover:bg-white/[0.06] ${accentBorder[color]} bg-white/[0.04]`}
    >
      <p className={`text-sm font-black ${accentText[color]}`}>{label}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
      <p className={`mt-3 text-xs font-bold ${accentText[color]}`}>
        Explorer →
      </p>
    </Link>
  );
}

function CtaLink({
  href,
  children,
  color,
}: {
  href: string;
  children: React.ReactNode;
  color: AccentKey;
}) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-bold transition";
  const variants: Record<AccentKey, string> = {
    gold: "border-gold/35 bg-gold/10 text-gold hover:bg-gold hover:text-ink",
    jade: "border-jade/35 bg-jade/10 text-jade hover:bg-jade hover:text-ink",
    sky: "border-sky/35 bg-sky/10 text-sky hover:bg-sky hover:text-ink",
    ember: "border-ember/35 bg-ember/10 text-ember hover:bg-ember hover:text-ink",
  };
  return (
    <Link href={href} className={`${base} ${variants[color]}`}>
      {children}
    </Link>
  );
}
