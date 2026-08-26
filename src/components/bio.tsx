"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { TextLink } from "@/components/ui";
import { home, site } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Bio() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bio-shot",
        { scale: 1.12, yPercent: 6 },
        {
          scale: 1,
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".bio-frame",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-veld">
      <div className="frame grid items-end gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
        <div className="bio-frame relative aspect-[4/5] overflow-hidden md:col-span-5">
          <Image
            src="/images/portrait.jpeg"
            alt="Tafi Michel im Freien, Blazer mit südafrikanischem Stoff"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="bio-shot object-cover object-[center_12%]"
          />
        </div>
        <div className="md:col-span-7 md:pb-6">
          <h2 className="display text-[clamp(3.2rem,8vw,6.4rem)]">
            {home.profile.eyebrow}
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-ash/78 md:text-xl">
            {home.profile.copy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <TextLink href={home.profile.cta.href}>{home.profile.cta.label}</TextLink>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center border-b border-ash/25 text-sm font-medium uppercase tracking-[0.14em] transition-colors hover:border-ash"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
