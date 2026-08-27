import Link from "next/link";
import { Reveal, SplitHeading } from "@/components/reveal";

type LinkHref = Parameters<typeof Link>[0]["href"];

export function Arrow() {
  return (
    <svg
      className="btn-arrow"
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
  );
}

export function PageIntro({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="frame pt-32 pb-12 md:pt-44 md:pb-16">
      {eyebrow ? (
        <Reveal as="p" className="eyebrow mb-6 text-ember">
          {eyebrow}
        </Reveal>
      ) : null}
      <SplitHeading as="h1" className="display text-[clamp(3.2rem,10vw,7rem)]">
        {title}
      </SplitHeading>
      {children ? (
        <Reveal
          className="prose-lede mt-8 max-w-2xl text-lg text-ash/72 md:text-xl"
          delay={0.12}
        >
          {children}
        </Reveal>
      ) : null}
      <Reveal className="mt-12 md:mt-16" delay={0.2}>
        <div className="rule" />
      </Reveal>
    </header>
  );
}

export function TextLink({
  href,
  children,
  external = false,
}: {
  href: LinkHref;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className = "link-line text-ash";
  if (external && typeof href === "string") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SolidLink({
  href,
  children,
  className = "",
}: {
  href: LinkHref;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-solid ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export function SolidA({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-solid ${className}`}
    >
      {children}
      <Arrow />
    </a>
  );
}

export function EmberA({
  href,
  children,
  className = "",
  arrow = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-ember ${className}`}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: LinkHref;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-ghost ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}
