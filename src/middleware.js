
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {

  // console.log(request.user)
// if (request.nextUrl.pathname.startsWith('/login')) {
//   return NextResponse.rewrite(new URL('/', request.url))
//   // return NextResponse.redirect(new URL('/', request.url))
// }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login'],
}