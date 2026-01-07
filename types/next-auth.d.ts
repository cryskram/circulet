import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "USER" | "ADMIN";
      isProfileComplete: boolean;
      phone?: string;
      username?: string;
      gradYear?: number;
    };
  }

  interface User {
    role?: "USER" | "ADMIN";
    isProfileComplete?: boolean;
    phone?: string;
    username?: string;
    gradYear?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER" | "ADMIN";
    isProfileComplete?: boolean;
    phone?: string;
    username?: string;
    gradYear?: number;
  }
}
