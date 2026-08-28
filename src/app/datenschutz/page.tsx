import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Datenschutz — Tafi Michel",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageIntro title="Datenschutz" />
      <section className="frame max-w-2xl space-y-5 pb-24 text-lg leading-relaxed text-ash/72 md:pb-32">
        <p>
          Wenn du das Anfrageformular nutzt, werden die Angaben ausschliesslich
          verwendet, um auf deine Anfrage zu antworten.
        </p>
        <p>Es findet keine Weitergabe an Dritte zu Werbezwecken statt.</p>
        <p>
          Zum Schutz vor Spam prüft Cloudflare Turnstile die Absendung. Dabei
          können technische Angaben wie IP-Adresse und Browsertyp an Cloudflare
          übermittelt werden.
        </p>
        <p>
          Eingebettete Videos von SRF können eigene Cookies setzen. Details dazu
          findest du in den Datenschutzbestimmungen von SRF.
        </p>
      </section>
    </main>
  );
}
