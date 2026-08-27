"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { EASE, REVEAL_START, SplitText, gsap, prefersReducedMotion } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Stagger the direct children instead of moving the block as one. */
  stagger?: boolean;
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  id?: string;
};

/**
 * Fades and lifts an element (or its children) as it enters the viewport.
 * Every reveal on the site shares one start position and one easing so the
 * page reads as a single choreography rather than a pile of effects.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  stagger = false,
  delay = 0,
  y = 28,
  id,
}: RevealProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "all", opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : [el];
      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          delay,
          ease: EASE,
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y]);

  return (
    <Tag id={id} ref={root} className={className} data-reveal>
      {children}
    </Tag>
  );
}

type SplitHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  id?: string;
};

/**
 * Line-by-line reveal for display headings: each line rises out from behind a
 * mask. `autoSplit` re-splits after the webfont swaps and on resize, so lines
 * never break mid-animation.
 */
export function SplitHeading({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  id,
}: SplitHeadingProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1 });
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 108,
            duration: 1.15,
            delay,
            ease: EASE,
            stagger: 0.085,
            scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
          }),
      });
      return () => split.revert();
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag id={id} ref={root} className={className} data-reveal>
      {children}
    </Tag>
  );
}
