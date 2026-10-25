import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alkan Health Sciences College | SIMS Portal",
  description: "Academic Management System and Student Information System for Health Sciences College",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
