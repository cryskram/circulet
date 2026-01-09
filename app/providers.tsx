"use client";

import { apolloClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SessionProvider>
        <ApolloProvider client={apolloClient}>
          {children}{" "}
          <Toaster
            position="top-right"
            toastOptions={{
              className: "text-sm",
              success: {
                iconTheme: {
                  primary: "#16a34a",
                  secondary: "#ecfdf5",
                },
              },
              error: {
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#fef2f2",
                },
              },
            }}
          />
        </ApolloProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
