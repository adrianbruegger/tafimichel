import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/** The house easing. Everything on this site decelerates the same way. */
export const EASE = "expo.out";
export const EASE_SOFT = "power3.out";

let registered = false;

/** Registers the plugins once, on the client only. */
export function registerMotion() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

registerMotion();

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Start position shared by every scroll reveal, so the page has one rhythm. */
export const REVEAL_START = "top 88%";

export { gsap, ScrollTrigger, SplitText };
