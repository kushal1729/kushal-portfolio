"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { copyText } from "./toast";
import { Check, Copy } from "./icons";

export function CopyEmail({ className = "btn btn-quiet" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        if (await copyText(site.email, "Email address copied")) {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        }
      }}
    >
      {copied ? <Check className="check-draw" /> : <Copy />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
