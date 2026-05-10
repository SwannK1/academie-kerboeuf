import type { AcademyBadge } from "@/content/felix-types";

const colorMap = {
  jade: { ring: "border-jade/30", bg: "bg-jade/10", text: "text-jade", dot: "bg-jade" },
  gold: { ring: "border-gold/30", bg: "bg-gold/10", text: "text-gold", dot: "bg-gold" },
  sky: { ring: "border-sky/30", bg: "bg-sky/10", text: "text-sky", dot: "bg-sky" },
  ember: { ring: "border-ember/30", bg: "bg-ember/10", text: "text-ember", dot: "bg-ember" },
};

type BadgeGridProps = {
  badges: AcademyBadge[];
  title?: string;
  description?: string;
};

export function BadgeGrid({ badges, title, description }: BadgeGridProps) {
  return (
    <div>
      {title ? (
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            {title}
          </p>
          {description ? (
            <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
          ) : null}
        </div>
      ) : null}

      <ul
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        aria-label={title ?? "Badges"}
      >
        {badges.map((badge) => (
          <BadgeCard key={badge.slug} badge={badge} />
        ))}
      </ul>
    </div>
  );
}

function BadgeCard({ badge }: { badge: AcademyBadge }) {
  const c = colorMap[badge.color];
  return (
    <li
      className={`rounded-md border p-4 ${c.ring} ${c.bg}`}
      aria-label={badge.name}
    >
      <div className="flex items-center gap-2">
        <span className={`size-2 shrink-0 rounded-full ${c.dot}`} aria-hidden="true" />
        <p className={`text-xs font-bold uppercase tracking-[0.16em] ${c.text}`}>
          {badge.gesture}
        </p>
      </div>
      <p className="mt-3 font-black text-foreground">{badge.name}</p>
      <p className="mt-2 text-xs leading-6 text-muted">{badge.description}</p>
    </li>
  );
}
