"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { nav, site } from "@/lib/site";
import { CommandPalette, openPalette, type PostLink } from "./command-palette";
import { useSlidingIndicator } from "./sliding-indicator";
import { Toaster } from "./toast";
import { toggleTheme, useTheme } from "./theme";
import { Close, Menu, Moon, Search, Sun } from "./icons";

const noSubscribe = () => () => {};
const useIsMac = () =>
  useSyncExternalStore(
    noSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => null,
  );

function ThemeButton({ className = "icon-btn" }: { className?: string }) {
  const theme = useTheme();
  const label = theme
    ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
    : "Switch theme";

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      title={label}
      onClick={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
      }}
    >
      {/* Which icon shows is decided in CSS, so it is right before hydration. */}
      <Moon className="icon-moon" />
      <Sun className="icon-sun" />
    </button>
  );
}

function SectionLink({
  home,
  id,
  children,
  ...rest
}: {
  home: boolean;
  id: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return home ? (
    <a href={`#${id}`} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={`/#${id}`} {...rest}>
      {children}
    </Link>
  );
}

export function SiteHeader({
  home = false,
  posts,
}: {
  home?: boolean;
  posts: PostLink[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const primary = useRef<HTMLElement>(null);
  const underline = useRef<HTMLSpanElement>(null);
  const isMac = useIsMac();
  useSlidingIndicator(primary, underline, "a[aria-current]", active);

  /* Highlight whichever section crosses the middle of the viewport. */
  useEffect(() => {
    if (!home) return;
    const sections = ["top", ...nav.map((item) => item.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [home]);

  const closeMenu = () => menu.current?.close();

  return (
    <>
      <header className="site-header">
        <div className="wrap site-header-inner">
          {home ? (
            <a className="wordmark" href="#top">
              {site.name}
            </a>
          ) : (
            <Link className="wordmark" href="/">
              {site.name}
            </Link>
          )}

          <nav className="primary-nav" aria-label="Primary" ref={primary}>
            <span className="nav-underline" ref={underline} aria-hidden="true" />
            {nav.map((item) => (
              <SectionLink
                key={item.id}
                home={home}
                id={item.id}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </SectionLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="palette-trigger"
              onClick={openPalette}
              aria-label="Open command menu"
              aria-keyshortcuts="Meta+K Control+K"
            >
              <Search />
              <span className="palette-label" aria-hidden="true">
                Search
              </span>
              <kbd>{isMac === false ? "Ctrl K" : "⌘K"}</kbd>
            </button>
            <ThemeButton />
            <a className="btn btn-small resume-link" href={site.resume} target="_blank" rel="noreferrer">
              Résumé
            </a>
            <button
              type="button"
              className="icon-btn menu-trigger"
              aria-label="Open menu"
              aria-haspopup="dialog"
              onClick={() => menu.current?.showModal()}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div className="scroll-progress" aria-hidden="true" />
      </header>

      <dialog
        ref={menu}
        className="menu-sheet"
        aria-label="Menu"
        onClick={(event) => {
          if (event.target === menu.current) closeMenu();
        }}
      >
        <div className="menu-sheet-inner">
          <div className="menu-sheet-top">
            <span className="wordmark">{site.name}</span>
            <button type="button" className="icon-btn" aria-label="Close menu" onClick={closeMenu}>
              <Close />
            </button>
          </div>
          <nav aria-label="Menu">
            {[...nav, { id: "contact", label: "Contact" }].map((item) => (
              <SectionLink key={item.id} home={home} id={item.id} onClick={closeMenu}>
                {item.label}
              </SectionLink>
            ))}
          </nav>
          <div className="menu-sheet-actions">
            <a className="btn" href={site.resume} target="_blank" rel="noreferrer">
              Open résumé
            </a>
            <ThemeButton className="btn btn-quiet" />
          </div>
        </div>
      </dialog>

      <CommandPalette posts={posts} />
      <Toaster />
    </>
  );
}
