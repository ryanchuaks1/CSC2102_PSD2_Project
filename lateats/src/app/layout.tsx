import type { Metadata } from "next";
import { Work_Sans, Bree_Serif } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Lateats",
  description: "Discounted food, Zero waste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>{children}</body>
    </html>
  );
}
