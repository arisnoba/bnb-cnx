import type { Metadata } from 'next';
import './globals.css';
import '@/styles/main.scss';
import { Toaster } from '@/components/ui/sonner';
import Script from 'next/script';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
	metadataBase: new URL('https://bnb-cnx.com'),
	title: 'BNB CNX 중국마케팅',
	description: 'REAL. GLOBAL. EXPERIENTIAL GROWTH. MARKETING COMMERCE COMPANY - BNB CNX',
	openGraph: {
		type: 'website',
		url: 'https://bnb-cnx.com',
		title: 'BNB CNX 중국마케팅',
		description: '중국 SNS 마케팅 전문 | 왕홍 체험단, LIVE커머스, 계정운영, 입점대행, 브랜딩부터 매출로 이어지는 맞춤형 플랜 실행!',
		siteName: 'BNB CNX',
		images: [
			{
				url: '/images/og-img.png',
				width: 1200,
				height: 630,
			},
		],
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'BNB CNX 중국마케팅',
		description: '중국 SNS 마케팅 전문 | 왕홍 체험단, LIVE커머스, 계정운영, 입점대행, 브랜딩부터 매출로 이어지는 맞춤형 플랜 실행!',
		images: ['/images/og-img.png'],
	},
	verification: {
		other: {
			// 네이버 웹마스터 도구 소유권 확인
			'naver-site-verification': 'f43635d90dbcbfe052ca5a02029ae110fd88aca2',
		},
	},
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico', type: 'image/x-icon' },
			{ url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
		other: [
			{
				rel: 'manifest',
				url: '/favicon/site.webmanifest',
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className="font-paperozi">
				{/* Font Awesome Kit */}
				<Script src="https://kit.fontawesome.com/f2bc282ffa.js" crossOrigin="anonymous" strategy="beforeInteractive" />

				<ClientLayout>{children}</ClientLayout>
				<Toaster position="bottom-center" />
			</body>
		</html>
	);
}
