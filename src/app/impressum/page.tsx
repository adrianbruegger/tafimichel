import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum — Tafi Michel",
};

export default function ImpressumPage() {
  return (
    <main>
      <PageIntro title="Impressum">
        <p>Tafi Michel · Stand-up Comedy · Zürich</p>
      </PageIntro>
      <section className="frame max-w-xl space-y-4 pb-24 text-ash/72 md:pb-32">
        <p>Verantwortlich für den Inhalt dieser Website ist Tafi Michel.</p>
        <p>
          Kontakt über das{" "}
          <Link href="/kontakt" className="underline underline-offset-4">
            Formular
          </Link>{" "}
          oder über Instagram{" "}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {site.instagramHandle}
          </a>
          .
        </p>
      </section>
    </main>
  );
}
