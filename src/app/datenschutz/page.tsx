import { PageIntro } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { meta } from "@/lib/site";

export const metadata = pageMeta(
  "/datenschutz",
  meta.privacy.title,
  meta.privacy.description,
);

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
          Diese Website nutzt Plausible Analytics, um anonyme, statistische
          Angaben zur Nutzung der Seiten zu erhalten. Die Auswertung ist
          cookiefrei: Es werden keine Cookies gesetzt, keine personenbezogenen
          Daten verarbeitet und du bist über Websites hinweg nicht verfolgbar.
          Die Analyse wird auf einem eigenen Server (analytics.siebenberge.com)
          betrieben.
        </p>
        <p>
          Eingebettete Videos von SRF können eigene Cookies setzen. Details dazu
          findest du in den Datenschutzbestimmungen von SRF.
        </p>
      </section>
    </main>
  );
}
