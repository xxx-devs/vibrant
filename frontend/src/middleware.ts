import { NextRequest, NextResponse } from 'next/server';
// эта либа необходима ??
// есть еще через другую либу
// https://dev.to/ajones_codes/the-ultimate-guide-to-internationalization-i18n-in-nextjs-13-ed
import acceptLanguage from 'accept-language';
import { fallbackLanguage, languages, cookieName } from './app/i18n/settings';

// let locales = ['en-US', 'nl-NL', 'nl'];

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next).*)',
  ],
};

// Get the preferred locale, similar to the above or using a library
// function getLocale(request) { ... }
//
// export function middleware(request) {
//   // Check if there is any supported locale in the pathname
//   const { pathname } = request.nextUrl
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   )
//
//   if (pathnameHasLocale) return
//
//   // Redirect if there is no locale
//   const locale = getLocale(request)
//   request.nextUrl.pathname = `/${locale}${pathname}`
//   // e.g. incoming request is /products
//   // The new URL is now /en-US/products
//   return Response.redirect(request.nextUrl)
// }

export function middleware(req: NextRequest) {
  let lang;
  const cookieValue = req.cookies.get(cookieName)?.value;

  if (cookieValue) lang = acceptLanguage.get(cookieValue);
  if (!lang) lang = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lang) lang = fallbackLanguage;

  const { pathname } = req.nextUrl;
  // languages или locales ??
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // чем Response отличается от NextResponse?
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
  }

  // разобраться с этим
  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'));
    // дублирование
    const langInReferer = languages.find((locale) => refererUrl.pathname.startsWith(`/${locale}`));
    const response = NextResponse.next();
    if (langInReferer) response.cookies.set(cookieName, langInReferer);
    return response;
  }

  return NextResponse.next();
}
