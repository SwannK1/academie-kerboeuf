import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getProfessorBySlug, type AccentColor } from "@/content/professors";

export const metadata: Metadata = {
  title: "Personnages | Académie Kerboeuf",
  description:
    "Les guides pédagogiques de l'Académie Kerboeuf, un par niveau, du CP au CM2.",
};

const ACCENT_GLOW: Record<AccentColor, string> = {
  gold: "243,196,91",
  jade: "80,200,164",
  sky: "139,200,255",
  ember: "222,104,72",
};

const ACCENT_TEXT: Record<AccentColor, string> = {
  gold: "text-gold",
  jade: "text-jade",
  sky: "text-sky",
  ember: "text-ember",
};

const ACCENT_BORDER: Record<AccentColor, string> = {
  gold: "border-gold/30",
  jade: "border-jade/30",
  sky: "border-sky/30",
  ember: "border-ember/30",
};

// Guides pédagogiques de niveau, du CP au CM2.
const LEVEL_GUIDE_SLUGS = ["zoe", "gaston", "esteban", "noisette", "felix"];

function GuideCard({ slug }: { slug: string }) {
  const professor = getProfessorBySlug(slug);
  if (!professor) return null;

  const accent = professor.accentColor ?? "gold";
  const glow = ACCENT_GLOW[accent];
  const border = ACCENT_BORDER[accent];
  const text = ACCENT_TEXT[accent];

  return (
    <Link
      href={professor.profileHref}
      className={`group flex items-center gap-4 rounded-md border bg-white/[0.03] p-4 transition hover:-translate-y-px hover:bg-white/[0.055] ${border}`}
    >
      <div
        className={`grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-md border ${border}`}
        style={{
          background: `linear-gradient(135deg, rgba(${glow},0.20), rgba(${glow},0.05))`,
        }}
      >
        {professor.avatarImage ? (
          <Image
            src={professor.avatarImage}
            alt={professor.name}
            width={160}
            height={112}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className={`text-xl font-black ${text}`}>{professor.initial}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-black text-foreground">{professor.name}</p>
        <p className={`mt-0.5 text-xs font-bold ${text}`}>{professor.role}</p>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          {professor.levelLabel}
        </p>
        {professor.description ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted/80">
            {professor.description}
          </p>
        ) : null}
      </div>

      <span
        aria-hidden="true"
        className={`shrink-0 text-sm font-bold ${text} transition-transform group-hover:translate-x-0.5`}
      >
        →
      </span>
    </Link>
  );
}

function PreparationSection({
  title,
  subtitle,
  accent,
  message,
}: {
  title: string;
  subtitle: string;
  accent: AccentColor;
  message: string;
}) {
  return (
    <div className={`rounded-md border bg-white/[0.025] p-6 ${ACCENT_BORDER[accent]}`}>
      <p className={`text-[10px] font-bold uppercase tracking-[0.28em] ${ACCENT_TEXT[accent]}`}>
        {subtitle}
      </p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-foreground">{title}</h2>
      <div className="mt-5 rounded-md border border-dashed border-white/15 bg-white/[0.02] p-5">
        <p className="text-sm font-bold text-muted">{message}</p>
      </div>
    </div>
  );
}

export default function PersonnagesPage() {
  return (
    <main className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Personnages" }]}
        />

        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.28em] text-jade">
          Les guides de l&rsquo;Académie
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-foreground sm:text-5xl">
          Personnages
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Chaque niveau a son guide pédagogique : un repère visuel et narratif qui
          accompagne les élèves tout au long de l&rsquo;année. Les professeurs de
          matière sont présentés sur la page{" "}
          <Link href="/professeurs" className="font-bold text-jade hover:underline">
            Professeurs
          </Link>
          .
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PreparationSection
            title="Maternelle"
            subtitle="PS · MS · GS"
            accent="sky"
            message="Équipe maternelle en préparation."
          />

          <div className={`rounded-md border bg-white/[0.025] p-6 ${ACCENT_BORDER.jade}`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-jade">
              CP au CM2
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-foreground">
              Primaire
            </h2>
            <div className="mt-5 grid gap-3">
              {LEVEL_GUIDE_SLUGS.map((slug) => (
                <GuideCard key={slug} slug={slug} />
              ))}
            </div>
          </div>

          <PreparationSection
            title="Collège"
            subtitle="6e à la 3e"
            accent="gold"
            message="Équipe collège en préparation."
          />

          <PreparationSection
            title="Lycée"
            subtitle="Seconde à la Terminale"
            accent="ember"
            message="Équipe lycée en préparation."
          />
        </div>
      </div>
    </main>
  );
}
