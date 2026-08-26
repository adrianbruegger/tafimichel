import type { Metadata } from "next";
import { PageIntro, SolidLink, TextLink } from "@/components/ui";
import { about, meta } from "@/lib/site";

export const metadata: Metadata = {
  title: meta.about.title,
  description: meta.about.description,
};

export default function AboutPage() {
  const { press } = about;

  return (
    <main>
      <PageIntro title={about.title} />
      <section className="frame max-w-3xl space-y-5 pb-16 text-lg leading-relaxed text-ash/78">
        {about.copy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="flex flex-wrap items-center gap-8 pt-6">
          <SolidLink href="/live">Termine ansehen</SolidLink>
          <TextLink href="/buchen">Anfragen</TextLink>
        </div>
      </section>

      <section className="frame border-t border-line py-24 md:py-32">
        <h2 className="display text-[clamp(2.4rem,6vw,4.6rem)]">{press.title}</h2>
        <div className="mt-12 space-y-12 max-w-3xl">
          {[press.short, press.mid, press.long].map((item) => (
            <article key={item.label}>
              <p className="label text-ember">{item.label}</p>
              <p className="mt-4 text-lg leading-relaxed text-ash/78">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
