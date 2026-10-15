"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { nav, site } from "@/lib/site";
import { copyText } from "./toast";
import { toggleTheme, useTheme } from "./theme";
import { Search } from "./icons";

export type PostLink = { slug: string; title: string };

type Command = {
  id: string;
  group: "Go to" | "Writing" | "Actions";
  label: string;
  keywords?: string;
  run: () => void;
};

const OPEN_EVENT = "site:open-palette";

export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/* Scroll to a homepage section and move focus there, so keyboard and
   screen-reader users land where they asked to go. */
export function useSectionJump() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (id: string) => {
      const target = pathname === "/" ? document.getElementById(id) : null;
      if (!target) {
        router.push(`/#${id}`);
        return;
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      target.focus({ preventScroll: true });
      history.replaceState(null, "", `#${id}`);
    },
    [pathname, router],
  );
}

export function CommandPalette({ posts }: { posts: PostLink[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const jump = useSectionJump();
  const theme = useTheme();
  const listId = useId();

  const commands = useMemo<Command[]>(
    () => [
      ...[...nav, { id: "contact", label: "Contact" }].map((item) => ({
        id: `go-${item.id}`,
        group: "Go to" as const,
        label: item.label,
        keywords: "section jump",
        run: () => jump(item.id),
      })),
      ...posts.map((post) => ({
        id: `post-${post.slug}`,
        group: "Writing" as const,
        label: post.title,
        keywords: "post article blog",
        run: () => router.push(`/writing/${post.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        keywords: "contact mail",
        run: () => void copyText(site.email, "Email address copied"),
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open résumé (PDF)",
        keywords: "resume cv download",
        run: () => window.open(site.resume, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        group: "Actions",
        label: "Open LinkedIn",
        keywords: "social profile",
        run: () => window.open(site.linkedin, "_blank", "noopener"),
      },
      {
        id: "github",
        group: "Actions",
        label: "Open GitHub",
        keywords: "code repositories",
        run: () => window.open(site.github, "_blank", "noopener"),
      },
      {
        id: "theme",
        group: "Actions",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        keywords: "theme dark light mode appearance",
        run: () => toggleTheme(),
      },
    ],
    [jump, posts, router, theme],
  );

  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return commands;
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.group} ${command.keywords ?? ""}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [commands, query]);

  const open = useCallback(() => {
    const el = dialog.current;
    if (!el || el.open) return;
    setQuery("");
    setActive(0);
    el.showModal();
  }, []);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [open]);

  const run = (command: Command | undefined) => {
    if (!command) return;
    dialog.current?.close();
    command.run();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const last = results.length - 1;
    const moves: Record<string, () => number> = {
      ArrowDown: () => (active >= last ? 0 : active + 1),
      ArrowUp: () => (active <= 0 ? last : active - 1),
      Home: () => 0,
      End: () => last,
    };
    if (event.key in moves && results.length) {
      event.preventDefault();
      setActive(moves[event.key]());
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[active]);
    }
  };

  useEffect(() => {
    document
      .getElementById(`${listId}-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const optionId = (index: number) => `${listId}-${index}`;
  const groups = Array.from(new Set(results.map((command) => command.group)));

  return (
    <dialog
      ref={dialog}
      className="palette"
      aria-label="Command menu"
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current.close();
      }}
    >
      <div className="palette-box">
        <div className="palette-search">
          <Search />
          <input
            autoFocus
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? optionId(active) : undefined}
            aria-label="Search sections, posts and actions"
            placeholder="Jump to a section, post or action"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
          />
          <kbd>Esc</kbd>
        </div>

        <div className="palette-list" id={listId} role="listbox" aria-label="Results">
          {groups.map((group) => (
            <div role="group" aria-labelledby={`${listId}-${group}`} key={group}>
              <div className="palette-group" id={`${listId}-${group}`} role="presentation">
                {group}
              </div>
              {results.map((command, index) =>
                command.group !== group ? null : (
                  <div
                    key={command.id}
                    id={optionId(index)}
                    role="option"
                    aria-selected={index === active}
                    className="palette-option"
                    onMouseMove={() => setActive(index)}
                    onClick={() => run(command)}
                  >
                    {command.label}
                  </div>
                ),
              )}
            </div>
          ))}
        </div>

        {!results.length && (
          <p className="palette-empty">
            Nothing matches &ldquo;{query}&rdquo;. Try a section name, such as
            Research.
          </p>
        )}

        <p className="palette-foot" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> to move
          </span>
          <span>
            <kbd>Enter</kbd> to open
          </span>
        </p>
      </div>
    </dialog>
  );
}
