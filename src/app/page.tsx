import { Bio } from "@/components/bio";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Marquee } from "@/components/marquee";
import { Reveal, SplitHeading } from "@/components/reveal";
import { Show } from "@/components/show";
import { Stage } from "@/components/stage";
import { GhostLink, SolidLink } from "@/components/ui";
import { eventGraph, pageMeta } from "@/lib/seo";
import { home, meta } from "@/lib/site";

export const metadata = pageMeta("/", meta.home.title, meta.home.description);

export default function Home() {
  const { stages, close } = home;

  return (
    <main>
      <JsonLd data={eventGraph()} />
      <Hero />
      <Show />
      <Bio />
      <Stage />

      <section className="relative overflow-hidden border-t border-line bg-veld pt-24 md:pt-36">
        <div className="frame">
          <Reveal as="p" className="eyebrow text-ember">
            Bühnen
          </Reveal>
          <SplitHeading className="display mt-6 text-[clamp(2.4rem,6vw,4.6rem)]">
            {stages.title}
          </SplitHeading>

          <ul className="mt-14 border-t border-line">
            {stages.venues.map((venue, index) => (
              <Reveal
                as="li"
                key={venue.name}
                delay={index * 0.06}
                className="group grid gap-2 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="label text-ash/30 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-2xl leading-tight md:col-span-5 md:text-3xl">
                  {venue.name}
                </p>
                <p className="text-ash/55 md:col-span-6">{venue.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Names he has shared a bill with, running as a band across the page. */}
        <div className="mt-20 md:mt-28">
          <div className="frame">
            <p className="eyebrow text-ash/40">{stages.sharedLead}</p>
          </div>
          <p className="sr-only">{stages.shared}</p>
          <Marquee
            items={stages.sharedNames}
            duration={44}
            className="display mt-7 border-y border-line py-8 text-[clamp(2.6rem,7vw,5.5rem)] text-ash/22"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-veld">
        <div className="frame py-28 md:py-44">
          <Reveal as="p" className="eyebrow text-ember">
            Buchung
          </Reveal>
          <SplitHeading className="display mt-6 text-[clamp(3rem,11vw,8rem)]">
            {close.title}
          </SplitHeading>
          <Reveal className="prose-lede mt-10 max-w-2xl text-lg text-ash/70 md:text-xl" delay={0.1}>
            {close.copy}
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap items-center gap-4" delay={0.18}>
            <SolidLink href={close.cta.href}>{close.cta.label}</SolidLink>
            <GhostLink href="/live">{home.dates.all.label}</GhostLink>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
