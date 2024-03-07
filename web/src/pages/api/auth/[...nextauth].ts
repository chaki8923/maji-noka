import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const TWITTER_AUTHORIZATION = {
  url: "https://twitter.com/i/oauth2/authorize",
  params: {
    // 以下のScopesに書かれいるもの設定
    // https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code
    scope: "users.read tweet.read offline.access",
  },
};

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0",
      authorization: TWITTER_AUTHORIZATION,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log(user);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
