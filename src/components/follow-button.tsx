"use client";

import { useId, useRef } from "react";
import { site } from "@/lib/site";
import { copyText } from "./toast";
import { ArrowUpRight, Close, Copy, Rss } from "./icons";

export const FEED_URL = `${site.url}/writing/rss.xml`;

/* One-click subscribe links for the two readers most people use; anyone
   else can paste the address. */
const readers = [
  {
    name: "Feedly",
    href: `https://feedly.com/i/subscription/feed/${encodeURIComponent(FEED_URL)}`,
  },
  {
    name: "Inoreader",
    href: `https://www.inoreader.com/?add_feed=${encodeURIComponent(FEED_URL)}`,
  },
];

/* "Follow" explains RSS in a sentence and turns subscribing into one click,
   for readers who have never heard of a feed. */
export function FollowButton({
  label = "Follow",
  className = "btn btn-quiet",
}: {
  label?: string;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={className}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <Rss />
        {label}
      </button>

      <dialog
        ref={dialog}
        className="follow"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-lede`}
        /* back to the button that opened it, even where a mouse click
           never focused that button (Safari) */
        onClose={() => trigger.current?.focus({ preventScroll: true })}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <div className="follow-box">
          <div className="follow-head">
            <h2 id={`${id}-title`}>Follow the writing</h2>
            <button type="button" className="icon-btn" aria-label="Close" onClick={close}>
              <Close />
            </button>
          </div>
          <p className="follow-lede" id={`${id}-lede`}>
            New posts arrive in your feed reader as soon as they&apos;re
            published. No email, no account, and you can stop any time.
          </p>

          <div className="follow-readers">
            {readers.map((reader) => (
              <a
                key={reader.name}
                className="btn"
                href={reader.href}
                target="_blank"
                rel="noreferrer"
                onClick={close}
              >
                Add to {reader.name}
                <ArrowUpRight />
              </a>
            ))}
          </div>

          <label className="follow-label" htmlFor={`${id}-url`}>
            Using another reader? Paste this address into it.
          </label>
          <div className="follow-copy">
            <input
              id={`${id}-url`}
              readOnly
              value={FEED_URL}
              onFocus={(event) => event.currentTarget.select()}
            />
            <button
              type="button"
              className="btn btn-quiet btn-small"
              onClick={() => void copyText(FEED_URL, "Feed address copied")}
            >
              <Copy />
              Copy
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
