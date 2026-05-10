import Image from "next/image";
import Link from "next/link";
import { getRecentMissions } from "@/content/academy";
import { learningPaths } from "@/content/learning-paths";
import { professorProfiles } from "@/content/professors";
import { emblematicStudents, studentAccents } from "@/content/students";

// ── Types & thème ────────────────────────────────────────────────────────────

type Accent = "jade" | "gold" | "sky" | "ember";

const ACCENT: Record<Accent, { text: string; border: string; bg: string; badge: string; hover: string }> = {
  jade: {
    text: "text-jade",
    border: "border-jade/30",
    bg: "bg-jade/10",
    badge: "border-jade/30 bg-jade/10 text-jade",
    hover: "hover:bg-jade hover:text-ink",
  },
  gold: {
    text: "text-gold",
    border: "border-gold/30",
    bg: "bg-gold/10",
    badge: "border-gold/30 bg-gold/10 text-gold",
    hover: "hover:bg-[#ffd778] hover:text-ink",
  },
  sky: {
    text: "text-sky",
    border: "border-sky/30",
    bg: "bg-sky/10",
    badge: "border-sky/30 bg-sky/10 text-sky",
    hover: "hover:bg-sky hover:text-ink",
  },
  ember: {
    text: "text-ember",
    border: "border-ember/30",
    bg: "bg-ember/10",
    badge: "border-ember/30 bg-ember/10 text-ember",
    hover: "hover:bg-ember hover:text-ink",
  },
};

// ── Données statiques ─────────────────────────────────────────────────────────

const USAGES = [
  {
    tag: "Projection",
    title: "Projeter en classe",
    text: "Des missions lisibles sur grand écran, conçues pour la séance collective sans installation.",
    href: "/missions-recentes",
    accent: "jade" as Accent,
  },
  {
    tag: "Impression",
    title: "Imprimer des activités",
    text: "Chaque mission peut être imprimée en fiche individuelle pour travailler en autonomie.",
    href: "/ressources",
    accent: "gold" as Accent,
  },
  {
    tag: "Parcours",
    title: "Suivre des parcours progressifs",
    text: "Des séquences de 3 à 4 séances pour construire une compétence étape par étape.",
    href: "/parcours",
    accent: "sky" as Accent,
  },
];

const WORLDS = [
  {
    label: "Maternelle",
    sub: "PS · MS · GS",
    signal: "Découvrir",
    text: "Rituels, jeux et premières quêtes pour entrer dans les apprentissages.",
    href: "/maternelle",
    accent: "jade" as Accent,
  },
  {
    label: "Primaire",
    sub: "CP · CE1 · CE2 · CM1 · CM2",
    signal: "Explorer",
    text: "Lecture, calcul et sciences guidés par des professeurs référents.",
    href: "/primaire",
    accent: "gold" as Accent,
  },
  {
    label: "Collège",
    sub: "6e · 5e · 4e · 3e",
    signal: "Enquêter",
    text: "Raisonner, argumenter et installer des méthodes transférables entre disciplines.",
    href: "/college",
    accent: "sky" as Accent,
  },
  {
    label: "Lycée",
    sub: "Seconde · Première · Terminale",
    signal: "Maîtriser",
    text: "Synthèse, autonomie et préparation aux examens dans un cadre ambitieux.",
    href: "/lycee",
    accent: "ember" as Accent,
  },
];

const TEACHER_BLOCKS = [
  {
    title: "Préparer",
    text: "Chaque mission est organisée avec objectif, compétence ciblée et conseils de mise en œuvre.",
    accent: "gold" as Accent,
  },
  {
    title: "Projeter",
    text: "Un support propre, lisible sur grand écran, prêt à projeter sans adaptation.",
    accent: "jade" as Accent,
  },
  {
    title: "Imprimer",
    text: "Version individuelle disponible pour travailler en classe ou en autonomie.",
    accent: "sky" as Accent,
  },
  {
    title: "Corriger",
    text: "Chaque mission inclut une correction guidée, utilisable en collectif ou en différenciation.",
    accent: "ember" as Accent,
  },
];

const FEATURED_STUDENT_SLUGS = ["malo", "felix", "oria-eleve", "akira-eleve", "armand"];

// ── Données dérivées ──────────────────────────────────────────────────────────

const referentProfessors = professorProfiles.filter(
  (p) => p.characterType === "professeur référent" && Boolean(p.avatarImage),
);

const featuredStudents = FEATURED_STUDENT_SLUGS.flatMap((slug) => {
  const s = emblematicStudents.find((st) => st.slug === slug);
  return s ? [s] : [];
});

const featuredPaths = learningPaths.slice(0, 4);

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const recentMissions = getRecentMissions().slice(0, 6);

  return (
    <main>

      {/* ─── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[92svh] overflow-hidden px-4 pt-28 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-30 opacity-45" />
        <div className="map-line absolute inset-x-[-10%] top-[40%] -z-20 h-56 rotate-[-7deg] opacity-35" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.12),rgba(9,16,15,0.96))]" />

        <div className="mx-auto grid min-h-[calc(92svh-7rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="pb-12">
            <p className="mb-5 inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Plateforme éducative narrative
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
              Académie<br />Kerboeuf
            </h1>
            <p className="mt-5 text-2xl font-black text-gold sm:text-3xl">
              Un univers pour apprendre, de la maternelle au lycée.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Des missions pédagogiques immersives portées par des personnages récurrents — pour les enseignants qui préparent, les élèves qui progressent et les parents qui accompagnent.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/ressources"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
              >
                Voir les ressources
              </Link>
              <Link
                href="/parcours"
                className="inline-flex h-12 items-center justify-center rounded-md border border-jade/30 bg-jade/10 px-6 text-sm font-bold text-jade transition hover:bg-jade hover:text-ink"
              >
                Explorer les parcours
              </Link>
              <Link
                href="/professeurs"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                Rencontrer les professeurs
              </Link>
              <Link
                href="/univers"
                className="inline-flex h-12 items-center justify-center rounded-md border border-sky/30 bg-sky/10 px-6 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
              >
                Découvrir l&apos;univers
              </Link>
            </div>
          </div>

          <div className="pb-12">
            <div className="rounded-md border border-white/12 bg-panel/75 p-5 shadow-2xl shadow-black/35">
              <div className="flex items-center justify-between gap-4 border-b border-gold/25 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                  L&apos;Académie en chiffres
                </p>
                <span className="rounded bg-jade/15 px-2 py-1 font-mono text-xs font-bold text-jade">
                  Maternelle → Terminale
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { value: "4", label: "niveaux scolaires", color: "text-jade" },
                  { value: "12+", label: "classes structurées", color: "text-gold" },
                  { value: "40+", label: "missions disponibles", color: "text-sky" },
                  { value: "5", label: "parcours progressifs", color: "text-ember" },
                ].map(({ value, label, color }) => (
                  <div key={label} className="rounded border border-white/10 bg-white/[0.04] p-4">
                    <p className={`font-mono text-3xl font-black ${color}`}>{value}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-muted">
                Des personnages récurrents donnent vie aux compétences — du premier rituel de maternelle à la préparation au bac.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Maternelle", "Primaire", "Collège", "Lycée"].map((label) => (
                  <span key={label} className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. LES TROIS USAGES ──────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-panel/40 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Pour commencer"
            title="Trois façons d’utiliser l’Académie."
            text="Chaque ressource peut être projetée, imprimée ou intégrée dans un parcours progressif."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {USAGES.map((usage) => {
              const t = ACCENT[usage.accent];
              return (
                <Link
                  key={usage.href}
                  href={usage.href}
                  className={`group rounded-md border ${t.border} bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]`}
                >
                  <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                    {usage.tag}
                  </span>
                  <h2 className="mt-3 text-xl font-black text-foreground">{usage.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{usage.text}</p>
                  <span className={`mt-5 inline-flex text-sm font-black transition group-hover:translate-x-1 ${t.text}`}>
                    Accéder →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. LES MONDES DE L’ACADÉMIE ──────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Les mondes de l’Académie"
            title="De la maternelle au lycée."
            text="Chaque monde a ses personnages, ses niveaux et ses missions — sans compte, sans système complexe."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {WORLDS.map((world) => {
              const t = ACCENT[world.accent];
              return (
                <Link
                  key={world.href}
                  href={world.href}
                  className="group rounded-md border border-white/10 bg-ink/45 p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                    {world.signal}
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-foreground">{world.label}</h2>
                  <p className="mt-1 text-xs font-bold text-muted">{world.sub}</p>
                  <p className="mt-4 text-sm leading-7 text-muted">{world.text}</p>
                  <span className={`mt-5 inline-flex text-sm font-black transition group-hover:translate-x-1 ${t.text}`}>
                    Explorer →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. LES PERSONNAGES ───────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-panel/40 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Les personnages"
              title="Des visages récurrents pour chaque niveau."
              text="Retrouver le même professeur d’une séance à l’autre — un repère narratif qui rend les compétences mémorables."
            />
            <div className="flex shrink-0 gap-3">
              <Link
                href="/eleves"
                className="inline-flex rounded-md border border-white/15 bg-white/[0.05] px-4 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                Les élèves
              </Link>
              <Link
                href="/professeurs"
                className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
              >
                Tous les professeurs
              </Link>
            </div>
          </div>

          {/* Professeurs référents */}
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">Professeurs référents</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {referentProfessors.map((prof) => {
                const accent = (prof.accentColor ?? "gold") as Accent;
                const t = ACCENT[accent];
                return (
                  <Link
                    key={prof.slug}
                    href={prof.profileHref}
                    className="group flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
                  >
                    <div
                      className={`relative size-14 shrink-0 overflow-hidden rounded-md border ${t.border} ${t.bg}`}
                    >
                      {prof.avatarImage ? (
                        <Image
                          src={prof.avatarImage}
                          alt={prof.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <span className={`grid h-full place-items-center text-xl font-black ${t.text}`}>
                          {prof.initial}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold uppercase tracking-[0.14em] ${t.text}`}>
                        {prof.levelLabel}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-black text-foreground">{prof.name}</p>
                      <p className="text-xs text-muted">{prof.mainSubject}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Élèves emblématiques */}
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">Élèves emblématiques</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {featuredStudents.map((student) => {
                const accent = studentAccents[student.dominantColor];
                return (
                  <Link
                    key={student.slug}
                    href={`/eleves/${student.slug}`}
                    className={`rounded-md border ${accent.borderSoftClass} bg-white/[0.03] px-4 py-2.5 transition hover:bg-white/[0.06]`}
                  >
                    <span className={`text-sm font-black ${accent.textClass}`}>{student.name}</span>
                    <span className="ml-2 text-xs text-muted">{student.level}</span>
                  </Link>
                );
              })}
              <Link
                href="/eleves"
                className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.06] hover:text-foreground"
              >
                Voir tous les élèves →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. LES MISSIONS PÉDAGOGIQUES ─────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Les missions pédagogiques"
              title="Des dossiers pour entrer dans l’activité."
              text="Chaque mission place l’élève dans un rôle narratif — enquêteur, cartographe, scientifique — pour rendre la compétence mémorable."
            />
            <Link
              href="/missions-recentes"
              className="inline-flex shrink-0 rounded-md border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
            >
              Voir toutes les missions
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentMissions.map((mission) => (
              <Link
                key={`${mission.level.slug}-${mission.slug}`}
                href={mission.href}
                className={`rounded-md border bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07] ${mission.theme.ringClass}`}
              >
                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs font-bold uppercase tracking-[0.2em] ${mission.theme.textClass}`}>
                    {mission.level.label}
                  </span>
                  <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-muted">
                    {mission.subject}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-black text-foreground">{mission.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{mission.description}</p>
                <span className="mt-5 inline-flex rounded bg-white/[0.05] px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  {mission.progress.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. LES PARCOURS ──────────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-panel/40 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Les parcours"
              title="Des séquences complètes pour progresser."
              text="Chaque parcours relie plusieurs missions pour installer une compétence en 3 à 4 séances."
            />
            <Link
              href="/parcours"
              className="inline-flex shrink-0 rounded-md border border-jade/35 bg-jade/10 px-4 py-3 text-sm font-bold text-jade transition hover:bg-jade hover:text-ink"
            >
              Voir tous les parcours
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {featuredPaths.map((path) => {
              const accent: Accent =
                path.stage === "primaire" ? "gold" : path.stage === "college" ? "sky" : "ember";
              const t = ACCENT[accent];
              return (
                <Link
                  key={path.slug}
                  href={`/parcours/${path.slug}`}
                  className="group rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07]"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded border ${t.badge} px-2 py-0.5 text-xs font-bold uppercase tracking-[0.14em]`}>
                      {path.level}
                    </span>
                    <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-muted">
                      {path.subject}
                    </span>
                    <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-muted">
                      {path.estimatedDuration}
                    </span>
                  </div>
                  <h2 className={`mt-4 text-xl font-black ${t.text}`}>{path.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{path.globalObjective}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-muted">
                      Avec {path.professorName} · {path.missions.length} missions
                    </span>
                    <span className={`text-sm font-black transition group-hover:translate-x-1 ${t.text}`}>
                      Commencer →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 7. BLOC ENSEIGNANT ───────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Pour les enseignants"
            title="Prêt à préparer, projeter, imprimer, corriger."
            text="L’Académie Kerboeuf est pensée pour le quotidien de la classe : chaque ressource est immédiatement exploitable."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TEACHER_BLOCKS.map((block, i) => {
              const t = ACCENT[block.accent];
              return (
                <article
                  key={block.title}
                  className="rounded-md border border-white/10 bg-white/[0.045] p-5"
                >
                  <span className={`font-mono text-sm font-black ${t.text}`}>0{i + 1}</span>
                  <h2 className="mt-3 text-xl font-black text-foreground">{block.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{block.text}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ressources"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Accéder aux ressources
            </Link>
            <Link
              href="/programmes"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Voir les programmes
            </Link>
            <Link
              href="/univers"
              className="inline-flex h-12 items-center justify-center rounded-md border border-sky/30 bg-sky/10 px-6 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
            >
              Comprendre l&apos;univers
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. BLOC PARENTS / ÉLÈVES ─────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-panel/40 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Apprendre autrement"
            title="Un univers qui motive, une progression qui rassure."
            text="L’univers des personnages n’est pas une distraction : il donne envie d’entrer dans l’activité, puis laisse la place aux compétences."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-md border border-jade/25 bg-jade/[0.06] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">Pour les élèves</p>
              <h2 className="mt-4 text-2xl font-black text-foreground">Apprendre autrement.</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Des personnages attachants, des missions avec contexte et défi, des niveaux qui progressent. L&apos;Académie Kerboeuf transforme un exercice en aventure — sans sacrifier la rigueur.
              </p>
              <Link
                href="/eleves"
                className="mt-6 inline-flex rounded-md border border-jade/30 bg-jade/10 px-4 py-3 text-sm font-bold text-jade transition hover:bg-jade hover:text-ink"
              >
                Découvrir les élèves
              </Link>
            </article>

            <article className="rounded-md border border-sky/25 bg-sky/[0.06] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">Pour les parents</p>
              <h2 className="mt-4 text-2xl font-black text-foreground">Une progression claire.</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Comprendre les niveaux, les matières et les activités. L&apos;Académie Kerboeuf donne une vision lisible de ce que votre enfant travaille — sans jargon, sans application à installer.
              </p>
              <Link
                href="/parcours"
                className="mt-6 inline-flex rounded-md border border-sky/30 bg-sky/10 px-4 py-3 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
              >
                Voir les parcours
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/12 bg-[linear-gradient(135deg,rgba(243,196,91,0.12),rgba(80,200,164,0.08),rgba(255,255,255,0.035))] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
                Entrer dans l&apos;Académie
              </p>
              <h2 className="mt-4 text-3xl font-black text-foreground sm:text-5xl">
                Choisis une aile et commence l&apos;exploration.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                Maternelle, primaire, collège et lycée sont déjà structurés pour accueillir de nouvelles missions, activités et corrections.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/maternelle"
                className="inline-flex h-12 items-center justify-center rounded-md border border-jade/30 bg-jade/10 px-6 text-sm font-bold text-jade transition hover:bg-jade hover:text-ink"
              >
                Aller à la maternelle
              </Link>
              <Link
                href="/primaire"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
              >
                Aller au primaire
              </Link>
              <Link
                href="/college"
                className="inline-flex h-12 items-center justify-center rounded-md border border-sky/30 bg-sky/10 px-6 text-sm font-bold text-sky transition hover:bg-sky hover:text-ink"
              >
                Aller au collège
              </Link>
              <Link
                href="/lycee"
                className="inline-flex h-12 items-center justify-center rounded-md border border-ember/30 bg-ember/10 px-6 text-sm font-bold text-ember transition hover:bg-ember hover:text-ink"
              >
                Aller au lycée
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// ── Composant utilitaire ──────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black text-foreground sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-muted">{text}</p>
    </div>
  );
}
