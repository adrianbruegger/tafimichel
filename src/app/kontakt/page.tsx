import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";
import { PageIntro } from "@/components/ui";
import { upcomingEvents } from "@/lib/events";
import { pageMeta } from "@/lib/seo";
import { contact, formatEventDate, meta, site } from "@/lib/site";

export const metadata = pageMeta(
  "/kontakt",
  meta.contact.title,
  meta.contact.description,
);

export const maxDuration = 30;
export const revalidate = 300;

export default async function ContactPage() {
  const [next] = await upcomingEvents(1);

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
          {next ? (
            <div>
              <p className="label text-ash/35">Nächster Auftritt</p>
              <Link
                href={next.path ?? "/live"}
                className="mt-3 block text-lg hover:text-ember"
              >
                {formatEventDate(next.date)}
              </Link>
              <p className="text-ash/55">
                {next.venue}, {next.city}
              </p>
            </div>
          ) : null}
        </Reveal>

        <Reveal className="md:col-span-8" delay={0.1}>
          <InquiryForm />
        </Reveal>
      </section>
    </main>
  );
}
