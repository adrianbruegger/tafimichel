"use client";

import { useLayoutEffect, useRef } from "react";
import { Reveal, SplitHeading } from "@/components/reveal";
import { home, site } from "@/lib/site";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

export function Stage() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stage-screen",
        { clipPath: "inset(0% 50% 0% 50%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: EASE,
          scrollTrigger: { trigger: ".stage-screen", start: "top 82%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-veld">
      <div className="frame frame-divide py-24 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal as="p" className="eyebrow text-ember">
              Auf der Bühne
            </Reveal>
            <SplitHeading className="display mt-6 max-w-3xl text-[clamp(2.8rem,7vw,5.6rem)]">
              {home.video.title}
            </SplitHeading>
          </div>
          <Reveal as="p" className="label text-ash/35" delay={0.15}>
            SRF
          </Reveal>
        </div>

        <Reveal className="relative mt-14" delay={0.1}>
          {/* corner marks — a viewfinder around the clip */}
          <span className="pointer-events-none absolute -top-3 -left-3 z-10 size-6 border-t border-l border-ash/30" />
          <span className="pointer-events-none absolute -top-3 -right-3 z-10 size-6 border-t border-r border-ash/30" />
          <span className="pointer-events-none absolute -bottom-3 -left-3 z-10 size-6 border-b border-l border-ash/30" />
          <span className="pointer-events-none absolute -right-3 -bottom-3 z-10 size-6 border-r border-b border-ash/30" />

          <div className="stage-screen relative overflow-hidden bg-veld-soft">
            <div className="aspect-video">
              <iframe
                title={home.video.title}
                src={site.srfEmbed}
                loading="lazy"
                className="h-full w-full"
                allow="geolocation *; autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-4" delay={0.15}>
          <p className="text-sm text-ash/45">{site.videoCaption}</p>
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-ash/45 transition-colors hover:text-ash"
          >
            Mehr auf YouTube
          </a>
        </Reveal>
      </div>
    </section>
  );
}
