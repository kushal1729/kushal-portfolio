"use client";

import { useEffect, useState } from "react";

const EVENT = "site:toast";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));
}

export async function copyText(text: string, confirmation: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast(confirmation);
    return true;
  } catch {
    toast(`Copying is blocked here. The address is ${text}`);
    return false;
  }
}

/* The live region is always mounted so screen readers hear every message,
   including the first. */
export function Toaster() {
  const [message, setMessage] = useState<{ text: string; id: number } | null>(
    null,
  );

  useEffect(() => {
    let timer: number | undefined;
    const show = (event: Event) => {
      setMessage({ text: (event as CustomEvent<string>).detail, id: Date.now() });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener(EVENT, show);
    return () => {
      window.removeEventListener(EVENT, show);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {message && (
        <p className="toast" key={message.id}>
          {message.text}
        </p>
      )}
    </div>
  );
}
