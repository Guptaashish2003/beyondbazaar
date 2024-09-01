import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/backend/model/User";
import ConnectDB from "@/backend/DATABASE/ConnectDB";
import { cookies } from "next/headers";


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
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  trustHost: true,

  pages: {
    signIn: "/login",
    signOut: "/",
    
  },
  callbacks: {
     async redirect({ baseUrl }) {
      console.log(baseUrl);
      return process.env.NEXTAUTH_URL || baseUrl;

    },
    async session({ session, token, user }) {
      await ConnectDB();

      const { name, email } = session.user;
      const exist = await User.findOne({ email });
      var newUser;
      var userToken;
      if (!exist) {
        newUser = await User.create({
          name,
          email,
          byGoogle: true,
          twoStepVerification: false,
          byGooglePass: true,
          isEmailValid: true,
        });
        userToken = await newUser.getSignedToken();
      }
      userToken = await exist.getSignedToken();
      session.token = userToken;
      cookies().set({
        name: "token",
        value: userToken,
        httpOnly: true,
        path: "/",
        expires: cookieOptions.expires,
      });
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
