import { NextRequest, NextResponse } from 'next/server';
// эта либа необходима ??
// есть еще через другую либу
// https://dev.to/ajones_codes/the-ultimate-guide-to-internationalization-i18n-in-nextjs-13-ed
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { COOKIE_NAME, i18n } from '@/app/i18n/config';

// let locales = ['en-US', 'nl-NL', 'nl'];

// acceptLanguage.languages(languages);

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
        { type: 'header', key: 'rsc' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

// разобраться
function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};

  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // const cookieValue = request.cookies.get(COOKIE_NAME)?.value;

  // if (match(cookieValue, i18n.locales, i18n.defaultLocale) === cookieValue) return cookieValue;

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    i18n.locales as unknown as string[],
  );

  return match(languages, i18n.locales, i18n.defaultLocale);
}

// протестить что куки работают (сохраняется и устанавливается)
// протестить что при разных предпочитаемых локалях, разный результат
// протестить что переход корректный с / или /events

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // почему 2 раза грузятся?
  console.log('middleware');
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    // а если куки не будет совпадать с тем, что в i18n.locales сейчас. например был до этого какой-то язык, а потом отключили
    const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
    const locale = cookieValue ?? getLocale(request);
    let newPath = `${locale}${pathname}`;
    if (search) newPath += search;

    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // разобраться с этим
  // if (request.headers.has('referer')) {
  //   const refererUrl = new URL(request.headers.get('referer'));
  //   // дублирование
  //   const langInReferer = i18n.locales.find((locale) =>
  //     refererUrl.pathname.startsWith(`/${locale}`),
  //   );
  //   const response = NextResponse.next();
  //   if (langInReferer) response.cookies.set(COOKIE_NAME, langInReferer);
  //   return response;
  // }

  // нужно ли установить предпочитаемую локаль в куки после определения ?
  // if (nextLocale) response.cookies.set(COOKIE_NAME, nextLocale);

  return NextResponse.next();
}
