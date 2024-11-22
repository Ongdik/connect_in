import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RecoilRootWrapper from "@/components/RecoilWrapper";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tool Platform",
  description: "A tool marketplace inspired by Daangn Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <RecoilRootWrapper>{children}</RecoilRootWrapper>
      </body>
    </html>
  );
}
