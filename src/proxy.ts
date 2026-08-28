import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalOrigin = "https://www.tafimichel.ch";
const productionAlias = "tafimichel.vercel.app";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";

  if (host === productionAlias) {
    const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, canonicalOrigin);
    return NextResponse.redirect(destination, 301);
  }

  if (host.endsWith(".vercel.app")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
