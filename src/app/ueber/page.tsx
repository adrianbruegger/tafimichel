import type { Metadata } from "next";
import Image from "next/image";
import { CopyBlock } from "@/components/copy-block";
import { Reveal, SplitHeading } from "@/components/reveal";
import { GhostLink, PageIntro, SolidLink } from "@/components/ui";
import { about, meta } from "@/lib/site";

export const metadata: Metadata = {
  title: meta.about.title,
  description: meta.about.description,
};

/** "Kurz — 25 Wörter" splits into a heading and a length note. */
function splitLabel(label: string) {
  const [name, length] = label.split("—").map((part) => part.trim());
  return { name, length: length ?? "" };
}

export default function AboutPage() {
  const { press } = about;

  return (
    <main>
      <PageIntro title={about.title} eyebrow="Porträt">
        <p>{about.copy[0]}</p>
      </PageIntro>

      <section className="frame grid gap-14 pb-24 md:grid-cols-12 md:gap-14 md:pb-32">
        <Reveal className="md:col-span-7 md:pt-2">
          <div className="prose-lede space-y-6 text-lg text-ash/72">
            {about.copy.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <SolidLink href="/live">Termine ansehen</SolidLink>
            <GhostLink href="/buchen">Anfragen</GhostLink>
          </div>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.1}>
          <div className="relative aspect-[3/4] overflow-hidden bg-veld-soft">
            <Image
              src="/images/portrait-hero.jpeg"
              alt="Tafi Michel"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-[center_28%]"
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-6">
            <p className="label text-ash/35">Tafi Michel</p>
            <p className="label text-ash/35">Zürich · CH / ZA</p>
          </div>
        </Reveal>
      </section>

      <section className="frame frame-divide py-24 md:py-32">
        <Reveal as="p" className="eyebrow text-ember">
          Presse
        </Reveal>
        <SplitHeading className="display mt-6 text-[clamp(2.4rem,6vw,4.6rem)]">
          {press.title}
        </SplitHeading>

        <div className="mt-14 space-y-12">
          {[press.short, press.mid, press.long].map((item, index) => {
            const { name, length } = splitLabel(item.label);
            return (
              <Reveal key={item.label} delay={index * 0.06}>
                <CopyBlock label={name} words={length} text={item.text} />
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
