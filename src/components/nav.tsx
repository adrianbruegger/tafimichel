"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Wordmark } from "@/components/brand";
import { EmberA } from "@/components/ui";
import { nav, show } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const home = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24 || !home);
      setHidden(y > last && y > 80 && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${open ? "bottom-0 bg-veld" : ""}`}
    >
      <div
        className={`border-b transition-[background,border-color] duration-500 ${
          solid || open
            ? "border-line bg-veld/88 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="frame flex h-16 items-center justify-between md:h-[4.25rem]">
          <Link href="/" className="text-[1.35rem] font-medium tracking-tight md:text-[1.5rem]">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`label transition-colors hover:text-ash ${
                  pathname === item.href ? "text-ash" : "text-ash/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <EmberA href={show.tickets} className="h-10 px-4">
              Tickets
            </EmberA>
            <button
              type="button"
              className="label text-ash lg:hidden"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Schliessen" : "Menü"}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="menu"
          className="absolute inset-x-0 top-16 bottom-0 overflow-auto bg-veld px-5 pt-10 md:top-[4.25rem]"
        >
          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="display text-[clamp(3.4rem,16vw,6.5rem)] text-ash"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <EmberA href={show.tickets} className="mt-10 h-14 px-8">
            Tickets
          </EmberA>
        </div>
      ) : null}
    </header>
  );
}
