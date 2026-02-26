import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "button sigma",
  description: "Just another software developer.",

  openGraph: {
    title: "button sigma",
    description: "Just another software developer.",
    url: "https://arc.is-a.dev/",
    siteName: "wiindsom",
    type: "website",
    images: [{ url: "https://wiindsom.github.io/assets/embed_img.jpg" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "button sigma",
    description: "Just another software developer.",
    images: ["https://wiindsom.github.io/assets/embed_img.jpg"],
  },

  themeColor: "#E1C9FB",

  viewport: {
    width: "device-width",
    initialScale: 1,
  },

  icons: {
    icon: [{ url: "/assets/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={[
          inter.className,
          geistSans.variable,
          geistMono.variable,
          "antialiased",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}