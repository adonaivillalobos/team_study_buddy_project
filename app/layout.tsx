import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat, Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StudyBuddy",
    template: "%s | StudyBuddy",
  },
  description: "Organize your study schedules and track progress across courses.",
  metadataBase: new URL("https://your-studybuddy-url.vercel.app"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground font-body">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}