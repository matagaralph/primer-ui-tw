import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname === '/login';

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (
      !isAuth &&
      !isAuthPage &&
      !['/register', '/forgot-password'].includes(req.nextUrl.pathname)
    ) {
      let from = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    return null;
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|logo).*)'],
};
