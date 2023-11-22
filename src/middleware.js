
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  console.log("middleware running..")
  const response = NextResponse.next();
  let cookies = request.cookies.get('token')?.value|| request.cookies.get('next-auth.session-token')?.value;
  if(!cookies){
      if (request.nextUrl.pathname.startsWith('/shopping-cart') ) {
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
  matcher: ['/', '/login','/register','/shopping-cart',"/verify-email/:path*"],
}