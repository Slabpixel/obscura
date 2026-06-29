import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Navbar from "@/components/navbar";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obscura - Intelligent Wellness Platform",
  description: "Obscura is designed as a calm, intelligent wellness platform that helps people build emotional clarity through everyday interaction. The product brings together emotional tracking, guided reflection, AI-powered insights, and human support into one cohesive system, removing the friction often found in mental wellness tools. The focus is not on overwhelming users with features, but on creating a gentle, adaptive experience that responds to how they feel in the moment—making emotional awareness feel intuitive, personal, and sustainable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
