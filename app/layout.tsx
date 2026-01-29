// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arc — About Me",
  description: "Just another software developer.",

  // OG tags
  openGraph: {
    title: "Arc — About Me",
    description: "Just another software developer.",
    url: "https://arc.is-a.dev/",
    siteName: "wiindsom",
    type: "website",
    images: [
      {
        url: "https://wiindsom.github.io/assets/embed_img.jpg",
      },
    ],
  },

  // Twitter tags
  twitter: {
    card: "summary_large_image",
    title: "Arc — About Me",
    description: "Just another software developer.",
    images: ["https://wiindsom.github.io/assets/embed_img.jpg"],
  },

  // theme-color meta
  themeColor: "#E1C9FB",

  // viewport meta (Next will handle this automatically in most cases,
  // but you can keep it explicit)
  viewport: {
    width: "device-width",
    initialScale: 1,
  },

  // favicon
  icons: {
    icon: [
      // Prefer putting the actual file at: /public/assets/favicon.png
      { url: "/assets/favicon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
