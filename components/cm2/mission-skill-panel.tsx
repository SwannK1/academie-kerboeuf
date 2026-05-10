import type { MissionSkill, MissionEvidence } from "@/content/felix-types";

const gestureColor: Record<string, string> = {
  observer: "border-jade/30 bg-jade/10 text-jade",
  chercher: "border-gold/30 bg-gold/10 text-gold",
  vérifier: "border-sky/30 bg-sky/10 text-sky",
  justifier: "border-gold/30 bg-gold/10 text-gold",
  expliquer: "border-sky/30 bg-sky/10 text-sky",
  créer: "border-ember/30 bg-ember/10 text-ember",
  coopérer: "border-jade/30 bg-jade/10 text-jade",
  "produire une trace": "border-ember/30 bg-ember/10 text-ember",
};

const evidenceIcon: Record<string, string> = {
  écrit: "Écrit",
  oral: "Oral",
  production: "Production",
  trace: "Trace",
  numérique: "Numérique",
};

type MissionSkillPanelProps = {
  skills: MissionSkill[];
  evidence: MissionEvidence[];
};

export function MissionSkillPanel({ skills, evidence }: MissionSkillPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
          Compétences travaillées
        </p>
        <ul className="mt-4 space-y-3" aria-label="Compétences">
          {skills.map((skill) => {
            const badgeClass =
              gestureColor[skill.gesture] ?? "border-white/20 bg-white/[0.04] text-muted";
            return (
              <li key={skill.id} className="rounded border border-white/10 bg-ink/35 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-foreground text-sm">{skill.label}</p>
                  <span
                    className={`shrink-0 rounded border px-2 py-0.5 text-xs font-bold uppercase tracking-[0.12em] ${badgeClass}`}
                  >
                    {skill.gesture}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-6 text-muted">{skill.observable}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
          Preuves attendues
        </p>
        <ul className="mt-4 space-y-3" aria-label="Preuves attendues">
          {evidence.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded border border-white/10 bg-ink/35 p-3"
            >
              <span className="shrink-0 rounded border border-gold/25 bg-gold/10 px-2 py-0.5 text-xs font-bold uppercase tracking-[0.12em] text-gold">
                {evidenceIcon[item.type] ?? item.type}
              </span>
              <p className="text-sm leading-6 text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
