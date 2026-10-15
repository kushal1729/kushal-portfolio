"use client";

import { copyText } from "./toast";
import { Share } from "./icons";

/* The phone's share sheet where there is one; a copied link everywhere else. */
export function ShareButton({ title }: { title: string }) {
  return (
    <button
      type="button"
      className="btn btn-quiet"
      onClick={async () => {
        const url = window.location.href.split("#")[0];
        if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
          try {
            await navigator.share({ title, url });
            return;
          } catch {
            /* dismissed or unavailable: fall through to copying */
          }
        }
        await copyText(url, "Link copied");
      }}
    >
      <Share />
      Share
    </button>
  );
}
