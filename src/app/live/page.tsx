import type { Metadata } from "next";
import Link from "next/link";
import { EventList } from "@/components/dates";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/ui";
import { live, meta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: meta.live.title,
  description: meta.live.description,
};

export default function LivePage() {
  return (
    <main>
      <PageIntro title={live.title} eyebrow="Live">
        <p>{live.intro}</p>
      </PageIntro>

      <section className="frame pb-24 md:pb-32">
        <EventList empty={live.empty} />

        <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          <Reveal>
            <p className="label text-ash/35">Neue Termine</p>
            <p className="mt-4 max-w-sm text-ash/65">
              {live.instagram}{" "}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
              >
                {site.instagramHandle}
              </a>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="label text-ash/35">Buchung</p>
            <p className="mt-4 max-w-sm text-ash/65">
              Einen eigenen Anlass planen?{" "}
              <Link
                href="/buchen"
                className="text-ash underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
              >
                Anfrage senden
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
