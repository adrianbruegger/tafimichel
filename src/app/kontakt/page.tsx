import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageIntro } from "@/components/ui";
import { contact, meta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: meta.contact.title,
  description: meta.contact.description,
};

export default function ContactPage() {
  return (
    <main>
      <PageIntro title={contact.title}>
        <p>{contact.intro}</p>
      </PageIntro>
      <section className="frame grid gap-16 pb-24 md:grid-cols-12 md:pb-32">
        <div className="md:col-span-4">
          <p className="label text-mist">Instagram</p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-lg underline underline-offset-4"
          >
            {site.instagramHandle}
          </a>
        </div>
        <div className="md:col-span-8">
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
