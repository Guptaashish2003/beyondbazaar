
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const response = NextResponse.next();
  let cookies = request.cookies.get('next-auth.session-token')?.value || request.cookies.get('token')?.value;

  if(cookies === undefined ){
      if (request.nextUrl.pathname.startsWith('/user/') ) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (request.nextUrl.pathname.startsWith('/adminstrative/') ) {
      return NextResponse.redirect(new URL('/', request.url))
  }
}
if(cookies) {
  
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
    try {
      const userResponse = await fetch(new URL(`${process.env.baseURL}/api/user/me`).href, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${cookies}`
        },
      });

      const userData = await userResponse.json();
      if (userData?.data?.role !== 'admin') {
        
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/error', request.url)); 
    }
  }
  
}


  return response;


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login','/register','/user/:path*','/user/account-setting','/adminstrative/:path*'],
}