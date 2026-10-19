"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const directions = [
  {
    href: "/design/doppelpass",
    index: "01",
    name: "Doppelpass",
    claim: "Die Naht zwischen zwei Ländern wird bedienbar.",
  },
  {
    href: "/design/setlist",
    index: "02",
    name: "Setlist",
    claim: "Ein Clubplakat, das die Besucherin selbst ausleuchtet.",
  },
  {
    href: "/design/tonspur",
    index: "03",
    name: "Tonspur",
    claim: "Die Startseite als Mitschnitt, quer durch den Abend.",
  },
] as const;

/**
 * Jump bar for the three proposals. Lives above every variant so the three
 * can be compared without going back to the index.
 */
export function Switcher() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="dx-switch print:hidden">
      <div
        className={`flex items-center gap-1 border border-line bg-veld/90 p-1 backdrop-blur-lg transition-opacity duration-500 [transition-timing-function:var(--ease-out-expo)] ${
          lifted ? "opacity-100" : "opacity-70 hover:opacity-100"
        }`}
      >
        <Link
          href="/design"
          className="label px-3 py-2 text-ash/45 transition-colors hover:text-ash"
        >
          Entwürfe
        </Link>
        {directions.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`label px-3 py-2 transition-colors ${
                active ? "bg-ember text-ash" : "text-ash/60 hover:text-ash"
              }`}
            >
              <span className="tabular-nums opacity-55">{item.index}</span>
              <span className="ml-2 hidden sm:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
