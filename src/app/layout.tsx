import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poorvi Gudagur — Law Student, Creator & Co-founder",
  description: "Portfolio of Poorvi Gudagur — law student, Instagram creator with 156K followers, and co-founder of The Creators' Collective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full font-body">{children}</body>
    </html>
  );
}
