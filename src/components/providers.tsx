"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

function ScrollBridge() {
  const pathname = usePathname();
  const lenis = useLenis();

  useLenis(ScrollTrigger.update);

  useLayoutEffect(() => {
    document.body.style.removeProperty("overflow");
    lenis?.start();
    lenis?.resize();
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

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
        stopInertiaOnNavigate: true,
      }}
    >
      <ScrollBridge />
      {children}
    </ReactLenis>
  );
}
