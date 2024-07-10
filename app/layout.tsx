'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  session: Session | null
  children: React.ReactNode
}
/*
export const metadata: Metadata = {
  title: "Medianalytics",
  description: "Made with ♥️ by ctzN",
};*/

const RootLayout: React.FC <Props> = ({ children, session }) => {
  return (
    <html lang='en'>
      <SessionProvider session={session}>
      <body className={inter.className}>
        
          {children}
        
      </body>
      </SessionProvider>
    </html>
  )
}
export default RootLayout;
/*
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
  );
}*/
