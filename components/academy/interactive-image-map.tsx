import Image from "next/image";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { PedagogicalImageHero } from "@/content/felix-types";

export function InteractiveImageMap(props: PedagogicalImageHero) {
  const { id, eyebrow, title, description, image, zones } = props;
  const titleId = `${id}-title`;

  return (
    <section
      className="cm2-print-hide px-4 pb-14 sm:px-6 lg:px-8"
      aria-labelledby={titleId}
    >
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-white/10 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-jade">
            {eyebrow}
          </p>
          <h2 id={titleId} className="mt-3 text-3xl font-black text-foreground">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            {description}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start">
          <figure className="overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
            <div className="relative aspect-[16/10]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50rem"
                className="object-cover"
                priority={false}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/75 to-transparent"
                aria-hidden="true"
              />
            </div>
          </figure>

          <nav aria-label={`Zones pédagogiques — ${title}`}>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {zones.map((zone, index) => (
                <li key={zone.title}>
                  <Link
                    href={zone.href}
                    className="group grid min-h-full gap-3 rounded-md border border-white/10 bg-white/[0.045] p-4 transition hover:border-gold/35 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className="grid size-9 shrink-0 place-items-center rounded border border-jade/30 bg-jade/10 font-mono text-xs font-black text-jade"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-black text-foreground">
                          {zone.title}
                        </span>
                        <span className="mt-1 block text-xs font-bold uppercase tracking-[0.14em] text-sky">
                          {zone.discipline}
                        </span>
                      </span>
                    </span>

                    <span className="block text-sm leading-6 text-muted">
                      {zone.description}
                    </span>

                    <span className="flex flex-wrap items-center gap-2">
                      <span className="rounded border border-white/10 bg-ink/35 px-2 py-1 text-xs font-bold text-muted">
                        {zone.professor}
                      </span>
                      <PublicStatusBadge status={zone.status} />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

export { InteractiveImageMap as PedagogicalImageHero };
