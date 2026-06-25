import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowLog",
  description: "Diario quotidiano per idratazione, minzione e farmaci.",
  appleWebApp: {
    capable: true,
    title: "FlowLog",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#006a63"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="manifest.webmanifest" />
        <link rel="icon" href="flowlog-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
