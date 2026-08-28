import type { Metadata } from "next";
import { GhostLink, SolidLink } from "@/components/ui";
import { Reveal, SplitHeading } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Seite nicht gefunden — Tafi Michel",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="frame flex min-h-[70svh] flex-col justify-center py-32">
      <Reveal as="p" className="eyebrow text-ember">
        404
      </Reveal>
      <SplitHeading as="h1" className="display mt-6 text-[clamp(3rem,11vw,8rem)]">
        Seite nicht gefunden
      </SplitHeading>
      <Reveal className="mt-8 max-w-md text-lg text-ash/70" delay={0.1}>
        Diese Seite existiert nicht oder wurde verschoben.
      </Reveal>
      <Reveal className="mt-12 flex flex-wrap gap-4" delay={0.16}>
        <SolidLink href="/">Zur Startseite</SolidLink>
        <GhostLink href="/live">Termine</GhostLink>
      </Reveal>
    </main>
  );
}
