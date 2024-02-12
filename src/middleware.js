
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const response = NextResponse.next();
  let cookies = request.cookies.get('next-auth.session-token')?.value || request.cookies.get('token')?.value;
  if(cookies === undefined ){
      if (request.nextUrl.pathname.startsWith('/user/shopping-cart') ) {
        return NextResponse.redirect(new URL('/login', request.url))
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

  }
  // fetch(new URL(`${process.env.baseURL}/user/me`).href, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     'Authorization': `Bearer ${cookies?.value}`
  //   },
  // })
  //   .then((response) => {
  //     response.json().then(data => {
  //       console.log(data)
  //     })
  //   })
  //   .catch((error) => {
  //     console.log("Fetching error: ", error);
  //   });

  return response;


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login','/register','/user/shopping-cart',"/user/verify-email/:path*"],
}