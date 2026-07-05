import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/css/globals.css";
import { SectionProvider } from "@/providers/SectionProvider";
import HeaderBar from "@/components/custom/layout/HeaderBar";
import UrlBar from "@/components/custom/layout/UrlBar";
import { NavBar } from "@/components/custom/layout/NavBar";
import { BlogContentProvider } from "@/providers/BlogContentProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanvir Azad",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-border md:bg-background p-0 px-0 md:p-6 md:px-6 flex flex-col">
          <BlogContentProvider>
          <SectionProvider>
            <HeaderBar title="Tanvir Azad" subTitle="Frontend Engineer" pills={["web", "android", "ios"]} />
            <div className="flex-1 min-h-0 flex gap-4 items-start md:overflow-hidden">
              <div className="hidden md:block sticky top-24 self-start h-[calc(100vh-8rem)]">
                <NavBar />
              </div>
              <main className="flex-1 min-h-0 md:sticky md:self-start md:h-[calc(100vh-8rem)]">
                {children}
              </main>
              <div className="hidden md:block sticky top-24 self-start h-[calc(100vh-8rem)]">
                <UrlBar />
              </div>
            </div>
          </SectionProvider>
          </BlogContentProvider>
        </div>
      </body>
    </html>
  );
}
