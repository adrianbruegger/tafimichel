import { useId } from "react";
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
  const id = useId().replace(/:/g, "");
  const flagClip = `${id}-flag`;
  const triClip = `${id}-tri`;

  return (
    <svg
      viewBox="0 0 90 60"
      preserveAspectRatio="xMidYMid slice"
      className={`overflow-hidden rounded-full ${className ?? ""}`}
      aria-hidden
    >
      <defs>
        <clipPath id={flagClip}>
          <path d="M0 0h90v60H0z" />
        </clipPath>
        <clipPath id={triClip}>
          <path d="m0 0 45 30L0 60z" />
        </clipPath>
      </defs>
      <path fill="#E03C31" d="M0 0h90v30H45z" />
      <path fill="#001489" d="M0 60h90V30H45z" />
      <g clipPath={`url(#${flagClip})`} fill="none">
        <path stroke="#fff" strokeWidth="20" d="M90 30H45L0 0v60l45-30" />
        <path
          fill="#000"
          stroke="#FFB81C"
          strokeWidth="20"
          clipPath={`url(#${triClip})`}
          d="m0 0 45 30L0 60"
        />
        <path stroke="#007749" strokeWidth="12" d="m0 0 45 30h45M0 60l45-30" />
      </g>
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
