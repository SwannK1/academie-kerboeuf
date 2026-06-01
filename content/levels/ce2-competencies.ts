import type {
  LearningCompetency,
  ResourceSlot,
  TeachingSequenceStep,
} from "@/content/learning-architecture-types";
import {
  ce2SubjectTree,
  cloneCe2PlannedPdfResources,
  getCe2CompetencyId,
} from "@/content/levels/ce2-learning-tree";

const PRIORITY_SEQUENCE_LIMIT = 8;

function makeResourceSlots(): ResourceSlot[] {
  return cloneCe2PlannedPdfResources().map((resource) => ({
    kind: resource.kind,
    label: resource.label,
    resource,
  }));
}

function makePrioritySteps(competencyId: string): TeachingSequenceStep[] {
  return [
    ["discovery", "Decouvrir la competence", "Observer une situation courte et nommer ce qui est attendu."],
    ["explicit-lesson", "Formaliser la methode", "Identifier la demarche utile sans entrer dans un contenu detaille."],
    ["guided-practice", "S'entrainer avec guidage", "Appliquer la methode sur une tache courte accompagnee."],
    ["consolidation", "Consolider", "Reprendre la competence dans une situation proche."],
    ["assessment", "Verifier la maitrise", "Montrer que la competence est comprise et explicable."],
  ].map(([kind, title, objective], index) => ({
    id: `${competencyId}-seance-${index + 1}`,
    order: (index + 1) as 1 | 2 | 3 | 4 | 5,
    kind: kind as TeachingSequenceStep["kind"],
    title,
    objective,
    resourceSlots: makeResourceSlots(),
    status: "upcoming",
  }));
}

function makePlannedSteps(competencyId: string): TeachingSequenceStep[] {
  return [
    {
      id: `${competencyId}-seance-1`,
      order: 1,
      kind: "discovery",
      title: "Sequence planifiee",
      objective:
        "La competence est repertoriee ; les seances seront precisees avec les PDF reels.",
      resourceSlots: makeResourceSlots(),
      status: "upcoming",
    },
  ];
}

export const ce2Competencies: LearningCompetency[] = ce2SubjectTree.flatMap((subject, subjectIndex) =>
  subject.domains.flatMap((domain, domainIndex) =>
    domain.subdomains.flatMap((subdomain, subdomainIndex) =>
      subdomain.competencies.map((definition, competencyIndex) => {
        const globalIndex =
          ce2SubjectTree
            .slice(0, subjectIndex)
            .reduce(
              (total, previousSubject) =>
                total +
                previousSubject.domains.reduce(
                  (domainTotal, previousDomain) =>
                    domainTotal +
                    previousDomain.subdomains.reduce(
                      (subdomainTotal, previousSubdomain) =>
                        subdomainTotal + previousSubdomain.competencies.length,
                      0,
                    ),
                  0,
                ),
              0,
            ) +
          subject.domains
            .slice(0, domainIndex)
            .reduce(
              (total, previousDomain) =>
                total +
                previousDomain.subdomains.reduce(
                  (subdomainTotal, previousSubdomain) =>
                    subdomainTotal + previousSubdomain.competencies.length,
                  0,
                ),
              0,
            ) +
          domain.subdomains
            .slice(0, subdomainIndex)
            .reduce(
              (total, previousSubdomain) =>
                total + previousSubdomain.competencies.length,
              0,
            ) +
          competencyIndex;
        const id = getCe2CompetencyId(subject, domain, subdomain, definition);
        const isPriority = globalIndex < PRIORITY_SEQUENCE_LIMIT;

        return {
          id,
          slug: definition.slug,
          levelSlug: "ce2",
          cycle: "cycle-2",
          subject: subject.title,
          subjectLabel: subject.title,
          domainSlug: domain.slug,
          subdomainSlug: subdomain.slug,
          title: definition.title,
          observableObjective: definition.objective,
          successCriteria: definition.criteria,
          sequence: {
            id: `seq-${id}`,
            competencyId: id,
            title: definition.title,
            steps: isPriority ? makePrioritySteps(id) : makePlannedSteps(id),
            status: "upcoming",
          },
          lessonIds: [id],
          resourceSlots: makeResourceSlots(),
          guideCharacter: {
            characterSlug: "esteban",
            name: "Esteban",
          },
          status: "upcoming",
        } satisfies LearningCompetency;
      }),
    ),
  ),
);
