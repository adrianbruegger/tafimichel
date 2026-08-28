"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { FlagI, SaDot, SwissDot } from "@/components/brand";
import { Arrow } from "@/components/ui";
import { home, show } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const alps = el.querySelector<HTMLElement>(".hero-alps");
    const blade = el.querySelector<HTMLElement>(".hero-blade");

    // Without motion the split is simply shown at its resting 50/50 state.
    if (prefersReducedMotion()) {
      if (alps) alps.style.clipPath = "inset(0 0 0 50%)";
      if (blade) {
        blade.style.left = "50%";
        blade.style.opacity = "1";
      }
      return;
    }

    const ctx = gsap.context(() => {
      const wipe = { edge: 100 };
      const apply = () => {
        if (alps) alps.style.clipPath = `inset(0 0 0 ${wipe.edge}%)`;
        if (blade) blade.style.left = `${wipe.edge}%`;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.6,
        },
      });

      // Switzerland wipes in over the first two thirds of the pin…
      tl.to(wipe, { edge: 50, duration: 0.64, ease: "none", onUpdate: apply }, 0)
        // …while both landscapes drift, so the split has depth, not just a mask.
        .fromTo(".hero-shot-sa", { scale: 1.04 }, { scale: 1.13, duration: 1, ease: "none" }, 0)
        .fromTo(".hero-shot-ch", { scale: 1.16 }, { scale: 1.03, duration: 1, ease: "none" }, 0)
        .fromTo(".hero-blade", { opacity: 0 }, { opacity: 1, duration: 0.09, ease: "none" }, 0)
        .to(".hero-cue", { opacity: 0, duration: 0.1, ease: "none" }, 0)
        // …then the type clears the frame and hands over to the next section.
        .to(".hero-copy", { yPercent: -14, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-veld">
      <div className="flex h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-[18vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/savanna-2x.png"
            alt=""
            fill
            sizes="100vw"
            quality={75}
            loading="eager"
            fetchPriority="high"
            className="hero-shot-sa object-cover object-bottom will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-veld via-veld/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-veld to-transparent" />
          <p className="label absolute bottom-8 left-5 text-ash [text-shadow:0_1px_0.6em_rgba(13,11,9,0.9)] md:left-8">Südafrika</p>
        </div>

        <div className="hero-alps absolute inset-0" style={{ clipPath: "inset(0 0 0 100%)" }}>
          <Image
            src="/images/alps-2x.png"
            alt=""
            fill
            sizes="100vw"
            quality={75}
            loading="eager"
            className="hero-shot-ch object-cover object-bottom will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-veld/80 via-veld/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-veld to-transparent" />
          <p className="label absolute right-5 bottom-8 text-ash [text-shadow:0_1px_0.6em_rgba(13,11,9,0.9)] md:right-8">Schweiz</p>
        </div>

        {/* The seam between the two countries. */}
        <div
          className="hero-blade pointer-events-none absolute top-0 z-10 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ash/70 to-transparent"
          style={{ left: "100%", opacity: 0 }}
        >
          <div className="absolute inset-y-0 left-1/2 w-12 -translate-x-1/2 bg-ash/[0.06] blur-md" />
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 bg-veld/80 px-2.5 py-2 backdrop-blur-sm">
            <SaDot className="size-6" />
            <SwissDot className="size-6" />
          </div>
        </div>

        <div className="hero-copy frame relative z-20">
          <p className="hero-fade eyebrow text-ash/85" style={{ animationDelay: "80ms" }}>
            {home.hero.eyebrow}
          </p>
          <h1 className="display-name mt-5 text-[clamp(4.4rem,16vw,11rem)] text-ash">
            <span className="line-mask line-mask-display">
              <span style={{ animationDelay: "140ms" }}>
                Taf
                <FlagI
                  Dot={SwissDot}
                  dotClassName="size-[0.18em]"
                  stemClassName="h-[0.7em] w-[0.15em]"
                />
              </span>
            </span>
            <span className="line-mask line-mask-display">
              <span style={{ animationDelay: "260ms" }}>
                M
                <FlagI
                  Dot={SaDot}
                  className="ml-[0.08em]"
                  dotClassName="size-[0.18em]"
                  stemClassName="h-[0.7em] w-[0.15em]"
                />
                chel
              </span>
            </span>
          </h1>

          <div
            className="hero-fade mt-7 flex max-w-xl flex-col gap-1 border-l border-ash/25 pl-5 text-lg text-ash md:text-xl"
            style={{ animationDelay: "420ms" }}
          >
            <p className="font-medium">{show.title}</p>
            <p className="text-ash/65">
              {show.weekday}, {show.day}. {show.month} {show.year} · {show.venue} {show.city}
            </p>
          </div>

          <div
            className="hero-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: "540ms" }}
          >
            <a
              href={home.hero.primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ember"
            >
              {home.hero.primary.label}
              <Arrow />
            </a>
            <a href={home.hero.secondary.href} className="link-line text-ash">
              {home.hero.secondary.label}
            </a>
          </div>
        </div>

        {/* The entrance animation and the scroll fade live on separate
            elements — a running CSS animation outranks GSAP's inline opacity. */}
        <div className="hero-cue absolute inset-x-0 bottom-7 z-20 flex justify-center">
          <span
            className="hero-fade label flex flex-col items-center gap-3 text-ash/45"
            style={{ animationDelay: "900ms" }}
          >
            Scrollen
            <span className="relative block h-10 w-px overflow-hidden bg-ash/20">
              <span className="cue-run absolute inset-x-0 top-0 block h-4 bg-ash/80" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
