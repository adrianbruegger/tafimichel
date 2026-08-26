import { PageIntro, SolidLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main>
      <PageIntro title="Seite nicht gefunden">
        <p>Diese Seite existiert nicht oder wurde verschoben.</p>
      </PageIntro>
      <section className="frame pb-24 md:pb-32">
        <SolidLink href="/">Zur Startseite</SolidLink>
      </section>
    </main>
  );
}
