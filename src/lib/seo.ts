import type { Metadata } from "next";
import { events, meta, show, site } from "@/lib/site";

export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "de_CH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;
const eventId = `${site.url}${show.path}#event`;
const nextShow = events[0];

export function personNode() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    image: `${site.url}/images/portrait.jpeg`,
    jobTitle: "Stand-up Comedian",
    description: meta.home.description,
    knowsAbout: ["Stand-up Comedy", "Schweiz", "Südafrika"],
    sameAs: [site.instagram, site.youtube],
    homeLocation: {
      "@type": "Place",
      name: "Zürich",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Zürich",
        addressCountry: "CH",
      },
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    inLanguage: "de-CH",
    publisher: { "@id": personId },
  };
}

export function eventNode() {
  return {
    "@type": "Event",
    "@id": eventId,
    name: show.title,
    description: show.copy,
    url: `${site.url}${show.path}`,
    image: `${site.url}/images/portrait.jpeg`,
    inLanguage: "de-CH",
    startDate: `${nextShow.date}T${nextShow.time}:00+01:00`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "PerformingArtsTheater",
      name: show.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: show.address,
        addressLocality: show.city,
        addressCountry: "CH",
      },
    },
    performer: { "@id": personId },
    offers: {
      "@type": "Offer",
      url: show.tickets,
      availability: "https://schema.org/InStock",
    },
  };
}

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), websiteNode()],
  };
}

export function eventGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [eventNode()],
  };
}
