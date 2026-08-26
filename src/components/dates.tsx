import { formatEventDate, upcomingEvents } from "@/lib/site";

export function EventList({
  limit,
  empty,
}: {
  limit?: number;
  empty: string;
}) {
  const items = upcomingEvents(limit);

  if (items.length === 0) {
    return <p className="max-w-xl text-lg text-ash/72">{empty}</p>;
  }

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((event) => (
        <li
          key={`${event.date}-${event.title}`}
          className="flex flex-col gap-3 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8"
        >
          <p className="text-ash/70">
            {formatEventDate(event.date)} · {event.time}
          </p>
          <p className="md:flex-1">
            {event.title}
            <span className="text-ash/60">
              {" "}
              · {event.venue}, {event.city}
            </span>
          </p>
          <a
            href={event.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-ash underline-offset-4 hover:underline"
          >
            Tickets
          </a>
        </li>
      ))}
    </ul>
  );
}
