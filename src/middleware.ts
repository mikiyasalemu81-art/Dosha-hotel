import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames, ignore api, static files, images, etc.
  matcher: ['/', '/(en|am|om)/:path*', '/((?!api|_next|_vercel|images|favicon.ico|.*\\..*).*)'],
};
