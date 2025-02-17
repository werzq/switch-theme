import "./globals.css";

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Switch Theme",
  description: "A bookmarklet to switch between light and dark theme on any website",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=1024" />
      </head>
      <body className={`${inter.className} overflow-hidden select-none`}>{children}</body>
    </html>
  )
}