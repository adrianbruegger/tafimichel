import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { legal, nav, show, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-veld">
      <div className="frame flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark className="text-3xl font-medium tracking-tight md:text-4xl" />
          <p className="mt-3 text-sm text-ash/50">Stand-up Comedy · Zürich</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label text-ash/50 transition-colors hover:text-ash"
            >
              {item.label}
            </Link>
          ))}
          {legal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label text-ash/50 transition-colors hover:text-ash"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={show.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-ash transition-colors hover:text-ember"
          >
            Tickets
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ash/50 hover:text-ash"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
