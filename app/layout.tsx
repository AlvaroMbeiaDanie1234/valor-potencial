import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { COMPANY } from "@/lib/constants"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} — Recrutamento Offshore em Angola`,
    template: `%s | ${COMPANY.shortName}`,
  },
  description:
    "Portal de recrutamento da Nome Valor Potencial. Consulte vagas em empresas petroliferas e offshore de Angola, submeta a sua candidatura e acompanhe todo o processo online.",
  keywords: [
    "emprego offshore Angola",
    "vagas petroliferas",
    "recrutamento Angola",
    "Nome Valor Potencial",
    "oil and gas Angola",
  ],
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#134b63",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`light bg-background ${inter.className}`}>
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        {children}
        <Toaster position="top-center" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
