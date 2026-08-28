export const site = {
  name: "Tafi Michel",
  url: "https://www.tafimichel.ch",
  instagram: "https://www.instagram.com/blackshakesy",
  instagramHandle: "@blackshakesy",
  youtube: "https://www.youtube.com/channel/UCMDcGO1YAIjmEb4StSYRnwg",
  videoCaption: "Live aufgenommen, ungeschnitten.",
  srfEmbed:
    "https://www.srf.ch/play/embed?urn=urn:srf:video:2ee5efb9-d87f-4eda-b678-b4135df34132&subdivisions=false",
} as const;

export const meta = {
  home: {
    title: "Tafi Michel — Stand-up Comedian aus Zürich",
    description:
      "Stand-up Comedy über Herkunft und Zugehörigkeit, von einem Comedian, der in Südafrika und der Schweiz aufgewachsen ist. Termine und Buchungsanfragen.",
  },
  live: {
    title: "Termine — Tafi Michel",
    description:
      "Nächster Auftritt: Der Südschweizer und sein Barde, ComedyHaus Zürich, 21. November 2026. Daten, Orte und Tickets.",
  },
  about: {
    title: "Über Tafi Michel — Comedian aus Zürich",
    description:
      "Werdegang, Bühnenprofil und Pressetexte zum Kopieren. Stand-up-Comedian mit südafrikanischen und schweizerischen Wurzeln.",
  },
  book: {
    title: "Comedian buchen — Tafi Michel",
    description:
      "Stand-up für Comedy-Shows, Festivals, Firmenanlässe und private Veranstaltungen in der Deutschschweiz. Formate, Ablauf und Anfrageformular.",
  },
  contact: {
    title: "Kontakt — Tafi Michel",
    description:
      "Buchungs- und Presseanfragen an Tafi Michel. Formular oder Instagram — die Antwort kommt direkt vom Comedian.",
  },
  show: {
    title: "Der Südschweizer und sein Barde — Tafi Michel",
    description:
      "Soloprogramm von Tafi Michel am 21. November 2026 im ComedyHaus Zürich. Tickets, Ort, Türöffnung und Infos zum Abend.",
  },
  imprint: {
    title: "Impressum — Tafi Michel",
    description:
      "Impressum der Website von Tafi Michel, Stand-up-Comedian aus Zürich. Kontakt über Formular oder Instagram.",
  },
  privacy: {
    title: "Datenschutz — Tafi Michel",
    description:
      "Datenschutzhinweise zur Website von Tafi Michel: Anfrageformular, Cloudflare Turnstile und eingebettete SRF-Videos.",
  },
} as const;

export const nav = [
  { href: "/live", label: "Termine" },
  { href: "/ueber", label: "Über Tafi" },
  { href: "/buchen", label: "Buchen" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;

export const show = {
  eyebrow: "Soloprogramm",
  title: "Der Südschweizer und sein Barde",
  path: "/der-suedschweizer-und-sein-barde",
  copy: "Das Soloprogramm von Tafi Michel. ComedyHaus Zürich, 21. November 2026.",
  date: "2026-11-21",
  weekday: "Samstag",
  day: "21",
  month: "November",
  year: "2026",
  time: "20:15",
  doors: "19:00",
  venue: "ComedyHaus",
  city: "Zürich",
  address: "Albisriederstrasse 16",
  tickets:
    "https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/tafi-michel-der-suedschweizer-und-sein-barde-7486389198548686477.html",
} as const;

export const home = {
  hero: {
    eyebrow: "Stand-up Comedian",
    lede: "Tafi Michel ist in Südafrika und in der Schweiz aufgewachsen. Auf der Bühne erzählt er, wie es ist, in zwei Ländern zu Hause zu sein und in keinem ganz.",
    primary: { href: show.tickets, label: "Tickets" },
    secondary: { href: "#programm", label: "Zum Programm" },
  },
  profile: {
    eyebrow: "Über Tafi Michel",
    copy: [
      "Tafi Michel ist Stand-up-Comedian und lebt in Zürich. Seine Themen kommen aus seiner eigenen Biografie: Herkunft, Zugehörigkeit und der Alltag in einem Land, dessen ungeschriebene Regeln alle kennen und niemand erklären kann.",
      "Sein Stil ist beobachtend statt provozierend. Er erzählt aus der Ich-Perspektive und lacht mit dem Publikum, nicht über es.",
    ],
    cta: { href: "/ueber", label: "Mehr über Tafi" },
  },
  video: {
    title: "Ein Ausschnitt aus einem Auftritt",
  },
  stages: {
    title: "Aufgetreten unter anderem in:",
    venues: [
      {
        name: "Grabenhalle St. Gallen",
        detail: "«Comedy usem Grabä», Mixed Show von BRUCHTEIL und Comedy16",
      },
    ],
    shared:
      "Die Bühne geteilt hat er dabei unter anderem mit Stefan Büsser, Cenk, Reena Krishnaraja, Mateo Gudenrath, Johnny Wegenast und Hosh.",
    sharedLead: "Die Bühne geteilt mit",
    sharedNames: [
      "Stefan Büsser",
      "Cenk",
      "Reena Krishnaraja",
      "Mateo Gudenrath",
      "Johnny Wegenast",
      "Hosh",
    ],
  },
  dates: {
    title: "Nächste Auftritte",
    all: { href: "/live", label: "Alle Termine" },
    empty:
      "Aktuell sind keine öffentlichen Termine angesetzt. Neue Daten erscheinen zuerst hier und auf Instagram.",
  },
  close: {
    title: "Auftritt anfragen",
    copy: "Tafi Michel tritt bei Comedy-Shows, Festivals, Firmenanlässen und privaten Veranstaltungen auf. Schreib, wann und wo der Anlass stattfindet und wer im Publikum sitzt — du bekommst eine Rückmeldung mit Verfügbarkeit und Honorar.",
    cta: { href: "/buchen", label: "Anfrage senden" },
  },
} as const;

export const live = {
  title: "Termine",
  intro: "Alle öffentlichen Auftritte auf einen Blick. Tickets laufen über die jeweiligen Veranstalter.",
  empty: "Momentan sind keine Termine angesetzt. Für Buchungsanfragen geht es auf der Seite Buchen weiter.",
  past: "Vergangene Auftritte",
  instagram:
    "Neue Termine werden zuerst auf Instagram angekündigt.",
} as const;

export const about = {
  title: "Über Tafi Michel",
  copy: [
    "Tafi Michel ist Stand-up-Comedian und lebt in Zürich. Aufgewachsen ist er in Südafrika und in der Schweiz.",
    "Dieser doppelte Hintergrund prägt sein Material. Er erzählt von Herkunft und Zugehörigkeit, von kulturellen Unterschieden, die ihm im Alltag begegnen, und von den Erwartungen, die beide Länder an ihn stellen.",
    "Er ist bei Mixed Shows, Comedy-Abenden und Open-Mic-Formaten in der ganzen Deutschschweiz aufgetreten, unter anderem in der Grabenhalle St. Gallen. Er arbeitet auf Hochdeutsch und auf Mundart.",
    "Neben der Bühne ist er Musiker.",
  ],
  press: {
    title: "Pressetexte zum Kopieren",
    short: {
      label: "Kurz — 25 Wörter",
      text: "Tafi Michel ist Stand-up-Comedian aus Zürich. Aufgewachsen in Südafrika und der Schweiz, erzählt er auf der Bühne von Herkunft, Zugehörigkeit und kulturellen Unterschieden.",
    },
    mid: {
      label: "Mittel — 55 Wörter",
      text: "Tafi Michel ist Stand-up-Comedian und lebt in Zürich. Aufgewachsen ist er in Südafrika und in der Schweiz — ein doppelter Hintergrund, aus dem er den grössten Teil seines Materials bezieht. Er erzählt von Herkunft, Zugehörigkeit und dem Alltag zwischen zwei Kulturen. Beobachtend, aus der Ich-Perspektive und immer mit dem Publikum.",
    },
    long: {
      label: "Lang — 100 Wörter",
      text: "Tafi Michel ist Stand-up-Comedian und lebt in Zürich. Aufgewachsen ist er in Südafrika und in der Schweiz. Aus diesem doppelten Hintergrund entsteht sein Material: Er erzählt von Herkunft, Zugehörigkeit und den ungeschriebenen Regeln, die den Schweizer Alltag prägen. Sein Stil ist beobachtend statt provozierend, die Perspektive konsequent die eigene. Aufgetreten ist er bei Mixed Shows und Comedy-Abenden in der ganzen Deutschschweiz, unter anderem in der Grabenhalle St. Gallen an der Reihe «Comedy usem Grabä». Die Bühne teilte er dabei mit Stefan Büsser, Cenk und Reena Krishnaraja. Neben der Comedy ist er als Musiker tätig.",
    },
  },
} as const;

export const book = {
  title: "Tafi buchen",
  intro:
    "Tafi Michel tritt bei Comedy-Shows, Festivals, Firmenanlässen, Vereinsfesten und privaten Veranstaltungen auf. Länge und Inhalt werden auf den Anlass abgestimmt.",
  formats: [
    {
      title: "Comedy-Set",
      copy: "10 bis 30 Minuten Stand-up für Mixed Shows, Comedy-Clubs und Festivals. Bestehendes Material, auf die Länge des Slots abgestimmt.",
    },
    {
      title: "Firmen- und Vereinsanlässe",
      copy: "Comedy für Publikum, das nicht in erster Linie wegen Comedy anwesend ist. Inhalt und Länge werden im Vorfeld auf Anlass, Branche und Rahmen abgestimmt.",
    },
  ],
  steps: [
    {
      title: "Anfrage",
      copy: "Datum, Ort, Art des Anlasses, Publikum und gewünschte Länge über das Formular senden.",
    },
    {
      title: "Rückmeldung",
      copy: "Antwort mit Verfügbarkeit und Honorar.",
    },
    {
      title: "Bestätigung",
      copy: "Schriftliche Zusage mit allen Eckdaten.",
    },
    {
      title: "Auftritt",
      copy: "Anreise und Soundcheck nach Absprache mit dem Veranstalter.",
    },
  ],
  tech: "Benötigt werden ein Handmikrofon mit Ständer, eine beleuchtete Bühnenfläche und eine Tonanlage, die im ganzen Raum verständlich ist. Alles Weitere wird im Vorfeld geklärt.",
} as const;

export const contact = {
  title: "Kontakt",
  intro:
    "Anfragen für Auftritte, Presseanfragen und alles Übrige. Die Antwort kommt direkt von Tafi.",
} as const;

export function formatEventDate(iso: string) {
  return new Intl.DateTimeFormat("de-CH", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}
