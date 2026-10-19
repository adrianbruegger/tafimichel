"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FlagI, SaDot, SwissDot } from "@/components/brand";
import { Reveal, SplitHeading } from "@/components/reveal";
import { Arrow, EmberA, TextLink } from "@/components/ui";
import { home, show, site } from "@/lib/site";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

function Bars({ className = "" }: { className?: string }) {
  return (
    <span className={`dx-bars flex h-5 items-end gap-[2px] ${className}`} aria-hidden>
      {Array.from({ length: 14 }, (_, index) => (
        <span
          key={index}
          className="h-full w-[3px] bg-ember/80"
          style={
            {
              "--dur": `${0.5 + ((index * 29) % 9) / 10}s`,
              "--delay": `${((index * 17) % 13) / 18}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

/**
 * Hero — the picture opens like a projector gate: two bars pull back, the
 * frame drifts with the pointer, and the broadcast furniture (timecode, level
 * meter, recording mark) frames it the way a monitor would.
 */
export function TonspurHero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const bars = el.querySelectorAll<HTMLElement>(".ts-bar");
    const code = el.querySelector<HTMLElement>(".ts-code");

    if (prefersReducedMotion()) {
      bars.forEach((bar) => (bar.style.transform = "scaleY(0)"));
      if (code) code.textContent = "00:00:00:00";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(bars, {
        scaleY: 0,
        duration: 1.5,
        ease: EASE,
        delay: 0.15,
        stagger: 0.06,
      });

      gsap.fromTo(
        ".ts-shot",
        { scale: 1.14 },
        { scale: 1, duration: 2.2, ease: EASE, delay: 0.15 },
      );

      // A frame counter, because a reel should know where it is.
      const started = performance.now();
      const tick = () => {
        if (!code) return;
        const total = (performance.now() - started) / 1000;
        const mm = String(Math.floor(total / 60) % 60).padStart(2, "0");
        const ss = String(Math.floor(total) % 60).padStart(2, "0");
        const ff = String(Math.floor((total % 1) * 25)).padStart(2, "0");
        code.textContent = `00:${mm}:${ss}:${ff}`;
      };
      gsap.ticker.add(tick);

      // The gate drifts a little under the pointer — parallax, not a gimmick.
      const shot = el.querySelector<HTMLElement>(".ts-gate");
      const tiltX = shot ? gsap.quickTo(shot, "rotationY", { duration: 0.9, ease: "power3.out" }) : null;
      const tiltY = shot ? gsap.quickTo(shot, "rotationX", { duration: 0.9, ease: "power3.out" }) : null;
      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        tiltX?.(nx * 4);
        tiltY?.(-ny * 3);
      };
      el.addEventListener("pointermove", onMove, { passive: true });

      gsap.to(".ts-copy", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.4 },
      });

      return () => {
        gsap.ticker.remove(tick);
        el.removeEventListener("pointermove", onMove);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-veld [perspective:1400px]">
      <div className="ts-gate absolute inset-0 [transform-style:preserve-3d]">
        <Image
          src="/images/portrait-hero.jpeg"
          alt="Tafi Michel mit Mikrofon auf der Bühne"
          fill
          sizes="100vw"
          quality={90}
          loading="eager"
          fetchPriority="high"
          className="ts-shot object-cover object-[64%_28%] md:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-veld via-veld/55 to-veld/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-veld via-transparent to-veld/70" />
      </div>

      {/* the gate's bars, pulled back on load */}
      <div className="ts-bar pointer-events-none absolute inset-x-0 top-0 z-30 h-[14vh] origin-top bg-veld" />
      <div className="ts-bar pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[14vh] origin-bottom bg-veld" />

      <div className="relative z-20 flex h-full flex-col justify-between pt-[calc(var(--nav-h)+2.5rem)] pb-10">
        <div className="frame flex items-start justify-between gap-6">
          <p className="hero-fade label flex items-center gap-2.5 text-ash/70">
            <span className="dx-blink size-2 rounded-full bg-ember" aria-hidden />
            Mitschnitt
          </p>
          <p
            className="ts-code hero-fade label tabular-nums text-ash/45"
            aria-hidden
            style={{ animationDelay: "200ms" }}
          >
            00:00:00:00
          </p>
        </div>

        <div className="ts-copy frame">
          <p className="hero-fade eyebrow text-ember" style={{ animationDelay: "500ms" }}>
            {home.hero.eyebrow}
          </p>
          <h1 className="display-name mt-5 text-[clamp(3.6rem,14vw,10rem)] text-ash">
            <span className="line-mask line-mask-display">
              <span style={{ animationDelay: "620ms" }}>
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
          </h1>

          <div
            className="hero-fade mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-line pt-7"
            style={{ animationDelay: "780ms" }}
          >
            <div className="max-w-lg">
              <p className="text-lg font-medium text-ash md:text-xl">{show.title}</p>
              <p className="mt-1 text-ash/60">
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
              <a href="#reel" className="link-line text-ash">
                Zum Reel
              </a>
            </div>
          </div>
        </div>

        <div className="frame flex items-end justify-between gap-6">
          <Bars />
          <p className="label text-ash/35">Zürich · 47.37° N</p>
        </div>
      </div>
    </section>
  );
}

const frames = [
  {
    index: "01",
    kind: "Programm",
    title: show.title,
    body: show.copy,
    href: show.path,
    cta: "Mehr zum Abend",
    image: "/images/portrait-hero.jpeg",
  },
  {
    index: "02",
    kind: "Bühne",
    title: home.stages.venues[0].name,
    body: home.stages.venues[0].detail,
    href: "/live",
    cta: "Alle Termine",
    image: "/images/alps-hq.png",
  },
  {
    index: "03",
    kind: "Porträt",
    title: "Zwei Länder, ein Mikrofon",
    body: home.hero.lede,
    href: "/ueber",
    cta: "Über Tafi",
    image: "/images/portrait.jpeg",
  },
  {
    index: "04",
    kind: "Buchung",
    title: home.close.title,
    body: home.close.copy,
    href: "/buchen",
    cta: home.close.cta.label,
    image: "/images/savanna-hq.png",
  },
] as const;

/**
 * The reel: four frames that run past sideways while the page is held. Below
 * the breakpoint the same strip is an ordinary swipeable rail — no pin, no
 * hijacked scrolling on a phone.
 */
export function TonspurReel() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        const track = el.querySelector<HTMLElement>(".ts-track");
        const rail = el.querySelector<HTMLElement>(".ts-rail");
        if (!track || !rail) return;
        const run = () => track.scrollWidth - window.innerWidth + 64;

        // The rail is a plain swipeable scroller by default — that is what a
        // phone, a reduced-motion visitor and a page without JS get. Only once
        // the pin exists does the script take the scrolling over.
        rail.style.overflowX = "hidden";
        const hint = el.querySelector<HTMLElement>(".ts-reel-hint");
        if (hint) hint.textContent = "Scrollen läuft seitwärts";

        const tween = gsap.to(track, {
          x: () => -run(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${run()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          rail.style.overflowX = "";
          if (hint) hint.textContent = "Wischen";
          tween.kill();
        };
      });

      return () => media.revert();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="reel" className="relative overflow-hidden bg-veld-soft py-20 md:h-[100svh] md:py-0">
      <div className="flex h-full flex-col justify-center">
        <div className="frame flex items-end justify-between gap-6 pb-10">
          <div>
            <p className="eyebrow text-ember">Reel</p>
            <p className="display mt-5 text-[clamp(1.8rem,4vw,3rem)]">Vier Einstellungen</p>
          </div>
          <p className="ts-reel-hint label hidden text-ash/35 md:block">Wischen</p>
          <p className="label text-ash/35 md:hidden">Wischen</p>
        </div>

        <div className="ts-rail snap-x snap-mandatory overflow-x-auto px-5 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="ts-track flex gap-5 md:gap-8 md:pl-8 md:will-change-transform">
            {frames.map((frame) => (
              <article
                key={frame.index}
                className="relative flex w-[82vw] shrink-0 snap-center flex-col justify-between border border-line bg-veld p-6 md:h-[58vh] md:w-[34rem] md:p-9"
              >
                <span
                  aria-hidden
                  className="dx-sprockets pointer-events-none absolute inset-y-4 left-0 w-[3px]"
                />

                <div className="relative">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="label text-ember">{frame.kind}</p>
                    <p className="label tabular-nums text-ash/30">{frame.index}</p>
                  </div>
                  <p className="display mt-7 text-[clamp(1.8rem,4.6vw,2.9rem)]">{frame.title}</p>
                  <p className="prose-lede mt-5 max-w-md text-ash/60">{frame.body}</p>
                </div>

                <div className="relative mt-8 flex items-end justify-between gap-6">
                  <Link href={frame.href} className="link-line text-ash">
                    {frame.cta}
                  </Link>
                  <div className="relative size-24 shrink-0 overflow-hidden bg-veld-lift md:size-28">
                    <Image
                      src={frame.image}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover opacity-80"
                    />
                  </div>
                </div>
              </article>
            ))}

            <article className="relative flex w-[82vw] shrink-0 snap-center flex-col justify-center border border-line bg-ember p-6 text-ash md:h-[58vh] md:w-[26rem] md:p-9">
              <p className="label text-ash/70">Ende der Rolle</p>
              <p className="display mt-6 text-[clamp(2rem,5vw,3.2rem)]">{show.title}</p>
              <p className="mt-5 text-ash/80">
                {show.weekday}, {show.day}. {show.month} {show.year}
                <br />
                {show.venue} {show.city}
              </p>
              <div className="mt-9">
                <a
                  href={show.tickets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  Tickets
                  <Arrow />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Portrait holds still on one side while the text runs past on the other. */
export function TonspurBio() {
  return (
    <section className="bg-veld py-24 md:py-36">
      <div className="frame grid gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--nav-h)+3rem)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-veld-soft">
              <Image
                src="/images/portrait.jpeg"
                alt="Tafi Michel im Freien, Blazer mit südafrikanischem Stoff"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={95}
                className="object-cover object-[center_12%]"
              />
              <span className="pointer-events-none absolute top-3 left-3 size-5 border-t border-l border-ash/40" />
              <span className="pointer-events-none absolute right-3 bottom-3 size-5 border-r border-b border-ash/40" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="label text-ash/35">Porträt</p>
              <Bars className="h-3" />
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-6">
          <Reveal as="p" className="eyebrow text-ember">
            {home.profile.eyebrow}
          </Reveal>
          <SplitHeading className="display mt-6 text-[clamp(2.4rem,6vw,4.4rem)]">
            Zwei Länder, ein Mikrofon
          </SplitHeading>

          <div className="mt-12 space-y-14 md:mt-16 md:space-y-20">
            <Reveal className="prose-lede max-w-xl text-lg text-ash/70 md:text-xl">
              {home.profile.copy[0]}
            </Reveal>
            <Reveal className="max-w-xl border-l border-ember pl-6">
              <p className="text-xl leading-snug text-ash md:text-2xl">{home.profile.copy[1]}</p>
            </Reveal>
            <Reveal className="prose-lede max-w-xl text-lg text-ash/70 md:text-xl">
              {home.hero.lede}
            </Reveal>
            <Reveal className="flex flex-wrap gap-x-8 gap-y-2">
              <TextLink href={home.profile.cta.href}>{home.profile.cta.label}</TextLink>
              <TextLink href={site.instagram} external>
                {site.instagramHandle}
              </TextLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The closing line opens up as it passes — the reel letting go. */
export function TonspurClose() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ts-close-type",
        { letterSpacing: "-0.03em" },
        {
          letterSpacing: "0.04em",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden border-t border-line bg-veld">
      <div className="frame py-28 md:py-44">
        <Reveal as="p" className="eyebrow text-ember">
          Buchung
        </Reveal>
        <SplitHeading className="ts-close-type display mt-6 text-[clamp(3rem,11vw,8rem)]">
          {home.close.title}
        </SplitHeading>
        <Reveal className="prose-lede mt-10 max-w-2xl text-lg text-ash/70 md:text-xl" delay={0.1}>
          {home.close.copy}
        </Reveal>
        <Reveal className="mt-12 flex flex-wrap items-center gap-4" delay={0.18}>
          <Link href={home.close.cta.href} className="btn btn-solid">
            {home.close.cta.label}
            <Arrow />
          </Link>
          <EmberA href={show.tickets} arrow>
            Tickets
          </EmberA>
        </Reveal>
      </div>
    </section>
  );
}
