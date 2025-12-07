// /middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("next-url", request.url);
  requestHeaders.set("next-path", new URL(request.url).pathname);
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
