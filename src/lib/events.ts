import { archiveEvents } from "@/lib/archive-events";

export type SiteEvent = {
  date: string;
  time: string;
  title: string;
  venue: string;
  city: string;
  tickets?: string;
  path?: string;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SWISS_DATE = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
const TIME = /^(\d{1,2}):(\d{2})$/;
const COLUMNS = ["date", "time", "title", "venue", "city", "tickets", "path"] as const;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const source = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
      continue;
    }
    if (char === ",") {
      row.push(cell);
      cell = "";
      continue;
    }
    if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    if (char !== "\r") cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((entry) => entry.some((value) => value.trim()));
}

function normalizeDate(value: string) {
  const raw = value.trim();
  if (ISO_DATE.test(raw)) {
    return Number.isNaN(new Date(`${raw}T12:00:00`).getTime()) ? null : raw;
  }
  const swiss = SWISS_DATE.exec(raw);
  if (!swiss) return null;
  const iso = `${swiss[3]}-${swiss[2].padStart(2, "0")}-${swiss[1].padStart(2, "0")}`;
  return Number.isNaN(new Date(`${iso}T12:00:00`).getTime()) ? null : iso;
}

function normalizeTime(value: string) {
  const match = TIME.exec(value.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function normalizePath(value: string) {
  const path = value.trim();
  if (!path) return undefined;
  return path.startsWith("/") ? path : undefined;
}

function normalizeUrl(value: string) {
  const url = value.trim();
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? parsed.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

function rowToEvent(header: string[], values: string[]): SiteEvent | null {
  const record: Record<string, string> = {};
  header.forEach((key, index) => {
    record[key] = (values[index] ?? "").trim();
  });

  const date = normalizeDate(record.date ?? "");
  const time = normalizeTime(record.time ?? "");
  const title = record.title ?? "";
  const venue = record.venue ?? "";
  const city = record.city ?? "";
  if (!date || !time || !title || !venue || !city) return null;

  return {
    date,
    time,
    title,
    venue,
    city,
    tickets: normalizeUrl(record.tickets ?? ""),
    path: normalizePath(record.path ?? ""),
  };
}

function splitTable(rows: string[][]) {
  const headerIndex = rows.findIndex((row) => {
    const cells = row.map((cell) => cell.trim().toLowerCase());
    return COLUMNS.slice(0, 5).every((column) => cells.includes(column));
  });
  if (headerIndex < 0) return null;
  return {
    header: rows[headerIndex].map((cell) => cell.trim().toLowerCase()),
    body: rows.slice(headerIndex + 1),
  };
}

function eventKey(event: SiteEvent) {
  return `${event.date}|${event.title.trim().toLowerCase()}`;
}

function mergeEvents(sheet: SiteEvent[], archive: SiteEvent[]) {
  const seen = new Set(sheet.map(eventKey));
  return [...sheet, ...archive.filter((event) => !seen.has(eventKey(event)))].sort(
    (a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`),
  );
}

async function loadSheetEvents(): Promise<SiteEvent[]> {
  const url = process.env.EVENTS_SHEET_CSV_URL?.trim();
  if (!url) {
    console.error("[events] EVENTS_SHEET_CSV_URL is not set");
    return [];
  }

  try {
    const response = await fetch(url, {
      headers: { Accept: "text/csv" },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 300, tags: ["events"] },
    });
    if (!response.ok) {
      console.error("[events] sheet fetch failed", { status: response.status });
      return [];
    }

    const text = await response.text();
    if (text.startsWith("<") || text.includes("<!DOCTYPE")) {
      console.error("[events] sheet is not public or returned HTML");
      return [];
    }

    const table = splitTable(parseCsv(text));
    if (!table) {
      console.error("[events] sheet is missing columns", {
        missing: COLUMNS.slice(0, 5),
      });
      return [];
    }

    return table.body
      .map((values) => rowToEvent(table.header, values))
      .filter((event): event is SiteEvent => event !== null);
  } catch (error) {
    console.error("[events] sheet fetch failed", error);
    return [];
  }
}

async function loadEvents(): Promise<SiteEvent[]> {
  return mergeEvents(await loadSheetEvents(), archiveEvents);
}

function isUpcoming(event: SiteEvent) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${event.date}T23:59:59`) >= today;
}

export async function listEvents() {
  const events = await loadEvents();
  return {
    upcoming: events.filter(isUpcoming),
    past: events.filter((event) => !isUpcoming(event)).reverse(),
  };
}

export async function upcomingEvents(limit?: number) {
  const { upcoming } = await listEvents();
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}
