import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Scout",
  description: "Generated by create next app",
};

import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { LeftAppSidebar, RightAppSidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <SidebarProvider>
            <LeftAppSidebar />
            <SidebarInset>
              <Header />
              <main className="flex flex-1 flex-col gap-4 p-4">
                {children}
              </main>
            </SidebarInset>
            <RightAppSidebar />
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
