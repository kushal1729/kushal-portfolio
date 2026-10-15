"use client";

import { startTransition, useRef, useState, ViewTransition } from "react";
import { buildFilters, builds, type BuildFilter } from "@/content/profile";
import { ArrowUpRight } from "./icons";
import { useSlidingIndicator } from "./sliding-indicator";

const matching = (filter: BuildFilter) =>
  filter === "all"
    ? builds
    : builds.filter((build) => build.tags.includes(filter));

export function BuildGrid() {
  const [filter, setFilter] = useState<BuildFilter>("all");
  const shown = matching(filter);
  const filters = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  useSlidingIndicator(filters, pill, '[aria-pressed="true"]', filter);

  return (
    <div className="builds">
      <div
        className="filters"
        role="group"
        aria-label="Filter builds by area"
        ref={filters}
      >
        <span className="filter-pill" ref={pill} aria-hidden="true" />
        {buildFilters.map((option) => (
          <button
            key={option.id}
            type="button"
            className="filter"
            aria-pressed={filter === option.id}
            /* A transition, so cards that stay glide to their new place and
               the rest fade, instead of the grid jumping. */
            onClick={() => startTransition(() => setFilter(option.id))}
          >
            {option.label}
            <span className="filter-count">{matching(option.id).length}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        Showing {shown.length} of {builds.length} builds
      </p>

      <ul className="build-grid">
        {shown.map((build) => (
          <ViewTransition
            key={build.id}
            name={`build-${build.id}`}
            enter="build-enter"
            exit="build-exit"
            update="build-move"
            default="none"
          >
            <li className="build spot">
              <div className="build-top">
                <h3>{build.name}</h3>
                <span className="build-when">{build.when}</span>
              </div>
              <p>{build.body}</p>
              <ul className="stack" aria-label="Built with">
                {build.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              {build.href && (
                <a
                  className="text-link"
                  href={build.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the paper
                  <ArrowUpRight />
                </a>
              )}
            </li>
          </ViewTransition>
        ))}
      </ul>
    </div>
  );
}
