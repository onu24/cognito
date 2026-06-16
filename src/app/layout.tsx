import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cognitoo.inc | AI-Powered Marketing Agency",
  description:
    "AI-powered marketing for brands that want to grow smarter. Social media, content strategy, and production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col"
        style={{ background: "#040C1A", fontFamily: "var(--font-body)" }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
