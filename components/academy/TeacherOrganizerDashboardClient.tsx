"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  buildToolHref,
  readClassProfile,
  readOrganizerTasks,
  teacherLevels,
  teacherPeriods,
  writeOrganizerTasks,
  type TeacherClassProfile,
  type TeacherOrganizerTask,
} from "@/content/teacher-organizer";

let taskIdCounter = 0;

function createTaskId(): string {
  taskIdCounter += 1;
  return `tache-${Date.now()}-${taskIdCounter}`;
}

export function TeacherOrganizerDashboardClient() {
  const [profile] = useState<TeacherClassProfile>(readClassProfile);
  const [tasks, setTasks] = useState<TeacherOrganizerTask[]>(readOrganizerTasks);
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const levelLabel = teacherLevels.find((level) => level.id === profile.level)?.label ?? "";
  const periodLabel =
    teacherPeriods.find((period) => period.id === profile.activePeriod)?.label ?? "";

  function addTask() {
    const label = newTaskLabel.trim();
    if (!label) return;
    const next = [
      ...tasks,
      { id: createTaskId(), label, done: false, createdAt: Date.now() },
    ];
    setTasks(next);
    writeOrganizerTasks(next);
    setNewTaskLabel("");
  }

  function toggleTask(id: string) {
    const next = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
    setTasks(next);
    writeOrganizerTasks(next);
  }

  function removeTask(id: string) {
    const next = tasks.filter((task) => task.id !== id);
    setTasks(next);
    writeOrganizerTasks(next);
  }

  return (
    <div className="mt-10 grid gap-8">
      <DashboardSection title="Ma classe">
        <div className="rounded-lg border border-jade/25 bg-jade/[0.05] p-5 sm:p-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            <DashboardFact label="Niveau" value={levelLabel} />
            <DashboardFact label="Classe" value={profile.className || "Non renseigné"} />
            <DashboardFact
              label="Élèves"
              value={profile.studentCount !== null ? String(profile.studentCount) : "Non renseigné"}
            />
            <DashboardFact label="Période active" value={periodLabel} />
          </dl>
          <Link
            href="/enseignants/ma-classe"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-jade/40 bg-jade/10 px-5 text-sm font-black text-jade transition hover:bg-jade/20"
          >
            Configurer ma classe
          </Link>
        </div>
      </DashboardSection>

      <DashboardSection title="Préparer aujourd’hui">
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolCard
            title="Préparer une séance"
            description="Repérez l'objectif, la ressource adaptée et le déroulé en trois temps."
            href="/enseignants#preparer-une-seance"
          />
          <ToolCard
            title="Emploi du temps"
            description="Consultez ou ajustez la semaine type de la classe."
            href={buildToolHref("/enseignants/emploi-du-temps", profile)}
          />
          <ToolCard
            title="Plan de classe"
            description="Organiser le placement des élèves."
            href="/enseignants/plan-de-classe"
            upcoming
          />
          <ToolCard
            title="Suivi de classe"
            description="Suivre l'avancement de la classe au fil de l'année."
            href="/enseignants/suivi-classe"
            upcoming
          />
        </div>
      </DashboardSection>

      <DashboardSection title="Organiser l’année">
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolCard
            title="Programmation annuelle"
            description="Placez les compétences du programme dans les périodes de l'année."
            href={buildToolHref("/enseignants/programmation", profile)}
          />
          <ToolCard
            title="Progression de période"
            description="Répartissez par semaine les compétences déjà placées dans la programmation."
            href={buildToolHref("/enseignants/progression", profile)}
          />
          <ToolCard
            title="Emploi du temps hebdomadaire"
            description="Construisez une semaine type pour votre classe."
            href={buildToolHref("/enseignants/emploi-du-temps", profile)}
          />
        </div>
      </DashboardSection>

      <DashboardSection title="À faire">
        <div className="rounded-lg border border-white/10 bg-background/40 p-5 sm:p-6">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addTask();
            }}
            className="flex flex-wrap gap-3"
          >
            <label htmlFor="new-task" className="sr-only">
              Nouvelle tâche
            </label>
            <input
              id="new-task"
              type="text"
              value={newTaskLabel}
              onChange={(event) => setNewTaskLabel(event.target.value)}
              placeholder="Ajouter une tâche"
              maxLength={120}
              className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/60 px-3 text-sm text-foreground outline-none focus:border-sky/50"
            />
            <button
              type="submit"
              className="min-h-11 rounded-md border border-sky/40 bg-sky/10 px-5 text-sm font-black text-sky transition hover:bg-sky/20"
            >
              Ajouter
            </button>
          </form>

          {tasks.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-muted">
              Aucune tâche pour le moment.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2" role="list">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <label className="flex flex-1 items-center gap-3 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                      className="h-4 w-4"
                    />
                    <span className={task.done ? "text-muted line-through" : ""}>
                      {task.label}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    aria-label={`Supprimer la tâche ${task.label}`}
                    className="min-h-9 rounded border border-rose/30 px-2 text-xs font-bold text-rose transition hover:bg-rose/10"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-muted">
            Ces tâches restent uniquement sur cet appareil.
          </p>
        </div>
      </DashboardSection>
    </div>
  );
}

function DashboardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${title}-titre`}>
      <h2 id={`${title}-titre`} className="text-xl font-black text-foreground">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DashboardFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{label}</dt>
      <dd className="mt-1 text-base font-bold text-foreground">{value}</dd>
    </div>
  );
}

function ToolCard({
  title,
  description,
  href,
  upcoming = false,
}: {
  title: string;
  description: string;
  href?: string;
  upcoming?: boolean;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black text-foreground">{title}</p>
        {upcoming && <PublicStatusBadge status="upcoming" />}
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </>
  );

  if (!href) {
    return (
      <div className="rounded-md border border-white/10 bg-white/[0.03] p-4 opacity-80">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-md border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky/40 hover:bg-sky/[0.06]"
    >
      {content}
    </Link>
  );
}
