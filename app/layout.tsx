import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Penny Appeal Caribbean",
  description:
    "Zakat, Sadaqah, and emergency giving for communities across the Caribbean. Thirst Relief, Feed Our World, OrphanKind, and Emergency Response.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={plusJakarta.className}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
