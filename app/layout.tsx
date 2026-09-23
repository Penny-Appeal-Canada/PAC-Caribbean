import type { Metadata } from "next";
import "./globals.css";

const adobeKit = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT;

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
    <html lang="en">
      <head>
        {adobeKit ? (
          <link
            rel="stylesheet"
            href={`https://use.typekit.net/${adobeKit}.css`}
          />
        ) : null}
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
