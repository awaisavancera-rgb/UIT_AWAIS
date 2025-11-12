import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UIT University - Excellence in Education",
  description: "UIT University offers world-class education in Engineering, Computing Sciences, and Management. Discover our programs, faculty, and state-of-the-art facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} ${GeistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
