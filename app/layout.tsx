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
