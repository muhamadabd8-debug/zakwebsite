import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { localeCookieName } from "@/i18n/config";

/**
 * English is served unprefixed at "/"; Arabic is served under "/ar". A
 * request without the "/ar" prefix is rewritten (URL unchanged) to "/en/..."
 * so it resolves under app/[lang]/... . If the visitor previously chose
 * Arabic (NEXT_LOCALE cookie), an unprefixed request redirects to "/ar/..."
 * so the preference persists across visits without breaking direct links to
 * the canonical English URL for a first-time or explicitly-English visitor.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  if (isArabic) {
    const response = NextResponse.next();
    response.cookies.set(localeCookieName, "ar", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale === "ar") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ar" : `/ar${pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  url.search = search;
  const response = NextResponse.rewrite(url);
  response.cookies.set(localeCookieName, "en", { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
