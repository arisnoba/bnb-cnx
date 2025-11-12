'use client';

import './globals.css';
import '@/styles/main.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isAdminRoute = pathname?.startsWith('/admin');

	return (
		<html lang="ko">
			<head>
				<link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
			</head>
			<body className="font-paperozi">
				{/* Font Awesome Kit */}
				<Script src="https://kit.fontawesome.com/f2bc282ffa.js" crossOrigin="anonymous" strategy="beforeInteractive" />

				<div className="relative flex min-h-screen flex-col">
					{!isAdminRoute && <Header />}
					<main className="flex-1">{children}</main>
					{!isAdminRoute && <Footer />}
				</div>
				<Toaster position="bottom-center" />
			</body>
		</html>
	);
}
