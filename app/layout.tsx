import type { Metadata } from "next";
import { Geist, Geist_Mono, Sawarabi_Gothic, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sawarabiGothic = Sawarabi_Gothic({
  weight: "400",
  variable: "--font-sawarabi-gothic",
  subsets: ["latin"],
})

const poppins = Poppins({
  weight: "400",
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sääntieđotus",
  description: "Værmeldingen på kvensk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
