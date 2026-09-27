"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icons/Icon";
import { FILE_TYPE_LABELS, normalize, searchResources, subjectLabel } from "@/lib/resources/library";
import { RESOURCE_LEVELS, levelLabel } from "@/lib/workspace/curriculum";
import { TEACHER_TOOLS } from "@/content/teacher-tools";

/** Raccourcis vers les écrans de travail, trouvables par mots-clés. */
const BASE_PLACES: { label: string; href: string; keywords: string }[] = [
  { label: "Aujourd'hui", href: "/enseigner", keywords: "aujourd hui journee jour classe" },
  { label: "Ma semaine", href: "/enseigner/semaine", keywords: "semaine preparer seance seances organisation" },
  { label: "Cahier journal", href: "/enseigner/cahier-journal", keywords: "cahier journal imprimer" },
  { label: "Ma période", href: "/enseigner/periode", keywords: "periode progression suivi" },
  { label: "Mon année", href: "/enseigner/annee", keywords: "annee programmation progression competences" },
  { label: "Ma classe · emploi du temps", href: "/enseigner/classe", keywords: "emploi du temps edt classe niveau horaires" },
  { label: "Tableau de bord Direction", href: "/direction", keywords: "direction directeur ecole taches echeances" },
  { label: "Conseil d'école", href: "/direction/reunions?nouveau=conseil-ecole", keywords: "conseil ecole ordre du jour reunion" },
  { label: "Conseil des maîtres", href: "/direction/reunions?nouveau=conseil-maitres", keywords: "conseil maitres reunion equipe" },
  { label: "Conseil de cycle", href: "/direction/reunions?nouveau=conseil-cycle", keywords: "conseil cycle reunion" },
  { label: "Organiser une sortie", href: "/direction/demarches/sortie", keywords: "sortie voyage piscine musee transport" },
  { label: "Exercice de sécurité", href: "/direction/demarches/exercice-securite", keywords: "ppms incendie exercice securite evacuation" },
  { label: "Mon espace · sauvegarde", href: "/mon-espace", keywords: "compte profil sauvegarde export mon espace" },
];

const PLACES = [
  ...BASE_PLACES,
  ...TEACHER_TOOLS.flatMap((group) => group.items.map((tool) => ({ label: tool.title, href: tool.href, keywords: normalize(`outil ${tool.text}`) }))),
  ...RESOURCE_LEVELS.map((level) => ({ label: `Ressources ${level.label}`, href: `/ressources?niveau=${level.id}`, keywords: `niveau ${normalize(level.label)} ${level.id}` })),
];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => previous?.focus?.();
  }, [open]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return { places: PLACES.slice(0, 5), resources: [] };
    const words = q.split(" ");
    const places = PLACES.filter((p) => words.every((w) => normalize(`${p.label} ${p.keywords}`).includes(w))).slice(0, 4);
    const resources = searchResources({ q: query }).results.slice(0, 6);
    return { places, resources };
  }, [query]);

  const flat = [
    ...results.places.map((p) => ({ href: p.href })),
    ...results.resources.map((r) => ({ href: `/ressources?q=${encodeURIComponent(query)}&voir=${r.id}` })),
  ];

  function go(href: string) {
    onClose();
    setQuery("");
    router.push(href);
  }

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] print:hidden">
      <button type="button" tabIndex={-1} aria-label="Fermer la recherche" onClick={onClose} className="absolute inset-0 bg-ink/25" />
      <div role="dialog" aria-modal="true" aria-label="Recherche" className="panel-enter relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-background shadow-2xl">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            go(flat[active]?.href ?? `/ressources?q=${encodeURIComponent(query)}`);
          }}
          className="flex items-center gap-3 border-b border-line px-4"
        >
          <Icon name="search" className="h-5 w-5 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") onClose();
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((a) => Math.min(a + 1, flat.length - 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              }
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={flat.length ? `${listId}-${active}` : undefined}
            aria-label="Que cherchez-vous ?"
            placeholder="Que cherchez-vous ? « soustraction CE1 », « conseil d'école »…"
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted/70 focus:outline-none"
          />
        </form>
        <ul id={listId} role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
          {results.places.length ? (
            <li role="presentation" className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Aller à</li>
          ) : null}
          {results.places.map((place, index) => (
            <li key={place.href} id={`${listId}-${index}`} role="option" aria-selected={active === index}>
              <Link
                href={place.href}
                onClick={onClose}
                className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-[15px] ${active === index ? "bg-ink/6" : "hover:bg-ink/5"}`}
              >
                {place.label}
                <Icon name="arrow-right" className="h-4 w-4 text-muted" />
              </Link>
            </li>
          ))}
          {results.resources.length ? (
            <li role="presentation" className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Ressources</li>
          ) : null}
          {results.resources.map((unit, i) => {
            const index = results.places.length + i;
            return (
              <li key={unit.id} id={`${listId}-${index}`} role="option" aria-selected={active === index}>
                <Link
                  href={`/ressources?q=${encodeURIComponent(query)}&voir=${unit.id}`}
                  onClick={onClose}
                  className={`block rounded-lg px-3 py-2 ${active === index ? "bg-ink/6" : "hover:bg-ink/5"}`}
                >
                  <span className="block text-[15px] leading-snug text-foreground">{unit.title}</span>
                  <span className="text-xs text-muted">
                    {levelLabel(unit.level)} · {subjectLabel(unit.subject)} · {unit.files.map((f) => FILE_TYPE_LABELS[f.type]).join(", ")}
                  </span>
                </Link>
              </li>
            );
          })}
          {query && !flat.length ? (
            <li className="px-3 py-6 text-center text-sm text-muted">Aucun résultat pour « {query} ».</li>
          ) : null}
        </ul>
        {query ? (
          <div className="border-t border-line px-4 py-2.5 text-sm">
            <button type="button" onClick={() => go(`/ressources?q=${encodeURIComponent(query)}`)} className="font-medium text-gold hover:underline">
              Voir toutes les ressources pour « {query} »
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
