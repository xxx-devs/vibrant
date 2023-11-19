import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n, PREFERRED_LOCALE_COOKIE } from '@/app/i18n/config';
import { Locale } from '@/app/i18n/types';
import { consoleLogDev } from '@/app/utils/common';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      // about missing - https://github.com/vercel/next.js/discussions/37736
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

function getLocale(request: NextRequest): Locale | undefined {
  const negotiatorHeaders: Record<string, string> = {};

  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const cookieValue = request.cookies.get(PREFERRED_LOCALE_COOKIE)?.value as Locale | undefined;

  if (cookieValue && i18n.locales.includes(cookieValue)) return cookieValue;

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    i18n.locales as unknown as string[],
  );

  return match(languages, i18n.locales, i18n.defaultLocale) as Locale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  consoleLogDev('middleware');
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    let newPath = `${locale}${pathname}`;
    if (search) newPath += search;

    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}
