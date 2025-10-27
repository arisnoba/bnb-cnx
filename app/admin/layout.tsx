import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - BNB CNX",
  description: "Admin dashboard for managing contact inquiries",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
