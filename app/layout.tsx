import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Still River",
  description:
    "Unleash the power of your data with our expert analysis and bespoke solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full w-screen overflow-x-hidden bg-slate-950">
        <Navbar />
        <div className="h-full w-screen overflow-hidden">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
