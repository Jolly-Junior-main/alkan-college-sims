import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALKAN Health Science, Business & Technology College | SIMS Portal",
  description: "ALKAN Health Science, Business & Technology College - Established 2002 in Memory of Hakim Workineh Eshete. Campuses in Addis Ababa, Bahir Dar, and Dessie. Accredited Higher Education & SIMS Portal.",
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
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
