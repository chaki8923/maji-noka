import NextAuth, { AuthOptions }  from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prismadb from '@/lib/prismadb'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();
const TWITTER_AUTHORIZATION = {
  url: "https://twitter.com/i/oauth2/authorize",
  params: {
    // 以下のScopesに書かれいるもの設定
    // https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code
    scope: "users.read tweet.read offline.access",
  },
};

export const authOptions: AuthOptions = ({
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
  callbacks: {
    async session({ session, user, token }) {
      console.log("user-------------", user);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

});

export default NextAuth(authOptions)
