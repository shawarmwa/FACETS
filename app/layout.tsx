import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faculty Evaluation System",
  description: "Production-ready faculty evaluation platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
