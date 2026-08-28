import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { EmberA, GhostLink, PageIntro, SolidLink } from "@/components/ui";
import { eventGraph, pageMeta } from "@/lib/seo";
import { home, meta, show } from "@/lib/site";

export const metadata = pageMeta(show.path, meta.show.title, meta.show.description);

export default function ShowPage() {
  return (
    <main>
      <JsonLd data={eventGraph()} />
      <PageIntro title={show.title} eyebrow={show.eyebrow}>
        <p>{show.copy}</p>
      </PageIntro>

      <section className="frame grid items-start gap-14 pb-24 md:grid-cols-12 md:gap-10 md:pb-32">
        <Reveal className="prose-lede space-y-6 text-lg text-ash/72 md:col-span-7">
          <p>{home.hero.lede}</p>
          <p>{home.profile.copy[1]}</p>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.1}>
          <article className="border border-line bg-veld-soft">
            <div className="h-1.5 w-full bg-ember" />
            <div className="p-7 md:p-9">
              <p className="label text-ember">Nächster Abend</p>
              <p className="display mt-6 flex items-end gap-3 text-[clamp(4.5rem,11vw,6.6rem)] leading-[0.8]">
                {show.day}
                <span className="pb-1 text-[0.26em] leading-tight tracking-[0.06em]">
                  {show.month}
                  <br />
                  {show.year}
                </span>
              </p>
              <p className="mt-3 text-ash/55">{show.weekday}</p>
              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="label text-ash/40">Türöffnung</dt>
                  <dd className="tabular-nums">{show.doors}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="label text-ash/40">Beginn</dt>
                  <dd className="tabular-nums">{show.time}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 border-t border-line-soft pt-4">
                  <dt className="label text-ash/40">Ort</dt>
                  <dd className="text-right leading-relaxed">
                    {show.venue}
                    <br />
                    <span className="text-ash/55">
                      {show.address}, {show.city}
                    </span>
                  </dd>
                </div>
              </dl>
              <EmberA href={show.tickets} className="mt-9 w-full" arrow>
                Tickets
              </EmberA>
            </div>
          </article>
        </Reveal>
      </section>

      <section className="frame frame-divide py-24 md:py-32">
        <Reveal className="flex flex-wrap items-center gap-4">
          <SolidLink href="/buchen">Anfrage senden</SolidLink>
          <GhostLink href="/live">Alle Termine</GhostLink>
        </Reveal>
      </section>
    </main>
  );
}
