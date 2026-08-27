"use client";

import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/motion";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Seconds for one full pass. Lower is faster. */
  duration?: number;
  reverse?: boolean;
};

/**
 * Seamless ticker. Drifts on its own and speeds up with scroll velocity, so
 * the band reacts to the reader instead of looping in a vacuum.
 */
export function Marquee({
  items,
  className = "",
  duration = 38,
  reverse = false,
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const track = el.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;

      const loop = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration,
          ease: "none",
          repeat: -1,
        },
      );

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 3.2);
          gsap.to(loop, { timeScale: boost, duration: 0.4, overwrite: true });
        },
      });

      return () => {
        trigger.kill();
        loop.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [duration, reverse]);

  const run = [...items, ...items];

  return (
    <div ref={root} className={`overflow-hidden ${className}`} aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {run.map((item, index) => (
              <span key={`${copy}-${index}`} className="flex shrink-0 items-center">
                {item}
                <span className="mx-[0.6em] inline-block size-[0.16em] shrink-0 translate-y-[-0.12em] rounded-full bg-current opacity-45" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
