import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Validate environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google client ID and client secret are required.");
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Use Prisma adapter for session management
  adapter: PrismaAdapter(prisma),
  providers: [
    // Configure Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Map Google profile data to user object
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Merge user data into token
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Set user role in session
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
