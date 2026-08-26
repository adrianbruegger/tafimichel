import { site } from "@/lib/site";

type MarkProps = {
  className?: string;
};

export function SwissDot({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="16" fill="#DA291C" />
      <rect x="13.1" y="6.4" width="5.8" height="19.2" fill="#fff" />
      <rect x="6.4" y="13.1" width="19.2" height="5.8" fill="#fff" />
    </svg>
  );
}

export function SaDot({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`overflow-hidden rounded-full ${className ?? ""}`}
      aria-hidden
    >
      <rect width="32" height="16" fill="#DE3831" />
      <rect y="16" width="32" height="16" fill="#002395" />
      <polygon points="0,0 16,16 0,32" fill="#007A4D" />
      <polygon points="0,4.2 12.6,16 0,27.8" fill="#FFB81C" />
      <polygon points="0,7.4 9.4,16 0,24.6" fill="#000" />
      <polygon points="9.8,16 32,16 32,13.15 14.2,13.15" fill="#fff" />
      <polygon points="9.8,16 32,16 32,18.85 14.2,18.85" fill="#fff" />
      <polygon points="14.2,13.15 32,13.15 32,18.85 14.2,18.85" fill="#007A4D" />
    </svg>
  );
}

type FlagIProps = {
  Dot: typeof SwissDot;
  className?: string;
  dotClassName?: string;
  stemClassName?: string;
};

export function FlagI({
  Dot,
  className = "",
  dotClassName = "size-[0.2em]",
  stemClassName = "h-[0.68em] w-[0.08em]",
}: FlagIProps) {
  return (
    <span className={`relative inline-block h-[1em] w-[0.28em] align-[-0.05em] ${className}`}>
      <span className="sr-only">i</span>
      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-current ${stemClassName}`} />
      <span className="pointer-events-none absolute bottom-[0.76em] left-1/2 -translate-x-1/2">
        <Dot className={`block ${dotClassName}`} />
      </span>
    </span>
  );
}

type WordmarkProps = {
  className?: string;
  letterClassName?: string;
  dotClassName?: string;
  as?: "p" | "span" | "div";
};

export function Wordmark({
  className,
  letterClassName = "",
  dotClassName = "size-[0.22em]",
  as: Tag = "div",
}: WordmarkProps) {
  return (
    <Tag className={`pt-[0.12em] ${className ?? ""}`} aria-label={site.name}>
      <span className={letterClassName}>Taf</span>
      <FlagI Dot={SwissDot} className={letterClassName} dotClassName={dotClassName} />
      <span className={letterClassName}>{" M"}</span>
      <FlagI Dot={SaDot} className={letterClassName} dotClassName={dotClassName} />
      <span className={letterClassName}>chel</span>
    </Tag>
  );
}
