import Link from "next/link";

type LinkHref = Parameters<typeof Link>[0]["href"];

export function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="frame pt-32 pb-10 md:pt-40 md:pb-14">
      <h1 className="display text-[clamp(3rem,8vw,6.4rem)]">{title}</h1>
      {children ? (
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ash/72">{children}</div>
      ) : null}
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
  const className =
    "inline-flex h-12 items-center border-b border-ash/25 text-sm font-medium uppercase tracking-[0.14em] transition-colors hover:border-ash";
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

const solidClass =
  "inline-flex h-12 items-center bg-ash px-6 text-sm font-medium uppercase tracking-[0.14em] text-veld transition-colors hover:bg-ember hover:text-ash";

const emberClass =
  "inline-flex h-12 items-center bg-ember px-6 text-sm font-medium uppercase tracking-[0.14em] text-ash transition-colors hover:bg-ash hover:text-veld";

export function SolidLink({
  href,
  children,
}: {
  href: LinkHref;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={solidClass}>
      {children}
    </Link>
  );
}

export function SolidA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={solidClass}>
      {children}
    </a>
  );
}

export function EmberA({
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
      className={`${emberClass} ${className}`}
    >
      {children}
    </a>
  );
}
