import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });
export const preferredRegion = ['sin1']

export const metadata: Metadata = {
  title: "Najmi Industrial Corporation | Precision Hardware",
  description: "Specializing in Fasteners, Flanges, Pipe Fittings, and General Hardware since 1990.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
