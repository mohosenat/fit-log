import type { Metadata } from "next";
import "./globals.css";

import { FitLogProvider } from "@/context/FitLogContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#0b0d0f]">
        <FitLogProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">{children}</main>

            <Footer />
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#15191e",
                color: "#f2f4f6",
                border: "1px solid #242a31",
                borderRadius: "5px",
                fontSize: "12px",
              },
              success: {
                iconTheme: {
                  primary: "#ccff00",
                  secondary: "#0b0d0f",
                },
              },
            }}
          />
        </FitLogProvider>
      </body>
    </html>
  );
}