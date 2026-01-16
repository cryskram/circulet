import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (!session.user) {
        return session;
      }
      session.user.id = user.id;
      session.user.role = user.role!;
      session.user.isProfileComplete =
        typeof user.isProfileComplete === "boolean"
          ? user.isProfileComplete
          : false;
      session.user.phone =
        typeof user.phone === "string" ? user.phone : undefined;

      session.user.username =
        typeof user.username === "string" ? user.username : undefined;

      session.user.gradYear =
        typeof user.gradYear === "number" ? user.gradYear : undefined;
      return session;
    },

    async signIn({ user }) {
      return user.email?.endsWith("@bmsce.ac.in") ?? false;
    },
  },
});
