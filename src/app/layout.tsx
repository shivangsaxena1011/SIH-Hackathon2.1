import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "SIH Intelligence Platform — AI-Powered Criminal Network Analysis",
  description: "Secure Criminal Intelligence Command Center — SIH 2026 Prototype. All data is synthetic for demonstration purposes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0B0716] text-gray-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
