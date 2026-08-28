"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Reveal, SplitHeading } from "@/components/reveal";
import { EmberA } from "@/components/ui";
import { home, show } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const detail = [
  { term: "Türöffnung", value: show.doors },
  { term: "Beginn", value: show.time },
];

export function Show() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // The ticket rides slightly against the scroll, so the two columns
      // separate as the section passes.
      gsap.fromTo(
        ".show-ticket",
        { y: 56 },
        {
          y: -56,
          ease: "none",
          scrollTrigger: {
            trigger: el,
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
    <section ref={root} id="programm" className="relative bg-ash text-veld">
      <div className="frame grid items-start gap-14 py-24 md:grid-cols-12 md:gap-10 md:py-36">
        <div className="md:col-span-7">
          <Reveal as="p" className="eyebrow text-ember">
            {show.eyebrow}
          </Reveal>
          <SplitHeading className="display mt-6 text-[clamp(3.2rem,8.5vw,7rem)] text-veld">
            {show.title}
          </SplitHeading>
          <Reveal
            className="prose-lede mt-10 max-w-md text-xl text-veld/70"
            delay={0.1}
          >
            {show.copy}
          </Reveal>
          <Reveal className="mt-8" delay={0.14}>
            <Link href={show.path} className="link-line text-veld">
              Mehr zum Abend
            </Link>
          </Reveal>
          <Reveal className="mt-12 max-w-md" delay={0.16}>
            <div className="rule rule-ink" />
            <p className="prose-lede mt-6 text-veld/55">{home.hero.lede}</p>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:pl-6">
          <article className="show-ticket group relative bg-veld text-ash shadow-[0_2rem_5rem_-2rem_rgba(13,11,9,0.55)]">
            <div className="h-1.5 w-full bg-ember" />

            <div className="p-7 md:p-9">
              <p className="label text-ember">Nächster Abend</p>

              <p className="display mt-6 flex items-end gap-3 text-[clamp(4.5rem,11vw,6.6rem)] leading-[0.8]">
                {show.day}
                <span className="pb-1 text-[0.26em] leading-tight tracking-[0.06em]">
                  {show.month}
                  <br />
                  {show.year}
                </span>
              </p>
              <p className="mt-3 text-ash/55">{show.weekday}</p>
            </div>

            {/* stub perforation */}
            <div className="relative">
              <div className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-ash" />
              <div className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-ash" />
              <div className="mx-7 border-t border-dashed border-ash/25 md:mx-9" />
            </div>

            <div className="p-7 md:p-9">
              <dl className="space-y-4 text-sm">
                {detail.map((row) => (
                  <div
                    key={row.term}
                    className="flex items-baseline justify-between gap-6"
                  >
                    <dt className="label text-ash/40">{row.term}</dt>
                    <dd className="tabular-nums">{row.value}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-6 border-t border-line-soft pt-4">
                  <dt className="label text-ash/40">Ort</dt>
                  <dd className="text-right leading-relaxed">
                    {show.venue}
                    <br />
                    <span className="text-ash/55">
                      {show.address}, {show.city}
                    </span>
                  </dd>
                </div>
              </dl>

              <EmberA href={show.tickets} className="mt-9 w-full" arrow>
                Tickets
              </EmberA>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
