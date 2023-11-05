
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  let cookies = request.cookies.get('token');
  console.log(cookies?.value)
if (request.nextUrl.pathname.startsWith('/login') ) {
  if (cookies?.value) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login'],
}