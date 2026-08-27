import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal, SplitHeading } from "@/components/reveal";
import { PageIntro } from "@/components/ui";
import { book, meta } from "@/lib/site";

export const metadata: Metadata = {
  title: meta.book.title,
  description: meta.book.description,
};

export default function BookPage() {
  return (
    <main>
      <PageIntro title={book.title} eyebrow="Buchung">
        <p>{book.intro}</p>
      </PageIntro>

      <section className="frame grid gap-10 pb-24 md:grid-cols-2 md:pb-32">
        {book.formats.map((format, index) => (
          <Reveal
            as="article"
            key={format.title}
            delay={index * 0.08}
            className="group relative border-t border-line pt-7 transition-colors hover:border-ember"
          >
            <p className="label text-ash/30">0{index + 1}</p>
            <h2 className="mt-5 text-2xl md:text-3xl">{format.title}</h2>
            <p className="prose-lede mt-4 text-ash/68">{format.copy}</p>
          </Reveal>
        ))}
      </section>

      <section className="frame frame-divide py-24 md:py-32">
        <SplitHeading className="display mt-6 text-[clamp(2.4rem,6vw,4.4rem)]">
          Ablauf
        </SplitHeading>

        <ol className="mt-14 grid gap-px bg-line md:grid-cols-4">
          {book.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 0.07}
              className="bg-veld p-7 md:p-8"
            >
              <span className="label text-ember">0{index + 1}</span>
              <p className="mt-6 text-xl">{step.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ash/60">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="frame frame-divide py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SplitHeading className="display mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">
              Technische Angaben
            </SplitHeading>
          </div>
          <Reveal
            className="prose-lede text-lg text-ash/72 md:col-span-7 md:pt-2"
            delay={0.1}
          >
            {book.tech}
          </Reveal>
        </div>
      </section>

      <section className="frame frame-divide py-24 md:py-32">
        <SplitHeading className="display mt-6 text-[clamp(2.6rem,7vw,5rem)]">
          Anfrage senden
        </SplitHeading>
        <Reveal className="mt-14" delay={0.1}>
          <InquiryForm />
        </Reveal>
      </section>
    </main>
  );
}
