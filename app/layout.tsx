import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LogiFlow - Advanced Logistics Management",
  description:
    "Streamline your logistics operations with real-time tracking, intelligent route optimization, and comprehensive fleet management.",
  generator: 'v0.dev',

  // Basic metadata
  keywords: [
    "logistics management",
    "fleet management",
    "route optimization",
    "real-time tracking",
    "supply chain",
    "delivery management",
    "transportation",
    "warehouse management",
    "logistics software",
    "fleet tracking"
  ],
  authors: [{ name: "Silas Okanlawon" }],
  creator: "LogiFlow",
  publisher: "LogiFlow",

  // Open Graph metadata for social media sharing
  openGraph: {
    title: "LogiFlow - Advanced Logistics Management",
    description: "Streamline your logistics operations with real-time tracking, intelligent route optimization, and comprehensive fleet management.",
    url: "https://logi-flow-kohl.vercel.app/", // Replace with your actual domain
    siteName: "LogiFlow",
    images: [
      {
        url: "/opengraph-image.png", // You'll need to create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "LogiFlow - Advanced Logistics Management Platform",
      },
      {
        url: "/opengraph-image-square.png", // Square version for some platforms (optional)
        width: 800,
        height: 800,
        alt: "LogiFlow Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "LogiFlow - Advanced Logistics Management",
    description: "Streamline your logistics operations with real-time tracking, intelligent route optimization, and comprehensive fleet management.",
    images: ["/opengraph-image.png"], // Same image as OpenGraph
    creator: "@logiflow", // Replace with your Twitter handle if you have one
    site: "@logiflow", // Replace with your Twitter handle
  },

  // Additional metadata
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'noimageindex': false,
    }
  },

  // Verification tags (uncomment and add your verification codes)
  // verification: {
  //   google: 'your-google-verification-code',
  //   bing: 'your-bing-verification-code',
  // },

  // App-specific metadata
  applicationName: "LogiFlow",
  category: "Business",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional meta tags that can't be set via Metadata API */}
        <link rel="canonical" href="https://logi-flow-kohl.vercel.app" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}