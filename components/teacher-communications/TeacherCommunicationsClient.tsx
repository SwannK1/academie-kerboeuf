"use client";

import { useMemo, useState } from "react";
import {
  communicationTones,
  communicationTypes,
  emptyCommunicationFields,
  generateCommunicationMessage,
  getCommunicationType,
  type CommunicationFields,
  type CommunicationToneId,
  type CommunicationTypeId,
} from "@/content/teacher-communication-templates";

type CopyStatus = "idle" | "copied" | "error";

function fallbackCopyToClipboard(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }
  document.body.removeChild(textarea);
  return success;
}

export function TeacherCommunicationsClient() {
  const [selectedTypeId, setSelectedTypeId] = useState<CommunicationTypeId>(
    communicationTypes[0].id,
  );
  const [tone, setTone] = useState<CommunicationToneId>(
    communicationTypes[0].defaultTone,
  );
  const [fields, setFields] = useState<CommunicationFields>(emptyCommunicationFields);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const selectedType = getCommunicationType(selectedTypeId);

  const generatedMessage = useMemo(
    () => generateCommunicationMessage(selectedTypeId, fields, tone),
    [selectedTypeId, fields, tone],
  );

  function handleSelectType(typeId: CommunicationTypeId) {
    setSelectedTypeId(typeId);
    setTone(getCommunicationType(typeId).defaultTone);
    setCopyStatus("idle");
  }

  function updateField<K extends keyof CommunicationFields>(
    key: K,
    value: CommunicationFields[K],
  ) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function handleCopy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedMessage);
        setCopyStatus("copied");
      } else {
        setCopyStatus(fallbackCopyToClipboard(generatedMessage) ? "copied" : "error");
      }
    } catch {
      setCopyStatus(fallbackCopyToClipboard(generatedMessage) ? "copied" : "error");
    }
    window.setTimeout(() => setCopyStatus("idle"), 2000);
  }

  function handleReset() {
    setFields(emptyCommunicationFields);
    setTone(selectedType.defaultTone);
    setCopyStatus("idle");
  }

  return (
    <div className="mt-10 space-y-10">
      <section aria-labelledby="type-communication-titre" className="print:hidden">
        <h2 id="type-communication-titre" className="text-xl font-black text-foreground">
          1. Choisir le type de communication
        </h2>
        <div
          role="group"
          aria-label="Type de communication"
          className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
        >
          {communicationTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              aria-pressed={selectedTypeId === type.id}
              onClick={() => handleSelectType(type.id)}
              className={`min-h-16 rounded-md border px-4 py-2 text-left transition ${
                selectedTypeId === type.id
                  ? "border-jade/60 bg-jade/15"
                  : "border-white/15 hover:border-jade/40"
              }`}
            >
              <span className="block text-sm font-bold text-foreground">
                {type.label}
              </span>
              <span className="mt-1 block text-xs font-normal text-muted">
                {type.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="infos-communication-titre" className="print:hidden">
        <h2
          id="infos-communication-titre"
          className="text-xl font-black text-foreground"
        >
          2. Renseigner les informations
        </h2>
        <div className="mt-4 grid gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
            Destinataire
            <input
              type="text"
              value={fields.destinataire}
              onChange={(event) => updateField("destinataire", event.target.value)}
              placeholder={selectedType.destinatairePlaceholder}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
            Sujet
            <input
              type="text"
              value={fields.sujet}
              onChange={(event) => updateField("sujet", event.target.value)}
              placeholder={selectedType.sujetPlaceholder}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
            />
          </label>

          {selectedType.showDate ? (
            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Date
              <input
                type="date"
                value={fields.date}
                onChange={(event) => updateField("date", event.target.value)}
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
              />
            </label>
          ) : null}

          {selectedType.showLieu ? (
            <label className="flex flex-col gap-1 text-sm font-bold text-foreground">
              Lieu
              <input
                type="text"
                value={fields.lieu}
                onChange={(event) => updateField("lieu", event.target.value)}
                placeholder="Cour de l'école, salle polyvalente..."
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-normal text-foreground"
              />
            </label>
          ) : null}

          <label className="flex flex-col gap-1 text-sm font-bold text-foreground sm:col-span-2">
            Informations importantes
            <textarea
              value={fields.informations}
              onChange={(event) => updateField("informations", event.target.value)}
              placeholder={selectedType.informationsPlaceholder}
              rows={5}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-normal leading-6 text-foreground"
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="ton-communication-titre" className="print:hidden">
        <h2 id="ton-communication-titre" className="text-xl font-black text-foreground">
          3. Choisir le ton
        </h2>
        <div
          role="group"
          aria-label="Ton du message"
          className="mt-4 flex flex-wrap gap-2"
        >
          {communicationTones.map((toneOption) => (
            <button
              key={toneOption.id}
              type="button"
              aria-pressed={tone === toneOption.id}
              onClick={() => setTone(toneOption.id)}
              title={toneOption.description}
              className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
                tone === toneOption.id
                  ? "border-jade/60 bg-jade/15 text-jade"
                  : "border-white/15 text-foreground hover:border-jade/40"
              }`}
            >
              {toneOption.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="message-genere-titre">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <h2 id="message-genere-titre" className="text-xl font-black text-foreground">
            4. Message généré
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-11 rounded-md border border-jade/60 bg-jade/10 px-4 text-sm font-bold text-jade transition hover:bg-jade/20"
            >
              {copyStatus === "copied" ? "Copié !" : "Copier"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky/40"
            >
              Imprimer
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-rose/40 hover:text-rose"
            >
              Réinitialiser
            </button>
          </div>
          <span aria-live="polite" className="sr-only">
            {copyStatus === "copied" ? "Message copié dans le presse-papiers." : ""}
            {copyStatus === "error" ? "La copie a échoué." : ""}
          </span>
        </div>

        <p className="hidden print:mb-4 print:block print:text-lg print:font-bold">
          {selectedType.label}
        </p>

        <div className="mt-4 whitespace-pre-wrap rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-foreground print:border-black/30 print:bg-white print:p-0 print:text-black">
          {generatedMessage}
        </div>
      </section>
    </div>
  );
}
