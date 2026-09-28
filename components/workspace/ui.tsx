"use client";

/**
 * Primitives d'interaction communes aux espaces de travail.
 *
 * Grammaire unique : clic = choisir/ouvrir, coche = terminer, `…` = actions
 * secondaires, `+` = ajouter. Tout est utilisable au clavier et au doigt
 * (cibles ≥ 40 px), le glisser-déposer n'est jamais le seul chemin.
 */

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Icon, type IconName } from "@/components/icons/Icon";
import type { Accent } from "@/lib/workspace/curriculum";
import type { OfficialSource } from "@/content/direction/sources";

export const accentStyles: Record<Accent, { dot: string; soft: string; text: string; border: string }> = {
  jade: { dot: "bg-jade", soft: "bg-jade/8", text: "text-jade", border: "border-jade/30" },
  gold: { dot: "bg-gold", soft: "bg-gold/8", text: "text-gold", border: "border-gold/30" },
  sky: { dot: "bg-sky", soft: "bg-sky/8", text: "text-sky", border: "border-sky/30" },
  ember: { dot: "bg-ember", soft: "bg-ember/8", text: "text-ember", border: "border-ember/30" },
  plum: { dot: "bg-plum", soft: "bg-plum/8", text: "text-plum", border: "border-plum/30" },
  slate: { dot: "bg-slate", soft: "bg-slate/8", text: "text-slate", border: "border-slate/30" },
};

// ── Chips ──────────────────────────────────────────────────────────────────

type ChipOption<T extends string | number> = { id: T; label: string; hint?: string };

/** Choix unique en chips (radiogroup). Un second clic sur le choix actif le retire si `allowEmpty`. */
export function ChipGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
  allowEmpty = false,
  size = "md",
  hideLabel = false,
}: {
  label: string;
  options: ChipOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  allowEmpty?: boolean;
  size?: "sm" | "md";
  hideLabel?: boolean;
}) {
  const labelId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(0, options.findIndex((o) => o.id === value));

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + options.length) % options.length;
    refs.current[next]?.focus();
    onChange(options[next].id);
  }

  return (
    <div>
      <p id={labelId} className={hideLabel ? "sr-only" : "mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted"}>
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const checked = option.id === value;
          return (
            <button
              key={String(option.id)}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={index === activeIndex ? 0 : -1}
              title={option.hint}
              onKeyDown={(event) => onKeyDown(event, index)}
              onClick={() => onChange(checked && allowEmpty ? null : option.id)}
              className={`chip ${size === "sm" ? "chip-sm" : ""} ${checked ? "chip-on" : ""}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Choix multiple en chips (boutons à bascule). */
export function ToggleChips<T extends string>({
  label,
  options,
  values,
  onChange,
  hideLabel = false,
}: {
  label: string;
  options: ChipOption<T>[];
  values: T[];
  onChange: (values: T[]) => void;
  hideLabel?: boolean;
}) {
  const labelId = useId();
  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className={hideLabel ? "sr-only" : "mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted"}>
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = values.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? values.filter((v) => v !== option.id) : [...values, option.id])}
              className={`chip ${on ? "chip-on" : ""}`}
            >
              {on ? <Icon name="check" className="h-3.5 w-3.5" /> : null}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Boutons ────────────────────────────────────────────────────────────────

export function IconButton({
  icon,
  label,
  onClick,
  className = "",
  tone = "default",
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
  className?: string;
  tone?: "default" | "quiet";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid size-10 shrink-0 place-items-center rounded-md transition ${
        tone === "quiet" ? "text-muted hover:bg-ink/6 hover:text-foreground" : "border border-line bg-panel-soft text-foreground hover:border-ink/25"
      } ${className}`}
    >
      <Icon name={icon} className="h-[18px] w-[18px]" />
    </button>
  );
}

export function Button({
  children,
  onClick,
  href,
  variant = "secondary",
  icon,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "quiet";
  icon?: IconName;
  className?: string;
  type?: "button" | "submit";
}) {
  const classes = `btn btn-${variant} ${className}`;
  const content = (
    <>
      {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

// ── Menu contextuel ────────────────────────────────────────────────────────

export type MenuAction = {
  label: string;
  icon?: IconName;
  onSelect: () => void;
  tone?: "danger";
};

export type MenuSection = { title?: string; actions: MenuAction[] };

export function ActionMenu({
  label,
  sections,
  trigger = "more",
  align = "right",
  buttonClassName = "",
  triggerContent,
}: {
  label: string;
  sections: MenuSection[];
  trigger?: IconName;
  align?: "left" | "right";
  buttonClassName?: string;
  /** contenu visible du bouton (sinon : icône seule) */
  triggerContent?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback((focusButton = true) => {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const items = () => Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>("[role=menuitem]") ?? []);
    items()[0]?.focus();
    function onKey(event: KeyboardEvent) {
      const list = items();
      const index = list.indexOf(document.activeElement as HTMLButtonElement);
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        list[(index + 1) % list.length]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        list[(index - 1 + list.length) % list.length]?.focus();
      } else if (event.key === "Tab") {
        close(false);
      }
    }
    function onPointer(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) close(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={(event) => {
          event.stopPropagation();
          const rect = buttonRef.current?.getBoundingClientRect();
          // Dans un panneau, la place est bornée : on ouvre vers le haut si besoin. Dans la page, on défile.
          if (rect) setUp(Boolean(buttonRef.current?.closest("[role=dialog]")) && window.innerHeight - rect.bottom < 320);
          setOpen((v) => !v);
        }}
        className={
          triggerContent
            ? buttonClassName
            : `grid size-10 place-items-center rounded-md text-muted transition hover:bg-ink/6 hover:text-foreground ${buttonClassName}`
        }
      >
        {triggerContent ?? <Icon name={trigger} className="h-[18px] w-[18px]" />}
      </button>
      {open ? (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label}
          onClick={(event) => event.stopPropagation()}
          className={`absolute z-40 max-h-[min(70vh,26rem)] w-64 overflow-y-auto rounded-lg border border-line bg-panel-soft py-1 shadow-[0_18px_40px_-18px_rgba(43,36,32,0.45)] ${
            align === "right" ? "right-0" : "left-0"
          } ${up ? "bottom-full mb-1" : "top-full mt-1"}`}
        >
          {sections.map((section, sIndex) => (
            <div key={section.title ?? sIndex} className={sIndex ? "border-t border-line pt-1" : ""}>
              {section.title ? (
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{section.title}</p>
              ) : null}
              {section.actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => {
                    close();
                    action.onSelect();
                  }}
                  className={`flex min-h-10 w-full items-center gap-2.5 px-3 text-left text-sm transition hover:bg-ink/6 focus:bg-ink/6 focus:outline-none ${
                    action.tone === "danger" ? "text-ember" : "text-foreground"
                  }`}
                >
                  {action.icon ? <Icon name={action.icon} className="h-4 w-4 text-muted" /> : <span className="w-4" />}
                  {action.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ── Panneau latéral ────────────────────────────────────────────────────────

/** Panneau à droite sur grand écran, feuille du bas sur mobile. */
export function SidePanel({
  open,
  title,
  subtitle,
  onClose,
  children,
  footer,
  wide = false,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !event.defaultPrevented) onClose();
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] print:hidden">
      <button type="button" aria-label="Fermer le panneau" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-ink/20" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`panel-enter absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-2xl border border-line bg-background shadow-2xl focus:outline-none sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-full sm:rounded-none sm:rounded-l-2xl ${
          wide ? "sm:max-w-2xl" : "sm:max-w-md"
        }`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 id={titleId} className="font-serif text-xl font-semibold leading-snug text-foreground">
              {title}
            </h2>
            {subtitle ? <p className="mt-0.5 text-sm text-muted">{subtitle}</p> : null}
          </div>
          <IconButton icon="x" label="Fermer" tone="quiet" onClick={onClose} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer ? <div className="border-t border-line px-5 py-3">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

// ── Checklist ──────────────────────────────────────────────────────────────

export function CheckRow({
  checked,
  onToggle,
  children,
  meta,
  actions,
}: {
  checked: boolean;
  onToggle: () => void;
  children: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  const id = useId();
  return (
    <div className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-ink/[0.035]">
      <input id={id} type="checkbox" checked={checked} onChange={onToggle} className="check" />
      <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer py-1.5">
        <span className={`block text-[15px] leading-snug ${checked ? "text-muted line-through decoration-ink/30" : "text-foreground"}`}>
          {children}
        </span>
        {meta ? <span className="mt-0.5 block text-xs text-muted">{meta}</span> : null}
      </label>
      {actions}
    </div>
  );
}

// ── Liste réordonnable ─────────────────────────────────────────────────────

/**
 * Glisser-déposer sur ordinateur (poignée visible au survol), boutons
 * « monter / descendre » partout : le réordonnancement ne dépend jamais du
 * geste de glisser.
 */
export function ReorderList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  label,
}: {
  items: T[];
  onReorder: (ids: string[]) => void;
  renderItem: (item: T, controls: ReactNode) => ReactNode;
  label: string;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  function move(id: string, delta: number) {
    const ids = items.map((i) => i.id);
    const index = ids.indexOf(id);
    const target = index + delta;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    onReorder(ids);
    setAnnouncement(`Position ${target + 1} sur ${ids.length}`);
  }

  function drop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const ids = items.map((i) => i.id).filter((id) => id !== dragId);
    ids.splice(ids.indexOf(targetId) + (items.findIndex((i) => i.id === dragId) < items.findIndex((i) => i.id === targetId) ? 1 : 0), 0, dragId);
    onReorder(ids);
  }

  return (
    <>
      <ol aria-label={label} className="grid gap-1.5">
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={(event) => {
              setDragId(item.id);
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", item.id);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setOverId(item.id);
            }}
            onDragLeave={() => setOverId((v) => (v === item.id ? null : v))}
            onDrop={(event) => {
              event.preventDefault();
              drop(item.id);
              setDragId(null);
              setOverId(null);
            }}
            onDragEnd={() => {
              setDragId(null);
              setOverId(null);
            }}
            className={`group rounded-lg transition ${dragId === item.id ? "opacity-40" : ""} ${
              overId === item.id && dragId !== item.id ? "ring-2 ring-gold/50" : ""
            }`}
          >
            {renderItem(
              item,
              <div className="flex items-center">
                <span className="hidden cursor-grab px-1 text-muted/70 opacity-0 transition group-hover:opacity-100 md:block" aria-hidden="true">
                  <Icon name="grip" className="h-4 w-4" />
                </span>
                <button
                  type="button"
                  onClick={() => move(item.id, -1)}
                  disabled={index === 0}
                  aria-label="Monter"
                  className="grid size-9 place-items-center rounded-md text-muted hover:bg-ink/6 disabled:opacity-25"
                >
                  <Icon name="arrow-up" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(item.id, 1)}
                  disabled={index === items.length - 1}
                  aria-label="Descendre"
                  className="grid size-9 place-items-center rounded-md text-muted hover:bg-ink/6 disabled:opacity-25"
                >
                  <Icon name="arrow-down" className="h-4 w-4" />
                </button>
              </div>,
            )}
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}

// ── Toast avec annulation ──────────────────────────────────────────────────

type ToastState = { id: number; message: string; undo?: () => void } | null;
let toastState: ToastState = null;
const toastListeners = new Set<() => void>();
let toastTimer: ReturnType<typeof setTimeout> | undefined;

export function toast(message: string, undo?: () => void) {
  toastState = { id: Date.now(), message, undo };
  toastListeners.forEach((l) => l());
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastState = null;
    toastListeners.forEach((l) => l());
  }, 5000);
}

export function Toaster() {
  const state = useSyncExternalStore(
    (l) => {
      toastListeners.add(l);
      return () => toastListeners.delete(l);
    },
    () => toastState,
    () => null,
  );
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[80] flex justify-center px-4 print:hidden">
      {state ? (
        <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm text-background shadow-xl">
          <span>{state.message}</span>
          {state.undo ? (
            <button
              type="button"
              onClick={() => {
                state.undo?.();
                toastState = null;
                toastListeners.forEach((l) => l());
              }}
              className="rounded-full px-3 py-1.5 font-semibold text-[#f3d9a8] hover:bg-white/10"
            >
              Annuler
            </button>
          ) : (
            <span className="w-2" />
          )}
        </div>
      ) : null}
    </div>
  );
}

// ── Divers ─────────────────────────────────────────────────────────────────

/** Sources officielles repliées : la checklist reste le produit principal. */
export function SourceLinks({ sources, why }: { sources: OfficialSource[]; why?: string }) {
  if (!sources.length) return null;
  return (
    <details className="group rounded-lg border border-line bg-panel/40">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-4 text-sm font-medium text-muted hover:text-foreground">
        Pourquoi ? · Sources officielles
        <Icon name="chevron-right" className="h-4 w-4 transition group-open:rotate-90" />
      </summary>
      <div className="px-4 pb-4">
        {why ? <p className="mb-3 text-sm leading-6 text-foreground">{why}</p> : null}
        <ul className="grid gap-2">
          {sources.map((source) => (
            <li key={source.id} className="text-sm">
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-foreground underline decoration-ink/25 hover:decoration-gold">
                <span>{source.label}</span>
                <Icon name="external" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
              </a>
              <span className="block text-xs text-muted">
                {source.publisher} · vérifié le {new Date(`${source.verifiedAt}T12:00`).toLocaleDateString("fr-FR")}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-5 text-muted">La source officielle fait foi.</p>
      </div>
    </details>
  );
}

export function Hint({ children, action, onDismiss }: { children: ReactNode; action?: ReactNode; onDismiss?: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-4 py-2.5 text-sm text-foreground">
      <span className="min-w-0 flex-1">{children}</span>
      {action}
      {onDismiss ? (
        <button type="button" onClick={onDismiss} className="text-xs font-medium text-muted hover:text-foreground">
          Plus tard
        </button>
      ) : null}
    </div>
  );
}

export function Skeleton({ className = "h-40" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-ink/[0.05] ${className}`} aria-hidden="true" />;
}

/** Contexte « ajouter à une séance » partagé entre bibliothèque et semaine. */
export const PickerContext = createContext<{ pickResource?: (resourceId: string) => void }>({});
export const usePicker = () => useContext(PickerContext);
