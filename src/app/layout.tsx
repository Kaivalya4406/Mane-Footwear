import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import AnnouncementBar from "../components/shared/AnnouncementBar";

import localFont from "next/font/local";

const manrope = localFont({
  src: "./fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
  weight: "400 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MANE FOOTWEAR | Footwear You Can Trust — Talegaon Dabhade",
  description:
    "MANE FOOTWEAR is a family-owned footwear business with 50+ years of heritage in Talegaon Dabhade, Maharashtra, offering quality footwear for the whole family.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-offwhite"
        >
          Skip to main content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}