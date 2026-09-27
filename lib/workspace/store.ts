"use client";

import { useSyncExternalStore } from "react";

/**
 * Magasin local minimal, partagé par les espaces Enseigner, Direction et
 * Mon espace.
 *
 * - une clé localStorage par espace (et non plus une par outil) ;
 * - lecture via useSyncExternalStore : le rendu serveur et le premier rendu
 *   client reçoivent `null`, puis la vraie valeur — aucun décalage
 *   d'hydratation, contrairement aux anciens outils ;
 * - synchronisation entre onglets via l'événement `storage` ;
 * - une donnée illisible n'est jamais écrasée silencieusement : elle est
 *   copiée sous `<clé>.illisible` avant de repartir de la valeur par défaut.
 */

export type LocalStore<T> = {
  key: string;
  get: () => T;
  set: (next: T) => void;
  update: (fn: (current: T) => T) => void;
  subscribe: (listener: () => void) => () => void;
  replace: (raw: unknown) => boolean;
};

export function createLocalStore<T>(
  key: string,
  createDefault: () => T,
  parse: (value: unknown) => T | null,
): LocalStore<T> {
  let cache: T | null = null;
  const listeners = new Set<() => void>();

  function load(): T {
    if (typeof window === "undefined") return createDefault();
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return createDefault();
    }
    if (!raw) return createDefault();
    try {
      const parsed = parse(JSON.parse(raw));
      if (parsed) return parsed;
    } catch {
      // JSON invalide : traité ci-dessous.
    }
    try {
      window.localStorage.setItem(`${key}.illisible`, raw);
    } catch {
      // stockage plein ou bloqué : on continue avec la valeur par défaut.
    }
    return createDefault();
  }

  function get(): T {
    if (cache === null) cache = load();
    return cache;
  }

  function emit() {
    listeners.forEach((listener) => listener());
  }

  function set(next: T) {
    cache = next;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Écriture impossible (navigation privée stricte) : l'état reste en mémoire.
    }
    emit();
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    function onStorage(event: StorageEvent) {
      if (event.key === key) {
        cache = null;
        listener();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  return {
    key,
    get,
    set,
    update: (fn) => set(fn(get())),
    subscribe,
    replace(raw) {
      const parsed = parse(raw);
      if (!parsed) return false;
      set(parsed);
      return true;
    },
  };
}

const serverSnapshot = () => null;

/** Valeur du magasin, ou `null` tant que le client n'a pas hydraté. */
export function useLocalStore<T>(store: LocalStore<T>): T | null {
  return useSyncExternalStore(store.subscribe, store.get, serverSnapshot);
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function asArray<T>(value: unknown, guard: (item: unknown) => item is T): T[] {
  return Array.isArray(value) ? value.filter(guard) : [];
}
