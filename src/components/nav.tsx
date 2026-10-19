"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Wordmark } from "@/components/brand";
import { EmberA } from "@/components/ui";
import { nav, show, site } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastPath, setLastPath] = useState(pathname);
  const lenis = useLenis();
  // The design proposals open on a full-bleed hero too, so the bar starts
  // transparent there as well.
  const home = pathname === "/" || pathname.startsWith("/design/");

  // Navigating closes the menu. Adjusting during render rather than in an
  // effect avoids a frame where the overlay covers the page you just opened.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
      setSolid(y > 24 || !home);
      setHidden(y > last && y > 80 && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, home]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${open ? "bottom-0 bg-veld" : ""}`}
    >
      <div
        className={`relative border-b transition-[background-color,border-color] duration-500 ${
          solid || open
            ? "border-line bg-veld/85 backdrop-blur-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="frame flex h-16 items-center justify-between md:h-[4.25rem]">
          <Link
            href="/"
            className="shrink-0 text-[1.35rem] font-medium tracking-tight whitespace-nowrap md:text-[1.5rem]"
            aria-label={site.name}
          >
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`label relative py-1 transition-colors hover:text-ash ${
                    active ? "text-ash" : "text-ash/60"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ember transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-4 md:gap-5">
            {open ? null : (
              <EmberA href={show.tickets} className="h-10 px-5 text-[0.7rem]">
                Tickets
              </EmberA>
            )}
            <button
              type="button"
              className="-mr-2 flex size-11 items-center justify-center text-ash lg:hidden"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Menü schliessen" : "Menü öffnen"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-[400ms] [transition-timing-function:var(--ease-out-expo)] ${
                    open ? "top-1.5 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-[400ms] [transition-timing-function:var(--ease-out-expo)] ${
                    open ? "top-1.5 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress — the only chrome that tracks the whole page. */}
        <span
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-ember"
          style={{ transform: `scaleX(${progress})`, opacity: solid ? 1 : 0 }}
          aria-hidden
        />
      </div>

      {open ? (
        <div
          id="menu"
          className="absolute inset-x-0 top-16 bottom-0 flex flex-col justify-between overflow-auto bg-veld px-5 pt-10 pb-10 md:top-[4.25rem]"
          data-lenis-prevent
        >
          <nav className="flex flex-1 flex-col justify-center">
            {nav.map((item, index) => (
              <span key={item.href} className="line-mask line-mask-display">
                <Link
                  href={item.href}
                  className="display block py-1 text-[clamp(3.2rem,15vw,6rem)] text-ash transition-colors hover:text-ember"
                  style={{ animationDelay: `${60 + index * 70}ms` }}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="hero-fade mt-10 flex items-center justify-between gap-6" style={{ animationDelay: "380ms" }}>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-ash/50"
            >
              {site.instagramHandle}
            </a>
            <EmberA href={show.tickets} className="h-12 px-7" arrow>
              Tickets
            </EmberA>
          </div>
        </div>
      ) : null}
    </header>
  );
}
