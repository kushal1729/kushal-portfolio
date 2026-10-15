"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { ArrowLeft } from "./icons";

const LAST = "nav:last";
const CURRENT = "nav:current";

/* Remembers the previous in-site path, so a back link can tell whether the
   page it points to is the one you just came from. Mounted once, in the
   header, on every page. */
export function usePathTracker() {
  const pathname = usePathname();
  useEffect(() => {
    try {
      const current = sessionStorage.getItem(CURRENT);
      if (current !== pathname) {
        if (current) sessionStorage.setItem(LAST, current);
        sessionStorage.setItem(CURRENT, pathname);
      }
    } catch {
      /* storage blocked: back links fall back to plain navigation */
    }
  }, [pathname]);
}

/* A back link that behaves like the browser's back button when it can —
   returning you to where you were on the page, scroll position included —
   and like an ordinary link when you arrived from somewhere else. */
export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  const target = href.split("#")[0] || "/";

  return (
    <Link
      className="back-link"
      href={href}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        let cameFrom: string | null = null;
        try {
          cameFrom = sessionStorage.getItem(LAST);
        } catch {
          /* no history to consult */
        }
        if (cameFrom === target && window.history.length > 1) {
          event.preventDefault();
          router.back();
        }
      }}
    >
      <ArrowLeft />
      {children}
    </Link>
  );
}
