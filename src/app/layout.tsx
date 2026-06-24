import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redoy Group | Industrial Manufacturing Powerhouse, Narayanganj",
  description: "Redoy Group is a leading B2B industrial manufacturing powerhouse based in Narayanganj, Bangladesh. Supplying high-capacity Ready-Made Garments (RMG), extruded industrial polythene packaging, and corrugated cardboard carton boxes for global retail and logistics brands.",
  keywords: ["Redoy Group", "Ready-Made Garments", "Polythene Packaging", "Carton Packaging", "Corrugated Box", "Narayanganj", "Bangladesh", "B2B manufacturing", "apparel exporter"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
