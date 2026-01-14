import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

const font = IBM_Plex_Sans({ subsets: ["latin"] });
const url = process.env.BASE_URL as string;

export const metadata: Metadata = {
  title: {
    default: "Circulet",
    template: "%s | Circulet",
  },
  description:
    "A campus-focused platform for students to share, rent, or sell pre-owned items. Built to promote affordability, reuse, and sustainability within the campus community.",

  applicationName: "Circulet",

  alternates: {
    canonical: url,
  },
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
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Circulet Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Circulet",
    description:
      "A campus-first marketplace where students can buy, sell, or rent pre-owned items responsibly.",
    images: ["/images/hero.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0F172A",
    },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${font.className}`}>
        {process.env.NODE_ENV === "production" && GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <NextTopLoader
          color="var(--toploader-color)"
          height={3}
          showSpinner={false}
        />
        <Providers>
          <Navbar />
          <div className="mt-16">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
