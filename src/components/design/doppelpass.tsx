"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { FlagI, SaDot, SwissDot } from "@/components/brand";
import { Reveal, SplitHeading } from "@/components/reveal";
import { Arrow, EmberA, TextLink } from "@/components/ui";
import { home, show, site } from "@/lib/site";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

/** How far the seam may travel, so neither country is ever fully gone. */
const MIN = 14;
const MAX = 86;

const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));

/**
 * Hero — the two landscapes meet at a seam the visitor steers: the pointer on
 * a mouse, a sideways drag on touch (vertical scrolling stays untouched via
 * `touch-action: pan-y`). The name is set twice, the ember copy clipped to the
 * Swiss side, so the type itself changes colour as the seam passes through it.
 */
export function DoppelpassHero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const alps = el.querySelector<HTMLElement>(".dp-alps");
    const blade = el.querySelector<HTMLElement>(".dp-blade");
    const nameAsh = el.querySelector<HTMLElement>(".dp-name");
    const nameCh = el.querySelector<HTMLElement>(".dp-name-ch");
    const coin = el.querySelector<HTMLElement>(".dp-coin-inner");
    const readSa = el.querySelector<HTMLElement>(".dp-read-sa");
    const readCh = el.querySelector<HTMLElement>(".dp-read-ch");
    const labelSa = el.querySelector<HTMLElement>(".dp-label-sa");
    const labelCh = el.querySelector<HTMLElement>(".dp-label-ch");
    const hint = el.querySelector<HTMLElement>(".dp-hint");

    const state = { v: 50 };

    const apply = () => {
      const v = state.v;
      if (alps) alps.style.clipPath = `inset(0 0 0 ${v}%)`;
      if (blade) blade.style.left = `${v}%`;
      if (coin) coin.style.transform = `rotateY(${(v - 50) * 7.2}deg)`;

      if (nameAsh && nameCh) {
        // The seam is a viewport percentage; the heading is narrower than the
        // viewport, so it has to be converted into the heading's own box.
        const rect = nameAsh.getBoundingClientRect();
        const seamPx = (v / 100) * window.innerWidth;
        const local = ((seamPx - rect.left) / rect.width) * 100;
        nameCh.style.clipPath = `inset(0 0 0 ${Math.min(100, Math.max(0, local))}%)`;
      }

      const sa = Math.round(v);
      if (readSa) readSa.textContent = String(sa).padStart(2, "0");
      if (readCh) readCh.textContent = String(100 - sa).padStart(2, "0");
      if (labelSa) labelSa.style.opacity = String(0.3 + (v / 100) * 0.7);
      if (labelCh) labelCh.style.opacity = String(0.3 + ((100 - v) / 100) * 0.7);
    };

    apply();

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const setSeam = gsap.quickTo(state, "v", {
        duration: 0.7,
        ease: "power3.out",
        onUpdate: apply,
      });

      // Coarse pointers get a slow breath so the split is visibly alive before
      // anyone touches it; the first real input takes over for good.
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const drift = fine
        ? null
        : gsap.fromTo(
            state,
            { v: 40 },
            {
              v: 60,
              duration: 7,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              onUpdate: apply,
            },
          );

      let touched = false;
      const onMove = (event: PointerEvent) => {
        if (!touched) {
          touched = true;
          drift?.kill();
          if (hint) gsap.to(hint, { opacity: 0, duration: 0.5, ease: EASE });
        }
        setSeam(clamp((event.clientX / window.innerWidth) * 100));
      };
      const onLeave = () => setSeam(50);

      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", apply);

      // The type leaves before the next section arrives — the one borrowed
      // move from the live hero, so the page still hands over the same way.
      gsap.to(".dp-copy", {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.4 },
      });

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("resize", apply);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] overflow-hidden bg-veld [touch-action:pan-y]"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/savanna-2x.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          loading="eager"
          fetchPriority="high"
          className="scale-105 object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-veld via-veld/40 to-veld/85" />
      </div>

      <div className="dp-alps absolute inset-0" style={{ clipPath: "inset(0 0 0 50%)" }}>
        <Image
          src="/images/alps-2x.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          loading="eager"
          className="scale-105 object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-veld via-veld/40 to-veld/85" />
      </div>

      {/* The seam itself: hairline, haze, and the coin that turns with it. */}
      <div
        className="dp-blade pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ash/65 to-transparent"
        style={{ left: "50%" }}
      >
        <div className="absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 bg-ash/[0.05] blur-lg" />
        {/* Sits high on a phone so it never lands on the lockup. */}
        <div className="absolute top-[32%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 md:top-1/2 md:-translate-y-1/2">
          <div className="dx-coin size-10">
            <div className="dx-coin-inner size-full">
              <SaDot className="dx-coin-face size-full" />
              <div className="dx-coin-face dx-coin-back">
                <SwissDot className="size-full" />
              </div>
            </div>
          </div>
          <p className="dp-hint label whitespace-nowrap text-ash/40">Naht bewegen</p>
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end pb-[clamp(5rem,14vh,9rem)]">
        <div className="dp-copy frame">
          <p className="hero-fade eyebrow text-ash/80" style={{ animationDelay: "80ms" }}>
            {home.hero.eyebrow} — Zürich
          </p>

          <h1 className="relative mt-4">
            <span className="dp-name display-name block pt-[0.3em] [display:flow-root] text-[clamp(3.6rem,14vw,10.5rem)] text-ash">
              <span className="line-mask line-mask-display">
                <span style={{ animationDelay: "140ms" }}>
                  Taf
                  <FlagI
                    Dot={SwissDot}
                    dotClassName="size-[0.18em]"
                    stemClassName="h-[0.7em] w-[0.15em]"
                  />
                  <span className="ml-[0.12em]">M</span>
                  <FlagI
                    Dot={SaDot}
                    dotClassName="size-[0.18em]"
                    stemClassName="h-[0.7em] w-[0.15em]"
                  />
                  chel
                </span>
              </span>
            </span>

            {/* Same lockup, ember, clipped to whatever the seam has uncovered. */}
            <span
              aria-hidden
              className="dp-name-ch display-name pointer-events-none absolute inset-0 block pt-[0.3em] [display:flow-root] text-[clamp(3.6rem,14vw,10.5rem)] text-ember"
              style={{ clipPath: "inset(0 0 0 50%)" }}
            >
              <span className="line-mask line-mask-display">
                <span style={{ animationDelay: "140ms" }}>
                  Taf
                  <FlagI
                    Dot={SwissDot}
                    dotClassName="size-[0.18em]"
                    stemClassName="h-[0.7em] w-[0.15em]"
                  />
                  <span className="ml-[0.12em]">M</span>
                  <FlagI
                    Dot={SaDot}
                    dotClassName="size-[0.18em]"
                    stemClassName="h-[0.7em] w-[0.15em]"
                  />
                  chel
                </span>
              </span>
            </span>
          </h1>

          <div
            className="hero-fade mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6"
            style={{ animationDelay: "420ms" }}
          >
            <div className="max-w-md border-l border-ash/25 pl-5">
              <p className="text-lg font-medium text-ash md:text-xl">{show.title}</p>
              <p className="text-ash/65">
                {show.weekday}, {show.day}. {show.month} {show.year} · {show.venue} {show.city}
              </p>
            </div>

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
              <a href="#programm" className="link-line text-ash">
                {home.hero.secondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Live readout of the split — the page's one piece of instrumentation. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex items-center justify-between px-5 md:bottom-6 md:px-8">
        <p className="dp-label-sa label flex items-baseline gap-2 text-ash">
          Südafrika
          <span className="dp-read-sa tabular-nums text-ember">50</span>
        </p>
        <p className="dp-label-ch label flex items-baseline gap-2 text-ash">
          <span className="dp-read-ch tabular-nums text-ember">50</span>
          Schweiz
        </p>
      </div>
    </section>
  );
}

/**
 * Two rails of outline type drift past each other while the portrait copy
 * holds still between them — the split, told once more in typography.
 */
export function DoppelpassRails() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dp-rail-up",
        { yPercent: 6 },
        {
          yPercent: -34,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
        },
      );
      gsap.fromTo(
        ".dp-rail-down",
        { yPercent: -34 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const rail = (word: string) => (
    <span className="dx-outline display block text-[7vw] leading-[0.92] whitespace-nowrap">
      {word}
    </span>
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-veld py-28 md:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[22vw] overflow-hidden md:block"
      >
        <div className="dp-rail-up will-change-transform">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{rail("Südafrika")}</span>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[22vw] overflow-hidden text-right md:block"
      >
        <div className="dp-rail-down will-change-transform">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{rail("Schweiz")}</span>
          ))}
        </div>
      </div>

      <div className="frame relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal as="p" className="eyebrow justify-center text-ember">
            Porträt
          </Reveal>
          <SplitHeading className="display mt-7 text-[clamp(2.6rem,7vw,5.4rem)]">
            {home.profile.eyebrow}
          </SplitHeading>
          <Reveal className="prose-lede mt-9 text-lg text-ash/70 md:text-xl" delay={0.1}>
            {home.profile.copy[0]}
          </Reveal>
          <Reveal className="mt-9" delay={0.16}>
            <p className="text-xl leading-snug text-ash md:text-2xl">
              {home.profile.copy[1]}
            </p>
          </Reveal>
          <Reveal className="mt-11 flex flex-wrap justify-center gap-x-8 gap-y-2" delay={0.2}>
            <TextLink href={home.profile.cta.href}>{home.profile.cta.label}</TextLink>
            <TextLink href={site.instagram} external>
              Instagram
            </TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * The show, on a ticket torn along the same seam: ash on one side, veld on the
 * other, perforated down the middle. It opens from the centre outwards.
 */
export function DoppelpassTicket() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dp-ticket",
        { clipPath: "inset(0% 50% 0% 50%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: EASE,
          scrollTrigger: { trigger: ".dp-ticket", start: "top 84%", once: true },
        },
      );
      gsap.fromTo(
        ".dp-stub-left",
        { xPercent: 2 },
        {
          xPercent: -2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.fromTo(
        ".dp-stub-right",
        { xPercent: -2 },
        {
          xPercent: 2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="programm" className="relative bg-veld py-24 md:py-36">
      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal as="p" className="eyebrow text-ember">
              {show.eyebrow}
            </Reveal>
            <SplitHeading className="display mt-6 max-w-4xl text-[clamp(2.8rem,8vw,6.4rem)]">
              {show.title}
            </SplitHeading>
          </div>
          <Reveal as="p" className="label text-ash/35" delay={0.14}>
            Eintritt 01
          </Reveal>
        </div>

        <div className="dp-ticket relative mt-14 grid overflow-hidden md:grid-cols-2">
          <div className="dp-stub-left bg-ash p-8 text-veld md:p-12">
            <p className="label text-ember">Nächster Abend</p>
            <p className="display mt-7 flex items-end gap-4 text-[clamp(4.5rem,13vw,8rem)] leading-[0.78]">
              {show.day}
              <span className="pb-2 text-[0.2em] leading-tight tracking-[0.08em]">
                {show.month}
                <br />
                {show.year}
              </span>
            </p>
            <p className="mt-4 text-veld/60">{show.weekday}</p>
            <div className="rule rule-ink mt-10" />
            <p className="prose-lede mt-6 max-w-sm text-veld/70">{show.copy}</p>
          </div>

          <div className="dp-stub-right relative bg-veld-soft p-8 text-ash md:p-12">
            {/* perforation, running where the hero's seam ran */}
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-px border-l border-dashed border-ash/25 md:block" />
            <span className="pointer-events-none absolute -top-2 -left-2 hidden size-4 rounded-full bg-veld md:block" />
            <span className="pointer-events-none absolute -bottom-2 -left-2 hidden size-4 rounded-full bg-veld md:block" />

            <dl className="space-y-5">
              {[
                { term: "Türöffnung", value: show.doors },
                { term: "Beginn", value: show.time },
                { term: "Ort", value: `${show.venue}, ${show.address}, ${show.city}` },
              ].map((row) => (
                <div
                  key={row.term}
                  className="flex items-baseline justify-between gap-6 border-b border-line pb-4"
                >
                  <dt className="label text-ash/40">{row.term}</dt>
                  <dd className="text-right tabular-nums">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <EmberA href={show.tickets} arrow>
                Tickets
              </EmberA>
              <TextLink href={show.path}>Mehr zum Abend</TextLink>
            </div>

            <div className="mt-12 flex items-center gap-3 text-ash/35">
              <SaDot className="size-5" />
              <SwissDot className="size-5" />
              <p className="label">Doppelpass</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The portrait, cut by the same seam: one half warm, one half cooled off. The
 * cut travels with the scroll, so the picture keeps changing hands.
 */
export function DoppelpassPortrait() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const cold = el.querySelector<HTMLElement>(".dp-cold");
    const line = el.querySelector<HTMLElement>(".dp-cut");
    if (!cold || !line) return;

    if (prefersReducedMotion()) {
      cold.style.clipPath = "inset(0 0 0 50%)";
      line.style.left = "50%";
      return;
    }

    const ctx = gsap.context(() => {
      const cut = { v: 72 };
      const apply = () => {
        cold.style.clipPath = `inset(0 0 0 ${cut.v}%)`;
        line.style.left = `${cut.v}%`;
      };
      apply();

      gsap.to(cut, {
        v: 28,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-veld">
      <div className="frame">
        <div className="relative aspect-[16/10] overflow-hidden bg-veld-soft md:aspect-[21/9]">
          <Image
            src="/images/portrait.jpeg"
            alt="Tafi Michel im Freien, Blazer mit südafrikanischem Stoff"
            fill
            sizes="100vw"
            quality={95}
            className="object-cover object-[center_18%]"
          />
          <div
            className="dp-cold absolute inset-0"
            style={{ clipPath: "inset(0 0 0 72%)" }}
          >
            <Image
              src="/images/portrait.jpeg"
              alt=""
              fill
              sizes="100vw"
              quality={95}
              className="object-cover object-[center_18%] [filter:saturate(0.15)_contrast(1.12)_brightness(0.92)]"
            />
          </div>
          <div
            className="dp-cut pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-ash/45"
            style={{ left: "72%" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-veld/70 via-transparent to-transparent" />
          <p className="label absolute bottom-5 left-5 text-ash/70">Ein Mensch, zwei Hälften</p>
        </div>
      </div>
    </section>
  );
}
