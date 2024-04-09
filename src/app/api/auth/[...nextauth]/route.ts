import { Account, AuthOptions, User as AuthUser } from "next-auth";
import NextAuth from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  password: string;
}

const AuthOpions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password!
            );

            if (isPasswordCorrect) {
              return {
                id: user.id.toString(),
                email: user.email,
                password: user.password,
              } as User;
            }
          }

          return null;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "credentials") {
        return Promise.resolve(true);
      }

      if (account?.provider === "google" && user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: { email: user.email },
            });
          }

          return Promise.resolve(true);
        } catch (err) {
          console.error("Error saving user:", err);
          return Promise.resolve(false);
        }
      }

      return Promise.resolve(false);
    },
  },
};

const handler = NextAuth(AuthOpions);

export { handler as GET, handler as POST };
