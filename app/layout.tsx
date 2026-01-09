import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const font = IBM_Plex_Sans({ subsets: ["latin"] });
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://circulet.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Circulet",
    template: "%s | Circulet",
  },
  description:
    "A campus-focused platform for students to share, rent, or sell pre-owned items. Built to promote affordability, reuse, and sustainability within the campus community.",

  applicationName: "Circulet",

  keywords: [
    "Circulet",
    "campus marketplace",
    "student marketplace",
    "buy sell rent",
    "second hand items",
    "college platform",
    "sustainable campus",
  ],

  metadataBase: new URL(url),

  openGraph: {
    title: "Circulet",
    description:
      "A campus-first marketplace where students can buy, sell, or rent pre-owned items responsibly.",
    url: url,
    siteName: "Circulet",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <Providers>
          <Navbar />
          <div className="mt-16">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
