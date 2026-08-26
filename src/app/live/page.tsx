import type { Metadata } from "next";
import Link from "next/link";
import { EventList } from "@/components/dates";
import { PageIntro } from "@/components/ui";
import { live, meta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: meta.live.title,
  description: meta.live.description,
};

export default function LivePage() {
  return (
    <main>
      <PageIntro title={live.title}>
        <p>{live.intro}</p>
      </PageIntro>
      <section className="frame pb-24 md:pb-32">
        <EventList empty={live.empty} />
        <p className="mt-10 max-w-xl text-ash/65">
          {live.instagram}{" "}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {site.instagramHandle}
          </a>
        </p>
        <p className="mt-6 text-ash/65">
          Für Buchungsanfragen geht es{" "}
          <Link href="/buchen" className="underline underline-offset-4">
            hier
          </Link>{" "}
          weiter.
        </p>
      </section>
    </main>
  );
}
