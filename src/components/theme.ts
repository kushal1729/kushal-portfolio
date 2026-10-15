"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

/* The effective theme: an explicit choice if one is stored, else the system. */
export function readTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return darkQuery().matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const query = darkQuery();
  query.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    query.removeEventListener("change", onChange);
  };
}

/* null during server render and hydration, so markup never mismatches. */
export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, readTheme, () => null);
}

/* Switch themes with a circular reveal from wherever the switch was pressed. */
export function toggleTheme(origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const next: Theme = readTheme() === "dark" ? "light" : "dark";
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: the choice lasts for this page view only */
    }
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced) {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth - 40;
  const y = origin?.y ?? 32;
  root.style.setProperty("--reveal-x", `${x}px`);
  root.style.setProperty("--reveal-y", `${y}px`);
  root.classList.add("theme-switching");
  document
    .startViewTransition(apply)
    .finished.finally(() => root.classList.remove("theme-switching"));
}
