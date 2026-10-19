import Image from "next/image";
import Link from "next/link";
import {
  SetlistHero,
  SetlistMeter,
  SetlistPoster,
  SetlistRows,
} from "@/components/design/setlist";
import { Marquee } from "@/components/marquee";
import { Reveal, SplitHeading } from "@/components/reveal";
import { Arrow, TextLink } from "@/components/ui";
import { home, site } from "@/lib/site";

export const metadata = {
  title: "Entwurf 02 — Setlist",
  description: "Designvorschlag für die Startseite: ein Clubplakat, das die Besucherin selbst ausleuchtet.",
};

export default function Setlist() {
  const { stages, close, profile } = home;

  return (
    <main>
      <SetlistHero />
      <SetlistMeter />
      <SetlistPoster />

      <section className="bg-veld pb-24 md:pb-36">
        <div className="frame">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
            <div>
              <Reveal as="p" className="eyebrow text-ember">
                Setlist
              </Reveal>
              <SplitHeading className="display mt-6 text-[clamp(2.4rem,6vw,4.6rem)]">
                Der Abend in fünf Nummern
              </SplitHeading>
            </div>
            <Reveal as="p" className="label text-ash/35" delay={0.12}>
              01 — 05
            </Reveal>
          </div>
        </div>
        <SetlistRows />
      </section>

      <section className="border-t border-line bg-veld py-24 md:py-36">
        <div className="frame grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal as="p" className="eyebrow text-ember">
              Porträt
            </Reveal>
            <SplitHeading className="display mt-6 text-[clamp(2.2rem,5vw,3.8rem)]">
              {profile.eyebrow}
            </SplitHeading>
            <Reveal className="mt-10 border-l border-ember pl-6" delay={0.1}>
              <p className="text-xl leading-snug text-ash md:text-2xl">{home.hero.lede}</p>
            </Reveal>
            <Reveal className="prose-lede mt-9 max-w-xl text-ash/65" delay={0.14}>
              {profile.copy[1]}
            </Reveal>
            <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-2" delay={0.18}>
              <TextLink href={profile.cta.href}>{profile.cta.label}</TextLink>
              <TextLink href={site.instagram} external>
                {site.instagramHandle}
              </TextLink>
            </Reveal>
          </div>

          <Reveal className="md:col-span-5" delay={0.12}>
            <div className="relative aspect-[4/5] overflow-hidden bg-veld-soft">
              <Image
                src="/images/portrait.jpeg"
                alt="Tafi Michel im Freien, Blazer mit südafrikanischem Stoff"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={95}
                className="object-cover object-[center_12%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-veld/55 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-veld py-24 md:py-36">
        <div className="frame">
          <Reveal as="p" className="eyebrow text-ember">
            Bühnen
          </Reveal>
          <SplitHeading className="display mt-6 text-[clamp(2.4rem,6vw,4.6rem)]">
            {stages.title}
          </SplitHeading>
          <ul className="mt-12 border-t border-line">
            {stages.venues.map((venue, index) => (
              <Reveal
                as="li"
                key={venue.name}
                delay={index * 0.06}
                className="grid gap-2 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="label text-ash/30 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-2xl leading-tight md:col-span-5 md:text-3xl">{venue.name}</p>
                <p className="text-ash/55 md:col-span-6">{venue.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <div className="frame">
            <p className="eyebrow text-ash/40">{stages.sharedLead}</p>
          </div>
          <p className="sr-only">{stages.shared}</p>
          <Marquee
            items={stages.sharedNames}
            duration={40}
            className="display mt-7 border-y border-line py-7 text-[clamp(2.2rem,6vw,4.6rem)] text-ash/25"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ash text-veld">
        <div className="frame py-28 md:py-44">
          <Reveal as="p" className="eyebrow text-ember">
            Buchung
          </Reveal>
          <SplitHeading className="display mt-6 text-[clamp(3rem,11vw,8rem)] text-veld">
            {close.title}
          </SplitHeading>
          <Reveal className="prose-lede mt-10 max-w-2xl text-lg text-veld/70 md:text-xl" delay={0.1}>
            {close.copy}
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap items-center gap-4" delay={0.18}>
            <Link href={close.cta.href} className="btn btn-ember">
              {close.cta.label}
              <Arrow />
            </Link>
            {/* On paper the ghost button inverts: ink hairline, ink type. */}
            <Link
              href="/live"
              className="btn text-veld shadow-[inset_0_0_0_1px_var(--line-ink)] [&::before]:bg-veld hover:text-ash focus-visible:text-ash"
            >
              {home.dates.all.label}
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
