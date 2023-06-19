import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID ?? '',
      clientSecret: process.env.TWITTER_SECRET ?? ''
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? '',
      clientSecret: process.env.DISCORD_SECRET ?? ''
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: { label: "Password", type: "password" },
        username: {
          label: 'Username',
          type: 'text'
        },
        displayName: {
          label: 'Display Name',
          type: 'text'
        }
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: credentials?.email };
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/signup',
    signOut: '/signout'
  }
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };