"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, ChipGroup, SidePanel, toast, type MenuSection } from "@/components/workspace/ui";
import {
  FILE_TYPE_LABELS,
  normalize,
  publishedResources,
  subjectLabel,
  type ResourceFile,
  type ResourceUnit,
} from "@/lib/resources/library";
import { getCurriculum, isTeachLevel, levelLabel, type TeachLevel } from "@/lib/workspace/curriculum";
import { isFavorite, recordRecent, toggleFavoriteItem, useActivity } from "@/lib/workspace/activity";
import { useProfile } from "@/lib/workspace/profile";
import { addDays, dayLabel, formatShortDate, getPeriodFor, mondayOf, todayIso, weekday } from "@/lib/workspace/school-year";
import {
  createSession,
  freeSlotsOn,
  schoolDatesOfWeek,
  sessionTitle,
  sessionsOn,
  setProgress,
  teachStore,
  toggleResource,
  useTeach,
  type TeachState,
} from "@/lib/workspace/teach";

const TEACH_SUBJECT: Record<string, string> = {
  francais: "francais",
  maths: "mathematiques",
  langage: "langage",
  sciences: "sciences-technologie",
  "hg-emc": "histoire",
  langues: "langue-vivante",
  arts: "arts-plastiques",
  eps: "eps",
};

export function teachSubjectFor(unit: ResourceUnit, level: TeachLevel): string {
  if (unit.subject === "maths" && (level === "ps" || level === "ms" || level === "gs")) return "premiers-outils-mathematiques";
  if (unit.subject === "sciences" && ["cp", "ce1", "ce2"].includes(level)) return "questionner-le-monde";
  return TEACH_SUBJECT[unit.subject] ?? "francais";
}

/** Notions du programme les plus proches d'une ressource (pour « Ajouter à ma progression »). */
function matchNotions(unit: ResourceUnit, level: TeachLevel) {
  const subjectId = teachSubjectFor(unit, level);
  const words = normalize(`${unit.title} ${unit.objective}`)
    .split(" ")
    .filter((w) => w.length > 3);
  const subject = getCurriculum(level).find((s) => s.id === subjectId);
  if (!subject) return [];
  return subject.domains
    .flatMap((d) => d.notions)
    .map((n) => {
      const label = normalize(n.label);
      return { notion: n, score: words.reduce((sum, w) => sum + (label.includes(w.slice(0, 6)) ? 1 : 0), 0) };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((m) => m.notion);
}

function addMenu(unit: ResourceUnit, teach: TeachState, level: TeachLevel, zone: "A" | "B" | "C"): MenuSection[] {
  const today = todayIso();
  const monday = weekday(today) >= 6 ? addDays(mondayOf(today), 7) : mondayOf(today);
  const dates = schoolDatesOfWeek(teach, monday).filter((d) => d >= today || weekday(today) >= 6);
  const subjectId = teachSubjectFor(unit, level);
  const matching = teach.sessions
    .filter((s) => s.date >= today && s.date < addDays(monday, 14) && s.subject === subjectId && !s.resources.includes(unit.id))
    .sort((a, b) => a.date.localeCompare(b.date) || a.start - b.start)
    .slice(0, 5);
  const notions = matchNotions(unit, level);
  const period = getPeriodFor(today, zone);

  function addToDay(date: string) {
    const before = teachStore.get();
    const slot = freeSlotsOn(teach, date).find((s) => s.subject === subjectId);
    const last = sessionsOn(teach, date).at(-1);
    const notion = notions[0];
    createSession({
      date,
      start: slot?.start ?? (last ? last.start + last.duration : 510),
      duration: slot?.duration ?? 30,
      level,
      subject: subjectId,
      domainId: notion?.domainId ?? null,
      notionId: notion?.id ?? null,
      notionLabel: notion?.label ?? unit.title,
      resources: [unit.id],
    });
    toast(`Ajoutée au cahier journal · ${date === today ? "aujourd'hui" : dayLabel(date).toLowerCase()}`, () => teachStore.set(before));
  }

  return [
    ...(matching.length
      ? [
          {
            title: "À une séance prévue",
            actions: matching.map((s) => ({
              label: `${dayLabel(s.date)} ${formatShortDate(s.date)} · ${sessionTitle(s)}`.slice(0, 64),
              icon: "plus" as const,
              onSelect: () => {
                toggleResource(s.id, unit.id);
                toast("Ressource ajoutée à la séance");
              },
            })),
          },
        ]
      : []),
    {
      title: "Au cahier journal (nouvelle séance)",
      actions: dates.map((d) => ({
        label: d === today ? "Aujourd'hui" : `${dayLabel(d)} ${formatShortDate(d)}`,
        icon: "calendar" as const,
        onSelect: () => addToDay(d),
      })),
    },
    ...(notions.length
      ? [
          {
            title: `À ma progression (P${period.id})`,
            actions: notions.map((n) => ({
              label: n.label.length > 60 ? `${n.label.slice(0, 58)}…` : n.label,
              icon: "check-circle" as const,
              onSelect: () => {
                const current = teach.progress[n.id];
                setProgress(n.id, { period: current?.period || period.id });
                toast(`Notion placée en P${current?.period || period.id}`);
              },
            })),
          },
        ]
      : []),
  ];
}

/** Document imprimé par défaut depuis une carte : la fiche élève plutôt que la leçon. */
export function defaultPrintFile(unit: ResourceUnit): ResourceFile | undefined {
  for (const type of ["exercices", "texte", "atelier", "fiche", "lecon"] as const) {
    const file = unit.files.find((f) => f.type === type);
    if (file) return file;
  }
  return unit.files[0];
}

/** Document projeté par défaut : la leçon. */
export function defaultProjectFile(unit: ResourceUnit): ResourceFile | undefined {
  return unit.files.find((f) => f.type === "lecon") ?? unit.files[0];
}

export function printPdf(href: string) {
  // Signal observable (tests, mesures) : la boîte d'impression native n'est pas automatisable.
  window.dispatchEvent(new CustomEvent("ak:impression", { detail: href }));
  const frame = document.createElement("iframe");
  frame.style.position = "fixed";
  // Taille non nulle : Chrome ne charge pas le lecteur PDF dans un cadre de 0 px.
  frame.style.width = "1px";
  frame.style.height = "1px";
  frame.style.left = "-10px";
  frame.style.opacity = "0";
  frame.style.border = "0";
  frame.src = href;
  frame.onload = () => {
    try {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
    } catch {
      window.open(href, "_blank", "noopener");
    }
    setTimeout(() => frame.remove(), 60_000);
  };
  document.body.appendChild(frame);
}

export function ResourcePanel({
  unit,
  targetSessionId,
  onClose,
  onNavigate,
}: {
  unit: ResourceUnit | undefined;
  targetSessionId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const teach = useTeach();
  const profile = useProfile();
  const activity = useActivity();
  const [picked, setPicked] = useState<{ id?: string; index: number }>({ index: 0 });
  const fileIndex = picked.id === unit?.id ? picked.index : 0;
  const file = unit?.files[Math.min(fileIndex, (unit?.files.length ?? 1) - 1)];
  const favorite = Boolean(unit && isFavorite(activity, "ressource", unit.id));
  const level: TeachLevel = isTeachLevel(unit?.level) ? (unit?.level as TeachLevel) : profile?.level ?? "cm2";
  const target = targetSessionId && teach ? teach.sessions.find((s) => s.id === targetSessionId) : undefined;
  const alreadyInTarget = Boolean(target && unit && target.resources.includes(unit.id));
  const canPlan = isTeachLevel(unit?.level);

  useEffect(() => {
    if (unit) {
      recordRecent({
        kind: "ressource",
        id: unit.id,
        label: unit.title,
        href: `/ressources?voir=${unit.id}`,
        detail: `${levelLabel(unit.level)} · ${subjectLabel(unit.subject)}`,
      });
    }
  }, [unit]);

  const siblings = unit ? publishedResources.filter((u) => u.level === unit.level && u.subject === unit.subject && u.domain === unit.domain) : [];
  const index = unit ? siblings.findIndex((u) => u.id === unit.id) : -1;
  const previous = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;

  return (
    <>
      <SidePanel
        open={Boolean(unit)}
        wide
        onClose={onClose}
        title={unit?.title ?? ""}
        subtitle={unit ? `${levelLabel(unit.level)} · ${subjectLabel(unit.subject)}${unit.domain ? ` · ${unit.domain}` : ""}` : undefined}
      >
        {unit && file ? (
          <div className="grid gap-4">
            {unit.files.length > 1 ? (
              <ChipGroup
                label="Document"
                hideLabel
                size="sm"
                options={unit.files.map((f, i) => ({ id: i, label: `${FILE_TYPE_LABELS[f.type]}${f.pages > 1 ? ` · ${f.pages} p.` : ""}` }))}
                value={fileIndex}
                onChange={(i) => i !== null && setPicked({ id: unit.id, index: i })}
              />
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className="btn btn-primary min-h-12 px-5 text-[15px]" onClick={() => printPdf(file.href)}>
                <Icon name="printer" className="h-5 w-5" /> Imprimer
              </button>
              <a
                href={`${file.href}#view=Fit`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary min-h-12 px-5 text-[15px]"
                title="Page entière dans un nouvel onglet (plein écran : F11)"
              >
                <Icon name="presentation" className="h-5 w-5" /> Projeter
              </a>
              {target ? (
                <button
                  type="button"
                  className="btn btn-secondary min-h-12 px-5 text-[15px]"
                  onClick={() => {
                    if (!alreadyInTarget) {
                      toggleResource(target.id, unit.id);
                      toast("Ressource ajoutée à la séance");
                    }
                  }}
                >
                  <Icon name={alreadyInTarget ? "check" : "plus"} className="h-5 w-5" />
                  {alreadyInTarget ? "Dans la séance" : "Ajouter à la séance"}
                </button>
              ) : teach && canPlan ? (
                <ActionMenu
                  label="Ajouter à ma séance, mon cahier journal ou ma progression"
                  align="left"
                  sections={addMenu(unit, teach, level, profile?.zone ?? "A")}
                  triggerContent={
                    <span className="btn btn-secondary min-h-12 px-5 text-[15px]">
                      <Icon name="plus" className="h-5 w-5" />
                      Ajouter à…
                    </span>
                  }
                />
              ) : null}
              <span className="ml-auto flex items-center">
                <a href={file.href} download className="grid size-11 place-items-center rounded-md text-muted hover:bg-ink/6 hover:text-foreground" aria-label={`Télécharger ${FILE_TYPE_LABELS[file.type]}`} title="Télécharger">
                  <Icon name="download" className="h-5 w-5" />
                </a>
                <button
                  type="button"
                  onClick={() =>
                    toggleFavoriteItem({
                      kind: "ressource",
                      id: unit.id,
                      label: unit.title,
                      href: `/ressources?voir=${unit.id}`,
                      detail: `${levelLabel(unit.level)} · ${subjectLabel(unit.subject)}`,
                    })
                  }
                  aria-pressed={favorite}
                  aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                  title="Favori"
                  className={`grid size-11 place-items-center rounded-md hover:bg-ink/6 ${favorite ? "text-gold" : "text-muted"}`}
                >
                  <Icon name="star" className="h-5 w-5" />
                </button>
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-line bg-white">
              <iframe key={file.href} src={`${file.href}#view=FitH&toolbar=0`} title={`Aperçu : ${unit.title} (${FILE_TYPE_LABELS[file.type]})`} className="h-[55vh] w-full sm:h-[62vh]" />
            </div>
            <p className="text-xs text-muted">
              PDF A4 · {file.pages} page{file.pages > 1 ? "s" : ""}
              {unit.objective ? <span className="mt-1 block text-sm leading-6">{unit.objective}</span> : null}
            </p>

            <nav aria-label="Ressources liées" className="grid gap-2 border-t border-line pt-4 sm:grid-cols-2">
              {previous ? (
                <button type="button" onClick={() => onNavigate(previous.id)} className="rounded-lg border border-line px-3 py-2 text-left text-sm hover:border-ink/25">
                  <span className="block text-xs text-muted">← Notion précédente</span>
                  <span className="line-clamp-1">{previous.title}</span>
                </button>
              ) : (
                <span />
              )}
              {next ? (
                <button type="button" onClick={() => onNavigate(next.id)} className="rounded-lg border border-line px-3 py-2 text-right text-sm hover:border-ink/25">
                  <span className="block text-xs text-muted">Notion suivante →</span>
                  <span className="line-clamp-1">{next.title}</span>
                </button>
              ) : null}
              <Link href={`/ressources?niveau=${unit.level}&matiere=${unit.subject}`} onClick={onClose} className="text-sm font-medium text-gold hover:underline sm:col-span-2">
                Toutes les ressources {subjectLabel(unit.subject)} · {levelLabel(unit.level)}
              </Link>
            </nav>
          </div>
        ) : null}
      </SidePanel>
    </>
  );
}
