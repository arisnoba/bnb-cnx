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
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="REAL. GLOBAL. EXPERIENTIAL GROWTH. MARKETING COMMERCE COMPANY - BNB CNX" />

				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://bnb-cnx.com" />
				<meta property="og:title" content="BNB CNX" />
				<meta property="og:description" content="중국 SNS 마케팅 전문 | 왕홍 체험단, LIVE커머스, 계정운영, 입점대행, 브랜딩부터 매출로 이어지는 맞춤형 플랜 실행!" />
				<meta property="og:image" content="/images/og-img.png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:locale" content="ko_KR" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:url" content="https://bnb-cnx.com" />
				<meta name="twitter:title" content="BNB CNX" />
				<meta name="twitter:description" content="중국 SNS 마케팅 전문 | 왕홍 체험단, LIVE커머스, 계정운영, 입점대행, 브랜딩부터 매출로 이어지는 맞춤형 플랜 실행!" />
				<meta name="twitter:image" content="/images/og-img.png" />

				<link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
			</head>
			<body className="font-paperozi">
				{/* Font Awesome Kit */}
				<Script src="https://kit.fontawesome.com/f2bc282ffa.js" crossOrigin="anonymous" strategy="beforeInteractive" />

				<div className="flex relative flex-col min-h-screen">
					{!isAdminRoute && <Header />}
					<main className="flex-1">{children}</main>
					{!isAdminRoute && <Footer />}
				</div>
				<Toaster position="bottom-center" />
			</body>
		</html>
	);
}
