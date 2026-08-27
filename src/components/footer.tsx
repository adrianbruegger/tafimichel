import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { legal, nav, show, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-veld">
      <div className="frame pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="label text-ash/35">Stand-up Comedy · Zürich</p>
            <Link href="/kontakt" className="link-line mt-3 inline-flex text-ash">
              Kontakt
            </Link>
          </div>

          <nav className="md:col-span-3" aria-label="Seiten">
            <p className="label text-ash/35">Seiten</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ash/70 transition-colors hover:text-ash"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="label text-ash/35">Folgen</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ash/70 transition-colors hover:text-ash"
                >
                  Instagram {site.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ash/70 transition-colors hover:text-ash"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={show.tickets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ember transition-colors hover:text-ash"
                >
                  Tickets · {show.day}. {show.month}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark — decoration, so it stays out of the a11y tree. */}
        <div aria-hidden className="mt-16 md:mt-20">
          <Wordmark
            className="display-name w-full text-[clamp(3.5rem,15vw,13rem)] text-ash/12 select-none"
            dotClassName="size-[0.2em]"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="label text-ash/30">
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label text-ash/40 transition-colors hover:text-ash"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
