import { ArrowUp } from "./icons";

/* Appears once you are well into a page; its ring is the reading progress.
   Styling (and its absence without scroll-driven animations) is in CSS. */
export function ToTop({ target }: { target: string }) {
  return (
    <a className="to-top" href={`#${target}`} aria-label="Back to top">
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle className="to-top-track" cx="22" cy="22" r="20" />
        <circle className="to-top-ring" cx="22" cy="22" r="20" pathLength="100" />
      </svg>
      <ArrowUp />
    </a>
  );
}
