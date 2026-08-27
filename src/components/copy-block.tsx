"use client";

import { useEffect, useState } from "react";

/**
 * A press text with a one-click copy — the section already promises
 * "Pressetexte zum Kopieren", so the button is the missing half of it.
 */
export function CopyBlock({
  label,
  text,
  words,
}: {
  label: string;
  text: string;
  words: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="group relative max-w-3xl border-t border-line pt-7">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="label text-ember">{label}</p>
        <button
          type="button"
          onClick={copy}
          className={`label flex items-center gap-2 transition-colors ${
            copied ? "text-ash" : "text-ash/45 hover:text-ash"
          }`}
        >
          {copied ? "Kopiert" : "Kopieren"}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
            aria-hidden
          >
            {copied ? (
              <path d="M3 8.5 6.5 12 13 4.5" />
            ) : (
              <>
                <rect x="5.5" y="5.5" width="8" height="8" />
                <path d="M10.5 2.5h-8v8" />
              </>
            )}
          </svg>
        </button>
      </div>
      <p className="prose-lede mt-5 text-lg text-ash/72">{text}</p>
      <p className="mt-4 text-xs text-ash/30">{words}</p>
    </article>
  );
}
