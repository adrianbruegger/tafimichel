"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Reveal, SplitHeading } from "@/components/reveal";
import { TextLink } from "@/components/ui";
import { home, site } from "@/lib/site";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

export function Bio() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Curtain: the frame opens upward, the portrait inside settles down.
      gsap.fromTo(
        ".bio-frame",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: EASE,
          scrollTrigger: { trigger: ".bio-frame", start: "top 85%", once: true },
        },
      );

      gsap.fromTo(
        ".bio-shot",
        { scale: 1.16, yPercent: 6 },
        {
          scale: 1,
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: ".bio-frame",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-veld">
      <div className="frame grid items-start gap-14 py-24 md:grid-cols-12 md:gap-14 md:py-36">
        <div className="md:col-span-5">
          <div className="bio-frame relative aspect-[4/5] overflow-hidden bg-veld-soft">
            <Image
              src="/images/portrait.jpeg"
              alt="Tafi Michel im Freien, Blazer mit südafrikanischem Stoff"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="bio-shot object-cover object-[center_12%] will-change-transform"
            />
          </div>
          <Reveal className="mt-4 flex items-baseline justify-between gap-6" delay={0.2}>
            <p className="label text-ash/35">Zürich</p>
            <p className="label text-ash/35">Stand-up</p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pt-4 md:pl-4">
          <Reveal as="p" className="eyebrow text-ember">
            Porträt
          </Reveal>
          <SplitHeading className="display mt-6 text-[clamp(3.2rem,8vw,6.4rem)]">
            {home.profile.eyebrow}
          </SplitHeading>

          <Reveal className="prose-lede mt-10 max-w-xl text-lg text-ash/70 md:text-xl" delay={0.1}>
            {home.profile.copy[0]}
          </Reveal>

          <Reveal className="mt-10 max-w-xl border-l border-ember pl-6" delay={0.16}>
            <p className="text-xl leading-snug text-ash md:text-2xl">
              {home.profile.copy[1]}
            </p>
          </Reveal>

          <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2" delay={0.2}>
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
