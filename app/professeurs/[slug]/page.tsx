import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { MissionCard } from "@/components/missions/mission-card";
import { ProfessorHero, ProfessorAvatar } from "@/components/academy/professor-hero";
import { ProfessorNavigation } from "@/components/academy/professor-navigation";
import {
  getProfessorBySlug,
  getAllProfessorSlugs,
  getRelatedProfessors,
  type ProfessorProfile,
  type AccentColor,
} from "@/content/professors";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import { getClassroomResources } from "@/content/resources";
import { getPublicStatusLabel } from "@/content/public-status";
import { felixPlaces, felixBadges } from "@/content/felix-character";

// ─── Système de couleurs par professeur ──────────────────────────────────────

const ACCENT: Record<
  AccentColor,
  {
    text: string;
    textMuted: string;
    border: string;
    borderMid: string;
    borderHover: string;
    bg: string;
    bgDeep: string;
    badge: string;
    glowRgb: string;
  }
> = {
  gold: {
    text: "text-gold",
    textMuted: "text-gold/70",
    border: "border-gold/35",
    borderMid: "border-gold/20",
    borderHover: "hover:border-gold/30",
    bg: "bg-gold/[0.07]",
    bgDeep: "bg-gold/[0.04]",
    badge: "border-gold/30 bg-gold/10 text-gold",
    glowRgb: "243,196,91",
  },
  jade: {
    text: "text-jade",
    textMuted: "text-jade/70",
    border: "border-jade/35",
    borderMid: "border-jade/20",
    borderHover: "hover:border-jade/30",
    bg: "bg-jade/[0.07]",
    bgDeep: "bg-jade/[0.04]",
    badge: "border-jade/30 bg-jade/10 text-jade",
    glowRgb: "80,200,164",
  },
  sky: {
    text: "text-sky",
    textMuted: "text-sky/70",
    border: "border-sky/35",
    borderMid: "border-sky/20",
    borderHover: "hover:border-sky/30",
    bg: "bg-sky/[0.07]",
    bgDeep: "bg-sky/[0.04]",
    badge: "border-sky/30 bg-sky/10 text-sky",
    glowRgb: "139,200,255",
  },
  ember: {
    text: "text-ember",
    textMuted: "text-ember/70",
    border: "border-ember/35",
    borderMid: "border-ember/20",
    borderHover: "hover:border-ember/30",
    bg: "bg-ember/[0.07]",
    bgDeep: "bg-ember/[0.04]",
    badge: "border-ember/30 bg-ember/10 text-ember",
    glowRgb: "222,104,72",
  },
};

function ac(professor: ProfessorProfile) {
  return ACCENT[professor.accentColor ?? "gold"];
}

// ─── Route config ─────────────────────────────────────────────────────────────

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProfessorSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const professor = getProfessorBySlug(slug);
  if (!professor) return { title: "Professeur introuvable | Académie Kerboeuf" };
  return {
    title: `${professor.name} — ${professor.role} | Académie Kerboeuf`,
    description: professor.bio,
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ProfesseurPage({ params }: PageProps) {
  const { slug } = await params;
  const professor = getProfessorBySlug(slug);
  if (!professor) notFound();

  const related = getRelatedProfessors(professor.slug, professor.relatedSlugs);

  const hasAtmosphere =
    professor.visualIdentity ||
    professor.personality ||
    professor.pedagogicalRole ||
    professor.academyFunction;

  const hasSignature =
    professor.teachesThrough ||
    professor.famousFor ||
    professor.favoriteTools ||
    professor.coreValues;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Professeurs", href: "/professeurs" },
              { label: professor.name },
            ]}
          />
        </div>
      </div>

      <ProfessorHero professor={professor} />
      <ProfileBlocks professor={professor} />
      {professor.personalityProfile ? (
        <PersonalitySection professor={professor} />
      ) : null}
      {professor.quote ? <ProfessorWorldQuote professor={professor} /> : null}
      {professor.universeNarrative ? <ProfessorUniverseSection professor={professor} /> : null}
      {hasAtmosphere ? <AtmosphereSection professor={professor} /> : null}
      {professor.intellectualGestures ? (
        <IntellectualGesturesSection professor={professor} />
      ) : null}
      {professor.pedagogySteps ? <ProfessorPedagogyTimeline professor={professor} /> : null}
      {professor.studentExperience || professor.missionPhilosophy ? (
        <ProfessorVisionSection professor={professor} />
      ) : null}
      {professor.studentTransformation ? (
        <StudentTransformationSection professor={professor} />
      ) : null}
      {hasSignature ? <ProfessorSignatureSection professor={professor} /> : null}
      <SubjectsSection professor={professor} />
      <MethodSection professor={professor} />
      <MissionsSection professor={professor} />
      <CharacterCrossLinks professor={professor} />
      {professor.slug === "felix" ? <FelixCM2Section /> : null}
      {related.length > 0 ? <RelatedProfessorsSection professors={related} /> : null}
      <ProfessorNavigation professor={professor} />
    </main>
  );
}

// ─── Blocs info ───────────────────────────────────────────────────────────────

function ProfileBlocks({ professor }: { professor: ProfessorProfile }) {
  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-3">
          <InfoBlock label="Symbole" value={professor.symbol} />
          <InfoBlock label="Spécialité" value={professor.specialty} />
          <InfoBlock label="Ambiance" value={professor.visualMood} />
        </div>
      </div>
    </section>
  );
}

function PersonalitySection({ professor }: { professor: ProfessorProfile }) {
  if (!professor.personalityProfile) return null;
  const a = ac(professor);
  const profile = professor.personalityProfile;

  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className={`rounded-md border ${a.borderMid} p-7`}
          style={{
            background: `linear-gradient(135deg, rgba(${a.glowRgb},0.07), rgba(${a.glowRgb},0.02))`,
          }}
        >
          <p className={`text-xs font-bold uppercase tracking-[0.24em] ${a.text}`}>
            Personnalité
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-black text-foreground">
                Ce que {professor.name} représente
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {profile.represents}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.dominantTraits.map((trait) => (
                  <span
                    key={trait}
                    className={`rounded border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] ${a.badge}`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <PersonalityItem label="Forces" value={profile.strengths.join(" · ")} />
              <PersonalityItem label="Énergie" value={profile.energy} />
              <PersonalityItem label="Posture pédagogique" value={profile.posture} />
              <PersonalityItem label="Interaction" value={profile.interaction} />
            </div>
          </div>
        </div>
      </div>
    </section>
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

// ─── Citation mise en scène ───────────────────────────────────────────────────

function ProfessorWorldQuote({ professor }: { professor: ProfessorProfile }) {
  if (!professor.quote) return null;
  const a = ac(professor);

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className={`relative overflow-hidden rounded-md border ${a.borderMid} px-10 py-10`}
          style={{
            background: `linear-gradient(135deg, rgba(${a.glowRgb},0.07), rgba(${a.glowRgb},0.02))`,
          }}
        >
          {/* Guillemet décoratif */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 left-4 select-none font-serif leading-none"
            style={{ fontSize: "9rem", color: `rgba(${a.glowRgb},0.12)` }}
          >
            &ldquo;
          </span>

          <blockquote className="relative">
            <p className="max-w-3xl text-xl font-bold italic leading-9 text-foreground sm:text-2xl">
              {professor.quote}
            </p>
            <footer className="mt-5 flex items-center gap-3">
              <span
                className="block h-px w-6"
                style={{ background: `rgba(${a.glowRgb},0.5)` }}
              />
              <span className={`text-xs font-bold uppercase tracking-[0.22em] ${a.textMuted}`}>
                {professor.name}
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ─── Univers immersif ─────────────────────────────────────────────────────────

function ProfessorUniverseSection({ professor }: { professor: ProfessorProfile }) {
  if (!professor.universeNarrative) return null;
  const a = ac(professor);

  return (
    <section className="relative isolate px-4 pb-16 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, rgba(${a.glowRgb},0.04) 0%, transparent 100%)`,
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[3fr_1fr] lg:items-start">
          {/* Narratif principal */}
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.28em] ${a.text}`}>
              L&rsquo;univers de {professor.name}
            </p>
            <p className="mt-6 text-xl font-semibold leading-9 text-foreground/90 sm:text-2xl">
              {professor.universeNarrative}
            </p>
          </div>

          {/* Colonne de détails */}
          <div className={`rounded-md border ${a.borderMid} ${a.bgDeep} p-6`}>
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
              Lieu
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {professor.headquarters ?? professor.moodName}
            </p>

            <p className={`mt-5 text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
              Symbole
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">{professor.symbol}</p>

            <p className={`mt-5 text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
              Matière
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">{professor.mainSubject}</p>

            <div className={`mt-6 border-t ${a.borderMid} pt-5`}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Cycle</p>
              <p className="mt-2 text-sm font-semibold text-muted">
                {professor.levelLabel} — {professor.cycle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Portrait pédagogique ─────────────────────────────────────────────────────

function AtmosphereSection({ professor }: { professor: ProfessorProfile }) {
  const a = ac(professor);

  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Portrait pédagogique" title={`Identité de ${professor.name}`} />

        <div className="mt-6 space-y-4">
          {professor.visualIdentity ? (
            <div className={`rounded-md border ${a.borderMid} ${a.bgDeep} p-7`}>
              <p className={`text-xs font-bold uppercase tracking-[0.2em] ${a.text}`}>
                Identité visuelle
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground">{professor.visualIdentity}</p>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {professor.personality ? (
              <div className="rounded-md border border-white/10 bg-white/[0.045] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Personnalité
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground">{professor.personality}</p>
              </div>
            ) : null}
            {professor.pedagogicalRole ? (
              <div className="rounded-md border border-white/10 bg-white/[0.045] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Rôle pédagogique
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground">
                  {professor.pedagogicalRole}
                </p>
              </div>
            ) : null}
          </div>

          {professor.academyFunction ? (
            <div className={`rounded-md border ${a.border} ${a.bg} p-6`}>
              <p className={`text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
                Fonction dans l&rsquo;Académie
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{professor.academyFunction}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ─── Gestes intellectuels ────────────────────────────────────────────────────

function IntellectualGesturesSection({ professor }: { professor: ProfessorProfile }) {
  if (!professor.intellectualGestures || professor.intellectualGestures.length === 0) return null;
  const a = ac(professor);

  return (
    <section className="relative isolate px-4 pb-14 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-white/[0.018]"
      />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Posture de chercheur"
          title={`Ce que ${professor.name} aide à travailler`}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          {professor.intellectualGestures.map((gesture) => (
            <span
              key={gesture}
              className={`rounded-md border px-4 py-2 text-sm font-bold ${a.badge}`}
            >
              {gesture}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Timeline pédagogique ─────────────────────────────────────────────────────

function ProfessorPedagogyTimeline({ professor }: { professor: ProfessorProfile }) {
  if (!professor.pedagogySteps || professor.pedagogySteps.length === 0) return null;
  const a = ac(professor);

  return (
    <section className="relative isolate px-4 pb-14 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-white/[0.018]"
      />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Progression pédagogique"
          title={`Comment travaille ${professor.name}`}
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {professor.pedagogySteps.map((step, i) => (
            <div key={step.label} className="flex flex-col gap-4 bg-ink/80 p-7 backdrop-blur-sm">
              <span
                className="text-4xl font-black leading-none"
                style={{ color: `rgba(${a.glowRgb},0.28)` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className={`text-sm font-bold ${a.text}`}>{step.label}</p>
                <p className="mt-2 text-xs leading-6 text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Vision (expérience élève + philosophie missions) ─────────────────────────

function ProfessorVisionSection({ professor }: { professor: ProfessorProfile }) {
  if (!professor.studentExperience && !professor.missionPhilosophy) return null;
  const a = ac(professor);

  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Philosophie de l'enseignement"
          title="Mission et expérience"
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {professor.studentExperience ? (
            <div className={`rounded-md border ${a.borderMid} ${a.bgDeep} p-7`}>
              <p className={`text-xs font-bold uppercase tracking-[0.2em] ${a.text}`}>
                Ce que vivent les élèves
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground">
                {professor.studentExperience}
              </p>
            </div>
          ) : null}
          {professor.missionPhilosophy ? (
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                Philosophie des missions
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">{professor.missionPhilosophy}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ─── Ce que les élèves deviennent ─────────────────────────────────────────────

function StudentTransformationSection({ professor }: { professor: ProfessorProfile }) {
  if (!professor.studentTransformation || professor.studentTransformation.length === 0) return null;
  const a = ac(professor);

  return (
    <section className="relative isolate px-4 pb-14 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/[0.018]" />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Ce qu'on apprend avec lui / elle"
          title={`Travailler avec ${professor.name}, c'est devenir…`}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {professor.studentTransformation.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-md border border-white/10 bg-white/[0.035] p-5"
            >
              <span
                className="shrink-0 text-lg font-black leading-none"
                style={{ color: `rgba(${a.glowRgb},0.35)` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-7 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Signature pédagogique ────────────────────────────────────────────────────

function ProfessorSignatureSection({ professor }: { professor: ProfessorProfile }) {
  const a = ac(professor);

  const blocks = (
    [
      { label: "Enseigne à travers", color: "accent" as const, items: professor.teachesThrough },
      { label: "Connu pour", color: "muted" as const, items: professor.famousFor },
      { label: "Outils favoris", color: "muted" as const, items: professor.favoriteTools },
      { label: "Valeurs fondamentales", color: "accent" as const, items: professor.coreValues },
    ] as { label: string; color: "accent" | "muted"; items?: string[] }[]
  ).filter((b) => b.items && b.items.length > 0);

  if (blocks.length === 0) return null;

  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Signature pédagogique"
          title={`La méthode en détail — ${professor.name}`}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {blocks.map((block) => {
            const isAccent = block.color === "accent";
            return (
              <div
                key={block.label}
                className={`rounded-md border p-6 ${
                  isAccent
                    ? `${a.borderMid} bg-white/[0.03]`
                    : "border-white/10 bg-white/[0.035]"
                }`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-[0.18em] ${
                    isAccent ? a.text : "text-muted"
                  }`}
                >
                  {block.label}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {block.items!.map((item) => (
                    <li
                      key={item}
                      className={`rounded border px-3 py-1.5 text-xs font-semibold ${
                        isAccent ? a.badge : "border-white/10 bg-white/[0.04] text-muted"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Matières ─────────────────────────────────────────────────────────────────

function SubjectsSection({ professor }: { professor: ProfessorProfile }) {
  const a = ac(professor);

  return (
    <section className="relative isolate px-4 pb-14 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/[0.018]" />
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Couverture pédagogique" title="Matières enseignées" />
        <div className="mt-6 flex flex-wrap gap-3">
          {professor.subjects.map((subject) => (
            <span
              key={subject}
              className={`rounded-md border px-4 py-2 text-sm font-bold ${a.badge}`}
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Méthode ──────────────────────────────────────────────────────────────────

function MethodSection({ professor }: { professor: ProfessorProfile }) {
  const a = ac(professor);

  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Approche pédagogique"
          title={`Méthode de ${professor.name}`}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {professor.method.map((block) => (
            <div
              key={block.label}
              className="rounded-md border border-white/10 bg-white/[0.045] p-5"
            >
              <p className={`text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
                {block.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{block.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Missions ─────────────────────────────────────────────────────────────────

function MissionsSection({ professor }: { professor: ProfessorProfile }) {
  const a = ac(professor);
  const hasMissions = professor.missions.length > 0;

  return (
    <section className="relative isolate px-4 pb-14 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/[0.018]" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Contenu pédagogique"
            title={`Missions ${professor.levelLabel} de ${professor.name}`}
          />
          <Link
            href={professor.missionsPath}
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 text-sm font-bold text-foreground transition hover:bg-white/10"
          >
            Voir toutes les missions
          </Link>
        </div>

        {hasMissions ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {professor.missions.map((mission, index) => (
              <MissionCard
                key={mission.slug}
                mission={mission}
                index={index}
                linkBasePath={professor.missionsLinkBasePath}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-md border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm leading-7 text-muted">
              Aucune mission dédiée n’est encore reliée à cette personnalité.
              Les ressources existantes restent accessibles depuis le catalogue central.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={professor.missionsPath}
            className={`inline-flex h-11 items-center justify-center rounded-md border px-8 text-sm font-bold transition ${a.badge} hover:opacity-90`}
          >
            Toutes les missions {professor.levelLabel}
          </Link>
          <Link
            href={professor.levelPath}
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
          >
            Espace {professor.levelLabel}
          </Link>
          {professor.levelPath.includes("/cm2") && (
            <Link
              href={`${professor.levelPath}/matieres`}
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
            >
              Matières CM2
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function CharacterCrossLinks({ professor }: { professor: ProfessorProfile }) {
  const a = ac(professor);
  const resources = getClassroomResources().filter(
    (resource) => resource.professorName === professor.name,
  );
  const paths = getLearningPathsWithSteps().filter(
    (path) => path.professorSlug === professor.slug,
  );

  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
        <article className="rounded-md border border-white/10 bg-white/[0.045] p-6">
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
            Ressources associées
          </p>
          {resources.length > 0 ? (
            <div className="mt-5 grid gap-3">
              {resources.slice(0, 6).map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.href}
                  className={`rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted transition ${a.borderHover} hover:text-foreground`}
                >
                  <span className="font-bold text-foreground">{resource.title}</span>
                  <span className="block text-xs uppercase tracking-[0.12em] text-muted">
                    {resource.level} · {resource.subject} · {getPublicStatusLabel(resource.status)}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-muted">
              Aucune ressource dédiée n’est encore rattachée à cette fiche.
            </p>
          )}
        </article>

        <article className="rounded-md border border-white/10 bg-white/[0.045] p-6">
          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
            Parcours associés
          </p>
          {paths.length > 0 ? (
            <div className="mt-5 grid gap-3">
              {paths.map((path) => (
                <Link
                  key={path.slug}
                  href={`/parcours/${path.slug}`}
                  className={`rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted transition ${a.borderHover} hover:text-foreground`}
                >
                  <span className="font-bold text-foreground">{path.title}</span>
                  <span className="block text-xs uppercase tracking-[0.12em] text-muted">
                    {path.level} · {path.estimatedDuration}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-muted">
              Aucun parcours officiel n’est encore rattaché à cette fiche.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}

// ─── Professeurs associés ─────────────────────────────────────────────────────

function RelatedProfessorsSection({ professors }: { professors: ProfessorProfile[] }) {
  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Dans l'Académie" title="Professeurs associés" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {professors.map((p) => {
            const pa = ac(p);
            return (
              <Link
                key={p.slug}
                href={p.profileHref}
                className="group flex flex-col gap-4 rounded-md border border-white/10 bg-white/[0.045] p-5 transition hover:border-white/20 hover:bg-white/[0.065]"
              >
                <div className="flex items-start gap-4">
                  <ProfessorAvatar professor={p} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      {p.levelLabel} · {p.cycle}
                    </p>
                    <p className={`mt-1 text-lg font-black text-foreground transition group-hover:${pa.text}`}>
                      {p.name}
                    </p>
                    <p className={`mt-0.5 text-sm font-bold ${pa.textMuted}`}>{p.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className={`rounded border px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] ${pa.badge}`}>
                    {p.mainSubject}
                  </span>
                  <span className="text-xs font-medium text-muted">{p.symbol}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Sections spécifiques Félix (CM2) ─────────────────────────────────────────

const FELIX_GESTURES: { label: string; description: string }[] = [
  { label: "Observer",           description: "Regarder avec précision, repérer les détails qui comptent." },
  { label: "Chercher",           description: "Trouver les indices, les sources, les preuves utiles." },
  { label: "Vérifier",           description: "Tester ses hypothèses et s'assurer que la réponse tient." },
  { label: "Justifier",          description: "Expliquer pourquoi, s'appuyer sur une preuve concrète." },
  { label: "Expliquer",          description: "Formuler clairement pour que quelqu'un d'autre comprenne." },
  { label: "Créer",              description: "Produire quelque chose de nouveau à partir de ce qu'on a compris." },
  { label: "Coopérer",           description: "Contribuer à un projet commun, écouter et ajuster." },
  { label: "Produire une trace", description: "Garder une trace écrite exploitable de ce qu'on a découvert." },
];

const FELIX_CM2_LINKS = [
  {
    href: "/primaire/cm2",
    label: "Hub CM2",
    description: "Tableau de bord du niveau CM2 avec Félix.",
  },
  {
    href: "/primaire/cm2/matieres",
    label: "Matières CM2",
    description: "Toutes les matières du CM2 : Français, Mathématiques, Sciences…",
  },
  {
    href: "/primaire/cm2/missions",
    label: "Missions CM2",
    description: "Les missions pédagogiques guidées par Félix.",
  },
];

function FelixCM2Section() {
  return (
    <>
      <FelixGesturesSection />
      <FelixPlacesSection />
      <FelixBadgesSection />
      <FelixCM2NavigationSection />
    </>
  );
}

function FelixGesturesSection() {
  return (
    <section className="relative isolate px-4 pb-14 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/[0.018]" />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Gestes intellectuels"
          title="Ce que Félix aide à travailler"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FELIX_GESTURES.map((gesture) => (
            <div
              key={gesture.label}
              className="rounded-md border border-white/10 bg-white/[0.035] p-5"
            >
              <p className="text-sm font-bold text-gold">{gesture.label}</p>
              <p className="mt-2 text-xs leading-6 text-muted">{gesture.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FelixPlacesSection() {
  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Espaces pédagogiques CM2"
          title="Les lieux de Félix"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {felixPlaces.map((place) => {
            const pa = ACCENT[place.accentColor];
            return (
              <div
                key={place.slug}
                className={`rounded-md border ${pa.borderMid} ${pa.bgDeep} p-6`}
              >
                <p className={`text-xs font-bold uppercase tracking-[0.18em] ${pa.text}`}>
                  Lieu
                </p>
                <h3 className="mt-2 text-base font-black text-foreground">
                  {place.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{place.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FelixBadgesSection() {
  return (
    <section className="relative isolate px-4 pb-14 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/[0.018]" />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Compétences reconnues"
          title="Badges du CM2"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {felixBadges.map((badge) => {
            const ba = ACCENT[badge.color];
            return (
              <div
                key={badge.slug}
                className="rounded-md border border-white/10 bg-white/[0.035] p-5"
              >
                <span
                  className={`inline-flex rounded border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] ${ba.badge}`}
                >
                  {badge.gesture}
                </span>
                <p className="mt-3 text-sm font-bold text-foreground">{badge.name}</p>
                <p className="mt-2 text-xs leading-6 text-muted">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FelixCM2NavigationSection() {
  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Navigation CM2" title="Explorer le niveau avec Félix" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {FELIX_CM2_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-md border border-white/10 bg-white/[0.035] p-6 transition hover:border-gold/30 hover:bg-white/[0.055]"
            >
              <p className="text-sm font-bold text-foreground transition group-hover:text-gold">
                {link.label} →
              </p>
              <p className="mt-2 text-xs leading-6 text-muted">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Composants primitifs ─────────────────────────────────────────────────────

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-ink/35 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-foreground">{value}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-foreground">{title}</h2>
    </div>
  );
}
