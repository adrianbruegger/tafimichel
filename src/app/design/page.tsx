import Image from "next/image";
import Link from "next/link";
import { SaDot, SwissDot, Wordmark } from "@/components/brand";
import { Reveal, SplitHeading } from "@/components/reveal";
import { Arrow } from "@/components/ui";

export const metadata = {
  title: "Startseite — drei Entwürfe",
  description: "Drei Designvorschläge für die Startseite von Tafi Michel, auf Basis der bestehenden CI.",
};

/* ── Thumbnails: each one runs the motion its direction is built on ── */

function SeamPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-veld">
      <Image src="/images/savanna-hq.png" alt="" fill sizes="33vw" className="object-cover" />
      <div className="dxp-seam absolute inset-0" style={{ clipPath: "inset(0 0 0 50%)" }}>
        <Image src="/images/alps-hq.png" alt="" fill sizes="33vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-veld/35" />
      <div className="dxp-seam-line absolute inset-y-0 w-px -translate-x-1/2 bg-ash/70" style={{ left: "50%" }}>
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1">
          <SaDot className="size-4" />
          <SwissDot className="size-4" />
        </div>
      </div>
    </div>
  );
}

function SpotPreview() {
  return (
    <div className="dx-spot dxp-spot relative size-full overflow-hidden bg-veld">
      <div className="absolute inset-0 flex items-center justify-center">
        <Wordmark className="display-name text-[2.6rem] text-ash/[0.08]" dotClassName="size-[0.2em]" />
      </div>
      <div className="dx-spot-glow absolute inset-0" style={{ opacity: 1 }} />
      <div className="dx-spot-lit absolute inset-0 flex items-center justify-center">
        <Wordmark className="display-name text-[2.6rem] text-ash" dotClassName="size-[0.2em]" />
      </div>
    </div>
  );
}

function ReelPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-veld">
      <div className="dxp-strip flex h-full w-max items-center gap-3 px-3">
        {[0, 1].map((pass) =>
          ["/images/portrait-hero.jpeg", "/images/portrait.jpeg", "/images/alps-hq.png", "/images/savanna-hq.png"].map(
            (src) => (
              <div
                key={`${pass}-${src}`}
                className="relative h-3/5 w-28 shrink-0 border border-line bg-veld-soft"
              >
                <Image src={src} alt="" fill sizes="112px" className="object-cover opacity-75" />
              </div>
            ),
          ),
        )}
      </div>
      <span className="dx-sprockets pointer-events-none absolute inset-x-0 top-2 h-[3px] [background-image:repeating-linear-gradient(to_right,rgba(232,226,215,0.22)_0_0.75rem,transparent_0.75rem_2rem)]" />
      <span className="dx-sprockets pointer-events-none absolute inset-x-0 bottom-2 h-[3px] [background-image:repeating-linear-gradient(to_right,rgba(232,226,215,0.22)_0_0.75rem,transparent_0.75rem_2rem)]" />
      <span className="label dx-blink absolute top-3 right-3 flex items-center gap-2 text-ash/60">
        <span className="size-1.5 rounded-full bg-ember" />
        Rec
      </span>
    </div>
  );
}

const entries = [
  {
    index: "01",
    name: "Doppelpass",
    href: "/design/doppelpass",
    claim: "Die Naht zwischen zwei Ländern wird bedienbar.",
    idea: "Die Biografie ist nicht Text, sondern Mechanik. Südafrika und die Schweiz treffen sich an einer Naht, die die Besucherin selbst verschiebt — mit der Maus, auf dem Handy mit dem Daumen. Der Name steht zweimal übereinander; wo die Naht durchgeht, wechselt er die Farbe.",
    motion: [
      "Naht folgt dem Zeiger, Münze mit beiden Flaggen dreht mit",
      "Live-Anzeige unten: 62 Südafrika / 38 Schweiz",
      "Ticket reisst entlang derselben Linie, Perforation in der Mitte",
      "Porträt wird vom Scroll halbiert: eine Hälfte warm, eine ausgekühlt",
      "Zwei Typo-Schienen laufen gegeneinander am Seitenrand",
    ],
    fit: "Die stärkste Markenaussage. Wer die Seite öffnet, hat die Idee hinter Tafi in drei Sekunden verstanden, ohne eine Zeile gelesen zu haben.",
    Preview: SeamPreview,
  },
  {
    index: "02",
    name: "Setlist",
    href: "/design/setlist",
    claim: "Ein Clubplakat, das die Besucherin selbst ausleuchtet.",
    idea: "Über der Falz kein Foto, nur Typografie im Dunkeln. Das Plakat ist gedruckt, aber unbeleuchtet — der Zeiger ist der Verfolger. Darunter läuft die Seite als Setlist: fünf Nummern statt Navigationspunkte.",
    motion: [
      "Verfolgerlicht am Zeiger, ohne Maus patrouilliert es selbst",
      "Staub, der nur im Lichtkegel existiert",
      "Setlist-Zeilen füllen sich von unten mit Ember, Bild fliegt mit",
      "Publikumspegel: 48 Balken, die auf das Scrolltempo reagieren",
      "Stempel fällt schief aufs Papierplakat",
    ],
    fit: "Am nächsten am Stand-up. Funktioniert als Webseite, als Aushang und als Instagram-Kachel — dasselbe Plakat in drei Formaten.",
    Preview: SpotPreview,
  },
  {
    index: "03",
    name: "Tonspur",
    href: "/design/tonspur",
    claim: "Die Startseite als Mitschnitt, quer durch den Abend.",
    idea: "Das Bühnenfoto gross, drumherum die Möblierung einer Regie: Timecode, Pegel, Aufnahmepunkt. Das Reel läuft quer, während die Seite steht — vier Einstellungen, dann das Ende der Rolle in Ember.",
    motion: [
      "Bildfenster öffnet sich wie eine Blende, das Bild driftet mit dem Zeiger",
      "Timecode läuft in 25 Bildern pro Sekunde mit",
      "Reel läuft seitwärts, auf dem Handy als Wischstrecke",
      "Porträt bleibt stehen, während der Text daran vorbeizieht",
      "Die Schlusszeile öffnet ihre Laufweite beim Durchscrollen",
    ],
    fit: "Die fotografischste Variante. Lebt vom Bildmaterial und zahlt direkt auf «echte Bühne, echtes Publikum» ein.",
    Preview: ReelPreview,
  },
] as const;

const constants = [
  ["Farben", "Veld, Ash, Ember, Mist — unverändert aus globals.css"],
  ["Schriften", "Big Shoulders für Display, Onest für Lauftext"],
  ["Flaggen-i", "Die beiden Punkte über Taf·i M·i·chel bleiben das Logo"],
  ["Hairlines", "Ein Raster, ein Ember-Blade am Zeilenanfang"],
  ["Film grain", "Dieselbe Körnung über allem"],
  ["Easing", "expo.out als Hausbewegung, überall gleich"],
  ["Reduced Motion", "Alle drei fallen auf eine ruhige, vollständige Seite zurück"],
  ["Inhalte & SEO", "Gleiche Texte, gleiche Daten, gleiche strukturierten Daten"],
];

export default function DesignIndex() {
  return (
    <main className="bg-veld pb-32">
      <header className="frame pt-32 pb-16 md:pt-44 md:pb-20">
        <Reveal as="p" className="eyebrow text-ember">
          Entwürfe Startseite
        </Reveal>
        <SplitHeading as="h1" className="display mt-7 text-[clamp(2.8rem,9vw,6.6rem)]">
          Drei Wege, dieselbe Handschrift
        </SplitHeading>
        <Reveal className="prose-lede mt-10 max-w-2xl text-lg text-ash/70 md:text-xl" delay={0.1}>
          Drei Vorschläge für die Startseite, alle auf der bestehenden CI gebaut: dieselbe
          Palette, dieselben Schriften, dasselbe Flaggen-i. Unterschiedlich ist, was die Seite
          als Erstes behauptet — und was sich dabei bewegt.
        </Reveal>
        <Reveal className="mt-10" delay={0.16}>
          <div className="rule" />
          <p className="mt-6 max-w-xl text-sm text-ash/45">
            Die Entwürfe liegen unter /design und sind auf noindex gesetzt. An der
            veröffentlichten Startseite ist nichts verändert.
          </p>
        </Reveal>
      </header>

      <div className="frame space-y-20 md:space-y-28">
        {entries.map(({ Preview, ...entry }) => (
          <Reveal key={entry.index}>
            <article className="dxp-card group grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-12 md:pt-12">
              <div className="md:col-span-5">
                <Link
                  href={entry.href}
                  className="block aspect-[4/3] overflow-hidden border border-line transition-colors duration-500 hover:border-ash/35"
                  tabIndex={-1}
                  aria-hidden
                >
                  <Preview />
                </Link>
                <p className="mt-5 text-ash/60">{entry.fit}</p>
              </div>

              <div className="md:col-span-7">
                <div className="flex items-baseline gap-5">
                  <span className="label tabular-nums text-ash/30">{entry.index}</span>
                  <h2 className="display text-[clamp(2.4rem,7vw,4.6rem)]">{entry.name}</h2>
                </div>
                <p className="mt-5 text-xl text-ember md:text-2xl">{entry.claim}</p>
                <p className="prose-lede mt-7 max-w-xl text-ash/70">{entry.idea}</p>

                <p className="label mt-10 text-ash/35">Was sich bewegt</p>
                <ul className="mt-5 space-y-2.5">
                  {entry.motion.map((item) => (
                    <li key={item} className="flex gap-4 text-ash/75">
                      <span className="mt-[0.7em] h-px w-5 shrink-0 bg-ember" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href={entry.href} className="btn btn-solid mt-10">
                  Entwurf {entry.index} ansehen
                  <Arrow />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <section className="frame mt-28 md:mt-40">
        <Reveal as="p" className="eyebrow text-ember">
          Konstanten
        </Reveal>
        <SplitHeading className="display mt-6 text-[clamp(2.2rem,6vw,4.2rem)]">
          Was in allen dreien gleich bleibt
        </SplitHeading>
        <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
          {constants.map(([term, value]) => (
            <div key={term} className="bg-veld p-6">
              <dt className="label text-ash/40">{term}</dt>
              <dd className="mt-3 text-ash/75">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
