"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FlagI, SaDot, SwissDot } from "@/components/brand";
import { EmberA, TextLink } from "@/components/ui";
import { home, show } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const alps = root.current?.querySelector(".hero-alps");
    const blade = root.current?.querySelector(".hero-blade");

    if (prefersReducedMotion()) {
      if (alps instanceof HTMLElement) alps.style.clipPath = "inset(0 0 0 50%)";
      if (blade instanceof HTMLElement) blade.style.left = "50%";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=110%",
            pin: true,
            scrub: 0.55,
            onUpdate: (self) => {
              const edge = 100 - self.progress * 50;
              if (alps instanceof HTMLElement) {
                alps.style.clipPath = `inset(0 0 0 ${edge}%)`;
              }
              if (blade instanceof HTMLElement) {
                blade.style.left = `${edge}%`;
              }
            },
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] overflow-hidden bg-veld"
    >
      <div className="flex h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-[18vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/savanna-2x.png"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-veld via-veld/35 to-transparent" />
          <p className="label absolute bottom-8 left-5 text-ash md:left-8">Südafrika</p>
        </div>

        <div
          className="hero-alps absolute inset-0"
          style={{ clipPath: "inset(0 0 0 100%)" }}
        >
          <Image
            src="/images/alps-2x.png"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-veld/80 via-veld/20 to-transparent" />
          <p className="label absolute right-5 bottom-8 text-ash md:right-8">Schweiz</p>
        </div>

        <div
          className="hero-blade pointer-events-none absolute top-0 z-10 h-full w-px -translate-x-1/2 bg-ash/70"
          style={{ left: "100%" }}
        >
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 bg-veld/75 px-2 py-2">
            <SaDot className="size-6" />
            <SwissDot className="size-6" />
          </div>
        </div>

        <div className="frame relative z-20">
          <p className="hero-fade label text-ash" style={{ animationDelay: "60ms" }}>
            {home.hero.eyebrow}
          </p>
          <h1 className="hero-clip display-name mt-4 text-[clamp(4.4rem,16vw,11rem)] text-ash [text-shadow:0_0.06em_0.4em_rgba(16,13,10,0.45)]">
            <span className="block">
              Taf
              <FlagI
                Dot={SwissDot}
                dotClassName="size-[0.18em]"
                stemClassName="h-[0.7em] w-[0.15em]"
              />
            </span>
            <span className="block">
              M
              <FlagI
                Dot={SaDot}
                className="ml-[0.08em]"
                dotClassName="size-[0.18em]"
                stemClassName="h-[0.7em] w-[0.15em]"
              />
              chel
            </span>
          </h1>
          <p
            className="hero-fade mt-7 max-w-xl text-lg text-ash md:text-xl"
            style={{ animationDelay: "180ms" }}
          >
            {show.title}
            <span className="text-ash/70">
              {" "}
              · {show.day}. {show.month} · {show.venue} {show.city}
            </span>
          </p>
          <div
            className="hero-fade mt-10 flex flex-wrap items-center gap-8"
            style={{ animationDelay: "280ms" }}
          >
            <EmberA href={home.hero.primary.href}>{home.hero.primary.label}</EmberA>
            <TextLink href={home.hero.secondary.href}>{home.hero.secondary.label}</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
