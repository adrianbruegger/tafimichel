"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

function ScrollBridge() {
  useLenis(ScrollTrigger.update);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.078,
        smoothWheel: !reduceMotion,
        wheelMultiplier: 0.9,
        anchors: { offset: 72 },
      }}
    >
      <ScrollBridge />
      {children}
    </ReactLenis>
  );
}
