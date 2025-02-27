
import { getToken, } from "next-auth/jwt";
import { NextResponse } from "next/server";
// import { useSession } from "next-auth/react";
const secret = process.env.NEXTAUTH_SECRET;
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const response = NextResponse.next();
  const token = await getToken({ req: request, secret });
  // const { data: session, status } = useSession();
  console.log(token,"middleware.....................................................................")

  // console.log(session,"middleware.....................................................................")  
  


  if(!token){
    if (request.nextUrl.pathname.startsWith('/user/') ) {
        console.log(request.nextUrl.pathname.startsWith('/user/verify-email/'),"itshmee")
        if(request.nextUrl.pathname.startsWith('/user/verify-email/') !== true){
          return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if (request.nextUrl.pathname.startsWith('/adminstrative/') ) {
      return NextResponse.redirect(new URL('/', request.url))
  }
    if (request.nextUrl.pathname.startsWith('/user/shopping-cart') ) {
      return NextResponse.redirect(new URL('/login', request.url))
  }
    if (request.nextUrl.pathname.startsWith('/user/account-setting') ) {
      return NextResponse.redirect(new URL('/login', request.url))
  }
}
if(token) {
  
  
  if (request.nextUrl.pathname.startsWith('/login') ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/register') ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/verify-email') ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/adminstrative/')) {

  }
  
}


  return response;


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}