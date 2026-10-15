"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { site } from "@/lib/site";

const RADIUS = 260;

/* The name is set letter by letter on load, then answers the cursor: letters
   near the pointer widen and thicken along Mona Sans's width and weight axes.
   Assistive tech reads the name whole from the visually hidden copy. */
export function HeroName() {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = root.current;
    const area = heading?.closest("section");
    if (!heading || !area) return;
    const capable = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!capable.matches) return;

    const letters = [...heading.querySelectorAll<HTMLElement>(".name-char")];
    let centres: { x: number; y: number }[] = [];
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    /* Measured once per entry, not per move, so widening letters never
       feed back into their own distances. */
    const measure = () => {
      centres = letters.map((el) => {
        const box = el.getBoundingClientRect();
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
      });
    };

    const paint = () => {
      frame = 0;
      letters.forEach((el, i) => {
        const pull = pointer
          ? Math.max(0, 1 - Math.hypot(pointer.x - centres[i].x, pointer.y - centres[i].y) / RADIUS)
          : 0;
        const eased = pull * pull * (3 - 2 * pull);
        el.style.setProperty("--pull", eased.toFixed(3));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onEnter = () => measure();
    const onMove = (event: PointerEvent) => {
      if (!centres.length) measure();
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };
    const onScroll = () => {
      centres = [];
    };

    area.addEventListener("pointerenter", onEnter);
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointerenter", onEnter);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const [first, last] = site.name.split(" ");
  const letters = (word: string, offset: number) =>
    [...word].map((char, i) => (
      <span
        className="name-char"
        key={i}
        style={{ "--c": offset + i } as CSSProperties}
      >
        {char}
      </span>
    ));

  return (
    <h1 className="name" ref={root}>
      <span className="sr-only">{site.name}</span>
      <span aria-hidden="true">
        <span className="name-word">{letters(first, 0)}</span>
        <span className="name-word">{letters(last, first.length)}</span>
      </span>
    </h1>
  );
}
