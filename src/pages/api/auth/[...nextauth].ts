import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';

import { prisma } from "../../../prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user['id'] = user.id
      session.user['colorAvatar'] = ""
      return session
    }
  }
})