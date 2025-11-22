"use client";
import { Header } from "@/components/Header";
import { getUserType } from "@/lib/authUtils";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userType = getUserType();
  const isLoggedIn = !!userType;

  return (
    <html lang="en">
      <body>
        {isLoggedIn && <Header />}
        {children}
      </body>
    </html>
  );
}
