import Image from "next/image";
import Link from "next/link";
import {
  studentAccents,
  type EmblematicStudent,
} from "@/content/students";

type LevelStudentSpotlightProps = {
  student: EmblematicStudent;
};

export function LevelStudentSpotlight({ student }: LevelStudentSpotlightProps) {
  const accent = studentAccents[student.dominantColor];

  return (
    <section className="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className={`grid gap-6 overflow-hidden rounded-md border bg-white/[0.04] p-5 md:grid-cols-[14rem_1fr] md:items-center ${accent.borderSoftClass}`}
        >
          <div
            className={`relative aspect-[3/2] overflow-hidden rounded-md border ${accent.borderSoftClass}`}
            style={{
              background: `linear-gradient(135deg, rgba(${accent.glowRgb},0.22), rgba(${accent.glowRgb},0.06))`,
            }}
          >
            {student.image ? (
              <Image
                src={student.image}
                alt={`Portrait de ${student.name}, élève emblématique de l'Académie Kerboeuf`}
                fill
                sizes="(max-width: 768px) 100vw, 14rem"
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

          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accent.textClass}`}>
              Élève emblématique
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">
              {student.name}
            </h2>
            <p className="mt-2 text-sm font-bold text-muted">
              {student.animal} · {student.universe}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
              {student.shortDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/eleves/${student.slug}`}
                className={`rounded-md border px-4 py-2 text-sm font-bold transition hover:opacity-90 ${accent.badgeClass}`}
              >
                Voir le profil de {student.name}
              </Link>
              {student.missionsHref ? (
                <Link
                  href={student.missionsHref}
                  className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-bold text-foreground transition hover:bg-white/[0.08]"
                >
                  Missions de {student.name}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
