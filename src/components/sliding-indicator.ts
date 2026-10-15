"use client";

import { useEffect, type RefObject } from "react";

/* Places an indicator over whichever child of `host` matches `selector`, as
   --x/--y/--w/--h custom properties, so the active state glides between
   items instead of jumping. `host` needs position: relative. Until the first
   placement the host has no data-indicator, and CSS falls back to styling
   the active item itself. */
export function useSlidingIndicator(
  host: RefObject<HTMLElement | null>,
  mark: RefObject<HTMLElement | null>,
  selector: string,
  active: unknown,
) {
  useEffect(() => {
    const container = host.current;
    const indicator = mark.current;
    if (!container || !indicator) return;

    const place = () => {
      const target = container.querySelector<HTMLElement>(selector);
      indicator.style.setProperty("opacity", target ? "1" : "0");
      if (!target) return;
      indicator.style.setProperty("--x", `${target.offsetLeft}px`);
      indicator.style.setProperty("--y", `${target.offsetTop}px`);
      indicator.style.setProperty("--w", `${target.offsetWidth}px`);
      indicator.style.setProperty("--h", `${target.offsetHeight}px`);
    };

    place();
    /* First placement lands without travelling in from the corner. */
    const frame = requestAnimationFrame(() => {
      container.setAttribute("data-indicator", "ready");
    });
    const observer = new ResizeObserver(place);
    observer.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [host, mark, selector, active]);
}
