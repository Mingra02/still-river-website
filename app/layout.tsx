import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Still River",
  description:
    "Unleash the power of your data with our expert analysis and bespoke solutions",
  metadataBase: new URL("https://www.the-still-river.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title key="title">The Still River</title>
        <meta
          name="description"
          content="Unleash the power of your data with our exper analysis and bespoke solutions."
        />
      </Head>
      <body className="overflow-x-hidden bg-slate-950">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
