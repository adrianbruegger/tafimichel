import Link from "next/link";
import { Reveal } from "@/components/reveal";
import type { SiteEvent } from "@/lib/events";
import { formatEventDate } from "@/lib/site";

export function EventList({
  items,
  empty,
  past = false,
}: {
  items: SiteEvent[];
  empty?: string;
  past?: boolean;
}) {
  if (items.length === 0) {
    if (!empty) return null;
    return (
      <Reveal className="max-w-xl border-t border-line pt-8 text-lg text-ash/70">
        {empty}
      </Reveal>
    );
  }

  return (
    <ul className="border-t border-line">
      {items.map((event, index) => (
        <Reveal
          as="li"
          key={`${event.date}-${event.title}`}
          delay={index * 0.06}
          className={`group relative border-b border-line ${past ? "text-ash/55" : ""}`}
        >
          {past ? null : (
            <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-veld-soft transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-y-100" />
          )}
          <div className="relative grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:px-4">
            <p className={`label md:col-span-3 ${past ? "text-ash/40" : "text-ember"}`}>
              {formatEventDate(event.date)}
              <span className="ml-3 text-ash/40">{event.time}</span>
            </p>
            <h2 className="text-2xl leading-tight md:col-span-5 md:text-3xl">
              {event.path ? (
                <Link
                  href={event.path}
                  className="transition-colors hover:text-ember"
                >
                  {event.title}
                </Link>
              ) : (
                event.title
              )}
            </h2>
            <p className="text-ash/55 md:col-span-3">
              {event.venue}, {event.city}
            </p>
            {!past && event.tickets ? (
              <a
                href={event.tickets}
                target="_blank"
                rel="noopener noreferrer"
                className="label inline-flex items-center gap-2 text-ash md:col-span-1 md:justify-end"
              >
                Tickets
                <svg
                  className="inline-block transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  aria-hidden
                >
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </a>
            ) : (
              <span className="md:col-span-1" />
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
