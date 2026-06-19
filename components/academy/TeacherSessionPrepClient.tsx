"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  teacherLevels,
  teacherSubjects,
  teacherPeriods,
  type TeacherLevel,
  type TeacherSubject,
  type TeacherPeriod,
} from "@/content/teacher-programmation";

const STORAGE_KEY = "academie-kerboeuf-preparation-seance-v1";

type SessionPlan = {
  objectif: string;
  decouverte: string;
  entrainement: string;
  synthese: string;
};

type StoredPlans = Record<string, SessionPlan>;

const EMPTY_PLAN: SessionPlan = {
  objectif: "",
  decouverte: "",
  entrainement: "",
  synthese: "",
};

function readStoredPlans(): StoredPlans {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as StoredPlans;
    }
    return {};
  } catch {
    return {};
  }
}

function buildPlanKey(
  niveau: TeacherLevel,
  matiere: TeacherSubject,
  periode: TeacherPeriod,
  semaine: string,
  creneau: string,
): string {
  return [niveau, matiere, periode, semaine, creneau].join("__");
}

export function TeacherSessionPrepClient({
  initialNiveau,
  initialMatiere,
  initialPeriode,
  initialSemaine,
  initialCreneau,
}: {
  initialNiveau?: string;
  initialMatiere?: string;
  initialPeriode?: string;
  initialSemaine?: string;
  initialCreneau?: string;
}) {
  const [niveau, setNiveau] = useState<TeacherLevel>(
    (teacherLevels.find((l) => l.id === initialNiveau)?.id as TeacherLevel) ??
      "cm2",
  );
  const [matiere, setMatiere] = useState<TeacherSubject>(
    (teacherSubjects.find((s) => s.id === initialMatiere)
      ?.id as TeacherSubject) ?? "francais",
  );
  const [periode, setPeriode] = useState<TeacherPeriod>(
    (teacherPeriods.find((p) => p.id === initialPeriode)
      ?.id as TeacherPeriod) ?? "periode-1",
  );
  const [semaine, setSemaine] = useState(initialSemaine ?? "1");
  const [creneau, setCreneau] = useState(initialCreneau ?? "");
  const [plans, setPlans] = useState<StoredPlans>(() => readStoredPlans());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  const key = useMemo(
    () => buildPlanKey(niveau, matiere, periode, semaine, creneau),
    [niveau, matiere, periode, semaine, creneau],
  );

  const plan = plans[key] ?? EMPTY_PLAN;

  function updatePlan(field: keyof SessionPlan, value: string) {
    setPlans((prev) => ({
      ...prev,
      [key]: { ...(prev[key] ?? EMPTY_PLAN), [field]: value },
    }));
  }

  function resetPlan() {
    setPlans((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  const downstreamQuery = new URLSearchParams({ niveau }).toString();

  return (
    <div className="mt-10 space-y-8">
      <section aria-labelledby="contexte-seance">
        <h2 id="contexte-seance" className="text-xl font-black text-foreground">
          Contexte de la séance
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={niveau}
              onChange={(event) => setNiveau(event.target.value as TeacherLevel)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherLevels.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={matiere}
              onChange={(event) =>
                setMatiere(event.target.value as TeacherSubject)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherSubjects.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Période
            <select
              value={periode}
              onChange={(event) =>
                setPeriode(event.target.value as TeacherPeriod)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherPeriods.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Semaine
            <input
              type="text"
              inputMode="numeric"
              value={semaine}
              onChange={(event) => setSemaine(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Créneau (optionnel)
            <input
              type="text"
              value={creneau}
              onChange={(event) => setCreneau(event.target.value)}
              placeholder="ex. lundi__matin-1"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="contenu-seance">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="contenu-seance" className="text-xl font-black text-foreground">
            Déroulé de la séance
          </h2>
          <button
            type="button"
            onClick={resetPlan}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
          >
            Réinitialiser cette séance
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Objectif d&apos;apprentissage
            <textarea
              value={plan.objectif}
              onChange={(event) => updatePlan("objectif", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Découverte
            <textarea
              value={plan.decouverte}
              onChange={(event) => updatePlan("decouverte", event.target.value)}
              rows={3}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Entraînement
            <textarea
              value={plan.entrainement}
              onChange={(event) =>
                updatePlan("entrainement", event.target.value)
              }
              rows={3}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Synthèse / évaluation
            <textarea
              value={plan.synthese}
              onChange={(event) => updatePlan("synthese", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="suite-seance">
        <h2 id="suite-seance" className="text-xl font-black text-foreground">
          Continuer
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            href={`/enseignants/plan-de-classe?${downstreamQuery}`}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-center text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
          >
            Ouvrir le plan de classe
          </Link>
          <Link
            href={`/enseignants/suivi-classe?${downstreamQuery}`}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-center text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
          >
            Consulter le suivi de classe
          </Link>
        </div>
      </section>
    </div>
  );
}
