import type { Metadata } from "next"
import "./globals.css"
import "@/styles/main.scss"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "BNB CNX - Brand Website",
  description: "A modern brand website with contact and admin management",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="font-paperozi">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
