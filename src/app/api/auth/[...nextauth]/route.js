import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/model/User";
import ConnectDB from "@/backend/DATABASE/ConnectDB";
import { cookies } from "next/headers";


const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  secure: false,
};

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectDB();
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        const user = await User.findOne({ email: credentials.email}).select("+password");
        if (!user) {
          throw new Error('Email not found');
        }
        if(!user.isEmailValid){
          throw new Error('Please verify your email');
        }

        const PasswordMatch = await user.matchPassword(credentials.password);
        
        if (!PasswordMatch) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // console.log(process.env.NEXTAUTH_URL, "lkj");
      return process.env.NEXTAUTH_URL;
    },
    async session({ session, token, user }) {
      await ConnectDB();
      const { name, email, role,image } = session.user;
      const exist = await User.findOne({ email
       });
      let userToken;
      if (!exist) {
        const newUser = await User.create({
          name,
          email,
          image,
          byGoogle: user ? false : true,
          twoStepVerification: false,
          byGooglePass: user ? true : false,
          isEmailValid: true,
        });
        userToken = await newUser.getSignedToken();
      } else {
        userToken = await exist.getSignedToken();
      }
      session.token = userToken;
      session.user.role = token.role;
      cookies().set({
        name: "token",
        value: userToken,
        httpOnly: true,
        path: "/",
        expires: cookieOptions.expires,
      });
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
