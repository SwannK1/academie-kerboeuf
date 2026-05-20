import Image from "next/image";
import Link from "next/link";
import {
  studentAccents,
  type EmblematicStudent,
} from "@/content/students";

type StudentCardProps = {
  student: EmblematicStudent;
};

export function StudentCard({ student }: StudentCardProps) {
  const accent = studentAccents[student.dominantColor];

  return (
    <Link
      href={`/eleves/${student.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-md border bg-white/[0.035] transition hover:-translate-y-1 hover:bg-white/[0.06] ${accent.borderSoftClass}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
        style={{ background: `rgba(${accent.glowRgb},0.08)` }}
      />

      <div
        className={`relative aspect-[3/2] overflow-hidden border-b ${accent.borderSoftClass}`}
        style={{
          background: `linear-gradient(135deg, rgba(${accent.glowRgb},0.20), rgba(${accent.glowRgb},0.05))`,
        }}
      >
        {student.image ? (
          <Image
            src={student.image}
            alt={student.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <span className={`text-6xl font-black ${accent.textClass}`}>
              {student.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] ${accent.badgeClass}`}
          >
            {student.level}
          </span>
          <span className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            {student.cycle}
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-black leading-tight text-foreground">
          {student.name}
        </h2>
        <p className={`mt-2 text-sm font-bold ${accent.textClass}`}>
          {student.animal} · {student.universe}
        </p>
        <p className="mt-4 flex-1 text-sm leading-7 text-muted">
          {student.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {student.personalityProfile.dominantTraits.slice(0, 3).map((trait) => (
            <span
              key={trait}
              className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] text-muted"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Profil élève
          </span>
          <span
            className={`text-sm font-black transition group-hover:translate-x-1 ${accent.textClass}`}
          >
            Ouvrir
          </span>
        </div>
      </div>
    </Link>
  );
}
