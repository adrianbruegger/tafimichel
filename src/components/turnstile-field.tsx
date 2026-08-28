"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const DEV_SITE_KEY = "1x00000000000000000000AA";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type Props = {
  resetSignal: number;
};

export function TurnstileField({ resetSignal }: Props) {
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
    (process.env.NODE_ENV === "production" ? "" : DEV_SITE_KEY);
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || !siteKey || !box.current || !window.turnstile) return;

    const id = window.turnstile.render(box.current, {
      sitekey: siteKey,
      theme: "dark",
      size: "flexible",
      appearance: "interaction-only",
      "refresh-expired": "auto",
    });
    widgetId.current = id;

    return () => {
      window.turnstile?.remove(id);
      widgetId.current = null;
    };
  }, [loaded, siteKey, resetSignal]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setLoaded(true)}
      />
      <div ref={box} className="mt-8" />
    </>
  );
}
