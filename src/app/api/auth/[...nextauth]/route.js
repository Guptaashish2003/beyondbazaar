import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import User from "@/backend/model/User"
import ConnectDB from "@/backend/DATABASE/ConnectDB"
import { cookies } from 'next/headers'

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  secure: false,
  
};
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
    callbacks: {
      async session({ session, token, user }) {
        await ConnectDB()
  
        const {name,email} = session.user;
        const exist = await User.findOne({email});
        var newUser;
        var userToken;
        if (exist.length === 0) {
          newUser = await User.create({name, email,byGoogle: true,twoStepVerification:false,isEmailValid:true});
          userToken = await newUser.getSignedToken();
        }else{
          userToken = await exist.getSignedToken();
        }
        session.token = userToken;
        cookies().set({
          name: "token",
          value: userToken,
          httpOnly: true,
          path: '/',
          maxAge: cookieOptions.expires,
        })
        return session;
      },
  }
})

export { handler as GET, handler as POST }