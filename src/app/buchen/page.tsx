import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageIntro } from "@/components/ui";
import { book, meta } from "@/lib/site";

export const metadata: Metadata = {
  title: meta.book.title,
  description: meta.book.description,
};

export default function BookPage() {
  return (
    <main>
      <PageIntro title={book.title}>
        <p>{book.intro}</p>
      </PageIntro>

      <section className="frame grid gap-12 pb-20 md:grid-cols-2 md:pb-28">
        {book.formats.map((format) => (
          <article key={format.title} className="border-t border-line pt-6">
            <h2 className="text-2xl">{format.title}</h2>
            <p className="mt-4 leading-relaxed text-ash/72">{format.copy}</p>
          </article>
        ))}
      </section>

      <section className="frame border-t border-line py-20 md:py-28">
        <h2 className="display text-[clamp(2.4rem,6vw,4.4rem)]">Ablauf</h2>
        <ol className="mt-10 max-w-2xl space-y-6">
          {book.steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="label text-mist">0{index + 1}</span>
              <div>
                <p className="text-xl">{step.title}</p>
                <p className="mt-2 text-ash/68">{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="frame border-t border-line py-20 md:py-28">
        <h2 className="display text-[clamp(2.4rem,6vw,4.4rem)]">Technische Angaben</h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ash/72">{book.tech}</p>
      </section>

      <section className="frame border-t border-line py-20 md:py-28">
        <h2 className="display text-[clamp(2.4rem,6vw,4.4rem)]">Anfrage senden</h2>
        <div className="mt-10">
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
