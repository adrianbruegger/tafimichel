import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/ui";
import { contact, meta, show, site } from "@/lib/site";

export const metadata: Metadata = {
  title: meta.contact.title,
  description: meta.contact.description,
};

export default function ContactPage() {
  return (
    <main>
      <PageIntro title={contact.title} eyebrow="Schreiben">
        <p>{contact.intro}</p>
      </PageIntro>

      <section className="frame grid gap-16 pb-24 md:grid-cols-12 md:pb-32">
        <Reveal className="space-y-10 md:col-span-4" stagger>
          <div>
            <p className="label text-ash/35">Instagram</p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-lg text-ash underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
            >
              {site.instagramHandle}
            </a>
          </div>
          <div>
            <p className="label text-ash/35">Nächster Auftritt</p>
            <p className="mt-3 text-lg">
              {show.day}. {show.month} {show.year}
            </p>
            <p className="text-ash/55">
              {show.venue}, {show.city}
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-8" delay={0.1}>
          <InquiryForm />
        </Reveal>
      </section>
    </main>
  );
}
