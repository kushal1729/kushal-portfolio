"use client";

import { useEffect } from "react";

/* One delegated listener feeds the cursor position to whichever card is
   under it, so its border can catch the light where the pointer is. */
export function PointerEffects() {
  useEffect(() => {
    const capable = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!capable.matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const paint = () => {
      frame = 0;
      const target = (last?.target as Element | null)?.closest<HTMLElement>(".spot");
      if (!last || !target) return;
      const box = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${last.clientX - box.left}px`);
      target.style.setProperty("--my", `${last.clientY - box.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
