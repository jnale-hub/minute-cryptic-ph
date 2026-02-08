import type { Metadata } from "next";
import "./globals.css";
import { Mulish, Sansita_Swashed } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

const sansita = Sansita_Swashed({
  subsets: ["latin"],
  variable: "--font-sansita",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minute Cryptic PH",
  description: "A minute cryptic clone for Filipinos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} ${sansita.variable} antialiased font-mulish`}
      >
        {children}
      </body>
    </html>
  );
}
