import { Bio } from "@/components/bio";
import { Hero } from "@/components/hero";
import { Show } from "@/components/show";
import { Stage } from "@/components/stage";
import { SolidLink, TextLink } from "@/components/ui";
import { home } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <Hero />
      <Show />
      <Bio />
      <Stage />

      <section className="frame py-24 md:py-32">
        <h2 className="display text-[clamp(2.4rem,6vw,4.6rem)]">{home.stages.title}</h2>
        <ul className="mt-10 max-w-2xl space-y-6 text-lg">
          {home.stages.venues.map((venue) => (
            <li key={venue.name}>
              <p>{venue.name}</p>
              <p className="mt-1 text-ash/60">{venue.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ash/72">
          {home.stages.shared}
        </p>
      </section>

      <section className="frame border-t border-line py-24 md:py-32">
        <h2 className="display text-[clamp(2.6rem,6vw,5rem)]">{home.close.title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash/72">{home.close.copy}</p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <SolidLink href={home.close.cta.href}>{home.close.cta.label}</SolidLink>
          <TextLink href="/live">{home.dates.all.label}</TextLink>
        </div>
      </section>
    </main>
  );
}
