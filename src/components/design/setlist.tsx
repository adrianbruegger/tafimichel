"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FlagI, SaDot, SwissDot } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { Arrow, EmberA } from "@/components/ui";
import { home, show } from "@/lib/site";
import { EASE, ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/motion";

/** Fixed, so server and client render the same motes. */
const MOTES = [
  { x: 12, y: 68, d: 9.5, delay: 0 },
  { x: 24, y: 82, d: 11, delay: 1.4 },
  { x: 31, y: 58, d: 8.2, delay: 3.1 },
  { x: 43, y: 90, d: 12.5, delay: 0.6 },
  { x: 49, y: 64, d: 9, delay: 2.2 },
  { x: 57, y: 86, d: 10.4, delay: 4.3 },
  { x: 63, y: 55, d: 8.8, delay: 1.1 },
  { x: 70, y: 79, d: 11.8, delay: 2.9 },
  { x: 78, y: 62, d: 9.2, delay: 0.3 },
  { x: 85, y: 88, d: 10.9, delay: 3.6 },
  { x: 92, y: 70, d: 8.6, delay: 1.8 },
  { x: 17, y: 94, d: 12, delay: 4.9 },
];

function Lockup({ dim = false }: { dim?: boolean }) {
  // The flag dots are artwork, not type, so the unlit copy has to dim them by
  // hand — otherwise two bright discs hover over an unlit poster.
  const dot = `size-[0.18em] ${dim ? "opacity-[0.09]" : ""}`;

  return (
    <div className={dim ? "text-ash/[0.07]" : "text-ash"}>
      <p className={`eyebrow ${dim ? "" : "text-ember"}`}>{show.eyebrow}</p>
      <p className="display-name mt-6 text-[clamp(3.4rem,13vw,10rem)] leading-[0.82]">
        Taf
        <FlagI Dot={SwissDot} dotClassName={dot} stemClassName="h-[0.7em] w-[0.15em]" />
        <span className="ml-[0.12em]">M</span>
        <FlagI Dot={SaDot} dotClassName={dot} stemClassName="h-[0.7em] w-[0.15em]" />
        chel
      </p>
      <p
        className={`display mt-8 max-w-3xl text-[clamp(1.5rem,4.2vw,3.1rem)] ${
          dim ? "" : "text-ash/75"
        }`}
      >
        {show.title}
      </p>
      <p className={`label mt-7 ${dim ? "" : "text-ash/50"}`}>
        {show.day}. {show.month} {show.year} · {show.venue} {show.city} · {show.time} Uhr
      </p>
    </div>
  );
}

/**
 * Hero — a club bill in the dark. The headline is printed twice: once barely
 * visible, once at full strength behind a radial mask that rides the pointer,
 * so the visitor carries the follow spot across the poster. Without a pointer
 * the light walks its own slow path; without JS or with reduced motion the
 * radius stays huge and the poster is simply lit.
 */
export function SetlistHero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const beam = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.46, r: 0 };
      const apply = () => {
        el.style.setProperty("--mx", `${beam.x}px`);
        el.style.setProperty("--my", `${beam.y}px`);
        el.style.setProperty("--r", `${beam.r}rem`);
      };
      apply();

      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const radius = window.innerWidth < 768 ? 19 : 24;

      // The lamp warms up rather than snapping on.
      el.style.setProperty("--glow", "1");
      gsap.to(beam, { r: radius, duration: 1.6, ease: EASE, onUpdate: apply, delay: 0.25 });

      const moveX = gsap.quickTo(beam, "x", { duration: 0.55, ease: "power3.out", onUpdate: apply });
      const moveY = gsap.quickTo(beam, "y", { duration: 0.55, ease: "power3.out", onUpdate: apply });

      // An operator on autopilot until someone takes the handle. The path is
      // read off the lockup, so the beam always walks the poster — on a phone,
      // where no pointer will ever arrive, that is the only way it gets read.
      const box = () => {
        const lock = el.querySelector<HTMLElement>(".sl-lockup");
        const rect = (lock ?? el).getBoundingClientRect();
        return rect;
      };
      const patrol = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
      patrol
        .to(beam, {
          x: () => box().left + box().width * 0.78,
          y: () => box().top + box().height * 0.22,
          duration: 6,
          onUpdate: apply,
        })
        .to(beam, {
          x: () => box().left + box().width * 0.16,
          y: () => box().top + box().height * 0.82,
          duration: 7,
          onUpdate: apply,
        });

      const hint = el.querySelector<HTMLElement>(".sl-hint");
      if (!fine && hint) hint.textContent = "Das Licht wandert";

      let taken = false;
      const onMove = (event: PointerEvent) => {
        if (!taken) {
          taken = true;
          patrol.kill();
          gsap.to(".sl-hint", { opacity: 0, duration: 0.4 });
        }
        const rect = el.getBoundingClientRect();
        moveX(event.clientX - rect.left);
        moveY(event.clientY - rect.top);
      };

      el.addEventListener("pointermove", onMove, { passive: true });

      return () => el.removeEventListener("pointermove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="dx-spot relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-veld pt-28 pb-24"
    >
      {/* unlit print */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="frame w-full">
          <Lockup dim />
        </div>
      </div>

      {/* the beam itself */}
      <div className="dx-spot-glow pointer-events-none absolute inset-0 mix-blend-screen" />

      {/* lit print, plus the dust that only exists inside the light */}
      <div className="dx-spot-lit pointer-events-none absolute inset-0 flex items-center">
        <div className="frame w-full">
          <div className="sl-lockup">
            <Lockup />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {MOTES.map((mote, index) => (
            <span
              key={index}
              className="dx-mote absolute size-[3px] rounded-full bg-ash/70"
              style={
                {
                  left: `${mote.x}%`,
                  top: `${mote.y}%`,
                  "--dur": `${mote.d}s`,
                  "--delay": `${mote.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {/* always lit: the things people came to click */}
      <div className="frame relative z-10 mt-auto flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <a
            href={home.hero.primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ember"
          >
            {home.hero.primary.label}
            <Arrow />
          </a>
          <Link href={show.path} className="link-line text-ash">
            Mehr zum Abend
          </Link>
        </div>
        <p className="sl-hint label text-ash/35">Licht folgt dem Zeiger</p>
      </div>
    </section>
  );
}

const rows = [
  {
    index: "01",
    title: "Programm",
    detail: show.title,
    href: show.path,
    image: "/images/portrait-hero.jpeg",
  },
  {
    index: "02",
    title: "Termine",
    detail: "Alle öffentlichen Auftritte",
    href: "/live",
    image: "/images/alps-hq.png",
  },
  {
    index: "03",
    title: "Porträt",
    detail: "Zwei Länder, ein Mikrofon",
    href: "/ueber",
    image: "/images/portrait.jpeg",
  },
  {
    index: "04",
    title: "Buchen",
    detail: "Shows, Festivals, Firmenanlässe",
    href: "/buchen",
    image: "/images/savanna-hq.png",
  },
  {
    index: "05",
    title: "Kontakt",
    detail: "Antwort kommt direkt von Tafi",
    href: "/kontakt",
    image: "/images/portrait-hero.jpeg",
  },
] as const;

/**
 * The site's sections as a setlist. Hovering a line fills it from below and
 * sends up the picture that belongs to it, pinned to the pointer.
 */
export function SetlistRows() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const card = el.querySelector<HTMLElement>(".sl-peek");
      if (!card) return;
      const moveX = gsap.quickTo(card, "x", { duration: 0.6, ease: "power3.out" });
      const moveY = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        moveX(event.clientX - rect.left);
        moveY(event.clientY - rect.top);
      };

      el.addEventListener("pointermove", onMove, { passive: true });
      return () => el.removeEventListener("pointermove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <ul className="border-t border-line">
        {rows.map((row, index) => (
          <li key={row.href} className="border-b border-line">
            <Link
              href={row.href}
              className="dx-row relative block overflow-hidden"
              onPointerEnter={() => setActive(index)}
              onPointerLeave={() => setActive((value) => (value === index ? null : value))}
              onFocus={() => setActive(index)}
              onBlur={() => setActive((value) => (value === index ? null : value))}
            >
              <span className="dx-row-fill absolute inset-0 bg-ember" aria-hidden />
              <span className="dx-row-type relative flex items-center gap-5 px-5 py-7 md:gap-10 md:px-8 md:py-9">
                <span className="dx-row-mute label w-8 shrink-0 text-ash/35">{row.index}</span>
                <span className="display text-[clamp(2rem,6vw,4.4rem)] text-ash">{row.title}</span>
                <span className="dx-row-mute ml-auto hidden text-right text-ash/55 md:block">{row.detail}</span>
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="sl-peek pointer-events-none absolute top-0 left-0 z-20 hidden h-56 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-veld-soft shadow-[0_2rem_4rem_-1rem_rgba(13,11,9,0.8)] transition-[opacity,scale] duration-500 [transition-timing-function:var(--ease-out-expo)] lg:block"
        style={{ opacity: active === null ? 0 : 1, scale: active === null ? "0.86" : "1" }}
      >
        {rows.map((row, index) => (
          <Image
            key={row.index}
            src={row.image}
            alt=""
            fill
            sizes="176px"
            className="object-cover transition-opacity duration-400"
            style={{ opacity: active === index ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}

/** Forty-eight bars that breathe on their own and swell with scroll speed. */
export function SetlistMeter() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const bars = el.querySelector<HTMLElement>(".dx-bars");
      if (!bars) return;
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const swell = 0.42 + Math.min(Math.abs(self.getVelocity()) / 1400, 1) * 0.78;
          gsap.to(bars, { scaleY: swell, duration: 0.45, ease: "power2.out", overwrite: true });
        },
      });
      return () => trigger.kill();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="border-y border-line bg-veld-soft">
      <div className="frame flex items-end gap-6 py-7">
        <div
          className="dx-bars flex h-12 flex-1 items-end gap-[3px] origin-bottom"
          aria-hidden
          style={{ transform: "scaleY(0.42)" }}
        >
          {Array.from({ length: 48 }, (_, index) => (
            <span
              key={index}
              className="h-full flex-1 bg-ember/70"
              style={
                {
                  "--dur": `${0.7 + ((index * 37) % 11) / 10}s`,
                  "--delay": `${((index * 53) % 23) / 20}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <p className="label shrink-0 text-ash/40">Publikum</p>
      </div>
    </div>
  );
}

/**
 * The ticket as a letterpress poster: ash paper, ink type, one ember stamp
 * that lands crooked the way a stamp does.
 */
export function SetlistPoster() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sl-paper",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        ".sl-stamp",
        { scale: 1.6, opacity: 0, rotate: -22 },
        {
          scale: 1,
          opacity: 1,
          rotate: -8,
          duration: 0.7,
          ease: "back.out(2.2)",
          delay: 0.65,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="programm" className="bg-veld py-24 md:py-36">
      <div className="frame">
        <div className="sl-paper relative bg-ash px-6 py-14 text-veld md:px-16 md:py-20">
          <div className="absolute inset-4 border border-dashed border-veld/20 md:inset-6" />

          <div className="relative text-center">
            <p className="label text-ember">{show.eyebrow}</p>
            <p className="display mt-7 text-[clamp(2.4rem,7vw,5.4rem)] text-veld">{show.title}</p>

            <div className="mx-auto mt-10 h-px w-24 bg-veld/25" />

            <p className="display mt-10 text-[clamp(4.5rem,16vw,11rem)] leading-[0.78] text-veld">
              {show.day}.{show.month.slice(0, 3)}
            </p>
            <p className="label mt-6 text-veld/60">
              {show.weekday} · {show.year} · Türöffnung {show.doors} · Beginn {show.time}
            </p>
            <p className="mt-10 text-xl text-veld/80 md:text-2xl">
              {show.venue} · {show.address} · {show.city}
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <EmberA href={show.tickets} arrow>
                Tickets
              </EmberA>
              <Link href={show.path} className="link-line text-veld">
                Mehr zum Abend
              </Link>
            </div>
          </div>

          <p className="sl-stamp label absolute top-8 right-6 flex items-center gap-2 border border-ember px-3 py-2 text-ember md:top-12 md:right-14">
            <SaDot className="size-4" />
            <SwissDot className="size-4" />
            Zürich
          </p>
        </div>

        <Reveal className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="label text-ash/35">Bühnenplakat</p>
          <p className="label text-ash/35">{home.hero.eyebrow}</p>
        </Reveal>
      </div>
    </section>
  );
}
