import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import ReactQueryProvider from "@/lib/ReactQueryProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Analyser",
  description: "Resume Analyser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Theme accentColor="mint" grayColor="gray" panelBackground="solid" scaling="100%" radius="full">
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Toaster />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
