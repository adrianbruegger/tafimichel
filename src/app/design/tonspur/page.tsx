import {
  TonspurBio,
  TonspurClose,
  TonspurHero,
  TonspurReel,
} from "@/components/design/tonspur";
import { Marquee } from "@/components/marquee";
import { Reveal, SplitHeading } from "@/components/reveal";
import { home, site } from "@/lib/site";

export const metadata = {
  title: "Entwurf 03 — Tonspur",
  description: "Designvorschlag für die Startseite: die Startseite als Mitschnitt, quer durch den Abend.",
};

export default function Tonspur() {
  const { stages } = home;

  return (
    <main>
      <TonspurHero />
      <TonspurReel />
      <TonspurBio />

      <section className="border-t border-line bg-veld py-24 md:py-36">
        <div className="frame">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal as="p" className="eyebrow text-ember">
                Auf der Bühne
              </Reveal>
              <SplitHeading className="display mt-6 max-w-3xl text-[clamp(2.2rem,5.5vw,4.2rem)]">
                {home.video.title}
              </SplitHeading>
            </div>
            <Reveal as="p" className="label text-ash/35" delay={0.12}>
              SRF
            </Reveal>
          </div>

          <Reveal className="relative mt-12" delay={0.1}>
            <span className="pointer-events-none absolute -top-3 -left-3 z-10 size-6 border-t border-l border-ash/30" />
            <span className="pointer-events-none absolute -top-3 -right-3 z-10 size-6 border-t border-r border-ash/30" />
            <span className="pointer-events-none absolute -bottom-3 -left-3 z-10 size-6 border-b border-l border-ash/30" />
            <span className="pointer-events-none absolute -right-3 -bottom-3 z-10 size-6 border-r border-b border-ash/30" />
            <div className="relative overflow-hidden bg-veld-soft">
              <div className="aspect-video">
                <iframe
                  title={home.video.title}
                  src={site.srfEmbed}
                  loading="lazy"
                  className="h-full w-full"
                  allow="geolocation *; autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-4" delay={0.14}>
            <p className="text-sm text-ash/45">{site.videoCaption}</p>
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-ash/45 transition-colors hover:text-ash"
            >
              Mehr auf YouTube
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-veld py-20 md:py-28">
        <div className="frame">
          <p className="eyebrow text-ash/40">{stages.sharedLead}</p>
        </div>
        <p className="sr-only">{stages.shared}</p>
        <Marquee
          items={stages.sharedNames}
          duration={46}
          className="display mt-7 border-y border-line py-7 text-[clamp(2.2rem,6vw,4.8rem)] text-ash/22"
        />
      </section>

      <TonspurClose />
    </main>
  );
}
