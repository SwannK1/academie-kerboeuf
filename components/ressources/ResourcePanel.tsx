"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, ChipGroup, SidePanel, toast, type MenuSection } from "@/components/workspace/ui";
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

function printPdf(href: string) {
  const frame = document.createElement("iframe");
  frame.style.position = "fixed";
  frame.style.width = "0";
  frame.style.height = "0";
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

function Projector({ file, title, onClose }: { file: ResourceFile; title: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.requestFullscreen?.().catch(() => undefined);
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
    };
  }, [onClose]);
  return createPortal(
    <div ref={ref} role="dialog" aria-modal="true" aria-label={`Projection : ${title}`} className="fixed inset-0 z-[100] flex flex-col bg-[#1b1714]">
      <div className="flex items-center justify-between px-4 py-2 text-sm text-white/80">
        <span className="truncate">{title}</span>
        <button type="button" onClick={onClose} className="btn text-white hover:bg-white/10">
          <Icon name="x" className="h-4 w-4" /> Quitter la projection
        </button>
      </div>
      <iframe src={`${file.href}#view=Fit&toolbar=0&navpanes=0`} title={`Projection : ${title}`} className="min-h-0 flex-1 bg-white" />
    </div>,
    document.body,
  );
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
  const [projecting, setProjecting] = useState(false);
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
        footer={
          unit && file ? (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <button type="button" className="btn btn-secondary" onClick={() => setProjecting(true)}>
                  <Icon name="presentation" className="h-4 w-4" /> Projeter
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => printPdf(file.href)}>
                  <Icon name="printer" className="h-4 w-4" /> Imprimer
                </button>
                <a href={file.href} download className="btn btn-quiet" aria-label={`Télécharger ${FILE_TYPE_LABELS[file.type]}`}>
                  <Icon name="download" className="h-4 w-4" />
                  <span className="hidden sm:inline">Télécharger</span>
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
                  className={`btn btn-quiet ${favorite ? "text-gold" : ""}`}
                >
                  <Icon name="star" className="h-4 w-4" />
                </button>
              </div>
              {target ? (
                <Button
                  variant="primary"
                  icon={alreadyInTarget ? "check" : "plus"}
                  onClick={() => {
                    if (!alreadyInTarget) {
                      toggleResource(target.id, unit.id);
                      toast("Ressource ajoutée à la séance");
                    }
                  }}
                >
                  {alreadyInTarget ? "Dans la séance" : "Ajouter à la séance"}
                </Button>
              ) : teach && canPlan ? (
                <ActionMenu
                  label="Ajouter à ma séance, mon cahier journal ou ma progression"
                  sections={addMenu(unit, teach, level, profile?.zone ?? "A")}
                  triggerContent={
                    <span className="btn btn-primary">
                      <Icon name="plus" className="h-4 w-4" />
                      Ajouter à…
                    </span>
                  }
                />
              ) : null}
            </div>
          ) : null
        }
      >
        {unit && file ? (
          <div className="grid gap-4">
            {unit.objective ? <p className="text-[15px] leading-7 text-foreground">{unit.objective}</p> : null}
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
            <div className="overflow-hidden rounded-xl border border-line bg-white">
              <iframe key={file.href} src={`${file.href}#view=FitH&toolbar=0`} title={`Aperçu : ${unit.title} (${FILE_TYPE_LABELS[file.type]})`} className="h-[58vh] w-full" />
            </div>
            <p className="text-xs text-muted">
              PDF A4 · {file.pages} page{file.pages > 1 ? "s" : ""}
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
      {projecting && unit && file ? <Projector file={file} title={unit.title} onClose={() => setProjecting(false)} /> : null}
    </>
  );
}
