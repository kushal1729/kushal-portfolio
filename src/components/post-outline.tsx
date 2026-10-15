"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/outline";
import { useSlidingIndicator } from "./sliding-indicator";

/* The post's sections, kept beside the text on wide screens. The section
   you are reading is marked, and the marker slides as you move through. */
export function PostOutline({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  useSlidingIndicator(track, marker, "a[aria-current]", active);

  useEffect(() => {
    const sections = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    /* the last heading above the upper third of the viewport is current */
    const observer = new IntersectionObserver(
      (entries) => {
        const above = sections.filter(
          (section) => section.getBoundingClientRect().top < window.innerHeight * 0.33,
        );
        if (entries.length) setActive(above.at(-1)?.id ?? null);
      },
      { rootMargin: "0px 0px -66% 0px", threshold: [0, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc-title">On this page</p>
      <div className="toc-track" ref={track}>
        <span className="toc-marker" ref={marker} aria-hidden="true" />
        <ol>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={active === heading.id ? "location" : undefined}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
