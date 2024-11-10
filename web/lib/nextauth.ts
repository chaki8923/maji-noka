import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../lib/prismadb'
import NextAuth, { NextAuthOptions }  from "next-auth";


export const nextAuthOptions: NextAuthOptions = ({
    adapter: PrismaAdapter(prisma),
      pages: {
      signIn: "/auth/signin",  // ← 追加
      error: "/auth/signin",    // ← 追加
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID || "",
        clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
        version: "2.0"
      }),
  
    ],
    secret: process.env.SECRET,
    callbacks: {
      async session({ session, user, token }) {
        session.user = user;
        return session;
      },
    },
  });
  
  export default NextAuth(nextAuthOptions)