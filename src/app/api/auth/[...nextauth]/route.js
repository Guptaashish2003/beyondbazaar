import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    session: {
      strategy: "jwt",
    },
  providers:[
    GoogleProvider({
        clientId:process.env.ClIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
    })
  ],
  
    pages: {
      signIn: "/login",
    },
    secret: process.env.GOOGLE_AUTH_API_KEY,
//   pages: {
//     signIn: '/auth/dashbaord', // on successfully signin    
//     signOut: '/auth/login', // on signout redirects users to a custom login page.
//     error: '/auth/error',  // displays authentication errors
//     newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//   }
})

export { handler as GET, handler as POST }