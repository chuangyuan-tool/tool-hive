import { NextRequest, NextResponse } from 'next/server';

const SUBDOMAIN = 'splendorous-llama-d742c2.netlify.app';
const TARGET_HOST = 'toolhive.com.cn';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  if (host === SUBDOMAIN || host.startsWith(SUBDOMAIN)) {
    const url = new URL(request.url);
    url.hostname = TARGET_HOST;
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/|_next/static/|_next/image/|favicon.ico).*)'],
};
