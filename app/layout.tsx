import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import RootC from "./rootcontext";
import Dashboard from "./dashboard";
import { Toaster } from "@/components/ui/sonner";

const font = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <RootC>
          <Toaster/>
          <Dashboard>
            {children}
          </Dashboard>
        </RootC>
      </body>
    </html>
  );
}
