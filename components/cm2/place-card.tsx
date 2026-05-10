import type { AcademyPlace } from "@/content/felix-types";

const colorMap = {
  jade: { ring: "border-jade/30", text: "text-jade", bar: "bg-jade" },
  gold: { ring: "border-gold/30", text: "text-gold", bar: "bg-gold" },
  sky: { ring: "border-sky/30", text: "text-sky", bar: "bg-sky" },
  ember: { ring: "border-ember/30", text: "text-ember", bar: "bg-ember" },
};

type PlaceCardProps = {
  place: AcademyPlace;
};

export function PlaceCard({ place }: PlaceCardProps) {
  const c = colorMap[place.accentColor];
  return (
    <article
      className={`rounded-md border bg-white/[0.04] p-5 ${c.ring}`}
      aria-label={place.name}
    >
      <div className={`mb-4 h-1 rounded-full ${c.bar}`} aria-hidden="true" />
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${c.text}`}>
        Lieu narratif
      </p>
      <h3 className="mt-2 text-lg font-black text-foreground">{place.name}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{place.description}</p>

      {place.activities.length > 0 ? (
        <ul className="mt-4 space-y-1" aria-label="Activités associées">
          {place.activities.map((activity) => (
            <li
              key={activity}
              className="flex items-start gap-2 text-xs text-muted"
            >
              <span
                className={`mt-1.5 size-1 shrink-0 rounded-full ${c.bar}`}
                aria-hidden="true"
              />
              {activity}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
