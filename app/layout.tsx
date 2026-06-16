import type { Metadata } from "next";
import "./globals.css"; // <--- THIS IS THE LIFELINE
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Stratmire Capital",
  description: "Capital Partner Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>

      <body className="antialiased">
        <Navbar />
        {/* Persistent Navbar across all pages */}
        {children}
      </body>
    </html>
  );
}